using Microsoft.AspNetCore.Identity;

namespace WmsBackend.Models
{
    public class ApplicationUser : IdentityUser<int>
    {
        public string? FullName { get; set; }
        public string? ImageUrl { get; set; }
        public string? Department { get; set; }
        public string? Designation { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public class ApplicationRole : IdentityRole<int>
    {
        public string? Description { get; set; }
    }
}
