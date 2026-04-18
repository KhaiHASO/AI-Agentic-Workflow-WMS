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

        public InboundReceiptsController(WmsDbContext context) => _context = context;

        // GET: api/InboundReceipts?warehouseId=1
        [HttpGet]
        public async Task<ActionResult<IEnumerable<InboundReceiptHeader>>> GetReceipts(int warehouseId)
        {
            return await _context.InboundReceiptHeaders
                .Where(h => h.WarehouseId == warehouseId)
                .Include(h => h.Supplier)
                .OrderByDescending(h => h.CreatedAt)
                .ToListAsync();
        }

        // POST: api/InboundReceipts/FromPO/5
        [HttpPost("FromPO/{poHeaderId}")]
        public async Task<IActionResult> CreateFromPO(int poHeaderId)
        {
            var po = await _context.ErpPurchaseOrderHeaders
                .Include(h => h.Lines)
                .FirstOrDefaultAsync(h => h.Id == poHeaderId);

            if (po == null) return NotFound("Không tìm thấy đơn PO");

            var receipt = new InboundReceiptHeader
            {
                ReceiptNo = "RECV-" + DateTime.Now.Ticks.ToString().Substring(10),
                SupplierId = po.SupplierId,
                WarehouseId = po.WarehouseId,
                Status = "Draft",
                CreatedAt = DateTime.UtcNow
            };

            foreach (var poLine in po.Lines.Where(l => l.OpenQty > 0))
            {
                receipt.Lines.Add(new DraftLine
                {
                    PoLineId = poLine.Id,
                    ItemId = poLine.ItemId,
                    UomId = poLine.UomId,
                    ExpectedQty = poLine.OpenQty,
                    Status = "New"
                });
            }

            _context.InboundReceiptHeaders.Add(receipt);
            await _context.SaveChangesAsync();

            return Ok(receipt);
        }

        // PUT: api/InboundReceipts/5/Confirm
        [HttpPut("{id}/Confirm")]
        public async Task<IActionResult> ConfirmReceipt(int id)
        {
            var receipt = await _context.InboundReceiptHeaders
                .Include(h => h.Lines)
                .FirstOrDefaultAsync(h => h.Id == id);

            if (receipt == null) return NotFound();
            
            receipt.Status = "Completed";
            // Logic tạo PutawayTask tự động sẽ viết ở đây...
            
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
