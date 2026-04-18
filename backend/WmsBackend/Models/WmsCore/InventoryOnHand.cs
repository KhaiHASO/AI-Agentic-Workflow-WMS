using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WmsBackend.Models.Mdm;

namespace WmsBackend.Models.WmsCore
{
    [Table("InventoryOnHand", Schema = "wms_core")]
    public class InventoryOnHand
    {
        [Key]
        public long Id { get; set; }

        public int WarehouseId { get; set; }
        [ForeignKey("WarehouseId")]
        public virtual Warehouse? Warehouse { get; set; }

        public int LocationId { get; set; }
        [ForeignKey("LocationId")]
        public virtual Location? Location { get; set; }

        public int ItemId { get; set; }
        [ForeignKey("ItemId")]
        public virtual Item? Item { get; set; }

        [StringLength(100)]
        public string LotNo { get; set; } = "N/A";

        [StringLength(100)]
        public string SerialNumber { get; set; } = "N/A";

        public int? HandlingUnitId { get; set; }
        [ForeignKey("HandlingUnitId")]
        public virtual HandlingUnit? HandlingUnit { get; set; }

        public int InventoryStatusId { get; set; }
        [ForeignKey("InventoryStatusId")]
        public virtual InventoryStatus? InventoryStatus { get; set; }

        public decimal AvailableQty { get; set; } = 0;
        public decimal ReservedQty { get; set; } = 0;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        [Timestamp]
        public byte[]? RowVersion { get; set; }
    }
}
