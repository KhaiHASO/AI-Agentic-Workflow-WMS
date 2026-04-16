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

            // MDM Constraints
            modelBuilder.Entity<Zone>()
                .HasIndex(z => new { z.ZoneCode, z.WarehouseId })
                .IsUnique();

            modelBuilder.Entity<Location>()
                .HasIndex(l => new { l.Code, l.WarehouseId })
                .IsUnique();

            modelBuilder.Entity<Item>()
                .HasIndex(i => i.ItemCode)
                .IsUnique();

            // Inventory OnHand Unique Constraint
            modelBuilder.Entity<InventoryOnHand>()
                .HasIndex(i => new { 
                    i.WarehouseId, 
                    i.LocationId, 
                    i.ItemId, 
                    i.LotNo, 
                    i.SerialNumber, 
                    i.HandlingUnitId, 
                    i.InventoryStatusId 
                })
                .IsUnique()
                .HasDatabaseName("UQ_InventoryOnHand");

            // Quality Control Computed Column
            modelBuilder.Entity<CycleCountLine>()
                .Property(p => p.Variance)
                .HasComputedColumnSql("[CountedQty] - [SystemQty]");
        }
    }
}
