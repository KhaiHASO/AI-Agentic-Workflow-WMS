using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using WmsBackend.Models.Mdm;
using WmsBackend.Models.ErpStage;

namespace WmsBackend.Models.WmsCore
{
    [Table("InventoryOnHand", Schema = "wms_core")]
    public class InventoryOnHand : AuditEntity {
        [Key] public long Id { get; set; }
        public int WarehouseId { get; set; }
        public int LocationId { get; set; }
        public int ItemId { get; set; }
        public int? OwnerId { get; set; }
        public string? LotNo { get; set; }
        public string? SerialNumber { get; set; }
        public int? HandlingUnitId { get; set; }
        public int InventoryStatusId { get; set; }
        public decimal AvailableQty { get; set; }
        public decimal ReservedQty { get; set; }
        public decimal AllocatedQty { get; set; }
        public virtual Warehouse? Warehouse { get; set; }
        public virtual Location? Location { get; set; }
        public virtual Item? Item { get; set; }
        public virtual Owner? Owner { get; set; }
        public virtual InventoryStatus? InventoryStatus { get; set; }
        public virtual HandlingUnit? HandlingUnit { get; set; }
    }

    [Table("InventoryLedger", Schema = "wms_core")]
    public class InventoryLedger : AuditEntity {
        [Key] public long Id { get; set; }
        public string TransactionType { get; set; } = string.Empty;
        public int ItemId { get; set; }
        public decimal Qty { get; set; }
        public int? FromLocationId { get; set; }
        public int? ToLocationId { get; set; }
        public string? SourceDocId { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
        public virtual Item? Item { get; set; }
        public virtual Location? FromLocation { get; set; }
        public virtual Location? ToLocation { get; set; }
    }

    [Table("InventoryAdjustment", Schema = "wms_core")]
    public class InventoryAdjustment : AuditEntity {
        [Key] public int Id { get; set; }
        public int ItemId { get; set; }
        public int LocationId { get; set; }
        public decimal AdjustedQty { get; set; }
        public int? ReasonCodeId { get; set; }
        public int? ApprovedBy { get; set; }
        public string Status { get; set; } = "Pending";
        public virtual Item? Item { get; set; }
        public virtual Location? Location { get; set; }
        public virtual ReasonCode? ReasonCode { get; set; }
        public virtual ApplicationUser? Approver { get; set; }
    }

    [Table("InternalTransfer", Schema = "wms_core")]
    public class InternalTransfer : AuditEntity {
        [Key] public int Id { get; set; }
        [Required, StringLength(100)] public string TransferNo { get; set; } = string.Empty;
        public int ItemId { get; set; }
        public int FromLocationId { get; set; }
        public int ToLocationId { get; set; }
        public decimal Qty { get; set; }
        public int? ReasonCodeId { get; set; }
        public int? ApprovedBy { get; set; }
        public string Status { get; set; } = "Pending";
        public virtual Item? Item { get; set; }
        public virtual Location? FromLocation { get; set; }
        public virtual Location? ToLocation { get; set; }
        public virtual ReasonCode? ReasonCode { get; set; }
    }

    [Table("InboundReceiptHeader", Schema = "wms_core")]
    public class InboundReceiptHeader : AuditEntity {
        [Key] public int Id { get; set; }
        [Required, StringLength(100)] public string ReceiptNo { get; set; } = string.Empty;
        public int WarehouseId { get; set; }
        public int? SupplierId { get; set; }
        public string Status { get; set; } = "Draft";
        public virtual Warehouse? Warehouse { get; set; }
        public virtual Supplier? Supplier { get; set; }
        public virtual ICollection<DraftLine> Lines { get; set; } = new List<DraftLine>();
        public virtual ICollection<InboundReceiptLine> InboundLines { get; set; } = new List<InboundReceiptLine>();
    }

