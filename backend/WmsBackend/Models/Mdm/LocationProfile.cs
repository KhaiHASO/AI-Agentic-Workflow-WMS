using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WmsBackend.Models.Mdm
{
    [Table("LocationProfile", Schema = "mdm")]
    public class LocationProfile
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string ProfileCode { get; set; } = string.Empty;

        public decimal? MaxWeight { get; set; }
        public decimal? MaxVolume { get; set; }
        public bool AllowMixedItems { get; set; } = false;
        public bool AllowMixedLots { get; set; } = false;
    }
}
