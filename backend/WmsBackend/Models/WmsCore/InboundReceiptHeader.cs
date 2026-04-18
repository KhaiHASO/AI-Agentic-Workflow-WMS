using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WmsBackend.Models.Mdm;

namespace WmsBackend.Models.WmsCore
{
    [Table("InboundReceiptHeader", Schema = "wms_core")]
    public class InboundReceiptHeader
    {
        [Key]
        public int Id { get; set; }

        [Required, StringLength(100)]
        public string ReceiptNo { get; set; } = string.Empty;

        public int? SupplierId { get; set; }
        [ForeignKey("SupplierId")]
        public Supplier? Supplier { get; set; }

        // Bổ sung WarehouseId cho Multi-Warehouse
        public int WarehouseId { get; set; }
        [ForeignKey("WarehouseId")]
        public Warehouse? Warehouse { get; set; }

        public string? VehicleNo { get; set; }
        public string Status { get; set; } = "Draft"; // Draft, Receiving, Completed, Cancelled
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public ICollection<DraftLine> Lines { get; set; } = new List<DraftLine>();
    }
}
