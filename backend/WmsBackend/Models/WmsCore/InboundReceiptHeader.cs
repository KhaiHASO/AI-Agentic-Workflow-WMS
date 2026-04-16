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

        [Required]
        [StringLength(100)]
        public string ReceiptNo { get; set; } = string.Empty;

        public int? SupplierId { get; set; }
        [ForeignKey("SupplierId")]
        public virtual Supplier? Supplier { get; set; }

        [StringLength(50)]
        public string? VehicleNo { get; set; }

        [StringLength(50)]
        public string Status { get; set; } = "Open"; // Open, Draft, Submitted, Closed

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public virtual ICollection<DraftLine> Lines { get; set; } = new List<DraftLine>();
    }
}
