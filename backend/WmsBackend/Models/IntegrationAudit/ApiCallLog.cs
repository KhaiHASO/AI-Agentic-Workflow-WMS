using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WmsBackend.Models.IntegrationAudit
{
    [Table("ApiCallLog", Schema = "integration_audit")]
    public class ApiCallLog
    {
        [Key]
        public long Id { get; set; }

        [StringLength(255)]
        public string? Endpoint { get; set; }

        [StringLength(10)]
        public string? Method { get; set; }

        public string? RequestPayload { get; set; }
        public string? ResponsePayload { get; set; }
        public int? StatusCode { get; set; }

        [StringLength(255)]
        public string? CorrelationId { get; set; }

        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    }
}
