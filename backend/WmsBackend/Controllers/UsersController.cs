using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using WmsBackend.Data;
using WmsBackend.Models;

namespace WmsBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly WmsDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public UsersController(WmsDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users
                .Select(u => new User
                {
                    Id = u.Id,
                    Name = u.FullName ?? string.Empty,
                    Email = u.Email ?? string.Empty,
                    Phone = u.PhoneNumber,
                    ImageUrl = u.ImageUrl,
                    Department = u.Department,
                    Designation = u.Designation
                })
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var u = await _context.Users.FindAsync(id);
            if (u == null) return NotFound();
            return new User
            {
                Id = u.Id,
                Name = u.FullName ?? string.Empty,
                Email = u.Email ?? string.Empty,
                Phone = u.PhoneNumber,
                ImageUrl = u.ImageUrl,
                Department = u.Department,
                Designation = u.Designation
            };
        }

        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            var appUser = new ApplicationUser
            {
                UserName = user.Email,
                Email = user.Email,
                FullName = user.Name,
                PhoneNumber = user.Phone,
                ImageUrl = user.ImageUrl,
                Department = user.Department,
                Designation = user.Designation
            };
            
            var result = await _userManager.CreateAsync(appUser, "Wms123456!"); // Default password
            if (!result.Succeeded) return BadRequest(result.Errors);
            
            user.Id = appUser.Id;
            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.Id) return BadRequest();
            
            var appUser = await _userManager.FindByIdAsync(id.ToString());
            if (appUser == null) return NotFound();
            
            appUser.FullName = user.Name;
            appUser.Email = user.Email;
            appUser.PhoneNumber = user.Phone;
            appUser.ImageUrl = user.ImageUrl;
            appUser.Department = user.Department;
            appUser.Designation = user.Designation;
            
            var result = await _userManager.UpdateAsync(appUser);
            if (!result.Succeeded) return BadRequest(result.Errors);
            
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _userManager.FindByIdAsync(id.ToString());
            if (user == null) return NotFound();
            
            await _userManager.DeleteAsync(user);
            return NoContent();
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}
