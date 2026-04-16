using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WmsBackend.Models.Mdm;

namespace WmsBackend.Models.ErpStage
{
    [Table("ErpSalesOrderHeader", Schema = "erp_stage")]
    public class ErpSalesOrderHeader
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string SoNumber { get; set; } = string.Empty;

        public int? CustomerId { get; set; }
        [ForeignKey("CustomerId")]
        public virtual Customer? Customer { get; set; }

        public DateTime? ExpectedDate { get; set; }

        [StringLength(50)]
        public string? ErpStatus { get; set; }

        [StringLength(255)]
        public string? VersionHash { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public virtual ICollection<ErpSalesOrderLine> Lines { get; set; } = new List<ErpSalesOrderLine>();
    }
}
