using Microsoft.EntityFrameworkCore;
using WmsBackend.Application.Common;
using WmsBackend.Data;
using WmsBackend.Models.WmsCore;

namespace WmsBackend.Application.Services.Inventory
{
    public interface IInventoryService
    {
        Task<ApiResponse<bool>> RecordMovementAsync(InventoryMovementRequest request);
        Task<ApiResponse<IEnumerable<InventoryOnHand>>> GetOnHandAsync(int warehouseId, int? itemId = null, int? locationId = null);
    }

    public class InventoryMovementRequest
    {
        public int WarehouseId { get; set; }
        public int ItemId { get; set; }
        public int? FromLocationId { get; set; }
        public int? ToLocationId { get; set; }
        public decimal Qty { get; set; }
        public string MovementType { get; set; } = string.Empty; // e.g., "Inbound", "Putaway", "Pick", "Adjustment"
        public string DocumentType { get; set; } = string.Empty;
        public string DocumentNo { get; set; } = string.Empty;
        public int? OwnerId { get; set; }
        public string? LotNo { get; set; }
        public string? SerialNumber { get; set; }
        public int? InventoryStatusId { get; set; }
        public int? UserId { get; set; }
    }

    public class InventoryService : IInventoryService
    {
        private readonly WmsDbContext _context;

        public InventoryService(WmsDbContext context)
        {
            _context = context;
        }

        public async Task<ApiResponse<bool>> RecordMovementAsync(InventoryMovementRequest request)
        {
            // 1. Update/Reduce FromLocation (if exists)
            if (request.FromLocationId.HasValue)
            {
                var fromStock = await GetOrCreateStock(request, request.FromLocationId.Value);
                if (fromStock.AvailableQty < request.Qty && request.MovementType != "Adjustment")
                    return ApiResponse<bool>.FailureResult("Insufficient stock at source location");
                
                fromStock.AvailableQty -= request.Qty;
            }

            // 2. Update/Increase ToLocation (if exists)
            if (request.ToLocationId.HasValue)
            {
                var toStock = await GetOrCreateStock(request, request.ToLocationId.Value);
                toStock.AvailableQty += request.Qty;
            }

            // 3. Record Ledger
            var ledger = new InventoryLedger
            {
                ItemId = request.ItemId,
                Qty = request.Qty,
                FromLocationId = request.FromLocationId,
                ToLocationId = request.ToLocationId,
                TransactionType = request.MovementType,
                SourceDocId = request.DocumentNo,
                Timestamp = DateTime.UtcNow,
                CreatedBy = request.UserId,
                CreatedAt = DateTime.UtcNow
            };
            _context.InventoryLedgers.Add(ledger);

            await _context.SaveChangesAsync();
            return ApiResponse<bool>.SuccessResult(true, "Inventory movement recorded.");
        }

        public async Task<ApiResponse<IEnumerable<InventoryOnHand>>> GetOnHandAsync(int warehouseId, int? itemId = null, int? locationId = null)
        {
            var query = _context.InventoryOnHands
                .AsNoTracking()
                .Where(i => i.WarehouseId == warehouseId);

            if (itemId.HasValue) query = query.Where(i => i.ItemId == itemId);
            if (locationId.HasValue) query = query.Where(i => i.LocationId == locationId);

            var result = await query.Include(i => i.Item).Include(i => i.Location).Include(i => i.InventoryStatus).ToListAsync();
            return ApiResponse<IEnumerable<InventoryOnHand>>.SuccessResult(result);
        }

        private async Task<InventoryOnHand> GetOrCreateStock(InventoryMovementRequest req, int locationId)
        {
            var stock = await _context.InventoryOnHands
                .FirstOrDefaultAsync(i => i.WarehouseId == req.WarehouseId 
                                     && i.LocationId == locationId 
                                     && i.ItemId == req.ItemId
                                     && i.OwnerId == req.OwnerId
                                     && i.LotNo == req.LotNo
                                     && i.SerialNumber == req.SerialNumber
                                     && i.InventoryStatusId == (req.InventoryStatusId ?? 1)); // Default status

            if (stock == null)
            {
                stock = new InventoryOnHand
                {
                    WarehouseId = req.WarehouseId,
                    LocationId = locationId,
                    ItemId = req.ItemId,
                    OwnerId = req.OwnerId,
                    LotNo = req.LotNo,
                    SerialNumber = req.SerialNumber,
                    InventoryStatusId = req.InventoryStatusId ?? 1,
                    AvailableQty = 0,
                    ReservedQty = 0,
                    AllocatedQty = 0,
                    CreatedAt = DateTime.UtcNow
                };
                _context.InventoryOnHands.Add(stock);
            }
            return stock;
        }
    }
}
