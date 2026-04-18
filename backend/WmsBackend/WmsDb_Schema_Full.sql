IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
IF SCHEMA_ID(N'integration_audit') IS NULL EXEC(N'CREATE SCHEMA [integration_audit];');

IF SCHEMA_ID(N'mdm') IS NULL EXEC(N'CREATE SCHEMA [mdm];');

IF SCHEMA_ID(N'quality_control') IS NULL EXEC(N'CREATE SCHEMA [quality_control];');

IF SCHEMA_ID(N'wms_core') IS NULL EXEC(N'CREATE SCHEMA [wms_core];');

IF SCHEMA_ID(N'erp_stage') IS NULL EXEC(N'CREATE SCHEMA [erp_stage];');

CREATE TABLE [integration_audit].[ApiCallLog] (
    [Id] bigint NOT NULL IDENTITY,
    [Endpoint] nvarchar(255) NULL,
    [Method] nvarchar(10) NULL,
    [RequestPayload] nvarchar(max) NULL,
    [ResponsePayload] nvarchar(max) NULL,
    [StatusCode] int NULL,
    [CorrelationId] nvarchar(255) NULL,
    [Timestamp] datetime2 NOT NULL,
    CONSTRAINT [PK_ApiCallLog] PRIMARY KEY ([Id])
);

CREATE TABLE [AspNetRoles] (
    [Id] int NOT NULL IDENTITY,
    [Description] nvarchar(max) NULL,
    [Name] nvarchar(256) NULL,
    [NormalizedName] nvarchar(256) NULL,
    [ConcurrencyStamp] nvarchar(max) NULL,
    CONSTRAINT [PK_AspNetRoles] PRIMARY KEY ([Id])
);

CREATE TABLE [AspNetUsers] (
    [Id] int NOT NULL IDENTITY,
    [FullName] nvarchar(max) NULL,
    [ImageUrl] nvarchar(max) NULL,
    [Department] nvarchar(max) NULL,
    [Designation] nvarchar(max) NULL,
    [CreatedAt] datetime2 NOT NULL,
    [UserName] nvarchar(256) NULL,
    [NormalizedUserName] nvarchar(256) NULL,
    [Email] nvarchar(256) NULL,
    [NormalizedEmail] nvarchar(256) NULL,
    [EmailConfirmed] bit NOT NULL,
    [PasswordHash] nvarchar(max) NULL,
    [SecurityStamp] nvarchar(max) NULL,
    [ConcurrencyStamp] nvarchar(max) NULL,
    [PhoneNumber] nvarchar(max) NULL,
    [PhoneNumberConfirmed] bit NOT NULL,
    [TwoFactorEnabled] bit NOT NULL,
    [LockoutEnd] datetimeoffset NULL,
    [LockoutEnabled] bit NOT NULL,
    [AccessFailedCount] int NOT NULL,
    CONSTRAINT [PK_AspNetUsers] PRIMARY KEY ([Id])
);

CREATE TABLE [mdm].[Customer] (
    [Id] int NOT NULL IDENTITY,
    [Code] nvarchar(50) NOT NULL,
    [Name] nvarchar(255) NULL,
    [Status] nvarchar(50) NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    CONSTRAINT [PK_Customer] PRIMARY KEY ([Id])
);

CREATE TABLE [integration_audit].[IntegrationOutbox] (
    [Id] bigint NOT NULL IDENTITY,
    [IdempotencyKey] nvarchar(255) NOT NULL,
    [MessageType] nvarchar(100) NULL,
    [Payload] nvarchar(max) NULL,
    [Status] nvarchar(50) NOT NULL,
    [RetryCount] int NOT NULL,
    [ErrorMessage] nvarchar(max) NULL,
    [CreatedAt] datetime2 NOT NULL,
    [UpdatedAt] datetime2 NOT NULL,
    CONSTRAINT [PK_IntegrationOutbox] PRIMARY KEY ([Id])
);

CREATE TABLE [mdm].[InventoryStatus] (
    [Id] int NOT NULL IDENTITY,
    [StatusCode] nvarchar(50) NOT NULL,
    [IsAllocatable] bit NOT NULL,
    CONSTRAINT [PK_InventoryStatus] PRIMARY KEY ([Id])
);

CREATE TABLE [mdm].[LocationProfile] (
    [Id] int NOT NULL IDENTITY,
    [ProfileCode] nvarchar(50) NOT NULL,
    [MaxWeight] decimal(18,4) NULL,
    [MaxVolume] decimal(18,4) NULL,
    [AllowMixedItems] bit NOT NULL,
    [AllowMixedLots] bit NOT NULL,
    CONSTRAINT [PK_LocationProfile] PRIMARY KEY ([Id])
);

CREATE TABLE [mdm].[ReasonCode] (
    [Id] int NOT NULL IDENTITY,
    [Code] nvarchar(50) NOT NULL,
    [Type] nvarchar(50) NULL,
    [Description] nvarchar(255) NULL,
    CONSTRAINT [PK_ReasonCode] PRIMARY KEY ([Id])
);

CREATE TABLE [mdm].[Supplier] (
    [Id] int NOT NULL IDENTITY,
    [Code] nvarchar(50) NOT NULL,
    [Name] nvarchar(255) NULL,
    [Status] nvarchar(50) NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    CONSTRAINT [PK_Supplier] PRIMARY KEY ([Id])
);

