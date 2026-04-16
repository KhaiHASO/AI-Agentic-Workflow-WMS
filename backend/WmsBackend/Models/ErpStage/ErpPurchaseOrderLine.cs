using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WmsBackend.Models.Mdm;

namespace WmsBackend.Models.ErpStage
{
    [Table("ErpPurchaseOrderLine", Schema = "erp_stage")]
    public class ErpPurchaseOrderLine
    {
        [Key]
        public int Id { get; set; }

        public int PoHeaderId { get; set; }
        [ForeignKey("PoHeaderId")]
        public virtual ErpPurchaseOrderHeader? PoHeader { get; set; }

        public int LineNo { get; set; }

        public int ItemId { get; set; }
        [ForeignKey("ItemId")]
        public virtual Item? Item { get; set; }

        public int? UomId { get; set; }
        [ForeignKey("UomId")]
        public virtual Uom? Uom { get; set; }

        public decimal OrderedQty { get; set; }
        public decimal OpenQty { get; set; }
    }
}
