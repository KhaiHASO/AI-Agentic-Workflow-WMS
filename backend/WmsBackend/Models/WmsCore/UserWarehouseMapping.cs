using System.ComponentModel.DataAnnotations.Schema;
using WmsBackend.Models.Mdm;

namespace WmsBackend.Models.WmsCore
{
    [Table("UserWarehouseMapping", Schema = "wms_core")]
    public class UserWarehouseMapping
    {
        public int UserId { get; set; }
        
        public int WarehouseId { get; set; }
        [ForeignKey("WarehouseId")]
        public Warehouse? Warehouse { get; set; }

        public DateTime AssignedAt { get; set; } = DateTime.UtcNow;
    }
}
