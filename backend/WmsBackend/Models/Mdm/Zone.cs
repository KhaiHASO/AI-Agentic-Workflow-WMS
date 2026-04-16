using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WmsBackend.Models.Mdm
{
    [Table("Zone", Schema = "mdm")]
    public class Zone
    {
        [Key]
        public int Id { get; set; }

        public int WarehouseId { get; set; }
        [ForeignKey("WarehouseId")]
        public virtual Warehouse? Warehouse { get; set; }

        [Required]
        [StringLength(50)]
        public string ZoneCode { get; set; } = string.Empty;

        [StringLength(50)]
        public string? ZoneType { get; set; } // Inbound, Storage, Outbound
    }
}