CREATE TABLE [mdm].[Uom] (
    [Id] int NOT NULL IDENTITY,
    [Code] nvarchar(50) NOT NULL,
    [Name] nvarchar(255) NULL,
    [CreatedAt] datetime2 NOT NULL,
    CONSTRAINT [PK_Uom] PRIMARY KEY ([Id])
);

CREATE TABLE [mdm].[Warehouse] (
    [Id] int NOT NULL IDENTITY,
    [Code] nvarchar(50) NOT NULL,
    [Name] nvarchar(255) NULL,
    [Address] nvarchar(max) NULL,
    [Status] nvarchar(50) NOT NULL,
    CONSTRAINT [PK_Warehouse] PRIMARY KEY ([Id])
);

CREATE TABLE [AspNetRoleClaims] (
    [Id] int NOT NULL IDENTITY,
    [RoleId] int NOT NULL,
    [ClaimType] nvarchar(max) NULL,
    [ClaimValue] nvarchar(max) NULL,
    CONSTRAINT [PK_AspNetRoleClaims] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_AspNetRoleClaims_AspNetRoles_RoleId] FOREIGN KEY ([RoleId]) REFERENCES [AspNetRoles] ([Id]) ON DELETE NO ACTION
);

CREATE TABLE [AspNetUserClaims] (
    [Id] int NOT NULL IDENTITY,
    [UserId] int NOT NULL,
    [ClaimType] nvarchar(max) NULL,
    [ClaimValue] nvarchar(max) NULL,
    CONSTRAINT [PK_AspNetUserClaims] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_AspNetUserClaims_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE NO ACTION
);

CREATE TABLE [AspNetUserLogins] (
    [LoginProvider] nvarchar(450) NOT NULL,
    [ProviderKey] nvarchar(450) NOT NULL,
    [ProviderDisplayName] nvarchar(max) NULL,
    [UserId] int NOT NULL,
    CONSTRAINT [PK_AspNetUserLogins] PRIMARY KEY ([LoginProvider], [ProviderKey]),
    CONSTRAINT [FK_AspNetUserLogins_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE NO ACTION
);

CREATE TABLE [AspNetUserRoles] (
    [UserId] int NOT NULL,
    [RoleId] int NOT NULL,
    CONSTRAINT [PK_AspNetUserRoles] PRIMARY KEY ([UserId], [RoleId]),
    CONSTRAINT [FK_AspNetUserRoles_AspNetRoles_RoleId] FOREIGN KEY ([RoleId]) REFERENCES [AspNetRoles] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_AspNetUserRoles_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE NO ACTION
);

CREATE TABLE [AspNetUserTokens] (
    [UserId] int NOT NULL,
    [LoginProvider] nvarchar(450) NOT NULL,
    [Name] nvarchar(450) NOT NULL,
    [Value] nvarchar(max) NULL,
    CONSTRAINT [PK_AspNetUserTokens] PRIMARY KEY ([UserId], [LoginProvider], [Name]),
    CONSTRAINT [FK_AspNetUserTokens_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE NO ACTION
);

CREATE TABLE [integration_audit].[MobileScanEvent] (
    [Id] bigint NOT NULL IDENTITY,
    [ClientTxnId] nvarchar(255) NOT NULL,
    [Barcode] nvarchar(255) NOT NULL,
    [ScannedQty] decimal(18,4) NULL,
    [LocationCode] nvarchar(max) NULL,
    [UserId] int NULL,
    [ScanTime] datetime2 NOT NULL,
    CONSTRAINT [PK_MobileScanEvent] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_MobileScanEvent_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE NO ACTION
);

CREATE TABLE [mdm].[Item] (
    [Id] int NOT NULL IDENTITY,
    [ItemCode] nvarchar(50) NOT NULL,
    [Name] nvarchar(255) NULL,
    [BaseUomId] int NULL,
    [IsLotControlled] bit NOT NULL,
    [IsSerialControlled] bit NOT NULL,
    [ShelfLifeDays] int NULL,
    [PickStrategy] nvarchar(50) NOT NULL,
    [Status] nvarchar(50) NOT NULL,
    CONSTRAINT [PK_Item] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Item_Uom_BaseUomId] FOREIGN KEY ([BaseUomId]) REFERENCES [mdm].[Uom] ([Id]) ON DELETE NO ACTION
);

CREATE TABLE [erp_stage].[ErpPurchaseOrderHeader] (
    [Id] int NOT NULL IDENTITY,
    [PoNumber] nvarchar(100) NOT NULL,
    [SupplierId] int NULL,
    [WarehouseId] int NOT NULL,
    [ExpectedDate] datetime2 NULL,
    [ErpStatus] nvarchar(450) NULL,
    [VersionHash] nvarchar(max) NULL,
    [CreatedAt] datetime2 NOT NULL,
    CONSTRAINT [PK_ErpPurchaseOrderHeader] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_ErpPurchaseOrderHeader_Supplier_SupplierId] FOREIGN KEY ([SupplierId]) REFERENCES [mdm].[Supplier] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_ErpPurchaseOrderHeader_Warehouse_WarehouseId] FOREIGN KEY ([WarehouseId]) REFERENCES [mdm].[Warehouse] ([Id]) ON DELETE NO ACTION
);

