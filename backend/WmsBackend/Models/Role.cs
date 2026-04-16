namespace WmsBackend.Models
{
    public class Role
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string RolePermission { get; set; } = string.Empty;
    }
}
