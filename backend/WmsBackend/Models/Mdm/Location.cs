using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WmsBackend.Models.Mdm
{
    [Table("Location", Schema = "mdm")]
    public class Location
    {
        [Key]
        public int Id { get; set; }

        public int WarehouseId { get; set; }
        [ForeignKey("WarehouseId")]
        public virtual Warehouse? Warehouse { get; set; }

        public int? ZoneId { get; set; }
        [ForeignKey("ZoneId")]
        public virtual Zone? Zone { get; set; }

        public int? ProfileId { get; set; }
        [ForeignKey("ProfileId")]
        public virtual LocationProfile? Profile { get; set; }

        [Required]
        [StringLength(50)]
        public string Code { get; set; } = string.Empty;

        [StringLength(50)]
        public string? Aisle { get; set; }
        [StringLength(50)]
        public string? Rack { get; set; }
        [StringLength(50)]
        public string? Level { get; set; }
        [StringLength(50)]
        public string? Bin { get; set; }

        [StringLength(50)]
        public string Status { get; set; } = "Active";
    }
}
