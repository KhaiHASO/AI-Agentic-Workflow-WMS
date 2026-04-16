using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WmsBackend.Data;
using WmsBackend.Models.Mdm;

namespace WmsBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ZonesController : ControllerBase
    {
        private readonly WmsDbContext _context;

        public ZonesController(WmsDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Zone>>> GetZones()
        {
            return await _context.Zones.Include(z => z.Warehouse).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Zone>> GetZone(int id)
        {
            var zone = await _context.Zones.Include(z => z.Warehouse).FirstOrDefaultAsync(z => z.Id == id);
            if (zone == null) return NotFound();
            return zone;
        }

        [HttpPost]
        public async Task<ActionResult<Zone>> PostZone(Zone zone)
        {
            _context.Zones.Add(zone);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetZone), new { id = zone.Id }, zone);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutZone(int id, Zone zone)
        {
            if (id != zone.Id) return BadRequest();
            _context.Entry(zone).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ZoneExists(id)) return NotFound();
                throw;
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteZone(int id)
        {
            var zone = await _context.Zones.FindAsync(id);
            if (zone == null) return NotFound();
            _context.Zones.Remove(zone);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private bool ZoneExists(int id)
        {
            return _context.Zones.Any(e => e.Id == id);
        }
    }
}
