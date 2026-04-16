using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WmsBackend.Models.Mdm
{
    [Table("Warehouse", Schema = "mdm")]
    public class Warehouse
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Code { get; set; } = string.Empty;

        [StringLength(255)]
        public string? Name { get; set; }

        public string? Address { get; set; }

        [StringLength(50)]
        public string Status { get; set; } = "Active";
    }
}
