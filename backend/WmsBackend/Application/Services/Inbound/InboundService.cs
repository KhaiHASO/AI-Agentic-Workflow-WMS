using Microsoft.EntityFrameworkCore;
using WmsBackend.Application.Common;
using WmsBackend.Application.DTOs.Inbound;
using WmsBackend.Application.Services.Inventory;
using WmsBackend.Data;
using WmsBackend.Models.WmsCore;
using WmsBackend.Models.IntegrationAudit;

namespace WmsBackend.Application.Services.Inbound
{
    public interface IInboundService
    {
        Task<ApiResponse<MasterReceiptDto>> CreateMasterReceiptAsync(CreateMasterReceiptDto dto);
        Task<ApiResponse<bool>> ImportPoToDraftAsync(int masterReceiptId, int poHeaderId);
        Task<ApiResponse<bool>> RecordScanEventAsync(int masterReceiptId, ScanEventDto dto);
        Task<ApiResponse<SubmitDraftResultDto>> SubmitDraftAsync(int masterReceiptId);
    }

    public class InboundService : IInboundService
    {
        private readonly WmsDbContext _context;
        private readonly IInventoryService _inventoryService;

        public InboundService(WmsDbContext context, IInventoryService inventoryService)
        {
            _context = context;
            _inventoryService = inventoryService;
        }

        public async Task<ApiResponse<MasterReceiptDto>> CreateMasterReceiptAsync(CreateMasterReceiptDto dto)
        {
            var receipt = new InboundReceiptHeader
            {
                ReceiptNo = dto.ReceiptNo ?? "RECV-" + DateTime.UtcNow.Ticks.ToString().Substring(10),
                WarehouseId = dto.WarehouseId,
                SupplierId = dto.SupplierId,
                Status = "Draft",
                CreatedAt = DateTime.UtcNow
            };

            _context.InboundReceiptHeaders.Add(receipt);
            await _context.SaveChangesAsync();

            return ApiResponse<MasterReceiptDto>.SuccessResult(new MasterReceiptDto 
            { 
                Id = receipt.Id, 
                ReceiptNo = receipt.ReceiptNo,
                Status = receipt.Status,
                WarehouseId = receipt.WarehouseId,
                SupplierId = receipt.SupplierId,
                CreatedAt = receipt.CreatedAt
            }, "Master Receipt created.");
        }

        public async Task<ApiResponse<bool>> ImportPoToDraftAsync(int masterReceiptId, int poHeaderId)
        {
            var receipt = await _context.InboundReceiptHeaders.Include(h => h.Lines).FirstOrDefaultAsync(h => h.Id == masterReceiptId);
            if (receipt == null) return ApiResponse<bool>.FailureResult("Receipt not found");

            var po = await _context.ErpPurchaseOrderHeaders.Include(h => h.Lines).FirstOrDefaultAsync(h => h.Id == poHeaderId);
            if (po == null) return ApiResponse<bool>.FailureResult("PO not found");

            foreach (var poLine in po.Lines.Where(l => l.OpenQty > 0))
            {
                if (!receipt.Lines.Any(l => l.PoLineId == poLine.Id))
                {
                    receipt.Lines.Add(new DraftLine
                    {
                        PoLineId = poLine.Id,
                        ItemId = poLine.ItemId,
                        UomId = poLine.UomId,
                        ExpectedQty = poLine.OpenQty,
                        Status = "New"
                    });
                }
            }

            await _context.SaveChangesAsync();
            return ApiResponse<bool>.SuccessResult(true, "PO imported to draft.");
        }

