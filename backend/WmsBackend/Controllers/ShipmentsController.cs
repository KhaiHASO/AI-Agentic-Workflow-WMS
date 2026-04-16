using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WmsBackend.Data;
using WmsBackend.Models.WmsCore;

namespace WmsBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShipmentsController : ControllerBase
    {
        private readonly WmsDbContext _context;

        public ShipmentsController(WmsDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ShipmentHeader>>> GetShipments()
        {
            return await _context.ShipmentHeaders.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ShipmentHeader>> GetShipment(int id)
        {
            var shipment = await _context.ShipmentHeaders.FindAsync(id);
            if (shipment == null) return NotFound();
            return shipment;
        }

        [HttpPost]
        public async Task<ActionResult<ShipmentHeader>> PostShipment(ShipmentHeader shp)
        {
            _context.ShipmentHeaders.Add(shp);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetShipment), new { id = shp.Id }, shp);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutShipment(int id, ShipmentHeader shp)
        {
            if (id != shp.Id) return BadRequest();
            _context.Entry(shp).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ShipmentExists(id)) return NotFound();
                throw;
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteShipment(int id)
        {
            var shp = await _context.ShipmentHeaders.FindAsync(id);
            if (shp == null) return NotFound();
            _context.ShipmentHeaders.Remove(shp);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private bool ShipmentExists(int id)
        {
            return _context.ShipmentHeaders.Any(e => e.Id == id);
        }
    }
}
