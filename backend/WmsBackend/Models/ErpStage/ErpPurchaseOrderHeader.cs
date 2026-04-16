using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WmsBackend.Models.Mdm;

namespace WmsBackend.Models.ErpStage
{
    [Table("ErpPurchaseOrderHeader", Schema = "erp_stage")]
    public class ErpPurchaseOrderHeader
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string PoNumber { get; set; } = string.Empty;

        public int? SupplierId { get; set; }
        [ForeignKey("SupplierId")]
        public virtual Supplier? Supplier { get; set; }

        public DateTime? ExpectedDate { get; set; }

        [StringLength(50)]
        public string? ErpStatus { get; set; }

        [StringLength(255)]
        public string? VersionHash { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public virtual ICollection<ErpPurchaseOrderLine> Lines { get; set; } = new List<ErpPurchaseOrderLine>();
    }
}
