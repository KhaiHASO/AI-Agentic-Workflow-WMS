using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WmsBackend.Models.Mdm;

namespace WmsBackend.Models.QualityControl
{
    [Table("CycleCountSession", Schema = "quality_control")]
    public class CycleCountSession
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string SessionNo { get; set; } = string.Empty;

        public int? ZoneId { get; set; }
        [ForeignKey("ZoneId")]
        public virtual Zone? Zone { get; set; }

        [StringLength(50)]
        public string Status { get; set; } = "Open";

        [StringLength(100)]
        public string? CreatedBy { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public virtual ICollection<CycleCountLine> Lines { get; set; } = new List<CycleCountLine>();
    }
}
