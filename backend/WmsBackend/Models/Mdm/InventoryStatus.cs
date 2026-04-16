using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WmsBackend.Models.Mdm
{
    [Table("InventoryStatus", Schema = "mdm")]
    public class InventoryStatus
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string StatusCode { get; set; } = string.Empty; // Available, QA Hold, Damaged, Blocked

        public bool IsAllocatable { get; set; } = true;
    }
}
