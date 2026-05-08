using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WmsBackend.Data.Migrations
{
    /// <inheritdoc />
    public partial class WmsDb_Standard_Enterprise_Final_V6_Clean : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "wms_core");

            migrationBuilder.EnsureSchema(
                name: "integration_audit");

            migrationBuilder.EnsureSchema(
                name: "quality_control");

            migrationBuilder.EnsureSchema(
                name: "mdm");

            migrationBuilder.EnsureSchema(
                name: "erp_stage");

            migrationBuilder.CreateTable(
                name: "ApiCallLog",
                schema: "integration_audit",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Endpoint = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Method = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StatusCode = table.Column<int>(type: "int", nullable: true),
                    Timestamp = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
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
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Customer", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DispositionCode",
                schema: "mdm",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DispositionCode", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ErpDocumentStatusHistory",
                schema: "erp_stage",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DocumentNo = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    OldStatus = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    NewStatus = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ErpDocumentStatusHistory", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ErpReferenceMap",
                schema: "erp_stage",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ErpSystem = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    ExternalId = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    LocalId = table.Column<int>(type: "int", nullable: false),
                    EntityType = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ErpReferenceMap", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ErpSyncRun",
                schema: "erp_stage",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StartTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ErpSyncRun", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "IntegrationInbox",
                schema: "integration_audit",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdempotencyKey = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    MessageType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Payload = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IntegrationInbox", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "IntegrationOutbox",
                schema: "integration_audit",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdempotencyKey = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    MessageType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Payload = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RetryCount = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
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
                    IsAllocatable = table.Column<bool>(type: "bit", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
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
                    MaxWeight = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    MaxVolume = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LocationProfile", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Owner",
                schema: "mdm",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Owner", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ReasonCode",
                schema: "mdm",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
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
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
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
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
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
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
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
                name: "AuditLog",
                schema: "integration_audit",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    Action = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EntityName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EntityId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OldValues = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NewValues = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Timestamp = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AuditLog", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AuditLog_AspNetUsers_UserId",
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
                    Barcode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ScannedQty = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: true),
                    UserId = table.Column<int>(type: "int", nullable: true),
                    ScanTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
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
                name: "UserDevice",
                schema: "mdm",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    DeviceId = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserDevice", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserDevice_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ErpSyncError",
                schema: "erp_stage",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SyncRunId = table.Column<int>(type: "int", nullable: false),
                    ErrorMessage = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RawPayload = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ErpSyncError", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ErpSyncError_ErpSyncRun_SyncRunId",
                        column: x => x.SyncRunId,
                        principalSchema: "erp_stage",
                        principalTable: "ErpSyncRun",
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
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BaseUomId = table.Column<int>(type: "int", nullable: false),
                    PickStrategy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsLotControlled = table.Column<bool>(type: "bit", nullable: false),
                    IsSerialControlled = table.Column<bool>(type: "bit", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
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
                name: "UomConversion",
                schema: "mdm",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FromUomId = table.Column<int>(type: "int", nullable: false),
                    ToUomId = table.Column<int>(type: "int", nullable: false),
                    ConversionRate = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UomConversion", x => x.Id);
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
                name: "CycleCountPlan",
                schema: "quality_control",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PlanName = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    WarehouseId = table.Column<int>(type: "int", nullable: false),
                    ScheduledDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CycleCountPlan", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CycleCountPlan_Warehouse_WarehouseId",
                        column: x => x.WarehouseId,
                        principalSchema: "mdm",
                        principalTable: "Warehouse",
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
                    WarehouseId = table.Column<int>(type: "int", nullable: false),
                    SupplierId = table.Column<int>(type: "int", nullable: true),
                    ErpStatus = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
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
                    WarehouseId = table.Column<int>(type: "int", nullable: false),
                    CustomerId = table.Column<int>(type: "int", nullable: true),
                    ErpStatus = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
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
                    WarehouseId = table.Column<int>(type: "int", nullable: false),
                    SupplierId = table.Column<int>(type: "int", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
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
                name: "QuarantineOrder",
                schema: "quality_control",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    WarehouseId = table.Column<int>(type: "int", nullable: false),
                    ReasonCodeId = table.Column<int>(type: "int", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuarantineOrder", x => x.Id);
                    table.ForeignKey(
                        name: "FK_QuarantineOrder_ReasonCode_ReasonCodeId",
                        column: x => x.ReasonCodeId,
                        principalSchema: "mdm",
                        principalTable: "ReasonCode",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_QuarantineOrder_Warehouse_WarehouseId",
                        column: x => x.WarehouseId,
                        principalSchema: "mdm",
                        principalTable: "Warehouse",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ReturnReceiptHeader",
                schema: "wms_core",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ReturnNo = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    WarehouseId = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReturnReceiptHeader", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ReturnReceiptHeader_Warehouse_WarehouseId",
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
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
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
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserWarehouseMapping", x => new { x.UserId, x.WarehouseId });
                    table.ForeignKey(
                        name: "FK_UserWarehouseMapping_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UserWarehouseMapping_Warehouse_WarehouseId",
                        column: x => x.WarehouseId,
                        principalSchema: "mdm",
                        principalTable: "Warehouse",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "WavePicking",
                schema: "wms_core",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    WaveNo = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    WarehouseId = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WavePicking", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WavePicking_Warehouse_WarehouseId",
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
                    ZoneType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
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
                    Barcode = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    UomId = table.Column<int>(type: "int", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
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
                name: "ItemWarehousePolicy",
                schema: "mdm",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ItemId = table.Column<int>(type: "int", nullable: false),
                    WarehouseId = table.Column<int>(type: "int", nullable: false),
                    MinStock = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    MaxStock = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ItemWarehousePolicy", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ItemWarehousePolicy_Item_ItemId",
                        column: x => x.ItemId,
                        principalSchema: "mdm",
                        principalTable: "Item",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ItemWarehousePolicy_Warehouse_WarehouseId",
                        column: x => x.WarehouseId,
                        principalSchema: "mdm",
                        principalTable: "Warehouse",
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
                    ItemId = table.Column<int>(type: "int", nullable: false),
                    OrderedQty = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    OpenQty = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    UomId = table.Column<int>(type: "int", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
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
                    ItemId = table.Column<int>(type: "int", nullable: false),
                    OrderedQty = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    OpenQty = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    UomId = table.Column<int>(type: "int", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
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
                name: "DraftLine",
                schema: "wms_core",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ReceiptHeaderId = table.Column<int>(type: "int", nullable: false),
                    ItemId = table.Column<int>(type: "int", nullable: false),
                    PoLineId = table.Column<int>(type: "int", nullable: true),
                    UomId = table.Column<int>(type: "int", nullable: true),
                    ExpectedQty = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    ReceivedQty = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    AcceptedQty = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    RejectedQty = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    HoldQty = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DraftLine", x => x.Id);
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
                });

            migrationBuilder.CreateTable(
                name: "ReturnReceiptLine",
                schema: "wms_core",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ReturnHeaderId = table.Column<int>(type: "int", nullable: false),
                    ItemId = table.Column<int>(type: "int", nullable: false),
                    Qty = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReturnReceiptLine", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ReturnReceiptLine_Item_ItemId",
                        column: x => x.ItemId,
                        principalSchema: "mdm",
                        principalTable: "Item",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ReturnReceiptLine_ReturnReceiptHeader_ReturnHeaderId",
                        column: x => x.ReturnHeaderId,
                        principalSchema: "wms_core",
                        principalTable: "ReturnReceiptHeader",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CrossDockingOrder",
                schema: "wms_core",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InboundReceiptId = table.Column<int>(type: "int", nullable: false),
                    OutboundShipmentId = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CrossDockingOrder", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CrossDockingOrder_InboundReceiptHeader_InboundReceiptId",
                        column: x => x.InboundReceiptId,
                        principalSchema: "wms_core",
                        principalTable: "InboundReceiptHeader",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CrossDockingOrder_ShipmentHeader_OutboundShipmentId",
                        column: x => x.OutboundShipmentId,
                        principalSchema: "wms_core",
                        principalTable: "ShipmentHeader",
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
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
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
                    Aisle = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Rack = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Level = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Bin = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
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
                name: "InboundReceiptLine",
                schema: "wms_core",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ReceiptHeaderId = table.Column<int>(type: "int", nullable: false),
                    PoLineId = table.Column<int>(type: "int", nullable: true),
                    ItemId = table.Column<int>(type: "int", nullable: false),
                    UomId = table.Column<int>(type: "int", nullable: true),
                    ReceivedQty = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    AcceptedQty = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    RejectedQty = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    HoldQty = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    ReasonCodeId = table.Column<int>(type: "int", nullable: true),
                    SubstituteItemId = table.Column<int>(type: "int", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InboundReceiptLine", x => x.Id);
                    table.ForeignKey(
                        name: "FK_InboundReceiptLine_ErpPurchaseOrderLine_PoLineId",
                        column: x => x.PoLineId,
                        principalSchema: "erp_stage",
                        principalTable: "ErpPurchaseOrderLine",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_InboundReceiptLine_InboundReceiptHeader_ReceiptHeaderId",
                        column: x => x.ReceiptHeaderId,
                        principalSchema: "wms_core",
                        principalTable: "InboundReceiptHeader",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_InboundReceiptLine_Item_ItemId",
                        column: x => x.ItemId,
                        principalSchema: "mdm",
                        principalTable: "Item",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_InboundReceiptLine_ReasonCode_ReasonCodeId",
                        column: x => x.ReasonCodeId,
                        principalSchema: "mdm",
                        principalTable: "ReasonCode",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_InboundReceiptLine_Uom_UomId",
                        column: x => x.UomId,
                        principalSchema: "mdm",
                        principalTable: "Uom",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "BackorderTracking",
                schema: "wms_core",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SoLineId = table.Column<int>(type: "int", nullable: false),
                    BackorderQty = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BackorderTracking", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BackorderTracking_ErpSalesOrderLine_SoLineId",
                        column: x => x.SoLineId,
                        principalSchema: "erp_stage",
                        principalTable: "ErpSalesOrderLine",
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
                    QualityOrderNo = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    ItemId = table.Column<int>(type: "int", nullable: false),
                    DraftLineId = table.Column<int>(type: "int", nullable: true),
                    Qty = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
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
                name: "CycleCountLine",
                schema: "quality_control",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SessionId = table.Column<int>(type: "int", nullable: false),
                    LocationId = table.Column<int>(type: "int", nullable: false),
                    ItemId = table.Column<int>(type: "int", nullable: false),
                    SystemQty = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    CountedQty = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    Variance = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false, computedColumnSql: "[CountedQty] - [SystemQty]"),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
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
                    HuBarcode = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    LocationId = table.Column<int>(type: "int", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
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
                name: "InternalTransfer",
                schema: "wms_core",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TransferNo = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    ItemId = table.Column<int>(type: "int", nullable: false),
                    FromLocationId = table.Column<int>(type: "int", nullable: false),
                    ToLocationId = table.Column<int>(type: "int", nullable: false),
                    Qty = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    ReasonCodeId = table.Column<int>(type: "int", nullable: true),
                    ApprovedBy = table.Column<int>(type: "int", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InternalTransfer", x => x.Id);
                    table.ForeignKey(
                        name: "FK_InternalTransfer_Item_ItemId",
                        column: x => x.ItemId,
                        principalSchema: "mdm",
                        principalTable: "Item",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_InternalTransfer_Location_FromLocationId",
                        column: x => x.FromLocationId,
                        principalSchema: "mdm",
                        principalTable: "Location",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_InternalTransfer_Location_ToLocationId",
                        column: x => x.ToLocationId,
                        principalSchema: "mdm",
                        principalTable: "Location",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_InternalTransfer_ReasonCode_ReasonCodeId",
                        column: x => x.ReasonCodeId,
                        principalSchema: "mdm",
                        principalTable: "ReasonCode",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "InventoryAdjustment",
                schema: "wms_core",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ItemId = table.Column<int>(type: "int", nullable: false),
                    LocationId = table.Column<int>(type: "int", nullable: false),
                    AdjustedQty = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    ReasonCodeId = table.Column<int>(type: "int", nullable: true),
                    ApprovedBy = table.Column<int>(type: "int", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ApproverId = table.Column<int>(type: "int", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InventoryAdjustment", x => x.Id);
                    table.ForeignKey(
                        name: "FK_InventoryAdjustment_AspNetUsers_ApproverId",
                        column: x => x.ApproverId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_InventoryAdjustment_Item_ItemId",
                        column: x => x.ItemId,
                        principalSchema: "mdm",
                        principalTable: "Item",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_InventoryAdjustment_Location_LocationId",
                        column: x => x.LocationId,
                        principalSchema: "mdm",
                        principalTable: "Location",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_InventoryAdjustment_ReasonCode_ReasonCodeId",
                        column: x => x.ReasonCodeId,
                        principalSchema: "mdm",
                        principalTable: "ReasonCode",
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
                    TransactionType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ItemId = table.Column<int>(type: "int", nullable: false),
                    Qty = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    FromLocationId = table.Column<int>(type: "int", nullable: true),
                    ToLocationId = table.Column<int>(type: "int", nullable: true),
                    SourceDocId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Timestamp = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
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
                    ItemId = table.Column<int>(type: "int", nullable: false),
                    SoLineId = table.Column<int>(type: "int", nullable: true),
                    SuggestedLocationId = table.Column<int>(type: "int", nullable: true),
                    LotNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RequestedQty = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    PickedQty = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AssignedTo = table.Column<int>(type: "int", nullable: true),
                    CompletedBy = table.Column<int>(type: "int", nullable: true),
                    CompletedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    AssignedUserId = table.Column<int>(type: "int", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PickTask", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PickTask_AspNetUsers_AssignedUserId",
                        column: x => x.AssignedUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
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
                name: "QualityCheckResult",
                schema: "quality_control",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    QualityOrderId = table.Column<int>(type: "int", nullable: false),
                    Result = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QualityCheckResult", x => x.Id);
                    table.ForeignKey(
                        name: "FK_QualityCheckResult_QualityOrder_QualityOrderId",
                        column: x => x.QualityOrderId,
                        principalSchema: "quality_control",
                        principalTable: "QualityOrder",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CycleCountReview",
                schema: "quality_control",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CycleCountLineId = table.Column<long>(type: "bigint", nullable: false),
                    ReviewerId = table.Column<int>(type: "int", nullable: false),
                    Comments = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CycleCountReview", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CycleCountReview_AspNetUsers_ReviewerId",
                        column: x => x.ReviewerId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CycleCountReview_CycleCountLine_CycleCountLineId",
                        column: x => x.CycleCountLineId,
                        principalSchema: "quality_control",
                        principalTable: "CycleCountLine",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "HandlingUnitContent",
                schema: "wms_core",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    HandlingUnitId = table.Column<int>(type: "int", nullable: false),
                    ItemId = table.Column<int>(type: "int", nullable: false),
                    Qty = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HandlingUnitContent", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HandlingUnitContent_HandlingUnit_HandlingUnitId",
                        column: x => x.HandlingUnitId,
                        principalSchema: "wms_core",
                        principalTable: "HandlingUnit",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_HandlingUnitContent_Item_ItemId",
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
                    OwnerId = table.Column<int>(type: "int", nullable: true),
                    LotNo = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    SerialNumber = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    HandlingUnitId = table.Column<int>(type: "int", nullable: true),
                    InventoryStatusId = table.Column<int>(type: "int", nullable: false),
                    AvailableQty = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    ReservedQty = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    AllocatedQty = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true),
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
                        name: "FK_InventoryOnHand_Owner_OwnerId",
                        column: x => x.OwnerId,
                        principalSchema: "mdm",
                        principalTable: "Owner",
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
                    ItemId = table.Column<int>(type: "int", nullable: false),
                    ReceiptHeaderId = table.Column<int>(type: "int", nullable: true),
                    TargetLocationId = table.Column<int>(type: "int", nullable: true),
                    HandlingUnitId = table.Column<int>(type: "int", nullable: true),
                    Quantity = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AssignedTo = table.Column<int>(type: "int", nullable: true),
                    AssignedUserId = table.Column<int>(type: "int", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PutawayTask", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PutawayTask_AspNetUsers_AssignedUserId",
                        column: x => x.AssignedUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
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
                    ShippedQty = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
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

            migrationBuilder.CreateTable(
                name: "WavePickingLine",
                schema: "wms_core",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    WavePickingId = table.Column<int>(type: "int", nullable: false),
                    PickTaskId = table.Column<long>(type: "bigint", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WavePickingLine", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WavePickingLine_PickTask_PickTaskId",
                        column: x => x.PickTaskId,
                        principalSchema: "wms_core",
                        principalTable: "PickTask",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_WavePickingLine_WavePicking_WavePickingId",
                        column: x => x.WavePickingId,
                        principalSchema: "wms_core",
                        principalTable: "WavePicking",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CountAdjustmentApproval",
                schema: "quality_control",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ReviewId = table.Column<int>(type: "int", nullable: false),
                    ApproverId = table.Column<int>(type: "int", nullable: false),
                    IsApproved = table.Column<bool>(type: "bit", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CountAdjustmentApproval", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CountAdjustmentApproval_AspNetUsers_ApproverId",
                        column: x => x.ApproverId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CountAdjustmentApproval_CycleCountReview_ReviewId",
                        column: x => x.ReviewId,
                        principalSchema: "quality_control",
                        principalTable: "CycleCountReview",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Reservation",
                schema: "wms_core",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InventoryId = table.Column<long>(type: "bigint", nullable: false),
                    Qty = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    DemandSourceType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DemandSourceId = table.Column<int>(type: "int", nullable: false),
                    ExpiryDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reservation", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Reservation_InventoryOnHand_InventoryId",
                        column: x => x.InventoryId,
                        principalSchema: "wms_core",
                        principalTable: "InventoryOnHand",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Allocation",
                schema: "wms_core",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ReservationId = table.Column<long>(type: "bigint", nullable: false),
                    LocationId = table.Column<int>(type: "int", nullable: false),
                    Qty = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Allocation", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Allocation_Location_LocationId",
                        column: x => x.LocationId,
                        principalSchema: "mdm",
                        principalTable: "Location",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Allocation_Reservation_ReservationId",
                        column: x => x.ReservationId,
                        principalSchema: "wms_core",
                        principalTable: "Reservation",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Allocation_LocationId",
                schema: "wms_core",
                table: "Allocation",
                column: "LocationId");

            migrationBuilder.CreateIndex(
                name: "IX_Allocation_ReservationId",
                schema: "wms_core",
                table: "Allocation",
                column: "ReservationId");

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
                name: "IX_AuditLog_UserId",
                schema: "integration_audit",
                table: "AuditLog",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_BackorderTracking_SoLineId",
                schema: "wms_core",
                table: "BackorderTracking",
                column: "SoLineId");

            migrationBuilder.CreateIndex(
                name: "IX_CountAdjustmentApproval_ApproverId",
                schema: "quality_control",
                table: "CountAdjustmentApproval",
                column: "ApproverId");

            migrationBuilder.CreateIndex(
                name: "IX_CountAdjustmentApproval_ReviewId",
                schema: "quality_control",
                table: "CountAdjustmentApproval",
                column: "ReviewId");

            migrationBuilder.CreateIndex(
                name: "IX_CrossDockingOrder_InboundReceiptId",
                schema: "wms_core",
                table: "CrossDockingOrder",
                column: "InboundReceiptId");

            migrationBuilder.CreateIndex(
                name: "IX_CrossDockingOrder_OutboundShipmentId",
                schema: "wms_core",
                table: "CrossDockingOrder",
                column: "OutboundShipmentId");

            migrationBuilder.CreateIndex(
                name: "IX_Customer_Code",
                schema: "mdm",
                table: "Customer",
                column: "Code",
                unique: true);

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
                name: "IX_CycleCountPlan_WarehouseId",
                schema: "quality_control",
                table: "CycleCountPlan",
                column: "WarehouseId");

            migrationBuilder.CreateIndex(
                name: "IX_CycleCountReview_CycleCountLineId",
                schema: "quality_control",
                table: "CycleCountReview",
                column: "CycleCountLineId");

            migrationBuilder.CreateIndex(
                name: "IX_CycleCountReview_ReviewerId",
                schema: "quality_control",
                table: "CycleCountReview",
                column: "ReviewerId");

            migrationBuilder.CreateIndex(
                name: "IX_CycleCountSession_SessionNo",
                schema: "quality_control",
                table: "CycleCountSession",
                column: "SessionNo",
                unique: true);

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
                name: "IX_DraftLine_ReceiptHeaderId",
                schema: "wms_core",
                table: "DraftLine",
                column: "ReceiptHeaderId");

            migrationBuilder.CreateIndex(
                name: "IX_ErpPurchaseOrderHeader_PoNumber",
                schema: "erp_stage",
                table: "ErpPurchaseOrderHeader",
                column: "PoNumber",
                unique: true);

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
                name: "IX_ErpSalesOrderHeader_SoNumber",
                schema: "erp_stage",
                table: "ErpSalesOrderHeader",
                column: "SoNumber",
                unique: true);

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
                name: "IX_ErpSyncError_SyncRunId",
                schema: "erp_stage",
                table: "ErpSyncError",
                column: "SyncRunId");

            migrationBuilder.CreateIndex(
                name: "IX_HandlingUnit_LocationId",
                schema: "wms_core",
                table: "HandlingUnit",
                column: "LocationId");

            migrationBuilder.CreateIndex(
                name: "IX_HandlingUnitContent_HandlingUnitId",
                schema: "wms_core",
                table: "HandlingUnitContent",
                column: "HandlingUnitId");

            migrationBuilder.CreateIndex(
                name: "IX_HandlingUnitContent_ItemId",
                schema: "wms_core",
                table: "HandlingUnitContent",
                column: "ItemId");

            migrationBuilder.CreateIndex(
                name: "IX_InboundReceiptHeader_ReceiptNo",
                schema: "wms_core",
                table: "InboundReceiptHeader",
                column: "ReceiptNo",
                unique: true);

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
                name: "IX_InboundReceiptLine_ItemId",
                schema: "wms_core",
                table: "InboundReceiptLine",
                column: "ItemId");

            migrationBuilder.CreateIndex(
                name: "IX_InboundReceiptLine_PoLineId",
                schema: "wms_core",
                table: "InboundReceiptLine",
                column: "PoLineId");

            migrationBuilder.CreateIndex(
                name: "IX_InboundReceiptLine_ReasonCodeId",
                schema: "wms_core",
                table: "InboundReceiptLine",
                column: "ReasonCodeId");

            migrationBuilder.CreateIndex(
                name: "IX_InboundReceiptLine_ReceiptHeaderId",
                schema: "wms_core",
                table: "InboundReceiptLine",
                column: "ReceiptHeaderId");

            migrationBuilder.CreateIndex(
                name: "IX_InboundReceiptLine_UomId",
                schema: "wms_core",
                table: "InboundReceiptLine",
                column: "UomId");

            migrationBuilder.CreateIndex(
                name: "IX_InternalTransfer_FromLocationId",
                schema: "wms_core",
                table: "InternalTransfer",
                column: "FromLocationId");

            migrationBuilder.CreateIndex(
                name: "IX_InternalTransfer_ItemId",
                schema: "wms_core",
                table: "InternalTransfer",
                column: "ItemId");

            migrationBuilder.CreateIndex(
                name: "IX_InternalTransfer_ReasonCodeId",
                schema: "wms_core",
                table: "InternalTransfer",
                column: "ReasonCodeId");

            migrationBuilder.CreateIndex(
                name: "IX_InternalTransfer_ToLocationId",
                schema: "wms_core",
                table: "InternalTransfer",
                column: "ToLocationId");

            migrationBuilder.CreateIndex(
                name: "IX_InternalTransfer_TransferNo",
                schema: "wms_core",
                table: "InternalTransfer",
                column: "TransferNo",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_InventoryAdjustment_ApproverId",
                schema: "wms_core",
                table: "InventoryAdjustment",
                column: "ApproverId");

            migrationBuilder.CreateIndex(
                name: "IX_InventoryAdjustment_ItemId",
                schema: "wms_core",
                table: "InventoryAdjustment",
                column: "ItemId");

            migrationBuilder.CreateIndex(
                name: "IX_InventoryAdjustment_LocationId",
                schema: "wms_core",
                table: "InventoryAdjustment",
                column: "LocationId");

            migrationBuilder.CreateIndex(
                name: "IX_InventoryAdjustment_ReasonCodeId",
                schema: "wms_core",
                table: "InventoryAdjustment",
                column: "ReasonCodeId");

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
                name: "IX_InventoryOnHand_OwnerId",
                schema: "wms_core",
                table: "InventoryOnHand",
                column: "OwnerId");

            migrationBuilder.CreateIndex(
                name: "UQ_Inventory_Dimension_Master",
                schema: "wms_core",
                table: "InventoryOnHand",
                columns: new[] { "WarehouseId", "LocationId", "ItemId", "OwnerId", "LotNo", "SerialNumber", "HandlingUnitId", "InventoryStatusId" },
                unique: true,
                filter: "[OwnerId] IS NOT NULL AND [LotNo] IS NOT NULL AND [SerialNumber] IS NOT NULL AND [HandlingUnitId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_InventoryStatus_StatusCode",
                schema: "mdm",
                table: "InventoryStatus",
                column: "StatusCode",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Item_BaseUomId",
                schema: "mdm",
                table: "Item",
                column: "BaseUomId");

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
                name: "IX_ItemWarehousePolicy_ItemId",
                schema: "mdm",
                table: "ItemWarehousePolicy",
                column: "ItemId");

            migrationBuilder.CreateIndex(
                name: "IX_ItemWarehousePolicy_WarehouseId",
                schema: "mdm",
                table: "ItemWarehousePolicy",
                column: "WarehouseId");

            migrationBuilder.CreateIndex(
                name: "IX_Location_ProfileId",
                schema: "mdm",
                table: "Location",
                column: "ProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_Location_WarehouseId_Code",
                schema: "mdm",
                table: "Location",
                columns: new[] { "WarehouseId", "Code" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Location_ZoneId",
                schema: "mdm",
                table: "Location",
                column: "ZoneId");

            migrationBuilder.CreateIndex(
                name: "IX_MobileScanEvent_UserId",
                schema: "integration_audit",
                table: "MobileScanEvent",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Owner_Code",
                schema: "mdm",
                table: "Owner",
                column: "Code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_PickTask_AssignedUserId",
                schema: "wms_core",
                table: "PickTask",
                column: "AssignedUserId");

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
                name: "IX_PickTask_SuggestedLocationId",
                schema: "wms_core",
                table: "PickTask",
                column: "SuggestedLocationId");

            migrationBuilder.CreateIndex(
                name: "IX_PickTask_TaskNo",
                schema: "wms_core",
                table: "PickTask",
                column: "TaskNo",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_PutawayTask_AssignedUserId",
                schema: "wms_core",
                table: "PutawayTask",
                column: "AssignedUserId");

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
                name: "IX_PutawayTask_TargetLocationId",
                schema: "wms_core",
                table: "PutawayTask",
                column: "TargetLocationId");

            migrationBuilder.CreateIndex(
                name: "IX_PutawayTask_TaskNo",
                schema: "wms_core",
                table: "PutawayTask",
                column: "TaskNo",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_QualityCheckResult_QualityOrderId",
                schema: "quality_control",
                table: "QualityCheckResult",
                column: "QualityOrderId");

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
                name: "IX_QualityOrder_QualityOrderNo",
                schema: "quality_control",
                table: "QualityOrder",
                column: "QualityOrderNo",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_QuarantineOrder_ReasonCodeId",
                schema: "quality_control",
                table: "QuarantineOrder",
                column: "ReasonCodeId");

            migrationBuilder.CreateIndex(
                name: "IX_QuarantineOrder_WarehouseId",
                schema: "quality_control",
                table: "QuarantineOrder",
                column: "WarehouseId");

            migrationBuilder.CreateIndex(
                name: "IX_ReasonCode_Code",
                schema: "mdm",
                table: "ReasonCode",
                column: "Code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Reservation_InventoryId",
                schema: "wms_core",
                table: "Reservation",
                column: "InventoryId");

            migrationBuilder.CreateIndex(
                name: "IX_ReturnReceiptHeader_ReturnNo",
                schema: "wms_core",
                table: "ReturnReceiptHeader",
                column: "ReturnNo",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ReturnReceiptHeader_WarehouseId",
                schema: "wms_core",
                table: "ReturnReceiptHeader",
                column: "WarehouseId");

            migrationBuilder.CreateIndex(
                name: "IX_ReturnReceiptLine_ItemId",
                schema: "wms_core",
                table: "ReturnReceiptLine",
                column: "ItemId");

            migrationBuilder.CreateIndex(
                name: "IX_ReturnReceiptLine_ReturnHeaderId",
                schema: "wms_core",
                table: "ReturnReceiptLine",
                column: "ReturnHeaderId");

            migrationBuilder.CreateIndex(
                name: "IX_ShipmentHeader_ShipmentCode",
                schema: "wms_core",
                table: "ShipmentHeader",
                column: "ShipmentCode",
                unique: true);

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
                name: "IX_Supplier_Code",
                schema: "mdm",
                table: "Supplier",
                column: "Code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Uom_Code",
                schema: "mdm",
                table: "Uom",
                column: "Code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_UomConversion_FromUomId",
                schema: "mdm",
                table: "UomConversion",
                column: "FromUomId");

            migrationBuilder.CreateIndex(
                name: "IX_UomConversion_ToUomId",
                schema: "mdm",
                table: "UomConversion",
                column: "ToUomId");

            migrationBuilder.CreateIndex(
                name: "IX_UserDevice_UserId",
                schema: "mdm",
                table: "UserDevice",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserWarehouseMapping_WarehouseId",
                schema: "wms_core",
                table: "UserWarehouseMapping",
                column: "WarehouseId");

            migrationBuilder.CreateIndex(
                name: "IX_Warehouse_Code",
                schema: "mdm",
                table: "Warehouse",
                column: "Code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_WavePicking_WarehouseId",
                schema: "wms_core",
                table: "WavePicking",
                column: "WarehouseId");

            migrationBuilder.CreateIndex(
                name: "IX_WavePicking_WaveNo",
                schema: "wms_core",
                table: "WavePicking",
                column: "WaveNo",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_WavePickingLine_PickTaskId",
                schema: "wms_core",
                table: "WavePickingLine",
                column: "PickTaskId");

            migrationBuilder.CreateIndex(
                name: "IX_WavePickingLine_WavePickingId",
                schema: "wms_core",
                table: "WavePickingLine",
                column: "WavePickingId");

            migrationBuilder.CreateIndex(
                name: "IX_Zone_WarehouseId",
                schema: "mdm",
                table: "Zone",
                column: "WarehouseId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Allocation",
                schema: "wms_core");

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
                name: "AuditLog",
                schema: "integration_audit");

            migrationBuilder.DropTable(
                name: "BackorderTracking",
                schema: "wms_core");

            migrationBuilder.DropTable(
                name: "CountAdjustmentApproval",
                schema: "quality_control");

            migrationBuilder.DropTable(
                name: "CrossDockingOrder",
                schema: "wms_core");

            migrationBuilder.DropTable(
                name: "CycleCountPlan",
                schema: "quality_control");

            migrationBuilder.DropTable(
                name: "DispositionCode",
                schema: "mdm");

            migrationBuilder.DropTable(
                name: "ErpDocumentStatusHistory",
                schema: "erp_stage");

            migrationBuilder.DropTable(
                name: "ErpReferenceMap",
                schema: "erp_stage");

            migrationBuilder.DropTable(
                name: "ErpSyncError",
                schema: "erp_stage");

            migrationBuilder.DropTable(
                name: "HandlingUnitContent",
                schema: "wms_core");

            migrationBuilder.DropTable(
                name: "InboundReceiptLine",
                schema: "wms_core");

            migrationBuilder.DropTable(
                name: "IntegrationInbox",
                schema: "integration_audit");

            migrationBuilder.DropTable(
                name: "IntegrationOutbox",
                schema: "integration_audit");

            migrationBuilder.DropTable(
                name: "InternalTransfer",
                schema: "wms_core");

            migrationBuilder.DropTable(
                name: "InventoryAdjustment",
                schema: "wms_core");

            migrationBuilder.DropTable(
                name: "InventoryLedger",
                schema: "wms_core");

            migrationBuilder.DropTable(
                name: "ItemBarcode",
                schema: "mdm");

            migrationBuilder.DropTable(
                name: "ItemWarehousePolicy",
                schema: "mdm");

            migrationBuilder.DropTable(
                name: "MobileScanEvent",
                schema: "integration_audit");

            migrationBuilder.DropTable(
                name: "PutawayTask",
                schema: "wms_core");

            migrationBuilder.DropTable(
                name: "QualityCheckResult",
                schema: "quality_control");

            migrationBuilder.DropTable(
                name: "QuarantineOrder",
                schema: "quality_control");

            migrationBuilder.DropTable(
                name: "ReturnReceiptLine",
                schema: "wms_core");

            migrationBuilder.DropTable(
                name: "ShipmentLine",
                schema: "wms_core");

            migrationBuilder.DropTable(
                name: "UomConversion",
                schema: "mdm");

            migrationBuilder.DropTable(
                name: "UserDevice",
                schema: "mdm");

            migrationBuilder.DropTable(
                name: "UserWarehouseMapping",
                schema: "wms_core");

            migrationBuilder.DropTable(
                name: "WavePickingLine",
                schema: "wms_core");

            migrationBuilder.DropTable(
                name: "Reservation",
                schema: "wms_core");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "CycleCountReview",
                schema: "quality_control");

            migrationBuilder.DropTable(
                name: "ErpSyncRun",
                schema: "erp_stage");

            migrationBuilder.DropTable(
                name: "ErpPurchaseOrderLine",
                schema: "erp_stage");

            migrationBuilder.DropTable(
                name: "QualityOrder",
                schema: "quality_control");

            migrationBuilder.DropTable(
                name: "ReasonCode",
                schema: "mdm");

            migrationBuilder.DropTable(
                name: "ReturnReceiptHeader",
                schema: "wms_core");

            migrationBuilder.DropTable(
                name: "ShipmentHeader",
                schema: "wms_core");

            migrationBuilder.DropTable(
                name: "PickTask",
                schema: "wms_core");

            migrationBuilder.DropTable(
                name: "WavePicking",
                schema: "wms_core");

            migrationBuilder.DropTable(
                name: "InventoryOnHand",
                schema: "wms_core");

            migrationBuilder.DropTable(
                name: "CycleCountLine",
                schema: "quality_control");

            migrationBuilder.DropTable(
                name: "ErpPurchaseOrderHeader",
                schema: "erp_stage");

            migrationBuilder.DropTable(
                name: "DraftLine",
                schema: "wms_core");

            migrationBuilder.DropTable(
                name: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "ErpSalesOrderLine",
                schema: "erp_stage");

            migrationBuilder.DropTable(
                name: "HandlingUnit",
                schema: "wms_core");

            migrationBuilder.DropTable(
                name: "InventoryStatus",
                schema: "mdm");

            migrationBuilder.DropTable(
                name: "Owner",
                schema: "mdm");

            migrationBuilder.DropTable(
                name: "CycleCountSession",
                schema: "quality_control");

            migrationBuilder.DropTable(
                name: "InboundReceiptHeader",
                schema: "wms_core");

            migrationBuilder.DropTable(
                name: "ErpSalesOrderHeader",
                schema: "erp_stage");

            migrationBuilder.DropTable(
                name: "Item",
                schema: "mdm");

            migrationBuilder.DropTable(
                name: "Location",
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
                name: "LocationProfile",
                schema: "mdm");

            migrationBuilder.DropTable(
                name: "Zone",
                schema: "mdm");

            migrationBuilder.DropTable(
                name: "Warehouse",
                schema: "mdm");
        }
    }
}
