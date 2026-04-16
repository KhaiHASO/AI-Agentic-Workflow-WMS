using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WmsBackend.Models.IntegrationAudit
{
    [Table("IntegrationOutbox", Schema = "integration_audit")]
    public class IntegrationOutbox
    {
        [Key]
        public long Id { get; set; }

        [Required]
        [StringLength(255)]
        public string IdempotencyKey { get; set; } = string.Empty;

        [StringLength(100)]
        public string? MessageType { get; set; } // GRN_PUSH, GOODS_ISSUE

        public string? Payload { get; set; }

        [StringLength(50)]
        public string Status { get; set; } = "Pending"; // Pending, Success, Failed

        public int RetryCount { get; set; } = 0;

        public string? ErrorMessage { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