CREATE TABLE [erp_stage].[ErpSalesOrderHeader] (
    [Id] int NOT NULL IDENTITY,
    [SoNumber] nvarchar(100) NOT NULL,
    [CustomerId] int NULL,
    [WarehouseId] int NOT NULL,
    [ExpectedDate] datetime2 NULL,
    [ErpStatus] nvarchar(450) NULL,
    [VersionHash] nvarchar(max) NULL,
    [CreatedAt] datetime2 NOT NULL,
    CONSTRAINT [PK_ErpSalesOrderHeader] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_ErpSalesOrderHeader_Customer_CustomerId] FOREIGN KEY ([CustomerId]) REFERENCES [mdm].[Customer] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_ErpSalesOrderHeader_Warehouse_WarehouseId] FOREIGN KEY ([WarehouseId]) REFERENCES [mdm].[Warehouse] ([Id]) ON DELETE NO ACTION
);

CREATE TABLE [wms_core].[InboundReceiptHeader] (
    [Id] int NOT NULL IDENTITY,
    [ReceiptNo] nvarchar(100) NOT NULL,
    [SupplierId] int NULL,
    [WarehouseId] int NOT NULL,
    [VehicleNo] nvarchar(max) NULL,
    [Status] nvarchar(450) NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    CONSTRAINT [PK_InboundReceiptHeader] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_InboundReceiptHeader_Supplier_SupplierId] FOREIGN KEY ([SupplierId]) REFERENCES [mdm].[Supplier] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_InboundReceiptHeader_Warehouse_WarehouseId] FOREIGN KEY ([WarehouseId]) REFERENCES [mdm].[Warehouse] ([Id]) ON DELETE NO ACTION
);

CREATE TABLE [wms_core].[ShipmentHeader] (
    [Id] int NOT NULL IDENTITY,
    [ShipmentCode] nvarchar(100) NOT NULL,
    [WarehouseId] int NOT NULL,
    [Carrier] nvarchar(max) NULL,
    [VehicleNo] nvarchar(max) NULL,
    [Dock] nvarchar(max) NULL,
    [Status] nvarchar(450) NOT NULL,
    [CreatedDate] datetime2 NOT NULL,
    CONSTRAINT [PK_ShipmentHeader] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_ShipmentHeader_Warehouse_WarehouseId] FOREIGN KEY ([WarehouseId]) REFERENCES [mdm].[Warehouse] ([Id]) ON DELETE NO ACTION
);

CREATE TABLE [wms_core].[UserWarehouseMapping] (
    [UserId] int NOT NULL,
    [WarehouseId] int NOT NULL,
    [AssignedAt] datetime2 NOT NULL,
    CONSTRAINT [PK_UserWarehouseMapping] PRIMARY KEY ([UserId], [WarehouseId]),
    CONSTRAINT [FK_UserWarehouseMapping_Warehouse_WarehouseId] FOREIGN KEY ([WarehouseId]) REFERENCES [mdm].[Warehouse] ([Id]) ON DELETE NO ACTION
);

CREATE TABLE [mdm].[Zone] (
    [Id] int NOT NULL IDENTITY,
    [WarehouseId] int NOT NULL,
    [ZoneCode] nvarchar(50) NOT NULL,
    [ZoneType] nvarchar(50) NULL,
    CONSTRAINT [PK_Zone] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Zone_Warehouse_WarehouseId] FOREIGN KEY ([WarehouseId]) REFERENCES [mdm].[Warehouse] ([Id]) ON DELETE NO ACTION
);

CREATE TABLE [mdm].[ItemBarcode] (
    [Id] int NOT NULL IDENTITY,
    [ItemId] int NOT NULL,
    [UomId] int NULL,
    [Barcode] nvarchar(255) NOT NULL,
    [BarcodeType] nvarchar(50) NULL,
    CONSTRAINT [PK_ItemBarcode] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_ItemBarcode_Item_ItemId] FOREIGN KEY ([ItemId]) REFERENCES [mdm].[Item] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_ItemBarcode_Uom_UomId] FOREIGN KEY ([UomId]) REFERENCES [mdm].[Uom] ([Id]) ON DELETE NO ACTION
);

CREATE TABLE [mdm].[UomConversion] (
    [Id] int NOT NULL IDENTITY,
    [FromUomId] int NOT NULL,
    [ToUomId] int NOT NULL,
    [ItemId] int NULL,
    [ConversionRate] decimal(18,4) NOT NULL,
    CONSTRAINT [PK_UomConversion] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_UomConversion_Item_ItemId] FOREIGN KEY ([ItemId]) REFERENCES [mdm].[Item] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_UomConversion_Uom_FromUomId] FOREIGN KEY ([FromUomId]) REFERENCES [mdm].[Uom] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_UomConversion_Uom_ToUomId] FOREIGN KEY ([ToUomId]) REFERENCES [mdm].[Uom] ([Id]) ON DELETE NO ACTION
);