    [Table("InboundReceiptLine", Schema = "wms_core")]
    public class InboundReceiptLine : AuditEntity {
        [Key] public int Id { get; set; }
        public int ReceiptHeaderId { get; set; }
        public int? PoLineId { get; set; }
        public int ItemId { get; set; }
        public int? UomId { get; set; }
        public decimal ReceivedQty { get; set; }
        public decimal AcceptedQty { get; set; }
        public decimal RejectedQty { get; set; }
        public decimal HoldQty { get; set; }
        public int? ReasonCodeId { get; set; }
        public int? SubstituteItemId { get; set; }
        public string Status { get; set; } = "Completed";
        public virtual InboundReceiptHeader? ReceiptHeader { get; set; }
        public virtual Item? Item { get; set; }
        public virtual ReasonCode? ReasonCode { get; set; }
        public virtual ErpPurchaseOrderLine? PoLine { get; set; }
        public virtual Uom? Uom { get; set; }
    }

    [Table("DraftLine", Schema = "wms_core")]
    public class DraftLine : AuditEntity {
        [Key] public int Id { get; set; }
        public int ReceiptHeaderId { get; set; }
        public int ItemId { get; set; }
        public int? PoLineId { get; set; }
        public int? UomId { get; set; }
        public decimal ExpectedQty { get; set; }
        public decimal ReceivedQty { get; set; }
        public decimal AcceptedQty { get; set; }
        public decimal RejectedQty { get; set; }
        public decimal HoldQty { get; set; }
        public string? Status { get; set; }
        public virtual InboundReceiptHeader? ReceiptHeader { get; set; }
        public virtual Item? Item { get; set; }
    }

    [Table("Reservation", Schema = "wms_core")]
    public class Reservation : AuditEntity {
        [Key] public long Id { get; set; }
        public long InventoryId { get; set; }
        public decimal Qty { get; set; }
        public string DemandSourceType { get; set; } = "SO";
        public int DemandSourceId { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public string Status { get; set; } = "Active";
        public virtual InventoryOnHand? Inventory { get; set; }
    }

    [Table("Allocation", Schema = "wms_core")]
    public class Allocation : AuditEntity {
        [Key] public long Id { get; set; }
        public long ReservationId { get; set; }
        public int LocationId { get; set; }
        public decimal Qty { get; set; }
        public virtual Reservation? Reservation { get; set; }
        public virtual Location? Location { get; set; }
    }

    [Table("PickTask", Schema = "wms_core")]
    public class PickTask : AuditEntity {
        [Key] public long Id { get; set; }
        [Required, StringLength(100)] public string TaskNo { get; set; } = string.Empty;
        public int ItemId { get; set; }
        public int? SoLineId { get; set; }
        public int? SuggestedLocationId { get; set; }
        public string? LotNo { get; set; }
        public decimal RequestedQty { get; set; }
        public decimal PickedQty { get; set; }
        public string Status { get; set; } = "Pending";
        public int? AssignedTo { get; set; }
        public int? CompletedBy { get; set; }
        public DateTime? CompletedAt { get; set; }
        public virtual Item? Item { get; set; }
        public virtual Location? SuggestedLocation { get; set; }
        public virtual ApplicationUser? AssignedUser { get; set; }
        public virtual ErpSalesOrderLine? SoLine { get; set; }
    }

    [Table("PutawayTask", Schema = "wms_core")]
    public class PutawayTask : AuditEntity {
        [Key] public long Id { get; set; }
        [Required, StringLength(100)] public string TaskNo { get; set; } = string.Empty;
        public int ItemId { get; set; }
        public int? ReceiptHeaderId { get; set; }
        public int? TargetLocationId { get; set; }
        public int? HandlingUnitId { get; set; }
        public decimal Quantity { get; set; }
        public string Status { get; set; } = "Pending";
        public int? AssignedTo { get; set; }
        public virtual Item? Item { get; set; }
        public virtual InboundReceiptHeader? ReceiptHeader { get; set; }
        public virtual Location? TargetLocation { get; set; }
        public virtual HandlingUnit? HandlingUnit { get; set; }
        public virtual ApplicationUser? AssignedUser { get; set; }
    }

    [Table("ShipmentHeader", Schema = "wms_core")]
    public class ShipmentHeader : AuditEntity {
        [Key] public int Id { get; set; }
        [Required, StringLength(100)] public string ShipmentCode { get; set; } = string.Empty;
        public int WarehouseId { get; set; }
        public string Status { get; set; } = "New";
        public virtual Warehouse? Warehouse { get; set; }
    }

