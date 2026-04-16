using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WmsBackend.Data;
using WmsBackend.Models.QualityControl;

namespace WmsBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CycleCountSessionsController : ControllerBase
    {
        private readonly WmsDbContext _context;

        public CycleCountSessionsController(WmsDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CycleCountSession>>> GetSessions()
        {
            return await _context.CycleCountSessions
                .Include(s => s.Zone)
                .Include(s => s.Lines)
                    .ThenInclude(l => l.Location)
                .Include(s => s.Lines)
                    .ThenInclude(l => l.Item)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CycleCountSession>> GetSession(int id)
        {
            var session = await _context.CycleCountSessions
                .Include(s => s.Zone)
                .Include(s => s.Lines)
                    .ThenInclude(l => l.Location)
                .Include(s => s.Lines)
                    .ThenInclude(l => l.Item)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (session == null) return NotFound();
            return session;
        }

        [HttpPost]
        public async Task<ActionResult<CycleCountSession>> PostSession(CycleCountSession session)
        {
            _context.CycleCountSessions.Add(session);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetSession), new { id = session.Id }, session);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutSession(int id, CycleCountSession session)
        {
            if (id != session.Id) return BadRequest();
            _context.Entry(session).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SessionExists(id)) return NotFound();
                throw;
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSession(int id)
        {
            var session = await _context.CycleCountSessions.FindAsync(id);
            if (session == null) return NotFound();
            _context.CycleCountSessions.Remove(session);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private bool SessionExists(int id)
        {
            return _context.CycleCountSessions.Any(e => e.Id == id);
        }
    }
}