        public async Task<ApiResponse<bool>> RecordScanEventAsync(int masterReceiptId, ScanEventDto dto)
        {
            var receipt = await _context.InboundReceiptHeaders.Include(h => h.Lines).FirstOrDefaultAsync(h => h.Id == masterReceiptId);
            if (receipt == null) return ApiResponse<bool>.FailureResult("Receipt not found");

            // 1. Resolve Barcode to Item
            var barcode = await _context.ItemBarcodes.Include(b => b.Item).FirstOrDefaultAsync(b => b.Barcode == dto.Barcode);
            if (barcode == null) return ApiResponse<bool>.FailureResult("Invalid Barcode");

            // 2. Find Draft Line for this Item
            var line = receipt.Lines.FirstOrDefault(l => l.ItemId == barcode.ItemId);
            if (line == null) 
            {
                // Create Unplanned Line or handle error
                return ApiResponse<bool>.FailureResult("Item not found in this receipt's draft lines");
            }

            // 3. Update Line
            line.ReceivedQty += dto.Qty;
            line.Status = "Scanning";

            // 4. Audit Scan Event
            _context.MobileScanEvents.Add(new MobileScanEvent 
            { 
                Barcode = dto.Barcode,
                ScannedQty = dto.Qty,
                ClientTxnId = dto.ClientTxnId ?? Guid.NewGuid().ToString(),
                UserId = dto.UserId,
                ScanTime = DateTime.UtcNow
            });

            await _context.SaveChangesAsync();
            return ApiResponse<bool>.SuccessResult(true, "Scan recorded.");
        }

        public async Task<ApiResponse<SubmitDraftResultDto>> SubmitDraftAsync(int masterReceiptId)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var receipt = await _context.InboundReceiptHeaders
                    .Include(h => h.Lines).ThenInclude(l => l.Item)
                    .FirstOrDefaultAsync(h => h.Id == masterReceiptId);

                if (receipt == null) return ApiResponse<SubmitDraftResultDto>.FailureResult("Receipt not found");
                if (receipt.Status != "Draft") return ApiResponse<SubmitDraftResultDto>.FailureResult("Receipt already submitted");

                receipt.Status = "Submitted";

                // Transfer from DraftLine to InboundReceiptLine (Actual received data)
                int putawayCount = 0;
                foreach (var draftLine in receipt.Lines.Where(l => l.ReceivedQty > 0))
                {
                    var actualLine = new InboundReceiptLine
                    {
                        ReceiptHeaderId = receipt.Id,
                        ItemId = draftLine.ItemId,
                        UomId = draftLine.UomId,
                        PoLineId = draftLine.PoLineId,
                        ReceivedQty = draftLine.ReceivedQty,
                        AcceptedQty = draftLine.ReceivedQty, // Simple logic for happy path
                        Status = "PendingPutaway"
                    };
                    _context.InboundReceiptLines.Add(actualLine);

                    // 1. Create Putaway Task
                    var task = new PutawayTask
                    {
                        TaskNo = "PA-" + Guid.NewGuid().ToString().Substring(0, 8).ToUpper(),
                        ItemId = draftLine.ItemId,
                        Quantity = draftLine.ReceivedQty,
                        ReceiptHeaderId = receipt.Id,
                        Status = "Open",
                        CreatedAt = DateTime.UtcNow
                    };
                    _context.PutawayTasks.Add(task);
                    putawayCount++;

                    // 2. Record Inventory Ledger (Move into Staging)
                    // Let's assume LocationId = 1 is Staging for this warehouse
                    int stagingLocationId = 1; 

                    var movement = new InventoryMovementRequest
                    {
                        WarehouseId = receipt.WarehouseId,
                        ItemId = draftLine.ItemId,
                        FromLocationId = null, // Coming from outside
                        ToLocationId = stagingLocationId,
                        Qty = draftLine.ReceivedQty,
                        MovementType = "Inbound",
                        DocumentType = "InboundReceipt",
                        DocumentNo = receipt.ReceiptNo
                    };

                    var invResult = await _inventoryService.RecordMovementAsync(movement);
                    if (!invResult.Success) throw new Exception(invResult.Message);
                }

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();

                return ApiResponse<SubmitDraftResultDto>.SuccessResult(new SubmitDraftResultDto 
                { 
                    Success = true, 
                    ReceiptId = receipt.Id,
                    ReceiptNo = receipt.ReceiptNo,
                    PutawayTaskCount = putawayCount
                }, "Draft submitted and putaway tasks generated.");
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                return ApiResponse<SubmitDraftResultDto>.FailureResult("Error submitting draft: " + ex.Message);
            }
        }
    }
}
