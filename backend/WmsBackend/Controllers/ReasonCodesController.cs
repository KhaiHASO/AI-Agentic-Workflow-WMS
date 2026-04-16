using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WmsBackend.Data;
using WmsBackend.Models.Mdm;

namespace WmsBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReasonCodesController : ControllerBase
    {
        private readonly WmsDbContext _context;

        public ReasonCodesController(WmsDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ReasonCode>>> GetReasonCodes()
        {
            return await _context.ReasonCodes.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ReasonCode>> GetReasonCode(int id)
        {
            var code = await _context.ReasonCodes.FindAsync(id);
            if (code == null) return NotFound();
            return code;
        }

        [HttpPost]
        public async Task<ActionResult<ReasonCode>> PostReasonCode(ReasonCode code)
        {
            _context.ReasonCodes.Add(code);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetReasonCode), new { id = code.Id }, code);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutReasonCode(int id, ReasonCode code)
        {
            if (id != code.Id) return BadRequest();
            _context.Entry(code).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReasonCodeExists(id)) return NotFound();
                throw;
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReasonCode(int id)
        {
            var code = await _context.ReasonCodes.FindAsync(id);
            if (code == null) return NotFound();
            _context.ReasonCodes.Remove(code);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private bool ReasonCodeExists(int id)
        {
            return _context.ReasonCodes.Any(e => e.Id == id);
        }
    }
}
