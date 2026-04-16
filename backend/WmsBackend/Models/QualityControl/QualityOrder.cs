using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WmsBackend.Models.Mdm;
using WmsBackend.Models.WmsCore;

namespace WmsBackend.Models.QualityControl
{
    [Table("QualityOrder", Schema = "quality_control")]
    public class QualityOrder
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string QualityOrderId { get; set; } = string.Empty;

        public int? DraftLineId { get; set; }
        [ForeignKey("DraftLineId")]
        public virtual DraftLine? DraftLine { get; set; }

        public int ItemId { get; set; }
        [ForeignKey("ItemId")]
        public virtual Item? Item { get; set; }

        [StringLength(100)]
        public string? LotNo { get; set; }

        public decimal Qty { get; set; }

        [StringLength(50)]
        public string Status { get; set; } = "QA Hold";

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
