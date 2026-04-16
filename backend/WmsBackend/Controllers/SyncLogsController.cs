using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WmsBackend.Data;
using WmsBackend.Models.IntegrationAudit;

namespace WmsBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SyncLogsController : ControllerBase
    {
        private readonly WmsDbContext _context;
        public SyncLogsController(WmsDbContext context) { _context = context; }

        [HttpGet("outbox")]
        public async Task<ActionResult<IEnumerable<IntegrationOutbox>>> GetOutbox() => 
            await _context.IntegrationOutboxes.OrderByDescending(x => x.CreatedAt).Take(100).ToListAsync();

        [HttpGet("api-calls")]
        public async Task<ActionResult<IEnumerable<ApiCallLog>>> GetApiCalls() => 
            await _context.ApiCallLogs.OrderByDescending(x => x.Timestamp).Take(100).ToListAsync();

        [HttpPost("retry/{id}")]
        public async Task<IActionResult> Retry(long id)
        {
            var msg = await _context.IntegrationOutboxes.FindAsync(id);
            if (msg == null) return NotFound();

            msg.Status = "Pending";
            msg.RetryCount += 1;
            msg.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            return Ok(new { message = "Message re-queued for synchronization" });
        }
    }
}
