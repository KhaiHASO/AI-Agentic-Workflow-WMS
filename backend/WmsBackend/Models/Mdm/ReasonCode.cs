using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WmsBackend.Models.Mdm
{
    [Table("ReasonCode", Schema = "mdm")]
    public class ReasonCode
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Code { get; set; } = string.Empty;

        [StringLength(50)]
        public string? Type { get; set; } // Inbound, Outbound, Adjustment

        [StringLength(255)]
        public string? Description { get; set; }
    }
}