CREATE TABLE [erp_stage].[ErpPurchaseOrderLine] (
    [Id] int NOT NULL IDENTITY,
    [PoHeaderId] int NOT NULL,
    [LineNo] int NOT NULL,
    [ItemId] int NOT NULL,
    [UomId] int NULL,
    [OrderedQty] decimal(18,4) NOT NULL,
    [OpenQty] decimal(18,4) NOT NULL,
    CONSTRAINT [PK_ErpPurchaseOrderLine] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_ErpPurchaseOrderLine_ErpPurchaseOrderHeader_PoHeaderId] FOREIGN KEY ([PoHeaderId]) REFERENCES [erp_stage].[ErpPurchaseOrderHeader] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_ErpPurchaseOrderLine_Item_ItemId] FOREIGN KEY ([ItemId]) REFERENCES [mdm].[Item] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_ErpPurchaseOrderLine_Uom_UomId] FOREIGN KEY ([UomId]) REFERENCES [mdm].[Uom] ([Id]) ON DELETE NO ACTION
);

CREATE TABLE [erp_stage].[ErpSalesOrderLine] (
    [Id] int NOT NULL IDENTITY,
    [SoHeaderId] int NOT NULL,
    [LineNo] int NOT NULL,
    [ItemId] int NOT NULL,
    [UomId] int NULL,
    [OrderedQty] decimal(18,4) NOT NULL,
    [OpenQty] decimal(18,4) NOT NULL,
    CONSTRAINT [PK_ErpSalesOrderLine] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_ErpSalesOrderLine_ErpSalesOrderHeader_SoHeaderId] FOREIGN KEY ([SoHeaderId]) REFERENCES [erp_stage].[ErpSalesOrderHeader] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_ErpSalesOrderLine_Item_ItemId] FOREIGN KEY ([ItemId]) REFERENCES [mdm].[Item] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_ErpSalesOrderLine_Uom_UomId] FOREIGN KEY ([UomId]) REFERENCES [mdm].[Uom] ([Id]) ON DELETE NO ACTION
);

CREATE TABLE [quality_control].[CycleCountSession] (
    [Id] int NOT NULL IDENTITY,
    [SessionNo] nvarchar(100) NOT NULL,
    [ZoneId] int NULL,
    [Status] nvarchar(50) NOT NULL,
    [CreatedBy] nvarchar(100) NULL,
    [CreatedAt] datetime2 NOT NULL,
    CONSTRAINT [PK_CycleCountSession] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_CycleCountSession_Zone_ZoneId] FOREIGN KEY ([ZoneId]) REFERENCES [mdm].[Zone] ([Id]) ON DELETE NO ACTION
);

CREATE TABLE [mdm].[Location] (
    [Id] int NOT NULL IDENTITY,
    [WarehouseId] int NOT NULL,
    [ZoneId] int NULL,
    [ProfileId] int NULL,
    [Code] nvarchar(50) NOT NULL,
    [Aisle] nvarchar(50) NULL,
    [Rack] nvarchar(50) NULL,
    [Level] nvarchar(50) NULL,
    [Bin] nvarchar(50) NULL,
    [Status] nvarchar(50) NOT NULL,
    CONSTRAINT [PK_Location] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Location_LocationProfile_ProfileId] FOREIGN KEY ([ProfileId]) REFERENCES [mdm].[LocationProfile] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_Location_Warehouse_WarehouseId] FOREIGN KEY ([WarehouseId]) REFERENCES [mdm].[Warehouse] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_Location_Zone_ZoneId] FOREIGN KEY ([ZoneId]) REFERENCES [mdm].[Zone] ([Id]) ON DELETE NO ACTION
);

CREATE TABLE [wms_core].[DraftLine] (
    [Id] int NOT NULL IDENTITY,
    [ReceiptHeaderId] int NOT NULL,
    [PoLineId] int NULL,
    [ItemId] int NOT NULL,
    [UomId] int NULL,
    [ExpectedQty] decimal(18,4) NOT NULL,
    [ReceivedQty] decimal(18,4) NOT NULL,
    [AcceptedQty] decimal(18,4) NOT NULL,
    [RejectedQty] decimal(18,4) NOT NULL,
    [HoldQty] decimal(18,4) NOT NULL,
    [SubstituteItemId] int NULL,
    [ReasonCodeId] int NULL,
    [Status] nvarchar(max) NULL,
    [AssignedTo] int NULL,
    [CompletedBy] int NULL,
    [CompletedAt] datetime2 NULL,
    [RowVersion] rowversion NULL,
    CONSTRAINT [PK_DraftLine] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_DraftLine_ErpPurchaseOrderLine_PoLineId] FOREIGN KEY ([PoLineId]) REFERENCES [erp_stage].[ErpPurchaseOrderLine] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_DraftLine_InboundReceiptHeader_ReceiptHeaderId] FOREIGN KEY ([ReceiptHeaderId]) REFERENCES [wms_core].[InboundReceiptHeader] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_DraftLine_Item_ItemId] FOREIGN KEY ([ItemId]) REFERENCES [mdm].[Item] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_DraftLine_Item_SubstituteItemId] FOREIGN KEY ([SubstituteItemId]) REFERENCES [mdm].[Item] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_DraftLine_ReasonCode_ReasonCodeId] FOREIGN KEY ([ReasonCodeId]) REFERENCES [mdm].[ReasonCode] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_DraftLine_Uom_UomId] FOREIGN KEY ([UomId]) REFERENCES [mdm].[Uom] ([Id]) ON DELETE NO ACTION
);

