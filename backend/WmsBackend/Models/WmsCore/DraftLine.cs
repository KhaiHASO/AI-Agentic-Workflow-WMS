using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WmsBackend.Models.Mdm;
using WmsBackend.Models.ErpStage;

namespace WmsBackend.Models.WmsCore
{
    [Table("DraftLine", Schema = "wms_core")]
    public class DraftLine
    {
        [Key]
        public int Id { get; set; }

        public int ReceiptHeaderId { get; set; }
        [ForeignKey("ReceiptHeaderId")]
        public InboundReceiptHeader? ReceiptHeader { get; set; }

        public int? PoLineId { get; set; }
        [ForeignKey("PoLineId")]
        public ErpPurchaseOrderLine? PoLine { get; set; }

        public int ItemId { get; set; }
        [ForeignKey("ItemId")]
        public Item? Item { get; set; }

        public int? UomId { get; set; }
        [ForeignKey("UomId")]
        public Uom? Uom { get; set; }

        public decimal ExpectedQty { get; set; }
        public decimal ReceivedQty { get; set; }
        public decimal AcceptedQty { get; set; }
        public decimal RejectedQty { get; set; }
        public decimal HoldQty { get; set; }

        public int? SubstituteItemId { get; set; }
        [ForeignKey("SubstituteItemId")]
        public Item? SubstituteItem { get; set; }

        public int? ReasonCodeId { get; set; }
        [ForeignKey("ReasonCodeId")]
        public ReasonCode? ReasonCode { get; set; }

        public string? Status { get; set; }

        // Audit Trail Columns
        public int? AssignedTo { get; set; }
        public int? CompletedBy { get; set; }
        public DateTime? CompletedAt { get; set; }

        [Timestamp]
        public byte[]? RowVersion { get; set; }
    }
}
