using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WmsBackend.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddConstraintsAndIdempotency_V7 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "UQ_Inventory_Dimension_Master",
                schema: "wms_core",
                table: "InventoryOnHand");

            migrationBuilder.AddColumn<string>(
                name: "IdempotencyKey",
                schema: "wms_core",
                table: "WavePicking",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "IdempotencyKey",
                schema: "wms_core",
                table: "ShipmentHeader",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "IdempotencyKey",
                schema: "quality_control",
                table: "QualityOrder",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "IdempotencyKey",
                schema: "wms_core",
                table: "PutawayTask",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "IdempotencyKey",
                schema: "wms_core",
                table: "PickTask",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "IdempotencyKey",
                schema: "wms_core",
                table: "InventoryAdjustment",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "IdempotencyKey",
                schema: "wms_core",
                table: "InternalTransfer",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "IdempotencyKey",
                schema: "wms_core",
                table: "InboundReceiptHeader",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "IdempotencyKey",
                schema: "quality_control",
                table: "CycleCountSession",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_WavePicking_IdempotencyKey",
                schema: "wms_core",
                table: "WavePicking",
                column: "IdempotencyKey",
                unique: true,
                filter: "[IdempotencyKey] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_ShipmentHeader_IdempotencyKey",
                schema: "wms_core",
                table: "ShipmentHeader",
                column: "IdempotencyKey",
                unique: true,
                filter: "[IdempotencyKey] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_QualityOrder_IdempotencyKey",
                schema: "quality_control",
                table: "QualityOrder",
                column: "IdempotencyKey",
                unique: true,
                filter: "[IdempotencyKey] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_PutawayTask_IdempotencyKey",
                schema: "wms_core",
                table: "PutawayTask",
                column: "IdempotencyKey",
                unique: true,
                filter: "[IdempotencyKey] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_PickTask_IdempotencyKey",
                schema: "wms_core",
                table: "PickTask",
                column: "IdempotencyKey",
                unique: true,
                filter: "[IdempotencyKey] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_MobileScanEvent_ClientTxnId",
                schema: "integration_audit",
                table: "MobileScanEvent",
                column: "ClientTxnId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ItemBarcode_Barcode",
                schema: "mdm",
                table: "ItemBarcode",
                column: "Barcode",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "UQ_Inventory_Dimension_Master",
                schema: "wms_core",
                table: "InventoryOnHand",
                columns: new[] { "WarehouseId", "LocationId", "ItemId", "OwnerId", "LotNo", "SerialNumber", "HandlingUnitId", "InventoryStatusId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_InventoryAdjustment_IdempotencyKey",
                schema: "wms_core",
                table: "InventoryAdjustment",
                column: "IdempotencyKey",
                unique: true,
                filter: "[IdempotencyKey] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_InternalTransfer_IdempotencyKey",
                schema: "wms_core",
                table: "InternalTransfer",
                column: "IdempotencyKey",
                unique: true,
                filter: "[IdempotencyKey] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_InboundReceiptLine_SubstituteItemId",
                schema: "wms_core",
                table: "InboundReceiptLine",
                column: "SubstituteItemId");

            migrationBuilder.CreateIndex(
                name: "IX_InboundReceiptHeader_IdempotencyKey",
                schema: "wms_core",
                table: "InboundReceiptHeader",
                column: "IdempotencyKey",
                unique: true,
                filter: "[IdempotencyKey] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_HandlingUnit_HuBarcode",
                schema: "wms_core",
                table: "HandlingUnit",
                column: "HuBarcode",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_DraftLine_PoLineId",
                schema: "wms_core",
                table: "DraftLine",
                column: "PoLineId");

            migrationBuilder.CreateIndex(
                name: "IX_DraftLine_UomId",
                schema: "wms_core",
                table: "DraftLine",
                column: "UomId");

            migrationBuilder.CreateIndex(
                name: "IX_CycleCountSession_IdempotencyKey",
                schema: "quality_control",
                table: "CycleCountSession",
                column: "IdempotencyKey",
                unique: true,
                filter: "[IdempotencyKey] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_DraftLine_ErpPurchaseOrderLine_PoLineId",
                schema: "wms_core",
                table: "DraftLine",
                column: "PoLineId",
                principalSchema: "erp_stage",
                principalTable: "ErpPurchaseOrderLine",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_DraftLine_Uom_UomId",
                schema: "wms_core",
                table: "DraftLine",
                column: "UomId",
                principalSchema: "mdm",
                principalTable: "Uom",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_InboundReceiptLine_Item_SubstituteItemId",
                schema: "wms_core",
                table: "InboundReceiptLine",
                column: "SubstituteItemId",
                principalSchema: "mdm",
                principalTable: "Item",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DraftLine_ErpPurchaseOrderLine_PoLineId",
                schema: "wms_core",
                table: "DraftLine");

            migrationBuilder.DropForeignKey(
                name: "FK_DraftLine_Uom_UomId",
                schema: "wms_core",
                table: "DraftLine");

            migrationBuilder.DropForeignKey(
                name: "FK_InboundReceiptLine_Item_SubstituteItemId",
                schema: "wms_core",
                table: "InboundReceiptLine");

            migrationBuilder.DropIndex(
                name: "IX_WavePicking_IdempotencyKey",
                schema: "wms_core",
                table: "WavePicking");

            migrationBuilder.DropIndex(
                name: "IX_ShipmentHeader_IdempotencyKey",
                schema: "wms_core",
                table: "ShipmentHeader");

            migrationBuilder.DropIndex(
                name: "IX_QualityOrder_IdempotencyKey",
                schema: "quality_control",
                table: "QualityOrder");

            migrationBuilder.DropIndex(
                name: "IX_PutawayTask_IdempotencyKey",
                schema: "wms_core",
                table: "PutawayTask");

            migrationBuilder.DropIndex(
                name: "IX_PickTask_IdempotencyKey",
                schema: "wms_core",
                table: "PickTask");

            migrationBuilder.DropIndex(
                name: "IX_MobileScanEvent_ClientTxnId",
                schema: "integration_audit",
                table: "MobileScanEvent");

            migrationBuilder.DropIndex(
                name: "IX_ItemBarcode_Barcode",
                schema: "mdm",
                table: "ItemBarcode");

            migrationBuilder.DropIndex(
                name: "UQ_Inventory_Dimension_Master",
                schema: "wms_core",
                table: "InventoryOnHand");

            migrationBuilder.DropIndex(
                name: "IX_InventoryAdjustment_IdempotencyKey",
                schema: "wms_core",
                table: "InventoryAdjustment");

            migrationBuilder.DropIndex(
                name: "IX_InternalTransfer_IdempotencyKey",
                schema: "wms_core",
                table: "InternalTransfer");

            migrationBuilder.DropIndex(
                name: "IX_InboundReceiptLine_SubstituteItemId",
                schema: "wms_core",
                table: "InboundReceiptLine");

            migrationBuilder.DropIndex(
                name: "IX_InboundReceiptHeader_IdempotencyKey",
                schema: "wms_core",
                table: "InboundReceiptHeader");

            migrationBuilder.DropIndex(
                name: "IX_HandlingUnit_HuBarcode",
                schema: "wms_core",
                table: "HandlingUnit");

            migrationBuilder.DropIndex(
                name: "IX_DraftLine_PoLineId",
                schema: "wms_core",
                table: "DraftLine");

            migrationBuilder.DropIndex(
                name: "IX_DraftLine_UomId",
                schema: "wms_core",
                table: "DraftLine");

            migrationBuilder.DropIndex(
                name: "IX_CycleCountSession_IdempotencyKey",
                schema: "quality_control",
                table: "CycleCountSession");

            migrationBuilder.DropColumn(
                name: "IdempotencyKey",
                schema: "wms_core",
                table: "WavePicking");

            migrationBuilder.DropColumn(
                name: "IdempotencyKey",
                schema: "wms_core",
                table: "ShipmentHeader");

            migrationBuilder.DropColumn(
                name: "IdempotencyKey",
                schema: "quality_control",
                table: "QualityOrder");

            migrationBuilder.DropColumn(
                name: "IdempotencyKey",
                schema: "wms_core",
                table: "PutawayTask");

            migrationBuilder.DropColumn(
                name: "IdempotencyKey",
                schema: "wms_core",
                table: "PickTask");

            migrationBuilder.DropColumn(
                name: "IdempotencyKey",
                schema: "wms_core",
                table: "InventoryAdjustment");

            migrationBuilder.DropColumn(
                name: "IdempotencyKey",
                schema: "wms_core",
                table: "InternalTransfer");

            migrationBuilder.DropColumn(
                name: "IdempotencyKey",
                schema: "wms_core",
                table: "InboundReceiptHeader");

            migrationBuilder.DropColumn(
                name: "IdempotencyKey",
                schema: "quality_control",
                table: "CycleCountSession");

            migrationBuilder.CreateIndex(
                name: "UQ_Inventory_Dimension_Master",
                schema: "wms_core",
                table: "InventoryOnHand",
                columns: new[] { "WarehouseId", "LocationId", "ItemId", "OwnerId", "LotNo", "SerialNumber", "HandlingUnitId", "InventoryStatusId" },
                unique: true,
                filter: "[OwnerId] IS NOT NULL AND [LotNo] IS NOT NULL AND [SerialNumber] IS NOT NULL AND [HandlingUnitId] IS NOT NULL");
        }
    }
}
