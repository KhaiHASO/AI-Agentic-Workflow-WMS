using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WmsBackend.Models.IntegrationAudit
{
    [Table("ApiCallLog", Schema = "integration_audit")]
    public class ApiCallLog : AuditEntity {
        [Key] public long Id { get; set; }
        public string? Endpoint { get; set; }
        public string? Method { get; set; }
        public int? StatusCode { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    }

    [Table("IntegrationInbox", Schema = "integration_audit")]
    public class IntegrationInbox : AuditEntity {
        [Key] public int Id { get; set; }
        [Required, StringLength(255)] public string IdempotencyKey { get; set; } = string.Empty;
        public string? MessageType { get; set; }
        public string? Payload { get; set; }
        public string Status { get; set; } = "Pending";
    }

    [Table("IntegrationOutbox", Schema = "integration_audit")]
    public class IntegrationOutbox : AuditEntity {
        [Key] public int Id { get; set; }
        [Required, StringLength(255)] public string IdempotencyKey { get; set; } = string.Empty;
        public string? MessageType { get; set; }
        public string? Payload { get; set; }
        public int RetryCount { get; set; }
        public string Status { get; set; } = "Pending";
    }

    [Table("MobileScanEvent", Schema = "integration_audit")]
    public class MobileScanEvent : AuditEntity {
        [Key] public long Id { get; set; }
        [Required, StringLength(255)] public string ClientTxnId { get; set; } = string.Empty;
        public string Barcode { get; set; } = string.Empty;
        public decimal? ScannedQty { get; set; }
        public int? UserId { get; set; }
        public DateTime ScanTime { get; set; } = DateTime.UtcNow;
        [ForeignKey("UserId")] public virtual ApplicationUser? User { get; set; }
    }

    [Table("AuditLog", Schema = "integration_audit")]
    public class AuditLog : AuditEntity {
        [Key] public long Id { get; set; }
        public int UserId { get; set; }
        public string? Action { get; set; }
        public string? EntityName { get; set; }
        public string? EntityId { get; set; }
        public string? OldValues { get; set; }
        public string? NewValues { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
        [ForeignKey("UserId")] public virtual ApplicationUser? User { get; set; }
    }
}
