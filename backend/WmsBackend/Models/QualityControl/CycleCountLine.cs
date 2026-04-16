using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WmsBackend.Models.Mdm;

namespace WmsBackend.Models.QualityControl
{
    [Table("CycleCountLine", Schema = "quality_control")]
    public class CycleCountLine
    {
        [Key]
        public long Id { get; set; }

        public int SessionId { get; set; }
        [ForeignKey("SessionId")]
        public virtual CycleCountSession? Session { get; set; }

        public int LocationId { get; set; }
        [ForeignKey("LocationId")]
        public virtual Location? Location { get; set; }

        public int ItemId { get; set; }
        [ForeignKey("ItemId")]
        public virtual Item? Item { get; set; }

        [StringLength(100)]
        public string? LotNo { get; set; }

        public decimal SystemQty { get; set; }
        public decimal CountedQty { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public decimal Variance { get; private set; }

        [StringLength(50)]
        public string Status { get; set; } = "Pending Review";
    }
}
