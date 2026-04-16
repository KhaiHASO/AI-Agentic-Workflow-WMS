using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WmsBackend.Data;
using WmsBackend.Models.Mdm;

namespace WmsBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationsController : ControllerBase
    {
        private readonly WmsDbContext _context;
        public LocationsController(WmsDbContext context) { _context = context; }

        [HttpGet] 
        public async Task<ActionResult<IEnumerable<Location>>> Get() => 
            await _context.Locations
                .Include(l => l.Warehouse)
                .Include(l => l.Zone)
                .ToListAsync();

        [HttpPost] public async Task<ActionResult<Location>> Post(Location location) { _context.Locations.Add(location); await _context.SaveChangesAsync(); return Ok(location); }

        // FIX: Cấu hình lại Route để đảm bảo ID được nhận diện đúng
        [HttpPost("toggle-status/{id}")]
        public async Task<IActionResult> ToggleStatus(int id)
        {
            var loc = await _context.Locations.FirstOrDefaultAsync(l => l.Id == id);
            if (loc == null) {
                return NotFound(new { message = $"Location with ID {id} not found." });
            }
            
            loc.Status = (loc.Status == "Active") ? "Locked" : "Active";
            await _context.SaveChangesAsync();
            
            return Ok(new { id = loc.Id, status = loc.Status, code = loc.Code });
        }

        [HttpGet("print-label/{id}")]
        public async Task<IActionResult> PrintLabel(int id)
        {
            var loc = await _context.Locations.FindAsync(id);
            if (loc == null) return NotFound();

            var labelData = new {
                locationCode = loc.Code,
                barcode = $"LOC{loc.Id:D6}",
                timestamp = DateTime.UtcNow,
                warehouse = "WH-MAIN",
                printJobId = Guid.NewGuid().ToString().Substring(0, 8).ToUpper()
            };

            return Ok(labelData);
        }
    }
}
