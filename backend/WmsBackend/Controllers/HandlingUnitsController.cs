using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WmsBackend.Data;
using WmsBackend.Models.WmsCore;

namespace WmsBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HandlingUnitsController : ControllerBase
    {
        private readonly WmsDbContext _context;

        public HandlingUnitsController(WmsDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<HandlingUnit>>> GetHandlingUnits()
        {
            return await _context.HandlingUnits
                .Include(h => h.Location)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<HandlingUnit>> GetHandlingUnit(int id)
        {
            var hu = await _context.HandlingUnits
                .Include(h => h.Location)
                .FirstOrDefaultAsync(h => h.Id == id);

            if (hu == null) return NotFound();
            return hu;
        }

        [HttpPost]
        public async Task<ActionResult<HandlingUnit>> PostHandlingUnit(HandlingUnit hu)
        {
            _context.HandlingUnits.Add(hu);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetHandlingUnit), new { id = hu.Id }, hu);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutHandlingUnit(int id, HandlingUnit hu)
        {
            if (id != hu.Id) return BadRequest();
            _context.Entry(hu).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HandlingUnitExists(id)) return NotFound();
                throw;
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHandlingUnit(int id)
        {
            var hu = await _context.HandlingUnits.FindAsync(id);
            if (hu == null) return NotFound();
            _context.HandlingUnits.Remove(hu);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private bool HandlingUnitExists(int id)
        {
            return _context.HandlingUnits.Any(e => e.Id == id);
        }
    }
}
