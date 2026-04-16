using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WmsBackend.Data;
using WmsBackend.Models.Mdm;

namespace WmsBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UomsController : ControllerBase
    {
        private readonly WmsDbContext _context;

        public UomsController(WmsDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Uom>>> GetUoms()
        {
            return await _context.Uoms.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Uom>> GetUom(int id)
        {
            var uom = await _context.Uoms.FindAsync(id);
            if (uom == null) return NotFound();
            return uom;
        }

        [HttpPost]
        public async Task<ActionResult<Uom>> PostUom(Uom uom)
        {
            _context.Uoms.Add(uom);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetUom), new { id = uom.Id }, uom);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutUom(int id, Uom uom)
        {
            if (id != uom.Id) return BadRequest();
            _context.Entry(uom).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UomExists(id)) return NotFound();
                throw;
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUom(int id)
        {
            var uom = await _context.Uoms.FindAsync(id);
            if (uom == null) return NotFound();
            _context.Uoms.Remove(uom);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private bool UomExists(int id)
        {
            return _context.Uoms.Any(e => e.Id == id);
        }
    }
}