    [Table("ShipmentLine", Schema = "wms_core")]
    public class ShipmentLine : AuditEntity {
        [Key] public int Id { get; set; }
        public int ShipmentHeaderId { get; set; }
        public long? PickTaskId { get; set; }
        public decimal ShippedQty { get; set; }
        public virtual ShipmentHeader? ShipmentHeader { get; set; }
        public virtual PickTask? PickTask { get; set; }
    }

    [Table("WavePicking", Schema = "wms_core")]
    public class WavePicking : AuditEntity {
        [Key] public int Id { get; set; }
        [Required, StringLength(100)] public string WaveNo { get; set; } = string.Empty;
        public int WarehouseId { get; set; }
        public string Status { get; set; } = "New";
        public virtual Warehouse? Warehouse { get; set; }
    }

    [Table("WavePickingLine", Schema = "wms_core")]
    public class WavePickingLine : AuditEntity {
        [Key] public int Id { get; set; }
        public int WavePickingId { get; set; }
        public long PickTaskId { get; set; }
        public virtual WavePicking? WavePicking { get; set; }
        public virtual PickTask? PickTask { get; set; }
    }

    [Table("ReturnReceiptHeader", Schema = "wms_core")]
    public class ReturnReceiptHeader : AuditEntity {
        [Key] public int Id { get; set; }
        [Required, StringLength(100)] public string ReturnNo { get; set; } = string.Empty;
        public int WarehouseId { get; set; }
        public string Status { get; set; } = "Draft";
        public virtual Warehouse? Warehouse { get; set; }
    }

    [Table("ReturnReceiptLine", Schema = "wms_core")]
    public class ReturnReceiptLine : AuditEntity {
        [Key] public int Id { get; set; }
        public int ReturnHeaderId { get; set; }
        public int ItemId { get; set; }
        public decimal Qty { get; set; }
        public virtual ReturnReceiptHeader? ReturnHeader { get; set; }
        public virtual Item? Item { get; set; }
    }

    [Table("CrossDockingOrder", Schema = "wms_core")]
    public class CrossDockingOrder : AuditEntity {
        [Key] public int Id { get; set; }
        public int InboundReceiptId { get; set; }
        public int OutboundShipmentId { get; set; }
        public string Status { get; set; } = "Active";
        public virtual InboundReceiptHeader? InboundReceipt { get; set; }
        public virtual ShipmentHeader? OutboundShipment { get; set; }
    }

    [Table("BackorderTracking", Schema = "wms_core")]
    public class BackorderTracking : AuditEntity {
        [Key] public int Id { get; set; }
        public int SoLineId { get; set; }
        public decimal BackorderQty { get; set; }
        public string Status { get; set; } = "Open";
        public virtual ErpSalesOrderLine? SoLine { get; set; }
    }

    [Table("UserWarehouseMapping", Schema = "wms_core")]
    [PrimaryKey(nameof(UserId), nameof(WarehouseId))]
    public class UserWarehouseMapping : AuditEntity {
        public int UserId { get; set; }
        public int WarehouseId { get; set; }
        public virtual ApplicationUser? User { get; set; }
        public virtual Warehouse? Warehouse { get; set; }
    }

    [Table("HandlingUnit", Schema = "wms_core")]
    public class HandlingUnit : AuditEntity {
        [Key] public int Id { get; set; }
        [Required, StringLength(100)] public string HuBarcode { get; set; } = string.Empty;
        public int? LocationId { get; set; }
        public string Status { get; set; } = "Active";
        public virtual Location? Location { get; set; }
    }

    [Table("HandlingUnitContent", Schema = "wms_core")]
    public class HandlingUnitContent : AuditEntity {
        [Key] public int Id { get; set; }
        public int HandlingUnitId { get; set; }
        public int ItemId { get; set; }
        public decimal Qty { get; set; }
        public virtual HandlingUnit? HandlingUnit { get; set; }
        public virtual Item? Item { get; set; }
    }
}
