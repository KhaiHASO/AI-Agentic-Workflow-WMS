using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WmsBackend.Models.Mdm;
using WmsBackend.Models.WmsCore;

namespace WmsBackend.Models.QualityControl
{
    [Table("QualityOrder", Schema = "quality_control")]
    public class QualityOrder : AuditEntity {
        [Key] public int Id { get; set; }
        [StringLength(100)] public string? IdempotencyKey { get; set; }
        [Required, StringLength(100)] public string QualityOrderNo { get; set; } = string.Empty;
        public int ItemId { get; set; }
        public int? DraftLineId { get; set; }
        public decimal Qty { get; set; }
        public string Status { get; set; } = "Pending";
        public virtual Item? Item { get; set; }
        public virtual DraftLine? DraftLine { get; set; }
    }

    [Table("QualityCheckResult", Schema = "quality_control")]
    public class QualityCheckResult : AuditEntity {
        [Key] public int Id { get; set; }
        public int QualityOrderId { get; set; }
        public string Result { get; set; } = "Pass";
        public virtual QualityOrder? QualityOrder { get; set; }
    }

    [Table("QuarantineOrder", Schema = "quality_control")]
    public class QuarantineOrder : AuditEntity {
        [Key] public int Id { get; set; }
        public int WarehouseId { get; set; }
        public int? ReasonCodeId { get; set; }
        public string Status { get; set; } = "Held";
        public virtual Warehouse? Warehouse { get; set; }
        public virtual ReasonCode? ReasonCode { get; set; }
    }

    [Table("CycleCountPlan", Schema = "quality_control")]
    public class CycleCountPlan : AuditEntity {
        [Key] public int Id { get; set; }
        [Required, StringLength(255)] public string PlanName { get; set; } = string.Empty;
        public int WarehouseId { get; set; }
        public DateTime ScheduledDate { get; set; }
        public string Status { get; set; } = "Draft";
        public virtual Warehouse? Warehouse { get; set; }
    }

    [Table("CycleCountSession", Schema = "quality_control")]
    public class CycleCountSession : AuditEntity {
        [Key] public int Id { get; set; }
        [StringLength(100)] public string? IdempotencyKey { get; set; }
        [Required, StringLength(100)] public string SessionNo { get; set; } = string.Empty;
        public int? ZoneId { get; set; }
        public string Status { get; set; } = "Active";
        public virtual Zone? Zone { get; set; }
        public virtual ICollection<CycleCountLine> Lines { get; set; } = new List<CycleCountLine>();
    }

    [Table("CycleCountLine", Schema = "quality_control")]
    public class CycleCountLine : AuditEntity {
        [Key] public long Id { get; set; }
        public int SessionId { get; set; }
        public int LocationId { get; set; }
        public int ItemId { get; set; }
        public decimal SystemQty { get; set; }
        public decimal CountedQty { get; set; }
        public decimal Variance { get; set; }
        public string Status { get; set; } = "Pending";
        public virtual CycleCountSession? Session { get; set; }
        public virtual Location? Location { get; set; }
        public virtual Item? Item { get; set; }
    }

    [Table("CycleCountReview", Schema = "quality_control")]
    public class CycleCountReview : AuditEntity {
        [Key] public int Id { get; set; }
        public long CycleCountLineId { get; set; }
        public int ReviewerId { get; set; } 
        public string? Comments { get; set; }
        public virtual CycleCountLine? CycleCountLine { get; set; }
        public virtual ApplicationUser? Reviewer { get; set; }
    }

    [Table("CountAdjustmentApproval", Schema = "quality_control")]
    public class CountAdjustmentApproval : AuditEntity {
        [Key] public int Id { get; set; }
        public int ReviewId { get; set; }
        public int ApproverId { get; set; }
        public bool IsApproved { get; set; }
        public virtual CycleCountReview? Review { get; set; }
        public virtual ApplicationUser? Approver { get; set; }
    }
}
