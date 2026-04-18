using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WmsBackend.Data;
using WmsBackend.Models.WmsCore;

namespace WmsBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PickTasksController : ControllerBase
    {
        private readonly WmsDbContext _context;

        public PickTasksController(WmsDbContext context) => _context = context;

        // GET: api/PickTasks/Pending?warehouseId=1
        [HttpGet("Pending")]
        public async Task<ActionResult> GetPendingTasks(int warehouseId)
        {
            // Tận dụng Global Query Filter (Status != Deleted)
            return Ok(await _context.PickTasks
                .Include(t => t.Item)
                .Include(t => t.SuggestedLocation)
                .Where(t => t.Status == "Pending")
                .ToListAsync());
        }

        // PUT: api/PickTasks/5/Confirm
        [HttpPut("{id}/Confirm")]
        public async Task<IActionResult> ConfirmPick(long id, [FromBody] decimal actualQty, int userId)
        {
            var task = await _context.PickTasks.FindAsync(id);
            if (task == null) return NotFound();

            if (task.Status == "Completed") return BadRequest("Task đã hoàn thành trước đó.");

            try 
            {
                task.PickedQty = actualQty;
                task.Status = "Completed";
                task.CompletedBy = userId;
                task.CompletedAt = DateTime.UtcNow;

                await _context.SaveChangesAsync();
                return Ok(new { message = "Xác nhận nhặt hàng thành công" });
            }
            catch (DbUpdateConcurrencyException)
            {
                return Conflict("Dữ liệu đã bị thay đổi bởi người khác. Vui lòng tải lại trang.");
            }
        }
    }
}
