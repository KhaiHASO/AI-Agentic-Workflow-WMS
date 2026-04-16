using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WmsBackend.Data;
using WmsBackend.Models.WmsCore;

namespace WmsBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InboundReceiptsController : ControllerBase
    {
        private readonly WmsDbContext _context;

        public InboundReceiptsController(WmsDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<InboundReceiptHeader>>> GetInboundReceipts()
        {
            return await _context.InboundReceiptHeaders
                .Include(h => h.Supplier)
                .Include(h => h.Lines)
                    .ThenInclude(l => l.Item)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<InboundReceiptHeader>> GetInboundReceipt(int id)
        {
            var receipt = await _context.InboundReceiptHeaders
                .Include(h => h.Supplier)
                .Include(h => h.Lines)
                    .ThenInclude(l => l.Item)
                .FirstOrDefaultAsync(h => h.Id == id);

            if (receipt == null) return NotFound();
            return receipt;
        }

        [HttpPost]
        public async Task<ActionResult<InboundReceiptHeader>> PostInboundReceipt(InboundReceiptHeader receipt)
        {
            _context.InboundReceiptHeaders.Add(receipt);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetInboundReceipt), new { id = receipt.Id }, receipt);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutInboundReceipt(int id, InboundReceiptHeader receipt)
        {
            if (id != receipt.Id) return BadRequest();
            _context.Entry(receipt).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InboundReceiptExists(id)) return NotFound();
                throw;
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInboundReceipt(int id)
        {
            var receipt = await _context.InboundReceiptHeaders.FindAsync(id);
            if (receipt == null) return NotFound();
            _context.InboundReceiptHeaders.Remove(receipt);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private bool InboundReceiptExists(int id)
        {
            return _context.InboundReceiptHeaders.Any(e => e.Id == id);
        }
    }
}
