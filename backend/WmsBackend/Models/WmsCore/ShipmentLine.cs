using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WmsBackend.Models.Mdm;

namespace WmsBackend.Models.WmsCore
{
    [Table("ShipmentLine", Schema = "wms_core")]
    public class ShipmentLine
    {
        [Key]
        public int Id { get; set; }

        public int ShipmentHeaderId { get; set; }
        [ForeignKey("ShipmentHeaderId")]
        public ShipmentHeader? ShipmentHeader { get; set; }

        public long? PickTaskId { get; set; }
        [ForeignKey("PickTaskId")]
        public PickTask? PickTask { get; set; }

        public int? SoLineId { get; set; } // Map directly to SO Line if needed

        public decimal ShippedQty { get; set; }
    }
}
