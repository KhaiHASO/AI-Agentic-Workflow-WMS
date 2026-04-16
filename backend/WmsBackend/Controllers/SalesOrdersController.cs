using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WmsBackend.Data;
using WmsBackend.Models.ErpStage;

namespace WmsBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalesOrdersController : ControllerBase
    {
        private readonly WmsDbContext _context;

        public SalesOrdersController(WmsDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ErpSalesOrderHeader>>> GetSalesOrders()
        {
            return await _context.ErpSalesOrderHeaders
                .Include(s => s.Customer)
                .Include(s => s.Lines)
                    .ThenInclude(l => l.Item)
                .Include(s => s.Lines)
                    .ThenInclude(l => l.Uom)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ErpSalesOrderHeader>> GetSalesOrder(int id)
        {
            var so = await _context.ErpSalesOrderHeaders
                .Include(s => s.Customer)
                .Include(s => s.Lines)
                    .ThenInclude(l => l.Item)
                .Include(s => s.Lines)
                    .ThenInclude(l => l.Uom)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (so == null) return NotFound();
            return so;
        }

        [HttpPost]
        public async Task<ActionResult<ErpSalesOrderHeader>> PostSalesOrder(ErpSalesOrderHeader so)
        {
            _context.ErpSalesOrderHeaders.Add(so);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetSalesOrder), new { id = so.Id }, so);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutSalesOrder(int id, ErpSalesOrderHeader so)
        {
            if (id != so.Id) return BadRequest();
            _context.Entry(so).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SalesOrderExists(id)) return NotFound();
                throw;
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSalesOrder(int id)
        {
            var so = await _context.ErpSalesOrderHeaders.FindAsync(id);
            if (so == null) return NotFound();
            _context.ErpSalesOrderHeaders.Remove(so);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private bool SalesOrderExists(int id)
        {
            return _context.ErpSalesOrderHeaders.Any(e => e.Id == id);
        }
    }
}
