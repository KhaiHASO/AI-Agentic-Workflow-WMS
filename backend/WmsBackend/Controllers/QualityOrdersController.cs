using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WmsBackend.Data;
using WmsBackend.Models.QualityControl;

namespace WmsBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QualityOrdersController : ControllerBase
    {
        private readonly WmsDbContext _context;

        public QualityOrdersController(WmsDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<QualityOrder>>> GetQualityOrders()
        {
            return await _context.QualityOrders
                .Include(q => q.DraftLine)
                .Include(q => q.Item)
                .OrderByDescending(x => x.CreatedAt)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<QualityOrder>> GetQualityOrder(int id)
        {
            var order = await _context.QualityOrders
                .Include(q => q.DraftLine)
                .Include(q => q.Item)
                .FirstOrDefaultAsync(q => q.Id == id);

            if (order == null) return NotFound();
            return order;
        }

        [HttpPost]
        public async Task<ActionResult<QualityOrder>> PostQualityOrder(QualityOrder order)
        {
            _context.QualityOrders.Add(order);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetQualityOrder), new { id = order.Id }, order);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutQualityOrder(int id, QualityOrder order)
        {
            if (id != order.Id) return BadRequest();
            _context.Entry(order).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QualityOrderExists(id)) return NotFound();
                throw;
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQualityOrder(int id)
        {
            var order = await _context.QualityOrders.FindAsync(id);
            if (order == null) return NotFound();
            _context.QualityOrders.Remove(order);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private bool QualityOrderExists(int id)
        {
            return _context.QualityOrders.Any(e => e.Id == id);
        }
    }
}
