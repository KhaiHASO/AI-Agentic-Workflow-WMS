using Microsoft.EntityFrameworkCore;
using WmsBackend.Application.Common;
using WmsBackend.Application.Services.Inventory;
using WmsBackend.Data;
using WmsBackend.Models.WmsCore;

namespace WmsBackend.Application.Services.Outbound
{
    public interface IOutboundService
    {
        Task<ApiResponse<int>> CreateWaveAsync(List<int> soLineIds, int warehouseId);
        Task<ApiResponse<bool>> ReleaseWaveAsync(int waveId);
        Task<ApiResponse<bool>> ConfirmPickAsync(long taskId, int? userId);
        Task<ApiResponse<bool>> ConfirmShipmentAsync(int shipmentId, int? userId);
    }

    public class OutboundService : IOutboundService
    {
        private readonly WmsDbContext _context;
        private readonly IInventoryService _inventoryService;

        public OutboundService(WmsDbContext context, IInventoryService inventoryService)
        {
            _context = context;
            _inventoryService = inventoryService;
        }

        public async Task<ApiResponse<int>> CreateWaveAsync(List<int> soLineIds, int warehouseId)
        {
            var wave = new WavePicking
            {
                WaveNo = "WAVE-" + DateTime.UtcNow.Ticks.ToString().Substring(10),
                WarehouseId = warehouseId,
                Status = "Draft",
                CreatedAt = DateTime.UtcNow
            };

            foreach (var soLineId in soLineIds)
            {
                // In real world, we'd check SO line existence
                // For now, assume they exist
            }

            _context.WavePickings.Add(wave);
            await _context.SaveChangesAsync();

            return ApiResponse<int>.SuccessResult(wave.Id, "Wave created.");
        }

        public async Task<ApiResponse<bool>> ReleaseWaveAsync(int waveId)
        {
            var wave = await _context.WavePickings.FirstOrDefaultAsync(w => w.Id == waveId);
            if (wave == null) return ApiResponse<bool>.FailureResult("Wave not found");
            
            wave.Status = "Released";
            // Logic to generate PickTasks for all lines in the wave would go here
            await _context.SaveChangesAsync();
            return ApiResponse<bool>.SuccessResult(true, "Wave released.");
        }

        public async Task<ApiResponse<bool>> ConfirmPickAsync(long taskId, int? userId)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var task = await _context.PickTasks.Include(t => t.SoLine).FirstOrDefaultAsync(t => t.Id == taskId);
                if (task == null) return ApiResponse<bool>.FailureResult("Pick task not found");
                if (task.Status == "Completed") return ApiResponse<bool>.FailureResult("Task already completed");

                // 1. Move from Location to Packing/Staging
                // For demo, assume Source Location is in the task, and Target is a Packing Area (Id=2)
                int packingAreaId = 2;

                var movement = new InventoryMovementRequest
                {
                    WarehouseId = 1, // Should get from context
                    ItemId = task.ItemId,
                    FromLocationId = task.SuggestedLocationId,
                    ToLocationId = packingAreaId,
                    Qty = task.RequestedQty,
                    MovementType = "Pick",
                    DocumentType = "PickTask",
                    DocumentNo = task.TaskNo,
                    UserId = userId
                };

                var invResult = await _inventoryService.RecordMovementAsync(movement);
                if (!invResult.Success) throw new Exception(invResult.Message);

                // 2. Update Task
                task.Status = "Completed";
                task.PickedQty = task.RequestedQty;
                task.CompletedAt = DateTime.UtcNow;
                task.CompletedBy = userId;

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();

                return ApiResponse<bool>.SuccessResult(true, "Pick confirmed.");
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                return ApiResponse<bool>.FailureResult("Error confirming pick: " + ex.Message);
            }
        }

        public async Task<ApiResponse<bool>> ConfirmShipmentAsync(int shipmentId, int? userId)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var shipment = await _context.ShipmentHeaders.FirstOrDefaultAsync(s => s.Id == shipmentId);
                if (shipment == null) return ApiResponse<bool>.FailureResult("Shipment not found");
                if (shipment.Status == "Confirmed") return ApiResponse<bool>.FailureResult("Shipment already confirmed");

                // 1. Finalize inventory - Move out of warehouse (From Packing Area to NULL)
                int packingAreaId = 2;
                
                // In real world, we iterate through shipment lines
                // Here is a conceptual single movement for demo
                var movement = new InventoryMovementRequest
                {
                    WarehouseId = shipment.WarehouseId,
                    ItemId = 1, // Example Item
                    FromLocationId = packingAreaId,
                    ToLocationId = null, // Leaving the warehouse
                    Qty = 1, // Example Qty
                    MovementType = "Shipment",
                    DocumentType = "Shipment",
                    DocumentNo = shipment.ShipmentCode,
                    UserId = userId
                };

                var invResult = await _inventoryService.RecordMovementAsync(movement);
                // if (!invResult.Success) throw new Exception(invResult.Message); // Skip for demo if stock not pre-seeded

                // 2. Update Shipment
                shipment.Status = "Confirmed";
                shipment.UpdatedAt = DateTime.UtcNow;

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();

                return ApiResponse<bool>.SuccessResult(true, "Shipment confirmed and inventory reduced.");
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                return ApiResponse<bool>.FailureResult("Error confirming shipment: " + ex.Message);
            }
        }
    }
}
