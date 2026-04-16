using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WmsBackend.Models.Mdm;

namespace WmsBackend.Models.WmsCore
{
    [Table("InventoryLedger", Schema = "wms_core")]
    public class InventoryLedger
    {
        [Key]
        public long Id { get; set; }

        [Required]
        [StringLength(50)]
        public string TransactionType { get; set; } = string.Empty; // Inbound, Outbound, Transfer, Adjust

        public int ItemId { get; set; }
        [ForeignKey("ItemId")]
        public virtual Item? Item { get; set; }

        [StringLength(100)]
        public string? LotNo { get; set; }

        public decimal Qty { get; set; } // Positive (in), Negative (out)

        public int? FromLocationId { get; set; }
        [ForeignKey("FromLocationId")]
        public virtual Location? FromLocation { get; set; }

        public int? ToLocationId { get; set; }
        [ForeignKey("ToLocationId")]
        public virtual Location? ToLocation { get; set; }

        [StringLength(100)]
        public string? SourceDocId { get; set; }

        public DateTime Timestamp { get; set; } = DateTime.UtcNow;

        [StringLength(100)]
        public string? CreatedBy { get; set; }
    }
}
