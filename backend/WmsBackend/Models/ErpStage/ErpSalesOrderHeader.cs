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

        [Required, StringLength(100)]
        public string SoNumber { get; set; } = string.Empty;

        public int? CustomerId { get; set; }
        [ForeignKey("CustomerId")]
        public Customer? Customer { get; set; }

        // Bổ sung WarehouseId cho Multi-Warehouse
        public int WarehouseId { get; set; }
        [ForeignKey("WarehouseId")]
        public Warehouse? Warehouse { get; set; }

        public DateTime? ExpectedDate { get; set; }
        public string? ErpStatus { get; set; }
        public string? VersionHash { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public ICollection<ErpSalesOrderLine> Lines { get; set; } = new List<ErpSalesOrderLine>();
    }
}