CREATE TABLE [quality_control].[CycleCountLine] (
    [Id] bigint NOT NULL IDENTITY,
    [SessionId] int NOT NULL,
    [LocationId] int NOT NULL,
    [ItemId] int NOT NULL,
    [LotNo] nvarchar(100) NULL,
    [SystemQty] decimal(18,4) NOT NULL,
    [CountedQty] decimal(18,4) NOT NULL,
    [Variance] AS [CountedQty] - [SystemQty],
    [Status] nvarchar(50) NOT NULL,
    CONSTRAINT [PK_CycleCountLine] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_CycleCountLine_CycleCountSession_SessionId] FOREIGN KEY ([SessionId]) REFERENCES [quality_control].[CycleCountSession] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_CycleCountLine_Item_ItemId] FOREIGN KEY ([ItemId]) REFERENCES [mdm].[Item] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_CycleCountLine_Location_LocationId] FOREIGN KEY ([LocationId]) REFERENCES [mdm].[Location] ([Id]) ON DELETE NO ACTION
);

CREATE TABLE [wms_core].[HandlingUnit] (
    [Id] int NOT NULL IDENTITY,
    [LicensePlate] nvarchar(100) NOT NULL,
    [LocationId] int NULL,
    [Status] nvarchar(50) NOT NULL,
    CONSTRAINT [PK_HandlingUnit] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_HandlingUnit_Location_LocationId] FOREIGN KEY ([LocationId]) REFERENCES [mdm].[Location] ([Id]) ON DELETE NO ACTION
);

CREATE TABLE [wms_core].[InventoryLedger] (
    [Id] bigint NOT NULL IDENTITY,
    [TransactionType] nvarchar(50) NOT NULL,
    [ItemId] int NOT NULL,
    [LotNo] nvarchar(100) NULL,
    [Qty] decimal(18,4) NOT NULL,
    [FromLocationId] int NULL,
    [ToLocationId] int NULL,
    [SourceDocId] nvarchar(100) NULL,
    [Timestamp] datetime2 NOT NULL,
    [CreatedBy] nvarchar(100) NULL,
    CONSTRAINT [PK_InventoryLedger] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_InventoryLedger_Item_ItemId] FOREIGN KEY ([ItemId]) REFERENCES [mdm].[Item] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_InventoryLedger_Location_FromLocationId] FOREIGN KEY ([FromLocationId]) REFERENCES [mdm].[Location] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_InventoryLedger_Location_ToLocationId] FOREIGN KEY ([ToLocationId]) REFERENCES [mdm].[Location] ([Id]) ON DELETE NO ACTION
);

CREATE TABLE [wms_core].[PickTask] (
    [Id] bigint NOT NULL IDENTITY,
    [TaskNo] nvarchar(100) NOT NULL,
    [SoLineId] int NULL,
    [SuggestedLocationId] int NULL,
    [ItemId] int NOT NULL,
    [LotNo] nvarchar(max) NULL,
    [RequestedQty] decimal(18,4) NULL,
    [PickedQty] decimal(18,4) NOT NULL,
    [Status] nvarchar(450) NOT NULL,
    [AssignedTo] int NULL,
    [CompletedBy] int NULL,
    [CompletedAt] datetime2 NULL,
    CONSTRAINT [PK_PickTask] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_PickTask_AspNetUsers_AssignedTo] FOREIGN KEY ([AssignedTo]) REFERENCES [AspNetUsers] ([Id]),
    CONSTRAINT [FK_PickTask_AspNetUsers_CompletedBy] FOREIGN KEY ([CompletedBy]) REFERENCES [AspNetUsers] ([Id]),
    CONSTRAINT [FK_PickTask_ErpSalesOrderLine_SoLineId] FOREIGN KEY ([SoLineId]) REFERENCES [erp_stage].[ErpSalesOrderLine] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_PickTask_Item_ItemId] FOREIGN KEY ([ItemId]) REFERENCES [mdm].[Item] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_PickTask_Location_SuggestedLocationId] FOREIGN KEY ([SuggestedLocationId]) REFERENCES [mdm].[Location] ([Id]) ON DELETE NO ACTION
);

CREATE TABLE [quality_control].[QualityOrder] (
    [Id] int NOT NULL IDENTITY,
    [QualityOrderId] nvarchar(100) NOT NULL,
    [DraftLineId] int NULL,
    [ItemId] int NOT NULL,
    [LotNo] nvarchar(100) NULL,
    [Qty] decimal(18,4) NOT NULL,
    [Status] nvarchar(50) NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    CONSTRAINT [PK_QualityOrder] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_QualityOrder_DraftLine_DraftLineId] FOREIGN KEY ([DraftLineId]) REFERENCES [wms_core].[DraftLine] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_QualityOrder_Item_ItemId] FOREIGN KEY ([ItemId]) REFERENCES [mdm].[Item] ([Id]) ON DELETE NO ACTION
);

