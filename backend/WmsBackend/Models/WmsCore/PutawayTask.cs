using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WmsBackend.Models.Mdm;
using WmsBackend.Models.ErpStage;

namespace WmsBackend.Models.WmsCore
{
    [Table("PutawayTask", Schema = "wms_core")]
    public class PutawayTask
    {
        [Key]
        public long Id { get; set; }

        [Required, StringLength(100)]
        public string TaskNo { get; set; } = string.Empty;

        public int? ReceiptHeaderId { get; set; }
        [ForeignKey("ReceiptHeaderId")]
        public InboundReceiptHeader? ReceiptHeader { get; set; }

        public int ItemId { get; set; }
        [ForeignKey("ItemId")]
        public Item? Item { get; set; }

        public int? HandlingUnitId { get; set; }
        [ForeignKey("HandlingUnitId")]
        public HandlingUnit? HandlingUnit { get; set; }

        public int? TargetLocationId { get; set; }
        [ForeignKey("TargetLocationId")]
        public Location? TargetLocation { get; set; }

        public decimal? Quantity { get; set; }
        public string Status { get; set; } = "Pending"; // Pending, InProgress, Completed, Cancelled

        // Audit Trail Columns
        public int? AssignedTo { get; set; }
        public int? CompletedBy { get; set; }
        public DateTime? CompletedAt { get; set; }
    }
}
