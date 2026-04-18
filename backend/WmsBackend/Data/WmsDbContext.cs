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

        // MDM
        public DbSet<Uom> Uoms { get; set; }
        public DbSet<Supplier> Suppliers { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Warehouse> Warehouses { get; set; }
        public DbSet<Zone> Zones { get; set; }
        public DbSet<LocationProfile> LocationProfiles { get; set; }
        public DbSet<Location> Locations { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<ItemBarcode> ItemBarcodes { get; set; }
        public DbSet<UomConversion> UomConversions { get; set; }
        public DbSet<InventoryStatus> InventoryStatuses { get; set; }
        public DbSet<ReasonCode> ReasonCodes { get; set; }

        // ERP Stage
        public DbSet<ErpPurchaseOrderHeader> ErpPurchaseOrderHeaders { get; set; }
        public DbSet<ErpPurchaseOrderLine> ErpPurchaseOrderLines { get; set; }
        public DbSet<ErpSalesOrderHeader> ErpSalesOrderHeaders { get; set; }
        public DbSet<ErpSalesOrderLine> ErpSalesOrderLines { get; set; }

        // WMS Core
        public DbSet<InboundReceiptHeader> InboundReceiptHeaders { get; set; }
        public DbSet<DraftLine> DraftLines { get; set; }
        public DbSet<HandlingUnit> HandlingUnits { get; set; }
        public DbSet<InventoryLedger> InventoryLedgers { get; set; }
        public DbSet<InventoryOnHand> InventoryOnHands { get; set; }
        public DbSet<PutawayTask> PutawayTasks { get; set; }
        public DbSet<PickTask> PickTasks { get; set; }
        public DbSet<ShipmentHeader> ShipmentHeaders { get; set; }
        public DbSet<ShipmentLine> ShipmentLines { get; set; }
        public DbSet<UserWarehouseMapping> UserWarehouseMappings { get; set; }

        // Quality Control
        public DbSet<CycleCountSession> CycleCountSessions { get; set; }
        public DbSet<CycleCountLine> CycleCountLines { get; set; }
        public DbSet<QualityOrder> QualityOrders { get; set; }

        // Integration Audit
        public DbSet<MobileScanEvent> MobileScanEvents { get; set; }
        public DbSet<IntegrationOutbox> IntegrationOutboxes { get; set; }
        public DbSet<ApiCallLog> ApiCallLogs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // RULE 1 & 2: NO CASCADE DELETE (GLOBAL RESTRICT)
            foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
            {
                relationship.DeleteBehavior = DeleteBehavior.Restrict;
            }

            // RULE 3: DECIMAL PRECISION (18, 4) GLOBAL
            var decimalProperties = modelBuilder.Model.GetEntityTypes()
                .SelectMany(t => t.GetProperties())
                .Where(p => p.ClrType == typeof(decimal) || p.ClrType == typeof(decimal?));

            foreach (var property in decimalProperties)
            {
                property.SetPrecision(18);
                property.SetScale(4);
            }

            // RULE 4: UNIQUE INDEX FOR InventoryOnHand (Handling NULL)
            modelBuilder.Entity<InventoryOnHand>()
                .HasIndex(i => new { 
                    i.WarehouseId, i.LocationId, i.ItemId, 
                    i.LotNo, i.SerialNumber, i.HandlingUnitId, i.InventoryStatusId 
                })
                .IsUnique()
                .HasFilter("[HandlingUnitId] IS NOT NULL")
                .HasDatabaseName("UQ_InventoryOnHand_WithHU");

            modelBuilder.Entity<InventoryOnHand>()
                .HasIndex(i => new { 
                    i.WarehouseId, i.LocationId, i.ItemId, 
                    i.LotNo, i.SerialNumber, i.InventoryStatusId 
                })
                .IsUnique()
                .HasFilter("[HandlingUnitId] IS NULL")
                .HasDatabaseName("UQ_InventoryOnHand_NoHU");

            // Additional Uniques
            modelBuilder.Entity<Zone>()
                .HasIndex(z => new { z.ZoneCode, z.WarehouseId })
                .IsUnique();

            modelBuilder.Entity<Location>()
                .HasIndex(l => new { l.Code, l.WarehouseId })
                .IsUnique();

            modelBuilder.Entity<Item>()
                .HasIndex(i => i.ItemCode)
                .IsUnique();

            modelBuilder.Entity<MobileScanEvent>()
                .HasIndex(m => m.ClientTxnId).IsUnique();
            
            modelBuilder.Entity<IntegrationOutbox>()
                .HasIndex(o => o.IdempotencyKey).IsUnique();

            // Composite Keys
            modelBuilder.Entity<UserWarehouseMapping>()
                .HasKey(uw => new { uw.UserId, uw.WarehouseId });

            // Audit Trail Relationships (Fluent API mapping if needed for explicit control)
            modelBuilder.Entity<PickTask>()
                .HasOne<ApplicationUser>()
                .WithMany()
                .HasForeignKey(p => p.AssignedTo);

            modelBuilder.Entity<PickTask>()
                .HasOne<ApplicationUser>()
                .WithMany()
                .HasForeignKey(p => p.CompletedBy);

            modelBuilder.Entity<PutawayTask>()
                .HasOne<ApplicationUser>()
                .WithMany()
                .HasForeignKey(p => p.AssignedTo);

            modelBuilder.Entity<PutawayTask>()
                .HasOne<ApplicationUser>()
                .WithMany()
                .HasForeignKey(p => p.CompletedBy);

            // Computed Column
            modelBuilder.Entity<CycleCountLine>()
                .Property(p => p.Variance)
                .HasComputedColumnSql("[CountedQty] - [SystemQty]");

            // PERFORMANCE INDEXES (Chiến lược tăng tốc truy vấn Task & Header)
            modelBuilder.Entity<PickTask>().HasIndex(t => t.Status);
            modelBuilder.Entity<PutawayTask>().HasIndex(t => t.Status);
            
            modelBuilder.Entity<InboundReceiptHeader>().HasIndex(h => h.Status);
            modelBuilder.Entity<InboundReceiptHeader>().HasIndex(h => h.CreatedAt);
            
            modelBuilder.Entity<ShipmentHeader>().HasIndex(h => h.Status);
            modelBuilder.Entity<ShipmentHeader>().HasIndex(h => h.CreatedDate);
            
            modelBuilder.Entity<ErpPurchaseOrderHeader>().HasIndex(h => h.ErpStatus);
            modelBuilder.Entity<ErpPurchaseOrderHeader>().HasIndex(h => h.ExpectedDate);
            
            modelBuilder.Entity<ErpSalesOrderHeader>().HasIndex(h => h.ErpStatus);
            modelBuilder.Entity<ErpSalesOrderHeader>().HasIndex(h => h.ExpectedDate);

            // GLOBAL QUERY FILTERS (Cơ chế Soft-Delete thông minh)
            // Tự động loại bỏ các bản ghi bị đánh dấu "Deleted" hoặc "Cancelled" nếu cần thiết
            modelBuilder.Entity<Warehouse>().HasQueryFilter(w => w.Status != "Deleted");
            modelBuilder.Entity<Item>().HasQueryFilter(i => i.Status != "Deleted");
            modelBuilder.Entity<Location>().HasQueryFilter(l => l.Status != "Deleted");
            
            modelBuilder.Entity<PickTask>().HasQueryFilter(t => t.Status != "Deleted");
            modelBuilder.Entity<PutawayTask>().HasQueryFilter(t => t.Status != "Deleted");
            
            // CONCURRENCY TOKEN CONFIGURATION (RowVersion)
            modelBuilder.Entity<InventoryOnHand>().Property(p => p.RowVersion).IsRowVersion();
            modelBuilder.Entity<DraftLine>().Property(p => p.RowVersion).IsRowVersion();
        }
    }
}