CREATE TABLE [wms_core].[InventoryOnHand] (
    [Id] bigint NOT NULL IDENTITY,
    [WarehouseId] int NOT NULL,
    [LocationId] int NOT NULL,
    [ItemId] int NOT NULL,
    [LotNo] nvarchar(100) NOT NULL,
    [SerialNumber] nvarchar(100) NOT NULL,
    [HandlingUnitId] int NULL,
    [InventoryStatusId] int NOT NULL,
    [AvailableQty] decimal(18,4) NOT NULL,
    [ReservedQty] decimal(18,4) NOT NULL,
    [UpdatedAt] datetime2 NOT NULL,
    [RowVersion] rowversion NULL,
    CONSTRAINT [PK_InventoryOnHand] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_InventoryOnHand_HandlingUnit_HandlingUnitId] FOREIGN KEY ([HandlingUnitId]) REFERENCES [wms_core].[HandlingUnit] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_InventoryOnHand_InventoryStatus_InventoryStatusId] FOREIGN KEY ([InventoryStatusId]) REFERENCES [mdm].[InventoryStatus] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_InventoryOnHand_Item_ItemId] FOREIGN KEY ([ItemId]) REFERENCES [mdm].[Item] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_InventoryOnHand_Location_LocationId] FOREIGN KEY ([LocationId]) REFERENCES [mdm].[Location] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_InventoryOnHand_Warehouse_WarehouseId] FOREIGN KEY ([WarehouseId]) REFERENCES [mdm].[Warehouse] ([Id]) ON DELETE NO ACTION
);

CREATE TABLE [wms_core].[PutawayTask] (
    [Id] bigint NOT NULL IDENTITY,
    [TaskNo] nvarchar(100) NOT NULL,
    [ReceiptHeaderId] int NULL,
    [ItemId] int NOT NULL,
    [HandlingUnitId] int NULL,
    [TargetLocationId] int NULL,
    [Quantity] decimal(18,4) NULL,
    [Status] nvarchar(450) NOT NULL,
    [AssignedTo] int NULL,
    [CompletedBy] int NULL,
    [CompletedAt] datetime2 NULL,
    CONSTRAINT [PK_PutawayTask] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_PutawayTask_AspNetUsers_AssignedTo] FOREIGN KEY ([AssignedTo]) REFERENCES [AspNetUsers] ([Id]),
    CONSTRAINT [FK_PutawayTask_AspNetUsers_CompletedBy] FOREIGN KEY ([CompletedBy]) REFERENCES [AspNetUsers] ([Id]),
    CONSTRAINT [FK_PutawayTask_HandlingUnit_HandlingUnitId] FOREIGN KEY ([HandlingUnitId]) REFERENCES [wms_core].[HandlingUnit] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_PutawayTask_InboundReceiptHeader_ReceiptHeaderId] FOREIGN KEY ([ReceiptHeaderId]) REFERENCES [wms_core].[InboundReceiptHeader] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_PutawayTask_Item_ItemId] FOREIGN KEY ([ItemId]) REFERENCES [mdm].[Item] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_PutawayTask_Location_TargetLocationId] FOREIGN KEY ([TargetLocationId]) REFERENCES [mdm].[Location] ([Id]) ON DELETE NO ACTION
);

CREATE TABLE [wms_core].[ShipmentLine] (
    [Id] int NOT NULL IDENTITY,
    [ShipmentHeaderId] int NOT NULL,
    [PickTaskId] bigint NULL,
    [SoLineId] int NULL,
    [ShippedQty] decimal(18,4) NOT NULL,
    CONSTRAINT [PK_ShipmentLine] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_ShipmentLine_PickTask_PickTaskId] FOREIGN KEY ([PickTaskId]) REFERENCES [wms_core].[PickTask] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_ShipmentLine_ShipmentHeader_ShipmentHeaderId] FOREIGN KEY ([ShipmentHeaderId]) REFERENCES [wms_core].[ShipmentHeader] ([Id]) ON DELETE NO ACTION
);

CREATE INDEX [IX_AspNetRoleClaims_RoleId] ON [AspNetRoleClaims] ([RoleId]);

CREATE UNIQUE INDEX [RoleNameIndex] ON [AspNetRoles] ([NormalizedName]) WHERE [NormalizedName] IS NOT NULL;

CREATE INDEX [IX_AspNetUserClaims_UserId] ON [AspNetUserClaims] ([UserId]);

CREATE INDEX [IX_AspNetUserLogins_UserId] ON [AspNetUserLogins] ([UserId]);

CREATE INDEX [IX_AspNetUserRoles_RoleId] ON [AspNetUserRoles] ([RoleId]);

CREATE INDEX [EmailIndex] ON [AspNetUsers] ([NormalizedEmail]);

CREATE UNIQUE INDEX [UserNameIndex] ON [AspNetUsers] ([NormalizedUserName]) WHERE [NormalizedUserName] IS NOT NULL;

CREATE INDEX [IX_CycleCountLine_ItemId] ON [quality_control].[CycleCountLine] ([ItemId]);

CREATE INDEX [IX_CycleCountLine_LocationId] ON [quality_control].[CycleCountLine] ([LocationId]);

CREATE INDEX [IX_CycleCountLine_SessionId] ON [quality_control].[CycleCountLine] ([SessionId]);

