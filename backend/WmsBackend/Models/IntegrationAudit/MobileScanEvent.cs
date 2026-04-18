using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WmsBackend.Models.IntegrationAudit
{
    [Table("MobileScanEvent", Schema = "integration_audit")]
    public class MobileScanEvent
    {
        [Key]
        public long Id { get; set; }

        [Required, StringLength(255)]
        public string ClientTxnId { get; set; } = string.Empty;

        [Required, StringLength(255)]
        public string Barcode { get; set; } = string.Empty;

        public decimal? ScannedQty { get; set; }
        public string? LocationCode { get; set; }

        // Chuẩn hóa sang int để JOIN với AspNetUsers.Id
        public int? UserId { get; set; }
        [ForeignKey("UserId")]
        public ApplicationUser? User { get; set; }

        public DateTime ScanTime { get; set; } = DateTime.UtcNow;
    }
}
