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

        [Required, StringLength(100)]
        public string TaskNo { get; set; } = string.Empty;

        public int? SoLineId { get; set; }
        [ForeignKey("SoLineId")]
        public ErpSalesOrderLine? SoLine { get; set; }

        public int? SuggestedLocationId { get; set; }
        [ForeignKey("SuggestedLocationId")]
        public Location? SuggestedLocation { get; set; }

        public int ItemId { get; set; }
        [ForeignKey("ItemId")]
        public Item? Item { get; set; }

        public string? LotNo { get; set; }
        public decimal? RequestedQty { get; set; }
        public decimal PickedQty { get; set; }
        public string Status { get; set; } = "Pending"; // Pending, InProgress, Completed, Cancelled

        // Audit Trail Columns
        public int? AssignedTo { get; set; }
        public int? CompletedBy { get; set; }
        public DateTime? CompletedAt { get; set; }
    }
}
