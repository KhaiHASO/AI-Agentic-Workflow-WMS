using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WmsBackend.Data;
using WmsBackend.Models.WmsCore;

namespace WmsBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventoryController : ControllerBase
    {
        private readonly WmsDbContext _context;

        public InventoryController(WmsDbContext context) => _context = context;

        // GET: api/Inventory/OnHand?warehouseId=1&itemId=5
        [HttpGet("OnHand")]
        public async Task<ActionResult> GetOnHand(int warehouseId, int? itemId)
        {
            var query = _context.InventoryOnHands
                .Include(i => i.Item)
                .Include(i => i.Location)
                .Where(i => i.WarehouseId == warehouseId);

            if (itemId.HasValue) query = query.Where(i => i.ItemId == itemId);

            return Ok(await query.ToListAsync());
        }

        // GET: api/Inventory/Ledger?itemId=5
        [HttpGet("Ledger")]
        public async Task<ActionResult> GetLedger(int itemId)
        {
            return Ok(await _context.InventoryLedgers
                .Where(l => l.ItemId == itemId)
                .OrderByDescending(l => l.Timestamp)
                .Take(100)
                .ToListAsync());
        }
    }
}
