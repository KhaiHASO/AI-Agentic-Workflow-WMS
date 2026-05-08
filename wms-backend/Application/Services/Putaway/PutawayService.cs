using Microsoft.EntityFrameworkCore;
using WmsBackend.Application.Common;
using WmsBackend.Application.Services.Inventory;
using WmsBackend.Data;
using WmsBackend.Models.WmsCore;

namespace WmsBackend.Application.Services.Putaway
{
    public interface IPutawayService
    {
        Task<ApiResponse<bool>> ConfirmPutawayAsync(int taskId, int actualLocationId, int? userId);
        Task<ApiResponse<IEnumerable<PutawayTask>>> GetTasksAsync(int? warehouseId);
    }

    public class PutawayService : IPutawayService
    {
        private readonly WmsDbContext _context;
        private readonly IInventoryService _inventoryService;

        public PutawayService(WmsDbContext context, IInventoryService inventoryService)
        {
            _context = context;
            _inventoryService = inventoryService;
        }

        public async Task<ApiResponse<bool>> ConfirmPutawayAsync(int taskId, int actualLocationId, int? userId)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var task = await _context.PutawayTasks.Include(t => t.ReceiptHeader).FirstOrDefaultAsync(t => t.Id == taskId);
                if (task == null) return ApiResponse<bool>.FailureResult("Task not found");
                if (task.Status == "Completed") return ApiResponse<bool>.FailureResult("Task already completed");

                // 1. Resolve Staging Location for the Receipt
                // For simplicity, let's assume a default Staging Location (e.g., Id = 1) if not defined
                int stagingLocationId = 1; 

                // 2. Move Inventory from Staging to Actual Location
                var movement = new InventoryMovementRequest
                {
                    WarehouseId = task.ReceiptHeader?.WarehouseId ?? 1,
                    ItemId = task.ItemId,
                    FromLocationId = stagingLocationId,
                    ToLocationId = actualLocationId,
                    Qty = task.Quantity,
                    MovementType = "Putaway",
                    DocumentType = "PutawayTask",
                    DocumentNo = task.TaskNo,
                    UserId = userId
                };

                var invResult = await _inventoryService.RecordMovementAsync(movement);
                if (!invResult.Success) throw new Exception(invResult.Message);

                // 3. Update Task Status
                task.Status = "Completed";
                task.TargetLocationId = actualLocationId;
                task.UpdatedAt = DateTime.UtcNow;
                task.UpdatedBy = userId;

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();

                return ApiResponse<bool>.SuccessResult(true, "Putaway confirmed.");
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                return ApiResponse<bool>.FailureResult("Error confirming putaway: " + ex.Message);
            }
        }

        public async Task<ApiResponse<IEnumerable<PutawayTask>>> GetTasksAsync(int? warehouseId)
        {
            var query = _context.PutawayTasks.Include(t => t.Item).Include(t => t.ReceiptHeader).AsNoTracking();
            if (warehouseId.HasValue) query = query.Where(t => t.ReceiptHeader.WarehouseId == warehouseId);
            
            var result = await query.ToListAsync();
            return ApiResponse<IEnumerable<PutawayTask>>.SuccessResult(result);
        }
    }
}
