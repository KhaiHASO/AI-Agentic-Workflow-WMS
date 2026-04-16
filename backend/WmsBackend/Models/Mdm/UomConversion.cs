using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WmsBackend.Models.Mdm
{
    [Table("UomConversion", Schema = "mdm")]
    public class UomConversion
    {
        [Key]
        public int Id { get; set; }

        public int FromUomId { get; set; }
        [ForeignKey("FromUomId")]
        public virtual Uom? FromUom { get; set; }

        public int ToUomId { get; set; }
        [ForeignKey("ToUomId")]
        public virtual Uom? ToUom { get; set; }

        public int? ItemId { get; set; }
        [ForeignKey("ItemId")]
        public virtual Item? Item { get; set; }

        public decimal ConversionRate { get; set; }
    }
}
