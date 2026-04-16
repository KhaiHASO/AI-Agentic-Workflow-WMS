using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WmsBackend.Data;
using WmsBackend.Models.WmsCore;

namespace WmsBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LedgerController : ControllerBase
    {
        private readonly WmsDbContext _context;

        public LedgerController(WmsDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<InventoryLedger>>> GetLedger()
        {
            return await _context.InventoryLedgers
                .Include(l => l.Item)
                .Include(l => l.FromLocation)
                .Include(l => l.ToLocation)
                .OrderByDescending(x => x.Timestamp)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<InventoryLedger>> GetLedgerEntry(long id)
        {
            var entry = await _context.InventoryLedgers
                .Include(l => l.Item)
                .Include(l => l.FromLocation)
                .Include(l => l.ToLocation)
                .FirstOrDefaultAsync(l => l.Id == id);

            if (entry == null) return NotFound();
            return entry;
        }
    }
}
