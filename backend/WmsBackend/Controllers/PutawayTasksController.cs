using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WmsBackend.Data;
using WmsBackend.Models.WmsCore;

namespace WmsBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PutawayTasksController : ControllerBase
    {
        private readonly WmsDbContext _context;

        public PutawayTasksController(WmsDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PutawayTask>>> GetPutawayTasks()
        {
            return await _context.PutawayTasks
                .Include(p => p.ReceiptHeader)
                .Include(p => p.Item)
                .Include(p => p.HandlingUnit)
                .Include(p => p.TargetLocation)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PutawayTask>> GetPutawayTask(long id)
        {
            var task = await _context.PutawayTasks
                .Include(p => p.ReceiptHeader)
                .Include(p => p.Item)
                .Include(p => p.HandlingUnit)
                .Include(p => p.TargetLocation)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (task == null) return NotFound();
            return task;
        }

        [HttpPost]
        public async Task<ActionResult<PutawayTask>> PostPutawayTask(PutawayTask task)
        {
            _context.PutawayTasks.Add(task);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetPutawayTask), new { id = task.Id }, task);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutPutawayTask(long id, PutawayTask task)
        {
            if (id != task.Id) return BadRequest();
            _context.Entry(task).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PutawayTaskExists(id)) return NotFound();
                throw;
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePutawayTask(long id)
        {
            var task = await _context.PutawayTasks.FindAsync(id);
            if (task == null) return NotFound();
            _context.PutawayTasks.Remove(task);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private bool PutawayTaskExists(long id)
        {
            return _context.PutawayTasks.Any(e => e.Id == id);
        }
    }
}
