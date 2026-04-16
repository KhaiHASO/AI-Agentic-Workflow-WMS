using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WmsBackend.Data;
using WmsBackend.Models.IntegrationAudit;

namespace WmsBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class IntegrationAuditController : ControllerBase
    {
        private readonly WmsDbContext _context;

        public IntegrationAuditController(WmsDbContext context)
        {
            _context = context;
        }

        [HttpGet("api-logs")]
        public async Task<ActionResult<IEnumerable<ApiCallLog>>> GetApiLogs()
        {
            return await _context.ApiCallLogs.OrderByDescending(l => l.Timestamp).Take(100).ToListAsync();
        }

        [HttpGet("outbox")]
        public async Task<ActionResult<IEnumerable<IntegrationOutbox>>> GetOutbox()
        {
            return await _context.IntegrationOutboxes.OrderByDescending(o => o.CreatedAt).Take(100).ToListAsync();
        }
    }
}
