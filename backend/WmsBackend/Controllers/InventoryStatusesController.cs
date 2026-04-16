using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WmsBackend.Data;
using WmsBackend.Models.Mdm;

namespace WmsBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventoryStatusesController : ControllerBase
    {
        private readonly WmsDbContext _context;

        public InventoryStatusesController(WmsDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<InventoryStatus>>> GetInventoryStatuses()
        {
            return await _context.InventoryStatuses.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<InventoryStatus>> GetInventoryStatus(int id)
        {
            var status = await _context.InventoryStatuses.FindAsync(id);
            if (status == null) return NotFound();
            return status;
        }

        [HttpPost]
        public async Task<ActionResult<InventoryStatus>> PostInventoryStatus(InventoryStatus status)
        {
            _context.InventoryStatuses.Add(status);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetInventoryStatus), new { id = status.Id }, status);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutInventoryStatus(int id, InventoryStatus status)
        {
            if (id != status.Id) return BadRequest();
            _context.Entry(status).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InventoryStatusExists(id)) return NotFound();
                throw;
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInventoryStatus(int id)
        {
            var status = await _context.InventoryStatuses.FindAsync(id);
            if (status == null) return NotFound();
            _context.InventoryStatuses.Remove(status);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private bool InventoryStatusExists(int id)
        {
            return _context.InventoryStatuses.Any(e => e.Id == id);
        }
    }
}
