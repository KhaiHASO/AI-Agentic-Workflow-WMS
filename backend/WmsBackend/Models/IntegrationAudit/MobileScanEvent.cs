using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WmsBackend.Models.IntegrationAudit
{
    [Table("MobileScanEvent", Schema = "integration_audit")]
    public class MobileScanEvent
    {
        [Key]
        public long Id { get; set; }

        [Required]
        [StringLength(255)]
        public string ClientTxnId { get; set; } = string.Empty;

        [Required]
        [StringLength(255)]
        public string Barcode { get; set; } = string.Empty;

        public decimal? ScannedQty { get; set; }

        [StringLength(100)]
        public string? LocationCode { get; set; }

        [StringLength(100)]
        public string? UserId { get; set; }

        public DateTime ScanTime { get; set; } = DateTime.UtcNow;
    }
}
