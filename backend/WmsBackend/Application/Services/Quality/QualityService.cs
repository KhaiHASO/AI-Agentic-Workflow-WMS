using Microsoft.EntityFrameworkCore;
using WmsBackend.Application.Common;
using WmsBackend.Data;
using WmsBackend.Models.QualityControl;

namespace WmsBackend.Application.Services.Quality
{
    public interface IQualityService
    {
        Task<ApiResponse<bool>> SubmitCycleCountAsync(int sessionId, int? userId);
        Task<ApiResponse<bool>> RecordQualityResultAsync(int orderId, string result, int? userId);
    }

    public class QualityService : IQualityService
    {
        private readonly WmsDbContext _context;

        public QualityService(WmsDbContext context)
        {
            _context = context;
        }

        public async Task<ApiResponse<bool>> SubmitCycleCountAsync(int sessionId, int? userId)
        {
            var session = await _context.CycleCountSessions.Include(s => s.Lines).FirstOrDefaultAsync(s => s.Id == sessionId);
            if (session == null) return ApiResponse<bool>.FailureResult("Session not found");
            
            session.Status = "Submitted";
            session.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return ApiResponse<bool>.SuccessResult(true, "Cycle count submitted.");
        }

        public async Task<ApiResponse<bool>> RecordQualityResultAsync(int orderId, string result, int? userId)
        {
            var order = await _context.QualityOrders.FirstOrDefaultAsync(o => o.Id == orderId);
            if (order == null) return ApiResponse<bool>.FailureResult("Quality order not found");
            
            order.Status = result == "Pass" ? "Accepted" : "Rejected";
            order.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return ApiResponse<bool>.SuccessResult(true, "Quality result recorded.");
        }
    }
}
