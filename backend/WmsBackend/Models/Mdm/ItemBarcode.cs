using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WmsBackend.Models.Mdm
{
    [Table("ItemBarcode", Schema = "mdm")]
    public class ItemBarcode
    {
        [Key]
        public int Id { get; set; }

        public int ItemId { get; set; }
        [ForeignKey("ItemId")]
        public virtual Item? Item { get; set; }

        public int? UomId { get; set; }
        [ForeignKey("UomId")]
        public virtual Uom? Uom { get; set; }

        [Required]
        [StringLength(255)]
        public string Barcode { get; set; } = string.Empty;

        [StringLength(50)]
        public string? BarcodeType { get; set; } // Vendor, Internal, Pallet
    }
}
