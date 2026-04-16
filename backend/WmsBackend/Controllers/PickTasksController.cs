using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WmsBackend.Data;
using WmsBackend.Models.WmsCore;

namespace WmsBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PickTasksController : ControllerBase
    {
        private readonly WmsDbContext _context;

        public PickTasksController(WmsDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PickTask>>> GetPickTasks()
        {
            return await _context.PickTasks
                .Include(p => p.SoLine)
                .Include(p => p.SuggestedLocation)
                .Include(p => p.Item)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PickTask>> GetPickTask(long id)
        {
            var task = await _context.PickTasks
                .Include(p => p.SoLine)
                .Include(p => p.SuggestedLocation)
                .Include(p => p.Item)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (task == null) return NotFound();
            return task;
        }

        [HttpPost]
        public async Task<ActionResult<PickTask>> PostPickTask(PickTask task)
        {
            _context.PickTasks.Add(task);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetPickTask), new { id = task.Id }, task);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutPickTask(long id, PickTask task)
        {
            if (id != task.Id) return BadRequest();
            _context.Entry(task).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PickTaskExists(id)) return NotFound();
                throw;
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePickTask(long id)
        {
            var task = await _context.PickTasks.FindAsync(id);
            if (task == null) return NotFound();
            _context.PickTasks.Remove(task);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private bool PickTaskExists(long id)
        {
            return _context.PickTasks.Any(e => e.Id == id);
        }
    }
}
