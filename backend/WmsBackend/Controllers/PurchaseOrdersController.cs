using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WmsBackend.Data;
using WmsBackend.Models.ErpStage;

namespace WmsBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PurchaseOrdersController : ControllerBase
    {
        private readonly WmsDbContext _context;

        public PurchaseOrdersController(WmsDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ErpPurchaseOrderHeader>>> GetPurchaseOrders()
        {
            return await _context.ErpPurchaseOrderHeaders
                .Include(p => p.Supplier)
                .Include(p => p.Lines)
                    .ThenInclude(l => l.Item)
                .Include(p => p.Lines)
                    .ThenInclude(l => l.Uom)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ErpPurchaseOrderHeader>> GetPurchaseOrder(int id)
        {
            var po = await _context.ErpPurchaseOrderHeaders
                .Include(p => p.Supplier)
                .Include(p => p.Lines)
                    .ThenInclude(l => l.Item)
                .Include(p => p.Lines)
                    .ThenInclude(l => l.Uom)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (po == null) return NotFound();
            return po;
        }

        [HttpPost]
        public async Task<ActionResult<ErpPurchaseOrderHeader>> PostPurchaseOrder(ErpPurchaseOrderHeader po)
        {
            _context.ErpPurchaseOrderHeaders.Add(po);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetPurchaseOrder), new { id = po.Id }, po);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutPurchaseOrder(int id, ErpPurchaseOrderHeader po)
        {
            if (id != po.Id) return BadRequest();
            _context.Entry(po).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PurchaseOrderExists(id)) return NotFound();
                throw;
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePurchaseOrder(int id)
        {
            var po = await _context.ErpPurchaseOrderHeaders.FindAsync(id);
            if (po == null) return NotFound();
            _context.ErpPurchaseOrderHeaders.Remove(po);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private bool PurchaseOrderExists(int id)
        {
            return _context.ErpPurchaseOrderHeaders.Any(e => e.Id == id);
        }
    }
}
