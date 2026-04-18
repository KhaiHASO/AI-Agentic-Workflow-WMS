using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WmsBackend.Models;
using WmsBackend.Models.Mdm;
using WmsBackend.Models.ErpStage;
using WmsBackend.Models.WmsCore;
using WmsBackend.Models.QualityControl;
using WmsBackend.Models.IntegrationAudit;

namespace WmsBackend.Data
{
    public class WmsDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, int>
    {
        public WmsDbContext(DbContextOptions<WmsDbContext> options) : base(options) { }

        // DB SETS
        public DbSet<Uom> Uoms { get; set; }
        public DbSet<UomConversion> UomConversions { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<ItemBarcode> ItemBarcodes { get; set; }
        public DbSet<Warehouse> Warehouses { get; set; }
        public DbSet<Zone> Zones { get; set; }
        public DbSet<Location> Locations { get; set; }
        public DbSet<LocationProfile> LocationProfiles { get; set; }
        public DbSet<Supplier> Suppliers { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<InventoryStatus> InventoryStatuses { get; set; }
        public DbSet<ReasonCode> ReasonCodes { get; set; }
        public DbSet<Owner> Owners { get; set; }
        public DbSet<DispositionCode> DispositionCodes { get; set; }
        public DbSet<ItemWarehousePolicy> ItemWarehousePolicies { get; set; }
        public DbSet<UserDevice> UserDevices { get; set; }

        public DbSet<ErpPurchaseOrderHeader> ErpPurchaseOrderHeaders { get; set; }
        public DbSet<ErpPurchaseOrderLine> ErpPurchaseOrderLines { get; set; }
        public DbSet<ErpSalesOrderHeader> ErpSalesOrderHeaders { get; set; }
        public DbSet<ErpSalesOrderLine> ErpSalesOrderLines { get; set; }
        public DbSet<ErpSyncRun> ErpSyncRuns { get; set; }
        public DbSet<ErpSyncError> ErpSyncErrors { get; set; }
        public DbSet<ErpReferenceMap> ErpReferenceMaps { get; set; }
        public DbSet<ErpDocumentStatusHistory> ErpDocumentStatusHistories { get; set; }

        public DbSet<InboundReceiptHeader> InboundReceiptHeaders { get; set; }
        public DbSet<InboundReceiptLine> InboundReceiptLines { get; set; }
        public DbSet<DraftLine> DraftLines { get; set; }
        public DbSet<InventoryOnHand> InventoryOnHands { get; set; }
        public DbSet<InventoryLedger> InventoryLedgers { get; set; }
        public DbSet<InventoryAdjustment> InventoryAdjustments { get; set; }
        public DbSet<InternalTransfer> InternalTransfers { get; set; }
        public DbSet<Reservation> Reservations { get; set; }
        public DbSet<Allocation> Allocations { get; set; }
        public DbSet<PickTask> PickTasks { get; set; }
        public DbSet<PutawayTask> PutawayTasks { get; set; }
        public DbSet<WavePicking> WavePickings { get; set; }
        public DbSet<WavePickingLine> WavePickingLines { get; set; }
        public DbSet<HandlingUnit> HandlingUnits { get; set; }
        public DbSet<HandlingUnitContent> HandlingUnitContents { get; set; }
        public DbSet<ShipmentHeader> ShipmentHeaders { get; set; }
        public DbSet<ShipmentLine> ShipmentLines { get; set; }
        public DbSet<UserWarehouseMapping> UserWarehouseMappings { get; set; }
        public DbSet<ReturnReceiptHeader> ReturnReceiptHeaders { get; set; }
        public DbSet<ReturnReceiptLine> ReturnReceiptLines { get; set; }
        public DbSet<CrossDockingOrder> CrossDockingOrders { get; set; }
        public DbSet<BackorderTracking> BackorderTrackings { get; set; }

        public DbSet<QualityOrder> QualityOrders { get; set; }
        public DbSet<QualityCheckResult> QualityCheckResults { get; set; }
        public DbSet<QuarantineOrder> QuarantineOrders { get; set; }
        public DbSet<CycleCountPlan> CycleCountPlans { get; set; }
        public DbSet<CycleCountSession> CycleCountSessions { get; set; }
        public DbSet<CycleCountLine> CycleCountLines { get; set; }
        public DbSet<CycleCountReview> CycleCountReviews { get; set; }
        public DbSet<CountAdjustmentApproval> CountAdjustmentApprovals { get; set; }

        public DbSet<MobileScanEvent> MobileScanEvents { get; set; }
        public DbSet<IntegrationInbox> IntegrationInboxes { get; set; }
        public DbSet<IntegrationOutbox> IntegrationOutboxes { get; set; }
        public DbSet<ApiCallLog> ApiCallLogs { get; set; }
        public DbSet<AuditLog> AuditLogs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // 1. GLOBAL SETTINGS
            foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
                relationship.DeleteBehavior = DeleteBehavior.Restrict;

            var decimalProperties = modelBuilder.Model.GetEntityTypes().SelectMany(t => t.GetProperties())
                .Where(p => p.ClrType == typeof(decimal) || p.ClrType == typeof(decimal?));
            foreach (var property in decimalProperties) { property.SetPrecision(18); property.SetScale(4); }

            // 2. UNIQUE CONSTRAINTS (MASTER & DOCUMENTS)
            modelBuilder.Entity<Warehouse>().HasIndex(w => w.Code).IsUnique();
            modelBuilder.Entity<Supplier>().HasIndex(s => s.Code).IsUnique();
            modelBuilder.Entity<Customer>().HasIndex(c => c.Code).IsUnique();
            modelBuilder.Entity<Uom>().HasIndex(u => u.Code).IsUnique();
            modelBuilder.Entity<Owner>().HasIndex(o => o.Code).IsUnique();
            modelBuilder.Entity<ReasonCode>().HasIndex(r => r.Code).IsUnique();
            modelBuilder.Entity<InventoryStatus>().HasIndex(s => s.StatusCode).IsUnique();
            modelBuilder.Entity<Location>().HasIndex(l => new { l.WarehouseId, l.Code }).IsUnique();

            modelBuilder.Entity<ErpPurchaseOrderHeader>().HasIndex(h => h.PoNumber).IsUnique();
            modelBuilder.Entity<ErpSalesOrderHeader>().HasIndex(h => h.SoNumber).IsUnique();
            modelBuilder.Entity<InboundReceiptHeader>().HasIndex(h => h.ReceiptNo).IsUnique();
            modelBuilder.Entity<ShipmentHeader>().HasIndex(h => h.ShipmentCode).IsUnique();
            modelBuilder.Entity<PickTask>().HasIndex(t => t.TaskNo).IsUnique();
            modelBuilder.Entity<PutawayTask>().HasIndex(t => t.TaskNo).IsUnique();
            modelBuilder.Entity<WavePicking>().HasIndex(w => w.WaveNo).IsUnique();
            modelBuilder.Entity<InternalTransfer>().HasIndex(t => t.TransferNo).IsUnique();
            modelBuilder.Entity<CycleCountSession>().HasIndex(s => s.SessionNo).IsUnique();
            modelBuilder.Entity<QualityOrder>().HasIndex(o => o.QualityOrderNo).IsUnique();
            modelBuilder.Entity<ReturnReceiptHeader>().HasIndex(h => h.ReturnNo).IsUnique();

            modelBuilder.Entity<HandlingUnit>().HasIndex(h => h.HuBarcode).IsUnique();
            modelBuilder.Entity<ItemBarcode>().HasIndex(b => b.Barcode).IsUnique();

            // 3. EXPLICIT RELATIONSHIPS (NO SHADOW COLUMNS)
            modelBuilder.Entity<ItemBarcode>()
                .HasOne(b => b.Uom).WithMany().HasForeignKey(b => b.UomId);

            modelBuilder.Entity<InboundReceiptLine>()
                .HasOne(l => l.PoLine).WithMany().HasForeignKey(l => l.PoLineId);
            modelBuilder.Entity<InboundReceiptLine>()
                .HasOne(l => l.Uom).WithMany().HasForeignKey(l => l.UomId);
            modelBuilder.Entity<InboundReceiptLine>()
                .HasOne(l => l.SubstituteItem).WithMany().HasForeignKey(l => l.SubstituteItemId);

            modelBuilder.Entity<DraftLine>()
                .HasOne(l => l.PoLine).WithMany().HasForeignKey(l => l.PoLineId);
            modelBuilder.Entity<DraftLine>()
                .HasOne(l => l.Uom).WithMany().HasForeignKey(l => l.UomId);

            modelBuilder.Entity<PickTask>()
                .HasOne(t => t.SoLine).WithMany().HasForeignKey(t => t.SoLineId);

            modelBuilder.Entity<BackorderTracking>()
                .HasOne(b => b.SoLine).WithMany().HasForeignKey(b => b.SoLineId);

            modelBuilder.Entity<ShipmentLine>()
                .HasOne(l => l.PickTask).WithMany().HasForeignKey(l => l.PickTaskId);

            modelBuilder.Entity<CycleCountReview>()
                .HasOne(r => r.Reviewer).WithMany().HasForeignKey(r => r.ReviewerId);

            modelBuilder.Entity<CountAdjustmentApproval>()
                .HasOne(a => a.Approver).WithMany().HasForeignKey(a => a.ApproverId);

            modelBuilder.Entity<UserWarehouseMapping>()
                .HasOne(uw => uw.User).WithMany().HasForeignKey(uw => uw.UserId);

            // 4. INVENTORY DIMENSION MASTER (ROBUST UNIQUE)
            modelBuilder.Entity<InventoryOnHand>()
                .HasIndex(i => new { i.WarehouseId, i.LocationId, i.ItemId, i.OwnerId, i.LotNo, i.SerialNumber, i.HandlingUnitId, i.InventoryStatusId })
                .IsUnique()
                .HasFilter(null)
                .HasDatabaseName("UQ_Inventory_Dimension_Master");

            // 5. IDEMPOTENCY KEYS
            modelBuilder.Entity<InboundReceiptHeader>().HasIndex(h => h.IdempotencyKey).IsUnique().HasFilter("[IdempotencyKey] IS NOT NULL");
            modelBuilder.Entity<ShipmentHeader>().HasIndex(h => h.IdempotencyKey).IsUnique().HasFilter("[IdempotencyKey] IS NOT NULL");
            modelBuilder.Entity<InventoryAdjustment>().HasIndex(a => a.IdempotencyKey).IsUnique().HasFilter("[IdempotencyKey] IS NOT NULL");
            modelBuilder.Entity<InternalTransfer>().HasIndex(t => t.IdempotencyKey).IsUnique().HasFilter("[IdempotencyKey] IS NOT NULL");
            modelBuilder.Entity<PickTask>().HasIndex(t => t.IdempotencyKey).IsUnique().HasFilter("[IdempotencyKey] IS NOT NULL");
            modelBuilder.Entity<PutawayTask>().HasIndex(t => t.IdempotencyKey).IsUnique().HasFilter("[IdempotencyKey] IS NOT NULL");
            modelBuilder.Entity<WavePicking>().HasIndex(w => w.IdempotencyKey).IsUnique().HasFilter("[IdempotencyKey] IS NOT NULL");
            modelBuilder.Entity<QualityOrder>().HasIndex(o => o.IdempotencyKey).IsUnique().HasFilter("[IdempotencyKey] IS NOT NULL");
            modelBuilder.Entity<CycleCountSession>().HasIndex(s => s.IdempotencyKey).IsUnique().HasFilter("[IdempotencyKey] IS NOT NULL");
            modelBuilder.Entity<MobileScanEvent>().HasIndex(e => e.ClientTxnId).IsUnique();

            // 6. IDENTITY MAPPINGS
            modelBuilder.Entity<UserWarehouseMapping>().HasKey(uw => new { uw.UserId, uw.WarehouseId });

            // 7. AUDIT & CONCURRENCY
            var auditEntities = modelBuilder.Model.GetEntityTypes().Where(e => typeof(AuditEntity).IsAssignableFrom(e.ClrType));
            foreach (var entity in auditEntities)
                modelBuilder.Entity(entity.ClrType).Property("RowVersion").IsRowVersion();

            modelBuilder.Entity<CycleCountLine>().Property(p => p.Variance).HasComputedColumnSql("[CountedQty] - [SystemQty]");
        }
    }
}
