using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WmsBackend.Data;
using WmsBackend.Models.QualityControl;

namespace WmsBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CycleCountsController : ControllerBase
    {
        private readonly WmsDbContext _context;

        public CycleCountsController(WmsDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CycleCountLine>>> GetLines()
        {
            return await _context.CycleCountLines
                .Include(l => l.Location)
                .Include(l => l.Item)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CycleCountLine>> GetLine(long id)
        {
            var line = await _context.CycleCountLines
                .Include(l => l.Location)
                .Include(l => l.Item)
                .FirstOrDefaultAsync(l => l.Id == id);

            if (line == null) return NotFound();
            return line;
        }

        [HttpPost]
        public async Task<ActionResult<CycleCountLine>> PostLine(CycleCountLine line)
        {
            _context.CycleCountLines.Add(line);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetLine), new { id = line.Id }, line);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutLine(long id, CycleCountLine line)
        {
            if (id != line.Id) return BadRequest();
            _context.Entry(line).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LineExists(id)) return NotFound();
                throw;
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLine(long id)
        {
            var line = await _context.CycleCountLines.FindAsync(id);
            if (line == null) return NotFound();
            _context.CycleCountLines.Remove(line);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private bool LineExists(long id)
        {
            return _context.CycleCountLines.Any(e => e.Id == id);
        }
    }
}
