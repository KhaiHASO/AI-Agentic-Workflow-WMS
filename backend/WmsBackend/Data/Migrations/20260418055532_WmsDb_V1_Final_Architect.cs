using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WmsBackend.Data.Migrations
{
    /// <inheritdoc />
    public partial class WmsDb_V1_Final_Architect : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "integration_audit");

            migrationBuilder.EnsureSchema(
                name: "mdm");

            migrationBuilder.EnsureSchema(
                name: "quality_control");

            migrationBuilder.EnsureSchema(
                name: "wms_core");

            migrationBuilder.EnsureSchema(
                name: "erp_stage");

            migrationBuilder.CreateTable(
                name: "ApiCallLog",
                schema: "integration_audit",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Endpoint = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Method = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
                    RequestPayload = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ResponsePayload = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StatusCode = table.Column<int>(type: "int", nullable: true),
                    CorrelationId = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Timestamp = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApiCallLog", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FullName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Department = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Designation = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    Email = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SecurityStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "bit", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "bit", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Customer",
                schema: "mdm",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Status = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Customer", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "IntegrationOutbox",
                schema: "integration_audit",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdempotencyKey = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    MessageType = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Payload = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    RetryCount = table.Column<int>(type: "int", nullable: false),
                    ErrorMessage = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IntegrationOutbox", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "InventoryStatus",
                schema: "mdm",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StatusCode = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    IsAllocatable = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InventoryStatus", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "LocationProfile",
                schema: "mdm",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProfileCode = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    MaxWeight = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: true),
                    MaxVolume = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: true),
                    AllowMixedItems = table.Column<bool>(type: "bit", nullable: false),
                    AllowMixedLots = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LocationProfile", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ReasonCode",
                schema: "mdm",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Type = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Description = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReasonCode", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Supplier",
                schema: "mdm",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Status = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Supplier", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Uom",
                schema: "mdm",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Uom", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Warehouse",
                schema: "mdm",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Warehouse", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleId = table.Column<int>(type: "int", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProviderKey = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false),
                    RoleId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false),
                    LoginProvider = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "MobileScanEvent",
                schema: "integration_audit",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ClientTxnId = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Barcode = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    ScannedQty = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: true),
                    LocationCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<int>(type: "int", nullable: true),
                    ScanTime = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MobileScanEvent", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MobileScanEvent_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Item",
                schema: "mdm",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ItemCode = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    BaseUomId = table.Column<int>(type: "int", nullable: true),
                    IsLotControlled = table.Column<bool>(type: "bit", nullable: false),
                    IsSerialControlled = table.Column<bool>(type: "bit", nullable: false),
                    ShelfLifeDays = table.Column<int>(type: "int", nullable: true),
                    PickStrategy = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Status = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Item", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Item_Uom_BaseUomId",
                        column: x => x.BaseUomId,
                        principalSchema: "mdm",
                        principalTable: "Uom",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ErpPurchaseOrderHeader",
                schema: "erp_stage",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PoNumber = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    SupplierId = table.Column<int>(type: "int", nullable: true),
                    WarehouseId = table.Column<int>(type: "int", nullable: false),
                    ExpectedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ErpStatus = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    VersionHash = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ErpPurchaseOrderHeader", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ErpPurchaseOrderHeader_Supplier_SupplierId",
                        column: x => x.SupplierId,
                        principalSchema: "mdm",
                        principalTable: "Supplier",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ErpPurchaseOrderHeader_Warehouse_WarehouseId",
                        column: x => x.WarehouseId,
                        principalSchema: "mdm",
                        principalTable: "Warehouse",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ErpSalesOrderHeader",
                schema: "erp_stage",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SoNumber = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    CustomerId = table.Column<int>(type: "int", nullable: true),
                    WarehouseId = table.Column<int>(type: "int", nullable: false),
                    ExpectedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ErpStatus = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    VersionHash = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ErpSalesOrderHeader", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ErpSalesOrderHeader_Customer_CustomerId",
                        column: x => x.CustomerId,
                        principalSchema: "mdm",
                        principalTable: "Customer",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ErpSalesOrderHeader_Warehouse_WarehouseId",
                        column: x => x.WarehouseId,
                        principalSchema: "mdm",
                        principalTable: "Warehouse",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "InboundReceiptHeader",
                schema: "wms_core",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ReceiptNo = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    SupplierId = table.Column<int>(type: "int", nullable: true),
                    WarehouseId = table.Column<int>(type: "int", nullable: false),
                    VehicleNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InboundReceiptHeader", x => x.Id);
                    table.ForeignKey(
                        name: "FK_InboundReceiptHeader_Supplier_SupplierId",
                        column: x => x.SupplierId,
                        principalSchema: "mdm",
                        principalTable: "Supplier",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_InboundReceiptHeader_Warehouse_WarehouseId",
                        column: x => x.WarehouseId,
                        principalSchema: "mdm",
                        principalTable: "Warehouse",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ShipmentHeader",
                schema: "wms_core",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ShipmentCode = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    WarehouseId = table.Column<int>(type: "int", nullable: false),
                    Carrier = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    VehicleNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Dock = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ShipmentHeader", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ShipmentHeader_Warehouse_WarehouseId",
                        column: x => x.WarehouseId,
                        principalSchema: "mdm",
                        principalTable: "Warehouse",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UserWarehouseMapping",
                schema: "wms_core",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false),
                    WarehouseId = table.Column<int>(type: "int", nullable: false),
                    AssignedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserWarehouseMapping", x => new { x.UserId, x.WarehouseId });
                    table.ForeignKey(
                        name: "FK_UserWarehouseMapping_Warehouse_WarehouseId",
                        column: x => x.WarehouseId,
                        principalSchema: "mdm",
                        principalTable: "Warehouse",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Zone",
                schema: "mdm",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    WarehouseId = table.Column<int>(type: "int", nullable: false),
                    ZoneCode = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    ZoneType = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Zone", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Zone_Warehouse_WarehouseId",
                        column: x => x.WarehouseId,
                        principalSchema: "mdm",
                        principalTable: "Warehouse",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ItemBarcode",
                schema: "mdm",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ItemId = table.Column<int>(type: "int", nullable: false),
                    UomId = table.Column<int>(type: "int", nullable: true),
                    Barcode = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    BarcodeType = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ItemBarcode", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ItemBarcode_Item_ItemId",
                        column: x => x.ItemId,
                        principalSchema: "mdm",
                        principalTable: "Item",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ItemBarcode_Uom_UomId",
                        column: x => x.UomId,
                        principalSchema: "mdm",
                        principalTable: "Uom",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UomConversion",
                schema: "mdm",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FromUomId = table.Column<int>(type: "int", nullable: false),
                    ToUomId = table.Column<int>(type: "int", nullable: false),
                    ItemId = table.Column<int>(type: "int", nullable: true),
                    ConversionRate = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UomConversion", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UomConversion_Item_ItemId",
                        column: x => x.ItemId,
                        principalSchema: "mdm",
                        principalTable: "Item",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UomConversion_Uom_FromUomId",
                        column: x => x.FromUomId,
                        principalSchema: "mdm",
                        principalTable: "Uom",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UomConversion_Uom_ToUomId",
                        column: x => x.ToUomId,
                        principalSchema: "mdm",
                        principalTable: "Uom",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ErpPurchaseOrderLine",
                schema: "erp_stage",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PoHeaderId = table.Column<int>(type: "int", nullable: false),
                    LineNo = table.Column<int>(type: "int", nullable: false),
                    ItemId = table.Column<int>(type: "int", nullable: false),
                    UomId = table.Column<int>(type: "int", nullable: true),
                    OrderedQty = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    OpenQty = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ErpPurchaseOrderLine", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ErpPurchaseOrderLine_ErpPurchaseOrderHeader_PoHeaderId",
                        column: x => x.PoHeaderId,
                        principalSchema: "erp_stage",
                        principalTable: "ErpPurchaseOrderHeader",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ErpPurchaseOrderLine_Item_ItemId",
                        column: x => x.ItemId,
                        principalSchema: "mdm",
                        principalTable: "Item",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ErpPurchaseOrderLine_Uom_UomId",
                        column: x => x.UomId,
                        principalSchema: "mdm",
                        principalTable: "Uom",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ErpSalesOrderLine",
                schema: "erp_stage",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SoHeaderId = table.Column<int>(type: "int", nullable: false),
                    LineNo = table.Column<int>(type: "int", nullable: false),
                    ItemId = table.Column<int>(type: "int", nullable: false),
                    UomId = table.Column<int>(type: "int", nullable: true),
                    OrderedQty = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    OpenQty = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ErpSalesOrderLine", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ErpSalesOrderLine_ErpSalesOrderHeader_SoHeaderId",
                        column: x => x.SoHeaderId,
                        principalSchema: "erp_stage",
                        principalTable: "ErpSalesOrderHeader",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ErpSalesOrderLine_Item_ItemId",
                        column: x => x.ItemId,
                        principalSchema: "mdm",
                        principalTable: "Item",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ErpSalesOrderLine_Uom_UomId",
                        column: x => x.UomId,
                        principalSchema: "mdm",
                        principalTable: "Uom",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CycleCountSession",
                schema: "quality_control",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SessionNo = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    ZoneId = table.Column<int>(type: "int", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CycleCountSession", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CycleCountSession_Zone_ZoneId",
                        column: x => x.ZoneId,
                        principalSchema: "mdm",
                        principalTable: "Zone",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Location",
                schema: "mdm",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    WarehouseId = table.Column<int>(type: "int", nullable: false),
                    ZoneId = table.Column<int>(type: "int", nullable: true),
                    ProfileId = table.Column<int>(type: "int", nullable: true),
                    Code = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Aisle = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Rack = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Level = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Bin = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Status = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Location", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Location_LocationProfile_ProfileId",
                        column: x => x.ProfileId,
                        principalSchema: "mdm",
                        principalTable: "LocationProfile",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Location_Warehouse_WarehouseId",
                        column: x => x.WarehouseId,
                        principalSchema: "mdm",
                        principalTable: "Warehouse",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Location_Zone_ZoneId",
                        column: x => x.ZoneId,
                        principalSchema: "mdm",
                        principalTable: "Zone",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "DraftLine",
                schema: "wms_core",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ReceiptHeaderId = table.Column<int>(type: "int", nullable: false),
                    PoLineId = table.Column<int>(type: "int", nullable: true),
                    ItemId = table.Column<int>(type: "int", nullable: false),
                    UomId = table.Column<int>(type: "int", nullable: true),
                    ExpectedQty = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    ReceivedQty = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    AcceptedQty = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    RejectedQty = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    HoldQty = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    SubstituteItemId = table.Column<int>(type: "int", nullable: true),
                    ReasonCodeId = table.Column<int>(type: "int", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AssignedTo = table.Column<int>(type: "int", nullable: true),
                    CompletedBy = table.Column<int>(type: "int", nullable: true),
                    CompletedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DraftLine", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DraftLine_ErpPurchaseOrderLine_PoLineId",
                        column: x => x.PoLineId,
                        principalSchema: "erp_stage",
                        principalTable: "ErpPurchaseOrderLine",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_DraftLine_InboundReceiptHeader_ReceiptHeaderId",
                        column: x => x.ReceiptHeaderId,
                        principalSchema: "wms_core",
                        principalTable: "InboundReceiptHeader",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_DraftLine_Item_ItemId",
                        column: x => x.ItemId,
                        principalSchema: "mdm",
                        principalTable: "Item",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_DraftLine_Item_SubstituteItemId",
                        column: x => x.SubstituteItemId,
                        principalSchema: "mdm",
                        principalTable: "Item",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_DraftLine_ReasonCode_ReasonCodeId",
                        column: x => x.ReasonCodeId,
                        principalSchema: "mdm",
                        principalTable: "ReasonCode",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_DraftLine_Uom_UomId",
                        column: x => x.UomId,
                        principalSchema: "mdm",
                        principalTable: "Uom",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CycleCountLine",
                schema: "quality_control",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SessionId = table.Column<int>(type: "int", nullable: false),
                    LocationId = table.Column<int>(type: "int", nullable: false),
                    ItemId = table.Column<int>(type: "int", nullable: false),
                    LotNo = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    SystemQty = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    CountedQty = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    Variance = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false, computedColumnSql: "[CountedQty] - [SystemQty]"),
                    Status = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CycleCountLine", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CycleCountLine_CycleCountSession_SessionId",
                        column: x => x.SessionId,
                        principalSchema: "quality_control",
                        principalTable: "CycleCountSession",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CycleCountLine_Item_ItemId",
                        column: x => x.ItemId,
                        principalSchema: "mdm",
                        principalTable: "Item",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CycleCountLine_Location_LocationId",
                        column: x => x.LocationId,
                        principalSchema: "mdm",
                        principalTable: "Location",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "HandlingUnit",
                schema: "wms_core",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LicensePlate = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    LocationId = table.Column<int>(type: "int", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HandlingUnit", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HandlingUnit_Location_LocationId",
                        column: x => x.LocationId,
                        principalSchema: "mdm",
                        principalTable: "Location",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "InventoryLedger",
                schema: "wms_core",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TransactionType = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    ItemId = table.Column<int>(type: "int", nullable: false),
                    LotNo = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Qty = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    FromLocationId = table.Column<int>(type: "int", nullable: true),
                    ToLocationId = table.Column<int>(type: "int", nullable: true),
                    SourceDocId = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Timestamp = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InventoryLedger", x => x.Id);
                    table.ForeignKey(
                        name: "FK_InventoryLedger_Item_ItemId",
                        column: x => x.ItemId,
                        principalSchema: "mdm",
                        principalTable: "Item",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_InventoryLedger_Location_FromLocationId",
                        column: x => x.FromLocationId,
                        principalSchema: "mdm",
                        principalTable: "Location",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_InventoryLedger_Location_ToLocationId",
                        column: x => x.ToLocationId,
                        principalSchema: "mdm",
                        principalTable: "Location",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PickTask",
                schema: "wms_core",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TaskNo = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    SoLineId = table.Column<int>(type: "int", nullable: true),
                    SuggestedLocationId = table.Column<int>(type: "int", nullable: true),
                    ItemId = table.Column<int>(type: "int", nullable: false),
                    LotNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RequestedQty = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: true),
                    PickedQty = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    Status = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    AssignedTo = table.Column<int>(type: "int", nullable: true),
                    CompletedBy = table.Column<int>(type: "int", nullable: true),
                    CompletedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PickTask", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PickTask_AspNetUsers_AssignedTo",
                        column: x => x.AssignedTo,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PickTask_AspNetUsers_CompletedBy",
                        column: x => x.CompletedBy,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PickTask_ErpSalesOrderLine_SoLineId",
                        column: x => x.SoLineId,
                        principalSchema: "erp_stage",
                        principalTable: "ErpSalesOrderLine",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PickTask_Item_ItemId",
                        column: x => x.ItemId,
                        principalSchema: "mdm",
                        principalTable: "Item",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PickTask_Location_SuggestedLocationId",
                        column: x => x.SuggestedLocationId,
                        principalSchema: "mdm",
                        principalTable: "Location",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "QualityOrder",
                schema: "quality_control",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    QualityOrderId = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    DraftLineId = table.Column<int>(type: "int", nullable: true),
                    ItemId = table.Column<int>(type: "int", nullable: false),
                    LotNo = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Qty = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    Status = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QualityOrder", x => x.Id);
                    table.ForeignKey(
                        name: "FK_QualityOrder_DraftLine_DraftLineId",
                        column: x => x.DraftLineId,
                        principalSchema: "wms_core",
                        principalTable: "DraftLine",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_QualityOrder_Item_ItemId",
                        column: x => x.ItemId,
                        principalSchema: "mdm",
                        principalTable: "Item",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "InventoryOnHand",
                schema: "wms_core",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    WarehouseId = table.Column<int>(type: "int", nullable: false),
                    LocationId = table.Column<int>(type: "int", nullable: false),
                    ItemId = table.Column<int>(type: "int", nullable: false),
                    LotNo = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    SerialNumber = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    HandlingUnitId = table.Column<int>(type: "int", nullable: true),
                    InventoryStatusId = table.Column<int>(type: "int", nullable: false),
                    AvailableQty = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    ReservedQty = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InventoryOnHand", x => x.Id);
                    table.ForeignKey(
                        name: "FK_InventoryOnHand_HandlingUnit_HandlingUnitId",
                        column: x => x.HandlingUnitId,
                        principalSchema: "wms_core",
                        principalTable: "HandlingUnit",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_InventoryOnHand_InventoryStatus_InventoryStatusId",
                        column: x => x.InventoryStatusId,
                        principalSchema: "mdm",
                        principalTable: "InventoryStatus",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_InventoryOnHand_Item_ItemId",
                        column: x => x.ItemId,
                        principalSchema: "mdm",
                        principalTable: "Item",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_InventoryOnHand_Location_LocationId",
                        column: x => x.LocationId,
                        principalSchema: "mdm",
                        principalTable: "Location",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_InventoryOnHand_Warehouse_WarehouseId",
                        column: x => x.WarehouseId,
                        principalSchema: "mdm",
                        principalTable: "Warehouse",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PutawayTask",
                schema: "wms_core",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TaskNo = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    ReceiptHeaderId = table.Column<int>(type: "int", nullable: true),
                    ItemId = table.Column<int>(type: "int", nullable: false),
                    HandlingUnitId = table.Column<int>(type: "int", nullable: true),
                    TargetLocationId = table.Column<int>(type: "int", nullable: true),
                    Quantity = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: true),
                    Status = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    AssignedTo = table.Column<int>(type: "int", nullable: true),
                    CompletedBy = table.Column<int>(type: "int", nullable: true),
                    CompletedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PutawayTask", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PutawayTask_AspNetUsers_AssignedTo",
                        column: x => x.AssignedTo,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PutawayTask_AspNetUsers_CompletedBy",
                        column: x => x.CompletedBy,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PutawayTask_HandlingUnit_HandlingUnitId",
                        column: x => x.HandlingUnitId,
                        principalSchema: "wms_core",
                        principalTable: "HandlingUnit",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PutawayTask_InboundReceiptHeader_ReceiptHeaderId",
                        column: x => x.ReceiptHeaderId,
                        principalSchema: "wms_core",
                        principalTable: "InboundReceiptHeader",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PutawayTask_Item_ItemId",
                        column: x => x.ItemId,
                        principalSchema: "mdm",
                        principalTable: "Item",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PutawayTask_Location_TargetLocationId",
                        column: x => x.TargetLocationId,
                        principalSchema: "mdm",
                        principalTable: "Location",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ShipmentLine",
                schema: "wms_core",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ShipmentHeaderId = table.Column<int>(type: "int", nullable: false),
                    PickTaskId = table.Column<long>(type: "bigint", nullable: true),
                    SoLineId = table.Column<int>(type: "int", nullable: true),
                    ShippedQty = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ShipmentLine", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ShipmentLine_PickTask_PickTaskId",
                        column: x => x.PickTaskId,
                        principalSchema: "wms_core",
                        principalTable: "PickTask",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ShipmentLine_ShipmentHeader_ShipmentHeaderId",
                        column: x => x.ShipmentHeaderId,
                        principalSchema: "wms_core",
                        principalTable: "ShipmentHeader",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true,
                filter: "[NormalizedName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true,
                filter: "[NormalizedUserName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_CycleCountLine_ItemId",
                schema: "quality_control",
                table: "CycleCountLine",
                column: "ItemId");

            migrationBuilder.CreateIndex(
                name: "IX_CycleCountLine_LocationId",
                schema: "quality_control",
                table: "CycleCountLine",
                column: "LocationId");

            migrationBuilder.CreateIndex(
                name: "IX_CycleCountLine_SessionId",
                schema: "quality_control",
                table: "CycleCountLine",
                column: "SessionId");

            migrationBuilder.CreateIndex(
                name: "IX_CycleCountSession_ZoneId",
                schema: "quality_control",
                table: "CycleCountSession",
                column: "ZoneId");

            migrationBuilder.CreateIndex(
                name: "IX_DraftLine_ItemId",
                schema: "wms_core",
                table: "DraftLine",
                column: "ItemId");

            migrationBuilder.CreateIndex(
                name: "IX_DraftLine_PoLineId",
                schema: "wms_core",
                table: "DraftLine",
                column: "PoLineId");

            migrationBuilder.CreateIndex(
                name: "IX_DraftLine_ReasonCodeId",
                schema: "wms_core",
                table: "DraftLine",
                column: "ReasonCodeId");

            migrationBuilder.CreateIndex(
                name: "IX_DraftLine_ReceiptHeaderId",
                schema: "wms_core",
                table: "DraftLine",
                column: "ReceiptHeaderId");

            migrationBuilder.CreateIndex(
                name: "IX_DraftLine_SubstituteItemId",
                schema: "wms_core",
                table: "DraftLine",
                column: "SubstituteItemId");

            migrationBuilder.CreateIndex(
                name: "IX_DraftLine_UomId",
                schema: "wms_core",
                table: "DraftLine",
                column: "UomId");

            migrationBuilder.CreateIndex(
                name: "IX_ErpPurchaseOrderHeader_ErpStatus",
                schema: "erp_stage",
                table: "ErpPurchaseOrderHeader",
                column: "ErpStatus");

            migrationBuilder.CreateIndex(
                name: "IX_ErpPurchaseOrderHeader_ExpectedDate",
                schema: "erp_stage",
                table: "ErpPurchaseOrderHeader",
                column: "ExpectedDate");

            migrationBuilder.CreateIndex(
                name: "IX_ErpPurchaseOrderHeader_SupplierId",
                schema: "erp_stage",
                table: "ErpPurchaseOrderHeader",
                column: "SupplierId");

            migrationBuilder.CreateIndex(
                name: "IX_ErpPurchaseOrderHeader_WarehouseId",
                schema: "erp_stage",
                table: "ErpPurchaseOrderHeader",
                column: "WarehouseId");

            migrationBuilder.CreateIndex(
                name: "IX_ErpPurchaseOrderLine_ItemId",
                schema: "erp_stage",
                table: "ErpPurchaseOrderLine",
                column: "ItemId");

            migrationBuilder.CreateIndex(
                name: "IX_ErpPurchaseOrderLine_PoHeaderId",
                schema: "erp_stage",
                table: "ErpPurchaseOrderLine",
                column: "PoHeaderId");

            migrationBuilder.CreateIndex(
                name: "IX_ErpPurchaseOrderLine_UomId",
                schema: "erp_stage",
                table: "ErpPurchaseOrderLine",
                column: "UomId");

            migrationBuilder.CreateIndex(
                name: "IX_ErpSalesOrderHeader_CustomerId",
                schema: "erp_stage",
                table: "ErpSalesOrderHeader",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_ErpSalesOrderHeader_ErpStatus",
                schema: "erp_stage",
                table: "ErpSalesOrderHeader",
                column: "ErpStatus");

            migrationBuilder.CreateIndex(
                name: "IX_ErpSalesOrderHeader_ExpectedDate",
                schema: "erp_stage",
                table: "ErpSalesOrderHeader",
                column: "ExpectedDate");

            migrationBuilder.CreateIndex(
                name: "IX_ErpSalesOrderHeader_WarehouseId",
                schema: "erp_stage",
                table: "ErpSalesOrderHeader",
                column: "WarehouseId");

            migrationBuilder.CreateIndex(
                name: "IX_ErpSalesOrderLine_ItemId",
                schema: "erp_stage",
                table: "ErpSalesOrderLine",
                column: "ItemId");

            migrationBuilder.CreateIndex(
                name: "IX_ErpSalesOrderLine_SoHeaderId",
                schema: "erp_stage",
                table: "ErpSalesOrderLine",
                column: "SoHeaderId");

            migrationBuilder.CreateIndex(
                name: "IX_ErpSalesOrderLine_UomId",
                schema: "erp_stage",
                table: "ErpSalesOrderLine",
                column: "UomId");

            migrationBuilder.CreateIndex(
                name: "IX_HandlingUnit_LocationId",
                schema: "wms_core",
                table: "HandlingUnit",
                column: "LocationId");

            migrationBuilder.CreateIndex(
                name: "IX_InboundReceiptHeader_CreatedAt",
                schema: "wms_core",
                table: "InboundReceiptHeader",
                column: "CreatedAt");

            migrationBuilder.CreateIndex(
                name: "IX_InboundReceiptHeader_Status",
                schema: "wms_core",
                table: "InboundReceiptHeader",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_InboundReceiptHeader_SupplierId",
                schema: "wms_core",
                table: "InboundReceiptHeader",
                column: "SupplierId");

            migrationBuilder.CreateIndex(
                name: "IX_InboundReceiptHeader_WarehouseId",
                schema: "wms_core",
                table: "InboundReceiptHeader",
                column: "WarehouseId");

            migrationBuilder.CreateIndex(
                name: "IX_IntegrationOutbox_IdempotencyKey",
                schema: "integration_audit",
                table: "IntegrationOutbox",
                column: "IdempotencyKey",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_InventoryLedger_FromLocationId",
                schema: "wms_core",
                table: "InventoryLedger",
                column: "FromLocationId");

            migrationBuilder.CreateIndex(
                name: "IX_InventoryLedger_ItemId",
                schema: "wms_core",
                table: "InventoryLedger",
                column: "ItemId");

            migrationBuilder.CreateIndex(
                name: "IX_InventoryLedger_ToLocationId",
                schema: "wms_core",
                table: "InventoryLedger",
                column: "ToLocationId");

            migrationBuilder.CreateIndex(
                name: "IX_InventoryOnHand_HandlingUnitId",
                schema: "wms_core",
                table: "InventoryOnHand",
                column: "HandlingUnitId");

            migrationBuilder.CreateIndex(
                name: "IX_InventoryOnHand_InventoryStatusId",
                schema: "wms_core",
                table: "InventoryOnHand",
                column: "InventoryStatusId");

            migrationBuilder.CreateIndex(
                name: "IX_InventoryOnHand_ItemId",
                schema: "wms_core",
                table: "InventoryOnHand",
                column: "ItemId");

            migrationBuilder.CreateIndex(
                name: "IX_InventoryOnHand_LocationId",
                schema: "wms_core",
                table: "InventoryOnHand",
                column: "LocationId");

            migrationBuilder.CreateIndex(
                name: "UQ_InventoryOnHand_NoHU",
                schema: "wms_core",
                table: "InventoryOnHand",
                columns: new[] { "WarehouseId", "LocationId", "ItemId", "LotNo", "SerialNumber", "InventoryStatusId" },
                unique: true,
                filter: "[HandlingUnitId] IS NULL");

            migrationBuilder.CreateIndex(
                name: "UQ_InventoryOnHand_WithHU",
                schema: "wms_core",
                table: "InventoryOnHand",
                columns: new[] { "WarehouseId", "LocationId", "ItemId", "LotNo", "SerialNumber", "HandlingUnitId", "InventoryStatusId" },
                unique: true,
                filter: "[HandlingUnitId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Item_BaseUomId",
                schema: "mdm",
                table: "Item",
                column: "BaseUomId");

            migrationBuilder.CreateIndex(
                name: "IX_Item_ItemCode",
                schema: "mdm",
                table: "Item",
                column: "ItemCode",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ItemBarcode_ItemId",
                schema: "mdm",
                table: "ItemBarcode",
                column: "ItemId");

            migrationBuilder.CreateIndex(
                name: "IX_ItemBarcode_UomId",
                schema: "mdm",
                table: "ItemBarcode",
                column: "UomId");

            migrationBuilder.CreateIndex(
                name: "IX_Location_Code_WarehouseId",
                schema: "mdm",
                table: "Location",
                columns: new[] { "Code", "WarehouseId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Location_ProfileId",
                schema: "mdm",
                table: "Location",
                column: "ProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_Location_WarehouseId",
                schema: "mdm",
                table: "Location",
                column: "WarehouseId");

            migrationBuilder.CreateIndex(
                name: "IX_Location_ZoneId",
                schema: "mdm",
                table: "Location",
                column: "ZoneId");

            migrationBuilder.CreateIndex(
                name: "IX_MobileScanEvent_ClientTxnId",
                schema: "integration_audit",
                table: "MobileScanEvent",
                column: "ClientTxnId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_MobileScanEvent_UserId",
                schema: "integration_audit",
                table: "MobileScanEvent",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_PickTask_AssignedTo",
                schema: "wms_core",
                table: "PickTask",
                column: "AssignedTo");

            migrationBuilder.CreateIndex(
                name: "IX_PickTask_CompletedBy",
                schema: "wms_core",
                table: "PickTask",
                column: "CompletedBy");

            migrationBuilder.CreateIndex(
                name: "IX_PickTask_ItemId",
                schema: "wms_core",
                table: "PickTask",
                column: "ItemId");

            migrationBuilder.CreateIndex(
                name: "IX_PickTask_SoLineId",
                schema: "wms_core",
                table: "PickTask",
                column: "SoLineId");

            migrationBuilder.CreateIndex(
                name: "IX_PickTask_Status",
                schema: "wms_core",
                table: "PickTask",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_PickTask_SuggestedLocationId",
                schema: "wms_core",
                table: "PickTask",
                column: "SuggestedLocationId");

            migrationBuilder.CreateIndex(
                name: "IX_PutawayTask_AssignedTo",
                schema: "wms_core",
                table: "PutawayTask",
                column: "AssignedTo");

            migrationBuilder.CreateIndex(
                name: "IX_PutawayTask_CompletedBy",
                schema: "wms_core",
                table: "PutawayTask",
                column: "CompletedBy");

            migrationBuilder.CreateIndex(
                name: "IX_PutawayTask_HandlingUnitId",
                schema: "wms_core",
                table: "PutawayTask",
                column: "HandlingUnitId");

            migrationBuilder.CreateIndex(
                name: "IX_PutawayTask_ItemId",
                schema: "wms_core",
                table: "PutawayTask",
                column: "ItemId");

            migrationBuilder.CreateIndex(
                name: "IX_PutawayTask_ReceiptHeaderId",
                schema: "wms_core",
                table: "PutawayTask",
                column: "ReceiptHeaderId");

            migrationBuilder.CreateIndex(
                name: "IX_PutawayTask_Status",
                schema: "wms_core",
                table: "PutawayTask",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_PutawayTask_TargetLocationId",
                schema: "wms_core",
                table: "PutawayTask",
                column: "TargetLocationId");

            migrationBuilder.CreateIndex(
                name: "IX_QualityOrder_DraftLineId",
                schema: "quality_control",
                table: "QualityOrder",
                column: "DraftLineId");

            migrationBuilder.CreateIndex(
                name: "IX_QualityOrder_ItemId",
                schema: "quality_control",
                table: "QualityOrder",
                column: "ItemId");

            migrationBuilder.CreateIndex(
                name: "IX_ShipmentHeader_CreatedDate",
                schema: "wms_core",
                table: "ShipmentHeader",
                column: "CreatedDate");

            migrationBuilder.CreateIndex(
                name: "IX_ShipmentHeader_Status",
                schema: "wms_core",
                table: "ShipmentHeader",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_ShipmentHeader_WarehouseId",
                schema: "wms_core",
                table: "ShipmentHeader",
                column: "WarehouseId");

            migrationBuilder.CreateIndex(
                name: "IX_ShipmentLine_PickTaskId",
                schema: "wms_core",
                table: "ShipmentLine",
                column: "PickTaskId");

            migrationBuilder.CreateIndex(
                name: "IX_ShipmentLine_ShipmentHeaderId",
                schema: "wms_core",
                table: "ShipmentLine",
                column: "ShipmentHeaderId");

            migrationBuilder.CreateIndex(
                name: "IX_UomConversion_FromUomId",
                schema: "mdm",
                table: "UomConversion",
                column: "FromUomId");

            migrationBuilder.CreateIndex(
                name: "IX_UomConversion_ItemId",
                schema: "mdm",
                table: "UomConversion",
                column: "ItemId");

            migrationBuilder.CreateIndex(
                name: "IX_UomConversion_ToUomId",
                schema: "mdm",
                table: "UomConversion",
                column: "ToUomId");

            migrationBuilder.CreateIndex(
                name: "IX_UserWarehouseMapping_WarehouseId",
                schema: "wms_core",
                table: "UserWarehouseMapping",
                column: "WarehouseId");

            migrationBuilder.CreateIndex(
                name: "IX_Zone_WarehouseId",
                schema: "mdm",
                table: "Zone",
                column: "WarehouseId");

            migrationBuilder.CreateIndex(
                name: "IX_Zone_ZoneCode_WarehouseId",
                schema: "mdm",
                table: "Zone",
                columns: new[] { "ZoneCode", "WarehouseId" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ApiCallLog",
                schema: "integration_audit");

            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "CycleCountLine",
                schema: "quality_control");

            migrationBuilder.DropTable(
                name: "IntegrationOutbox",
                schema: "integration_audit");

            migrationBuilder.DropTable(
                name: "InventoryLedger",
                schema: "wms_core");

            migrationBuilder.DropTable(
                name: "InventoryOnHand",
                schema: "wms_core");

            migrationBuilder.DropTable(
                name: "ItemBarcode",
                schema: "mdm");

            migrationBuilder.DropTable(
                name: "MobileScanEvent",
                schema: "integration_audit");

            migrationBuilder.DropTable(
                name: "PutawayTask",
                schema: "wms_core");

            migrationBuilder.DropTable(
                name: "QualityOrder",
                schema: "quality_control");

            migrationBuilder.DropTable(
                name: "ShipmentLine",
                schema: "wms_core");

            migrationBuilder.DropTable(
                name: "UomConversion",
                schema: "mdm");

            migrationBuilder.DropTable(
                name: "UserWarehouseMapping",
                schema: "wms_core");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "CycleCountSession",
                schema: "quality_control");

            migrationBuilder.DropTable(
                name: "InventoryStatus",
                schema: "mdm");

            migrationBuilder.DropTable(
                name: "HandlingUnit",
                schema: "wms_core");

            migrationBuilder.DropTable(
                name: "DraftLine",
                schema: "wms_core");

            migrationBuilder.DropTable(
                name: "PickTask",
                schema: "wms_core");

            migrationBuilder.DropTable(
                name: "ShipmentHeader",
                schema: "wms_core");

            migrationBuilder.DropTable(
                name: "ErpPurchaseOrderLine",
                schema: "erp_stage");

            migrationBuilder.DropTable(
                name: "InboundReceiptHeader",
                schema: "wms_core");

            migrationBuilder.DropTable(
                name: "ReasonCode",
                schema: "mdm");

            migrationBuilder.DropTable(
                name: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "ErpSalesOrderLine",
                schema: "erp_stage");

            migrationBuilder.DropTable(
                name: "Location",
                schema: "mdm");

            migrationBuilder.DropTable(
                name: "ErpPurchaseOrderHeader",
                schema: "erp_stage");

            migrationBuilder.DropTable(
                name: "ErpSalesOrderHeader",
                schema: "erp_stage");

            migrationBuilder.DropTable(
                name: "Item",
                schema: "mdm");

            migrationBuilder.DropTable(
                name: "LocationProfile",
                schema: "mdm");

            migrationBuilder.DropTable(
                name: "Zone",
                schema: "mdm");

            migrationBuilder.DropTable(
                name: "Supplier",
                schema: "mdm");

            migrationBuilder.DropTable(
                name: "Customer",
                schema: "mdm");

            migrationBuilder.DropTable(
                name: "Uom",
                schema: "mdm");

            migrationBuilder.DropTable(
                name: "Warehouse",
                schema: "mdm");
        }
    }
}
