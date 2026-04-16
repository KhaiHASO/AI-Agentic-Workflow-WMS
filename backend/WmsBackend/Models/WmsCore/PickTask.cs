using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WmsBackend.Models.Mdm;
using WmsBackend.Models.ErpStage;

namespace WmsBackend.Models.WmsCore
{
    [Table("PickTask", Schema = "wms_core")]
    public class PickTask
    {
        [Key]
        public long Id { get; set; }

        [Required]
        [StringLength(100)]
        public string TaskNo { get; set; } = string.Empty;

        public int? SoLineId { get; set; }
        [ForeignKey("SoLineId")]
        public virtual ErpSalesOrderLine? SoLine { get; set; }

        public int? SuggestedLocationId { get; set; }
        [ForeignKey("SuggestedLocationId")]
        public virtual Location? SuggestedLocation { get; set; }

        public int ItemId { get; set; }
        [ForeignKey("ItemId")]
        public virtual Item? Item { get; set; }

        [StringLength(100)]
        public string? LotNo { get; set; }

        public decimal? RequestedQty { get; set; }
        public decimal PickedQty { get; set; } = 0;

        [StringLength(50)]
        public string Status { get; set; } = "Open";
    }
}
