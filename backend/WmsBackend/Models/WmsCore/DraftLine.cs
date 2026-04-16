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
        public virtual InboundReceiptHeader? ReceiptHeader { get; set; }

        public int? PoLineId { get; set; }
        [ForeignKey("PoLineId")]
        public virtual ErpPurchaseOrderLine? PoLine { get; set; }

        public int ItemId { get; set; }
        [ForeignKey("ItemId")]
        public virtual Item? Item { get; set; }

        public int? UomId { get; set; }
        [ForeignKey("UomId")]
        public virtual Uom? Uom { get; set; }

        public decimal ExpectedQty { get; set; } = 0;
        public decimal ReceivedQty { get; set; } = 0;
        public decimal AcceptedQty { get; set; } = 0;
        public decimal RejectedQty { get; set; } = 0;
        public decimal HoldQty { get; set; } = 0;

        public int? SubstituteItemId { get; set; }
        [ForeignKey("SubstituteItemId")]
        public virtual Item? SubstituteItem { get; set; }

        public int? ReasonCodeId { get; set; }
        [ForeignKey("ReasonCodeId")]
        public virtual ReasonCode? ReasonCode { get; set; }

        [StringLength(50)]
        public string? Status { get; set; }
    }
}
