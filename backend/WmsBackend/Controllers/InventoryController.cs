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
        public InventoryController(WmsDbContext context) { _context = context; }

        [HttpGet] 
        public async Task<ActionResult<IEnumerable<InventoryOnHand>>> Get() => 
            await _context.InventoryOnHands
                .Include(i => i.Item)
                .Include(i => i.InventoryStatus)
                .Include(i => i.Location)
                .ToListAsync();

        [HttpPost] public async Task<ActionResult<InventoryOnHand>> Post(InventoryOnHand inventory) { _context.InventoryOnHands.Add(inventory); await _context.SaveChangesAsync(); return Ok(inventory); }
    }
}
