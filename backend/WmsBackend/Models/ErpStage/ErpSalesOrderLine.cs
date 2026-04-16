using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WmsBackend.Models.Mdm;

namespace WmsBackend.Models.ErpStage
{
    [Table("ErpSalesOrderLine", Schema = "erp_stage")]
    public class ErpSalesOrderLine
    {
        [Key]
        public int Id { get; set; }

        public int SoHeaderId { get; set; }
        [ForeignKey("SoHeaderId")]
        public virtual ErpSalesOrderHeader? SoHeader { get; set; }

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
