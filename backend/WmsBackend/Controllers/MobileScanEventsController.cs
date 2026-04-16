using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WmsBackend.Data;
using WmsBackend.Models.IntegrationAudit;

namespace WmsBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MobileScanEventsController : ControllerBase
    {
        private readonly WmsDbContext _context;

        public MobileScanEventsController(WmsDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MobileScanEvent>>> GetScanEvents()
        {
            return await _context.MobileScanEvents.OrderByDescending(e => e.ScanTime).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MobileScanEvent>> GetScanEvent(long id)
        {
            var scanEvent = await _context.MobileScanEvents.FindAsync(id);
            if (scanEvent == null) return NotFound();
            return scanEvent;
        }

        [HttpPost]
        public async Task<ActionResult<MobileScanEvent>> PostScanEvent(MobileScanEvent scanEvent)
        {
            _context.MobileScanEvents.Add(scanEvent);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetScanEvent), new { id = scanEvent.Id }, scanEvent);
        }
    }
}
