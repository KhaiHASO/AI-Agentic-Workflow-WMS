using Microsoft.EntityFrameworkCore;
using WmsBackend.Models.Mdm;
using WmsBackend.Models.ErpStage;
using WmsBackend.Models.WmsCore;
using WmsBackend.Data;

namespace WmsBackend.Data
{
    public static class DbSeeder
    {
        public static async Task SeedAsync(WmsDbContext context)
        {
            if (await context.Warehouses.AnyAsync()) return;

            // 1. Warehouses & Locations
            var wh = new Warehouse { Code = "WH-MAIN", Name = "Main Warehouse", Status = "Active", CreatedAt = DateTime.UtcNow };
            context.Warehouses.Add(wh);
            await context.SaveChangesAsync();

            var zone = new Zone { WarehouseId = wh.Id, ZoneCode = "Z-PICK", ZoneType = "Picking", CreatedAt = DateTime.UtcNow };
            context.Zones.Add(zone);
            await context.SaveChangesAsync();

            var loc1 = new Location { WarehouseId = wh.Id, ZoneId = zone.Id, Code = "LOC-STAGING", Status = "Active", CreatedAt = DateTime.UtcNow }; // Id = 1 (Staging)
            var loc2 = new Location { WarehouseId = wh.Id, ZoneId = zone.Id, Code = "LOC-PACKING", Status = "Active", CreatedAt = DateTime.UtcNow }; // Id = 2 (Packing)
            var loc3 = new Location { WarehouseId = wh.Id, ZoneId = zone.Id, Code = "LOC-A-01-01", Status = "Active", CreatedAt = DateTime.UtcNow };
            context.Locations.AddRange(loc1, loc2, loc3);

            // 2. UOM & Items
            var uom = new Uom { Code = "PCS", Name = "Pieces", Status = "Active", CreatedAt = DateTime.UtcNow };
            context.Uoms.Add(uom);
            await context.SaveChangesAsync();

            var item1 = new Item { ItemCode = "ITEM-001", Name = "Laptop Dell XPS", BaseUomId = uom.Id, Status = "Active", CreatedAt = DateTime.UtcNow };
            var item2 = new Item { ItemCode = "ITEM-002", Name = "Mouse Logitech", BaseUomId = uom.Id, Status = "Active", CreatedAt = DateTime.UtcNow };
            context.Items.AddRange(item1, item2);
            await context.SaveChangesAsync();

            var barcode1 = new ItemBarcode { ItemId = item1.Id, Barcode = "DELLXPS001", UomId = uom.Id, CreatedAt = DateTime.UtcNow };
            var barcode2 = new ItemBarcode { ItemId = item2.Id, Barcode = "LOGIMOUSE002", UomId = uom.Id, CreatedAt = DateTime.UtcNow };
            context.ItemBarcodes.AddRange(barcode1, barcode2);

            // 3. Suppliers & PO
            var supplier = new Supplier { Code = "SUP-001", Name = "Dell Vietnam", Status = "Active", CreatedAt = DateTime.UtcNow };
            context.Suppliers.Add(supplier);
            await context.SaveChangesAsync();

            var po = new ErpPurchaseOrderHeader 
            { 
                PoNumber = "PO-2026-001", 
                WarehouseId = wh.Id, 
                SupplierId = supplier.Id, 
                ErpStatus = "Open", 
                CreatedAt = DateTime.UtcNow 
            };
            context.ErpPurchaseOrderHeaders.Add(po);
            await context.SaveChangesAsync();

            context.ErpPurchaseOrderLines.Add(new ErpPurchaseOrderLine { PoHeaderId = po.Id, ItemId = item1.Id, OrderedQty = 10, OpenQty = 10, UomId = uom.Id });
            context.ErpPurchaseOrderLines.Add(new ErpPurchaseOrderLine { PoHeaderId = po.Id, ItemId = item2.Id, OrderedQty = 50, OpenQty = 50, UomId = uom.Id });

            // 4. Inventory Status
            context.InventoryStatuses.Add(new InventoryStatus { StatusCode = "Available", IsAllocatable = true, CreatedAt = DateTime.UtcNow });

            await context.SaveChangesAsync();
        }
    }
}
