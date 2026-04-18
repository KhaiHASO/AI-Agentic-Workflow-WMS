using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WmsBackend.Models.Mdm;

namespace WmsBackend.Models.WmsCore
{
    [Table("ShipmentHeader", Schema = "wms_core")]
    public class ShipmentHeader
    {
        [Key]
        public int Id { get; set; }

        [Required, StringLength(100)]
        public string ShipmentCode { get; set; } = string.Empty;

        // Bổ sung WarehouseId cho Multi-Warehouse
        public int WarehouseId { get; set; }
        [ForeignKey("WarehouseId")]
        public Warehouse? Warehouse { get; set; }

        public string? Carrier { get; set; }
        public string? VehicleNo { get; set; }
        public string? Dock { get; set; }
        public string Status { get; set; } = "New"; // New, Picking, Packed, Shipped
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
    }
}
