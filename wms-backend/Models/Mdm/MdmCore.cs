using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WmsBackend.Models.Mdm
{
    [Table("Warehouse", Schema = "mdm")]
    public class Warehouse : AuditEntity {
        [Key] public int Id { get; set; }
        [Required, StringLength(50)] public string Code { get; set; } = string.Empty;
        public string? Name { get; set; }
        public string Status { get; set; } = "Active";
    }

    [Table("Zone", Schema = "mdm")]
    public class Zone : AuditEntity {
        [Key] public int Id { get; set; }
        public int WarehouseId { get; set; }
        [Required, StringLength(50)] public string ZoneCode { get; set; } = string.Empty;
        public string? ZoneType { get; set; }
        public virtual Warehouse? Warehouse { get; set; }
    }

    [Table("Location", Schema = "mdm")]
    public class Location : AuditEntity {
        [Key] public int Id { get; set; }
        public int WarehouseId { get; set; }
        public int? ZoneId { get; set; }
        public int? ProfileId { get; set; }
        [Required, StringLength(50)] public string Code { get; set; } = string.Empty;
        public string? Aisle { get; set; }
        public string? Rack { get; set; }
        public string? Level { get; set; }
        public string? Bin { get; set; }
        public string Status { get; set; } = "Active";
        public virtual Warehouse? Warehouse { get; set; }
        public virtual Zone? Zone { get; set; }
        public virtual LocationProfile? Profile { get; set; }
    }

    [Table("LocationProfile", Schema = "mdm")]
    public class LocationProfile : AuditEntity {
        [Key] public int Id { get; set; }
        public decimal MaxWeight { get; set; }
        public decimal MaxVolume { get; set; }
    }

    [Table("Item", Schema = "mdm")]
    public class Item : AuditEntity {
        [Key] public int Id { get; set; }
        [Required, StringLength(50)] public string ItemCode { get; set; } = string.Empty;
        public string? Name { get; set; }
        public int BaseUomId { get; set; }
        public string? PickStrategy { get; set; }
        public string Status { get; set; } = "Active";
        public bool IsLotControlled { get; set; }
        public bool IsSerialControlled { get; set; }
        public virtual Uom? BaseUom { get; set; }
    }

    [Table("ItemBarcode", Schema = "mdm")]
    public class ItemBarcode : AuditEntity {
        [Key] public int Id { get; set; }
        public int ItemId { get; set; }
        [Required, StringLength(100)] public string Barcode { get; set; } = string.Empty;
        public int? UomId { get; set; }
        public virtual Item? Item { get; set; }
        public virtual Uom? Uom { get; set; }
    }

    [Table("Owner", Schema = "mdm")]
    public class Owner : AuditEntity {
        [Key] public int Id { get; set; }
        [Required, StringLength(50)] public string Code { get; set; } = string.Empty;
        public string? Name { get; set; }
    }

    [Table("DispositionCode", Schema = "mdm")]
    public class DispositionCode : AuditEntity {
        [Key] public int Id { get; set; }
        [Required, StringLength(50)] public string Code { get; set; } = string.Empty;
        public string? Description { get; set; }
    }

    [Table("ItemWarehousePolicy", Schema = "mdm")]
    public class ItemWarehousePolicy : AuditEntity {
        [Key] public int Id { get; set; }
        public int ItemId { get; set; }
        public int WarehouseId { get; set; }
        public decimal MinStock { get; set; }
        public decimal MaxStock { get; set; }
        public virtual Item? Item { get; set; }
        public virtual Warehouse? Warehouse { get; set; }
    }

    [Table("UserDevice", Schema = "mdm")]
    public class UserDevice : AuditEntity {
        [Key] public int Id { get; set; }
        public int UserId { get; set; }
        [Required, StringLength(255)] public string DeviceId { get; set; } = string.Empty;
        public string? Status { get; set; }
        public virtual ApplicationUser? User { get; set; }
    }

    [Table("Uom", Schema = "mdm")]
    public class Uom : AuditEntity {
        [Key] public int Id { get; set; }
        [Required, StringLength(50)] public string Code { get; set; } = string.Empty;
        public string? Name { get; set; }
        public string Status { get; set; } = "Active";
    }

    [Table("UomConversion", Schema = "mdm")]
    public class UomConversion : AuditEntity {
        [Key] public int Id { get; set; }
        public int FromUomId { get; set; }
        public int ToUomId { get; set; }
        public decimal ConversionRate { get; set; }
        public virtual Uom? FromUom { get; set; }
        public virtual Uom? ToUom { get; set; }
    }

    [Table("InventoryStatus", Schema = "mdm")]
    public class InventoryStatus : AuditEntity {
        [Key] public int Id { get; set; }
        [Required, StringLength(50)] public string StatusCode { get; set; } = string.Empty;
        public bool IsAllocatable { get; set; } = true;
    }

    [Table("ReasonCode", Schema = "mdm")]
    public class ReasonCode : AuditEntity {
        [Key] public int Id { get; set; }
        [Required, StringLength(50)] public string Code { get; set; } = string.Empty;
        public string? Type { get; set; }
    }

    [Table("Supplier", Schema = "mdm")]
    public class Supplier : AuditEntity {
        [Key] public int Id { get; set; }
        [Required, StringLength(50)] public string Code { get; set; } = string.Empty;
        public string? Name { get; set; }
        public string Status { get; set; } = "Active";
    }

    [Table("Customer", Schema = "mdm")]
    public class Customer : AuditEntity {
        [Key] public int Id { get; set; }
        [Required, StringLength(50)] public string Code { get; set; } = string.Empty;
        public string? Name { get; set; }
        public string Status { get; set; } = "Active";
    }
}
