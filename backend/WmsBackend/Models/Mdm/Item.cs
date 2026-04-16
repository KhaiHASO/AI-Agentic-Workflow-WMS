using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WmsBackend.Models.Mdm
{
    [Table("Item", Schema = "mdm")]
    public class Item
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string ItemCode { get; set; } = string.Empty;

        [StringLength(255)]
        public string? Name { get; set; }

        public int? BaseUomId { get; set; }
        [ForeignKey("BaseUomId")]
        public virtual Uom? BaseUom { get; set; }

        public bool IsLotControlled { get; set; } = false;
        public bool IsSerialControlled { get; set; } = false;
        public int? ShelfLifeDays { get; set; }

        [StringLength(50)]
        public string PickStrategy { get; set; } = "FIFO"; // FIFO or FEFO

        [StringLength(50)]
        public string Status { get; set; } = "Active";
    }
}
