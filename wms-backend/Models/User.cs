namespace WmsBackend.Models
{
    public class User
    {
        public int Id { get; set; }
        public string? ImageUrl { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string? Phone { get; set; }
        public string? Department { get; set; }
        public string? Designation { get; set; }
        public string? Description { get; set; }
    }
}
