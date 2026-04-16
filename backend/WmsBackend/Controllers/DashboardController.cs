using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WmsBackend.Data;

namespace WmsBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class DashboardController : ControllerBase
    {
        private readonly WmsDbContext _context;

        public DashboardController(WmsDbContext context)
        {
            _context = context;
        }

        [HttpGet("summary")]
        public async Task<IActionResult> GetSummary()
        {
            // Worker Stats
            var pendingPutaway = await _context.PutawayTasks.CountAsync(t => t.Status == "Pending");
            var pendingPick = await _context.PickTasks.CountAsync(t => t.Status == "Open");

            // Supervisor & QC Stats
            var qaHoldItems = await _context.InventoryOnHands.CountAsync(i => i.InventoryStatus.StatusCode == "QA Hold");
            var shortagePOs = await _context.ErpPurchaseOrderHeaders.CountAsync(h => h.ErpStatus == "Open");

            // Admin Stats
            var apiErrors = await _context.ApiCallLogs.CountAsync(l => l.StatusCode >= 400);
            var usersCount = await _context.Users.CountAsync();

            return Ok(new
            {
                worker = new { pendingPutaway, pendingPick },
                supervisor = new { qaHoldItems, openPOs = shortagePOs },
                qc = new { itemsToInspect = qaHoldItems },
                accountant = new { shipmentsPending = await _context.ShipmentHeaders.CountAsync(s => s.Status == "Pending") },
                admin = new { apiErrors, totalUsers = usersCount }
            });
        }
    }
}
