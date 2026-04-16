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

            var existingHeader = await _context.InboundReceiptHeaders
                .Include(h => h.Lines)
                .FirstOrDefaultAsync(h => h.Id == id);

            if (existingHeader == null) return NotFound();

            // Update header fields
            existingHeader.Status = receipt.Status;
            existingHeader.VehicleNo = receipt.VehicleNo;
            existingHeader.SupplierId = receipt.SupplierId;

            // Simple update strategy for lines: 
            // In this scenario, we replace or update existing ones.
            // For a robust WMS, we'd match by ID, but here we can simplify:
            foreach (var incomingLine in receipt.Lines)
            {
                var existingLine = existingHeader.Lines.FirstOrDefault(l => l.Id == incomingLine.Id && l.Id != 0);
                if (existingLine != null)
                {
                    // Update existing line
                    _context.Entry(existingLine).CurrentValues.SetValues(incomingLine);
                }
                else
                {
                    // Add new line
                    existingHeader.Lines.Add(incomingLine);
                }
            }

            // Optional: Remove lines that are not in the incoming request
            var incomingIds = receipt.Lines.Select(l => l.Id).ToList();
            var linesToRemove = existingHeader.Lines.Where(l => !incomingIds.Contains(l.Id) && l.Id != 0).ToList();
            foreach (var line in linesToRemove)
            {
                _context.DraftLines.Remove(line);
            }

            try
            {
                await _context.SaveChangesAsync();
                
                // If status changed to Received, we could trigger Inventory/Putaway logic here
                if (receipt.Status == "Received")
                {
                    await ProcessInventoryOnReceipt(existingHeader);
                }
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InboundReceiptExists(id)) return NotFound();
                throw;
            }
            return NoContent();
        }

        private async Task ProcessInventoryOnReceipt(InboundReceiptHeader header)
        {
            // Simple logic: Create Putaway Tasks for each received line
            foreach (var line in header.Lines.Where(l => l.ReceivedQty > 0))
            {
                var task = new PutawayTask
                {
                    TaskNo = $"PT-{Guid.NewGuid().ToString().Substring(0, 8)}",
                    ReceiptHeaderId = header.Id,
                    ItemId = line.ItemId,
                    Quantity = line.ReceivedQty,
                    Status = "Open"
                };
                _context.PutawayTasks.Add(task);
            }
            await _context.SaveChangesAsync();
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
