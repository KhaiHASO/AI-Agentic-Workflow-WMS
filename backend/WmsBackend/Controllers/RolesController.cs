using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using WmsBackend.Data;
using WmsBackend.Models;

namespace WmsBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        private readonly WmsDbContext _context;
        private readonly RoleManager<ApplicationRole> _roleManager;

        public RolesController(WmsDbContext context, RoleManager<ApplicationRole> roleManager)
        {
            _context = context;
            _roleManager = roleManager;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Role>>> GetRoles()
        {
            return await _context.Roles
                .Select(r => new Role
                {
                    Id = r.Id,
                    Username = r.Name ?? string.Empty, // Mapping Name to Username as per the Role model
                    RolePermission = r.Description ?? string.Empty
                })
                .ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Role>> PostRole(Role role)
        {
            var appRole = new ApplicationRole
            {
                Name = role.Username,
                Description = role.RolePermission
            };
            var result = await _roleManager.CreateAsync(appRole);
            if (!result.Succeeded) return BadRequest(result.Errors);
            
            role.Id = appRole.Id;
            return CreatedAtAction(nameof(GetRoles), new { id = role.Id }, role);
        }
    }
}
