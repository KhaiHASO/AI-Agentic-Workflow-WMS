using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WmsBackend.Models.WmsCore
{
    [Table("ShipmentHeader", Schema = "wms_core")]
    public class ShipmentHeader
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string ShipmentCode { get; set; } = string.Empty;

        [StringLength(100)]
        public string? Carrier { get; set; }

        [StringLength(50)]
        public string? VehicleNo { get; set; }

        [StringLength(50)]
        public string? Dock { get; set; }

        [StringLength(50)]
        public string Status { get; set; } = "Pending";

        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
    }
}
