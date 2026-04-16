using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WmsBackend.Data;
using WmsBackend.Models.Mdm;

namespace WmsBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationProfilesController : ControllerBase
    {
        private readonly WmsDbContext _context;

        public LocationProfilesController(WmsDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<LocationProfile>>> GetLocationProfiles()
        {
            return await _context.LocationProfiles.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<LocationProfile>> GetLocationProfile(int id)
        {
            var profile = await _context.LocationProfiles.FindAsync(id);
            if (profile == null) return NotFound();
            return profile;
        }

        [HttpPost]
        public async Task<ActionResult<LocationProfile>> PostLocationProfile(LocationProfile profile)
        {
            _context.LocationProfiles.Add(profile);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetLocationProfile), new { id = profile.Id }, profile);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutLocationProfile(int id, LocationProfile profile)
        {
            if (id != profile.Id) return BadRequest();
            _context.Entry(profile).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LocationProfileExists(id)) return NotFound();
                throw;
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLocationProfile(int id)
        {
            var profile = await _context.LocationProfiles.FindAsync(id);
            if (profile == null) return NotFound();
            _context.LocationProfiles.Remove(profile);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private bool LocationProfileExists(int id)
        {
            return _context.LocationProfiles.Any(e => e.Id == id);
        }
    }
}