CREATE INDEX [IX_CycleCountSession_ZoneId] ON [quality_control].[CycleCountSession] ([ZoneId]);

CREATE INDEX [IX_DraftLine_ItemId] ON [wms_core].[DraftLine] ([ItemId]);

CREATE INDEX [IX_DraftLine_PoLineId] ON [wms_core].[DraftLine] ([PoLineId]);

CREATE INDEX [IX_DraftLine_ReasonCodeId] ON [wms_core].[DraftLine] ([ReasonCodeId]);

CREATE INDEX [IX_DraftLine_ReceiptHeaderId] ON [wms_core].[DraftLine] ([ReceiptHeaderId]);

CREATE INDEX [IX_DraftLine_SubstituteItemId] ON [wms_core].[DraftLine] ([SubstituteItemId]);

CREATE INDEX [IX_DraftLine_UomId] ON [wms_core].[DraftLine] ([UomId]);

CREATE INDEX [IX_ErpPurchaseOrderHeader_ErpStatus] ON [erp_stage].[ErpPurchaseOrderHeader] ([ErpStatus]);

CREATE INDEX [IX_ErpPurchaseOrderHeader_ExpectedDate] ON [erp_stage].[ErpPurchaseOrderHeader] ([ExpectedDate]);

CREATE INDEX [IX_ErpPurchaseOrderHeader_SupplierId] ON [erp_stage].[ErpPurchaseOrderHeader] ([SupplierId]);

CREATE INDEX [IX_ErpPurchaseOrderHeader_WarehouseId] ON [erp_stage].[ErpPurchaseOrderHeader] ([WarehouseId]);

CREATE INDEX [IX_ErpPurchaseOrderLine_ItemId] ON [erp_stage].[ErpPurchaseOrderLine] ([ItemId]);

CREATE INDEX [IX_ErpPurchaseOrderLine_PoHeaderId] ON [erp_stage].[ErpPurchaseOrderLine] ([PoHeaderId]);

CREATE INDEX [IX_ErpPurchaseOrderLine_UomId] ON [erp_stage].[ErpPurchaseOrderLine] ([UomId]);

CREATE INDEX [IX_ErpSalesOrderHeader_CustomerId] ON [erp_stage].[ErpSalesOrderHeader] ([CustomerId]);

CREATE INDEX [IX_ErpSalesOrderHeader_ErpStatus] ON [erp_stage].[ErpSalesOrderHeader] ([ErpStatus]);

CREATE INDEX [IX_ErpSalesOrderHeader_ExpectedDate] ON [erp_stage].[ErpSalesOrderHeader] ([ExpectedDate]);

CREATE INDEX [IX_ErpSalesOrderHeader_WarehouseId] ON [erp_stage].[ErpSalesOrderHeader] ([WarehouseId]);

CREATE INDEX [IX_ErpSalesOrderLine_ItemId] ON [erp_stage].[ErpSalesOrderLine] ([ItemId]);

CREATE INDEX [IX_ErpSalesOrderLine_SoHeaderId] ON [erp_stage].[ErpSalesOrderLine] ([SoHeaderId]);

CREATE INDEX [IX_ErpSalesOrderLine_UomId] ON [erp_stage].[ErpSalesOrderLine] ([UomId]);

CREATE INDEX [IX_HandlingUnit_LocationId] ON [wms_core].[HandlingUnit] ([LocationId]);

CREATE INDEX [IX_InboundReceiptHeader_CreatedAt] ON [wms_core].[InboundReceiptHeader] ([CreatedAt]);

CREATE INDEX [IX_InboundReceiptHeader_Status] ON [wms_core].[InboundReceiptHeader] ([Status]);

CREATE INDEX [IX_InboundReceiptHeader_SupplierId] ON [wms_core].[InboundReceiptHeader] ([SupplierId]);

CREATE INDEX [IX_InboundReceiptHeader_WarehouseId] ON [wms_core].[InboundReceiptHeader] ([WarehouseId]);

CREATE UNIQUE INDEX [IX_IntegrationOutbox_IdempotencyKey] ON [integration_audit].[IntegrationOutbox] ([IdempotencyKey]);

CREATE INDEX [IX_InventoryLedger_FromLocationId] ON [wms_core].[InventoryLedger] ([FromLocationId]);

CREATE INDEX [IX_InventoryLedger_ItemId] ON [wms_core].[InventoryLedger] ([ItemId]);

CREATE INDEX [IX_InventoryLedger_ToLocationId] ON [wms_core].[InventoryLedger] ([ToLocationId]);

CREATE INDEX [IX_InventoryOnHand_HandlingUnitId] ON [wms_core].[InventoryOnHand] ([HandlingUnitId]);

CREATE INDEX [IX_InventoryOnHand_InventoryStatusId] ON [wms_core].[InventoryOnHand] ([InventoryStatusId]);

CREATE INDEX [IX_InventoryOnHand_ItemId] ON [wms_core].[InventoryOnHand] ([ItemId]);

CREATE INDEX [IX_InventoryOnHand_LocationId] ON [wms_core].[InventoryOnHand] ([LocationId]);

CREATE UNIQUE INDEX [UQ_InventoryOnHand_NoHU] ON [wms_core].[InventoryOnHand] ([WarehouseId], [LocationId], [ItemId], [LotNo], [SerialNumber], [InventoryStatusId]) WHERE [HandlingUnitId] IS NULL;

