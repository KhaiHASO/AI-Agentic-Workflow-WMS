using System.ComponentModel.DataAnnotations;

namespace WmsBackend.Models
{
    public abstract class AuditEntity
    {
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public int? CreatedBy { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public int? UpdatedBy { get; set; }
        
        [Timestamp]
        public byte[]? RowVersion { get; set; }
    }
}
