using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WmsBackend.Models.Mdm;

namespace WmsBackend.Models.WmsCore
{
    [Table("HandlingUnit", Schema = "wms_core")]
    public class HandlingUnit
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string LicensePlate { get; set; } = string.Empty;

        public int? LocationId { get; set; }
        [ForeignKey("LocationId")]
        public virtual Location? Location { get; set; }

        [StringLength(50)]
        public string Status { get; set; } = "Active";
    }
}