CREATE UNIQUE INDEX [UQ_InventoryOnHand_WithHU] ON [wms_core].[InventoryOnHand] ([WarehouseId], [LocationId], [ItemId], [LotNo], [SerialNumber], [HandlingUnitId], [InventoryStatusId]) WHERE [HandlingUnitId] IS NOT NULL;

CREATE INDEX [IX_Item_BaseUomId] ON [mdm].[Item] ([BaseUomId]);

CREATE UNIQUE INDEX [IX_Item_ItemCode] ON [mdm].[Item] ([ItemCode]);

CREATE INDEX [IX_ItemBarcode_ItemId] ON [mdm].[ItemBarcode] ([ItemId]);

CREATE INDEX [IX_ItemBarcode_UomId] ON [mdm].[ItemBarcode] ([UomId]);

CREATE UNIQUE INDEX [IX_Location_Code_WarehouseId] ON [mdm].[Location] ([Code], [WarehouseId]);

CREATE INDEX [IX_Location_ProfileId] ON [mdm].[Location] ([ProfileId]);

CREATE INDEX [IX_Location_WarehouseId] ON [mdm].[Location] ([WarehouseId]);

CREATE INDEX [IX_Location_ZoneId] ON [mdm].[Location] ([ZoneId]);

CREATE UNIQUE INDEX [IX_MobileScanEvent_ClientTxnId] ON [integration_audit].[MobileScanEvent] ([ClientTxnId]);

CREATE INDEX [IX_MobileScanEvent_UserId] ON [integration_audit].[MobileScanEvent] ([UserId]);

CREATE INDEX [IX_PickTask_AssignedTo] ON [wms_core].[PickTask] ([AssignedTo]);

CREATE INDEX [IX_PickTask_CompletedBy] ON [wms_core].[PickTask] ([CompletedBy]);

CREATE INDEX [IX_PickTask_ItemId] ON [wms_core].[PickTask] ([ItemId]);

CREATE INDEX [IX_PickTask_SoLineId] ON [wms_core].[PickTask] ([SoLineId]);

CREATE INDEX [IX_PickTask_Status] ON [wms_core].[PickTask] ([Status]);

CREATE INDEX [IX_PickTask_SuggestedLocationId] ON [wms_core].[PickTask] ([SuggestedLocationId]);

CREATE INDEX [IX_PutawayTask_AssignedTo] ON [wms_core].[PutawayTask] ([AssignedTo]);

CREATE INDEX [IX_PutawayTask_CompletedBy] ON [wms_core].[PutawayTask] ([CompletedBy]);

CREATE INDEX [IX_PutawayTask_HandlingUnitId] ON [wms_core].[PutawayTask] ([HandlingUnitId]);

CREATE INDEX [IX_PutawayTask_ItemId] ON [wms_core].[PutawayTask] ([ItemId]);

CREATE INDEX [IX_PutawayTask_ReceiptHeaderId] ON [wms_core].[PutawayTask] ([ReceiptHeaderId]);

CREATE INDEX [IX_PutawayTask_Status] ON [wms_core].[PutawayTask] ([Status]);

CREATE INDEX [IX_PutawayTask_TargetLocationId] ON [wms_core].[PutawayTask] ([TargetLocationId]);

CREATE INDEX [IX_QualityOrder_DraftLineId] ON [quality_control].[QualityOrder] ([DraftLineId]);

CREATE INDEX [IX_QualityOrder_ItemId] ON [quality_control].[QualityOrder] ([ItemId]);

CREATE INDEX [IX_ShipmentHeader_CreatedDate] ON [wms_core].[ShipmentHeader] ([CreatedDate]);

CREATE INDEX [IX_ShipmentHeader_Status] ON [wms_core].[ShipmentHeader] ([Status]);

CREATE INDEX [IX_ShipmentHeader_WarehouseId] ON [wms_core].[ShipmentHeader] ([WarehouseId]);

CREATE INDEX [IX_ShipmentLine_PickTaskId] ON [wms_core].[ShipmentLine] ([PickTaskId]);

CREATE INDEX [IX_ShipmentLine_ShipmentHeaderId] ON [wms_core].[ShipmentLine] ([ShipmentHeaderId]);

CREATE INDEX [IX_UomConversion_FromUomId] ON [mdm].[UomConversion] ([FromUomId]);

CREATE INDEX [IX_UomConversion_ItemId] ON [mdm].[UomConversion] ([ItemId]);

CREATE INDEX [IX_UomConversion_ToUomId] ON [mdm].[UomConversion] ([ToUomId]);

CREATE INDEX [IX_UserWarehouseMapping_WarehouseId] ON [wms_core].[UserWarehouseMapping] ([WarehouseId]);

CREATE INDEX [IX_Zone_WarehouseId] ON [mdm].[Zone] ([WarehouseId]);

CREATE UNIQUE INDEX [IX_Zone_ZoneCode_WarehouseId] ON [mdm].[Zone] ([ZoneCode], [WarehouseId]);

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20260418055532_WmsDb_V1_Final_Architect', N'10.0.6');

COMMIT;
GO

