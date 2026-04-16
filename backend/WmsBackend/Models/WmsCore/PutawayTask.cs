using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WmsBackend.Models.Mdm;

namespace WmsBackend.Models.WmsCore
{
    [Table("PutawayTask", Schema = "wms_core")]
    public class PutawayTask
    {
        [Key]
        public long Id { get; set; }

        [Required]
        [StringLength(100)]
        public string TaskNo { get; set; } = string.Empty;

        public int? ReceiptHeaderId { get; set; }
        [ForeignKey("ReceiptHeaderId")]
        public virtual InboundReceiptHeader? ReceiptHeader { get; set; }

        public int ItemId { get; set; }
        [ForeignKey("ItemId")]
        public virtual Item? Item { get; set; }

        public int? HandlingUnitId { get; set; }
        [ForeignKey("HandlingUnitId")]
        public virtual HandlingUnit? HandlingUnit { get; set; }

        public int? TargetLocationId { get; set; }
        [ForeignKey("TargetLocationId")]
        public virtual Location? TargetLocation { get; set; }

        public decimal? Quantity { get; set; }

        [StringLength(50)]
        public string Status { get; set; } = "Pending";
    }
}
