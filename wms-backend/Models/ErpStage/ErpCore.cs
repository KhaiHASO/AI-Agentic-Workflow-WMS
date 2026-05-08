using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WmsBackend.Models.Mdm;

namespace WmsBackend.Models.ErpStage
{
    [Table("ErpPurchaseOrderHeader", Schema = "erp_stage")]
    public class ErpPurchaseOrderHeader : AuditEntity {
        [Key] public int Id { get; set; }
        [Required, StringLength(100)] public string PoNumber { get; set; } = string.Empty;
        public int WarehouseId { get; set; }
        public int? SupplierId { get; set; }
        [StringLength(50)] public string? ErpStatus { get; set; }
        [ForeignKey("WarehouseId")] public virtual Warehouse? Warehouse { get; set; }
        [ForeignKey("SupplierId")] public virtual Supplier? Supplier { get; set; }
        public virtual ICollection<ErpPurchaseOrderLine> Lines { get; set; } = new List<ErpPurchaseOrderLine>();
    }

    [Table("ErpPurchaseOrderLine", Schema = "erp_stage")]
    public class ErpPurchaseOrderLine : AuditEntity {
        [Key] public int Id { get; set; }
        public int PoHeaderId { get; set; }
        public int ItemId { get; set; }
        public decimal OrderedQty { get; set; }
        public decimal OpenQty { get; set; }
        public int? UomId { get; set; }
        [ForeignKey("PoHeaderId")] public virtual ErpPurchaseOrderHeader? Header { get; set; }
        [ForeignKey("ItemId")] public virtual Item? Item { get; set; }
        [ForeignKey("UomId")] public virtual Uom? Uom { get; set; }
    }

    [Table("ErpSalesOrderHeader", Schema = "erp_stage")]
    public class ErpSalesOrderHeader : AuditEntity {
        [Key] public int Id { get; set; }
        [Required, StringLength(100)] public string SoNumber { get; set; } = string.Empty;
        public int WarehouseId { get; set; }
        public int? CustomerId { get; set; }
        [StringLength(50)] public string? ErpStatus { get; set; }
        [ForeignKey("WarehouseId")] public virtual Warehouse? Warehouse { get; set; }
        [ForeignKey("CustomerId")] public virtual Customer? Customer { get; set; }
        public virtual ICollection<ErpSalesOrderLine> Lines { get; set; } = new List<ErpSalesOrderLine>();
    }

    [Table("ErpSalesOrderLine", Schema = "erp_stage")]
    public class ErpSalesOrderLine : AuditEntity {
        [Key] public int Id { get; set; }
        public int SoHeaderId { get; set; }
        public int ItemId { get; set; }
        public decimal OrderedQty { get; set; }
        public decimal OpenQty { get; set; }
        public int? UomId { get; set; }
        [ForeignKey("SoHeaderId")] public virtual ErpSalesOrderHeader? Header { get; set; }
        [ForeignKey("ItemId")] public virtual Item? Item { get; set; }
        [ForeignKey("UomId")] public virtual Uom? Uom { get; set; }
    }

    [Table("ErpSyncRun", Schema = "erp_stage")]
    public class ErpSyncRun : AuditEntity {
        [Key] public int Id { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        [StringLength(50)] public string Status { get; set; } = "InProgress";
    }

    [Table("ErpSyncError", Schema = "erp_stage")]
    public class ErpSyncError : AuditEntity {
        [Key] public int Id { get; set; }
        public int SyncRunId { get; set; }
        public string? ErrorMessage { get; set; }
        public string? RawPayload { get; set; }
        [ForeignKey("SyncRunId")] public virtual ErpSyncRun? SyncRun { get; set; }
    }

    [Table("ErpReferenceMap", Schema = "erp_stage")]
    public class ErpReferenceMap : AuditEntity {
        [Key] public int Id { get; set; }
        [StringLength(100)] public string? ErpSystem { get; set; }
        [StringLength(255)] public string? ExternalId { get; set; }
        public int LocalId { get; set; }
        [StringLength(100)] public string? EntityType { get; set; }
    }

    [Table("ErpDocumentStatusHistory", Schema = "erp_stage")]
    public class ErpDocumentStatusHistory : AuditEntity {
        [Key] public int Id { get; set; }
        [Required, StringLength(100)] public string DocumentNo { get; set; } = string.Empty;
        [StringLength(50)] public string? OldStatus { get; set; }
        [Required, StringLength(50)] public string NewStatus { get; set; } = string.Empty;
    }
}
