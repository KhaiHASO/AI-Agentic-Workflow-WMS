USE [master]
GO

IF EXISTS (SELECT name FROM sys.databases WHERE name = N'WmsDb')
BEGIN
    ALTER DATABASE [WmsDb] SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE [WmsDb];
END
GO

CREATE DATABASE [WmsDb];
GO

USE [WmsDb];
GO

-- 1. CREATE SCHEMAS
IF SCHEMA_ID(N'wms_core') IS NULL EXEC(N'CREATE SCHEMA [wms_core];');
GO
IF SCHEMA_ID(N'integration_audit') IS NULL EXEC(N'CREATE SCHEMA [integration_audit];');
GO
IF SCHEMA_ID(N'quality_control') IS NULL EXEC(N'CREATE SCHEMA [quality_control];');
GO
IF SCHEMA_ID(N'mdm') IS NULL EXEC(N'CREATE SCHEMA [mdm];');
GO
IF SCHEMA_ID(N'erp_stage') IS NULL EXEC(N'CREATE SCHEMA [erp_stage];');
GO

-- 2. CREATE TABLES (Based on Schema Full)
CREATE TABLE [integration_audit].[ApiCallLog] (
    [Id] bigint NOT NULL IDENTITY,
    [Endpoint] nvarchar(max) NULL,
    [Method] nvarchar(max) NULL,
    [StatusCode] int NULL,
    [Timestamp] datetime2 NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [CreatedBy] int NULL,
    [UpdatedAt] datetime2 NULL,
    [UpdatedBy] int NULL,
    [RowVersion] rowversion NULL,
    CONSTRAINT [PK_ApiCallLog] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [AspNetRoles] (
    [Id] int NOT NULL IDENTITY,
    [Description] nvarchar(max) NULL,
    [Name] nvarchar(256) NULL,
    [NormalizedName] nvarchar(256) NULL,
    [ConcurrencyStamp] nvarchar(max) NULL,
    CONSTRAINT [PK_AspNetRoles] PRIMARY KEY ([Id])
);
GO

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
GO

CREATE TABLE [mdm].[Customer] (
    [Id] int NOT NULL IDENTITY,
    [Code] nvarchar(50) NOT NULL,
    [Name] nvarchar(max) NULL,
    [Status] nvarchar(max) NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [CreatedBy] int NULL,
    [UpdatedAt] datetime2 NULL,
    [UpdatedBy] int NULL,
    [RowVersion] rowversion NULL,
    CONSTRAINT [PK_Customer] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [mdm].[DispositionCode] (
    [Id] int NOT NULL IDENTITY,
    [Code] nvarchar(50) NOT NULL,
    [Description] nvarchar(max) NULL,
    [CreatedAt] datetime2 NOT NULL,
    [CreatedBy] int NULL,
    [UpdatedAt] datetime2 NULL,
    [UpdatedBy] int NULL,
    [RowVersion] rowversion NULL,
    CONSTRAINT [PK_DispositionCode] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [erp_stage].[ErpDocumentStatusHistory] (
    [Id] int NOT NULL IDENTITY,
    [DocumentNo] nvarchar(100) NOT NULL,
    [OldStatus] nvarchar(50) NULL,
    [NewStatus] nvarchar(50) NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [CreatedBy] int NULL,
    [UpdatedAt] datetime2 NULL,
    [UpdatedBy] int NULL,
    [RowVersion] rowversion NULL,
    CONSTRAINT [PK_ErpDocumentStatusHistory] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [erp_stage].[ErpReferenceMap] (
    [Id] int NOT NULL IDENTITY,
    [ErpSystem] nvarchar(100) NULL,
    [ExternalId] nvarchar(255) NULL,
    [LocalId] int NOT NULL,
    [EntityType] nvarchar(100) NULL,
    [CreatedAt] datetime2 NOT NULL,
    [CreatedBy] int NULL,
    [UpdatedAt] datetime2 NULL,
    [UpdatedBy] int NULL,
    [RowVersion] rowversion NULL,
    CONSTRAINT [PK_ErpReferenceMap] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [erp_stage].[ErpSyncRun] (
    [Id] int NOT NULL IDENTITY,
    [StartTime] datetime2 NOT NULL,
    [EndTime] datetime2 NULL,
    [Status] nvarchar(50) NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [CreatedBy] int NULL,
    [UpdatedAt] datetime2 NULL,
    [UpdatedBy] int NULL,
    [RowVersion] rowversion NULL,
    CONSTRAINT [PK_ErpSyncRun] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [integration_audit].[IntegrationInbox] (
    [Id] int NOT NULL IDENTITY,
    [IdempotencyKey] nvarchar(255) NOT NULL,
    [MessageType] nvarchar(max) NULL,
    [Payload] nvarchar(max) NULL,
    [Status] nvarchar(max) NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [CreatedBy] int NULL,
    [UpdatedAt] datetime2 NULL,
    [UpdatedBy] int NULL,
    [RowVersion] rowversion NULL,
    CONSTRAINT [PK_IntegrationInbox] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [integration_audit].[IntegrationOutbox] (
    [Id] int NOT NULL IDENTITY,
    [IdempotencyKey] nvarchar(255) NOT NULL,
    [MessageType] nvarchar(max) NULL,
    [Payload] nvarchar(max) NULL,
    [RetryCount] int NOT NULL,
    [Status] nvarchar(max) NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [CreatedBy] int NULL,
    [UpdatedAt] datetime2 NULL,
    [UpdatedBy] int NULL,
    [RowVersion] rowversion NULL,
    CONSTRAINT [PK_IntegrationOutbox] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [mdm].[InventoryStatus] (
    [Id] int NOT NULL IDENTITY,
    [StatusCode] nvarchar(50) NOT NULL,
    [IsAllocatable] bit NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [CreatedBy] int NULL,
    [UpdatedAt] datetime2 NULL,
    [UpdatedBy] int NULL,
    [RowVersion] rowversion NULL,
    CONSTRAINT [PK_InventoryStatus] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [mdm].[LocationProfile] (
    [Id] int NOT NULL IDENTITY,
    [MaxWeight] decimal(18,4) NOT NULL,
    [MaxVolume] decimal(18,4) NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [CreatedBy] int NULL,
    [UpdatedAt] datetime2 NULL,
    [UpdatedBy] int NULL,
    [RowVersion] rowversion NULL,
    CONSTRAINT [PK_LocationProfile] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [mdm].[Owner] (
    [Id] int NOT NULL IDENTITY,
    [Code] nvarchar(50) NOT NULL,
    [Name] nvarchar(max) NULL,
    [CreatedAt] datetime2 NOT NULL,
    [CreatedBy] int NULL,
    [UpdatedAt] datetime2 NULL,
    [UpdatedBy] int NULL,
    [RowVersion] rowversion NULL,
    CONSTRAINT [PK_Owner] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [mdm].[ReasonCode] (
    [Id] int NOT NULL IDENTITY,
    [Code] nvarchar(50) NOT NULL,
    [Type] nvarchar(max) NULL,
    [CreatedAt] datetime2 NOT NULL,
    [CreatedBy] int NULL,
    [UpdatedAt] datetime2 NULL,
    [UpdatedBy] int NULL,
    [RowVersion] rowversion NULL,
    CONSTRAINT [PK_ReasonCode] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [mdm].[Supplier] (
    [Id] int NOT NULL IDENTITY,
    [Code] nvarchar(50) NOT NULL,
    [Name] nvarchar(max) NULL,
    [Status] nvarchar(max) NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [CreatedBy] int NULL,
    [UpdatedAt] datetime2 NULL,
    [UpdatedBy] int NULL,
    [RowVersion] rowversion NULL,
    CONSTRAINT [PK_Supplier] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [mdm].[Uom] (
    [Id] int NOT NULL IDENTITY,
    [Code] nvarchar(50) NOT NULL,
    [Name] nvarchar(max) NULL,
    [Status] nvarchar(max) NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [CreatedBy] int NULL,
    [UpdatedAt] datetime2 NULL,
    [UpdatedBy] int NULL,
    [RowVersion] rowversion NULL,
    CONSTRAINT [PK_Uom] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [mdm].[Warehouse] (
    [Id] int NOT NULL IDENTITY,
    [Code] nvarchar(50) NOT NULL,
    [Name] nvarchar(max) NULL,
    [Status] nvarchar(max) NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [CreatedBy] int NULL,
    [UpdatedAt] datetime2 NULL,
    [UpdatedBy] int NULL,
    [RowVersion] rowversion NULL,
    CONSTRAINT [PK_Warehouse] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [AspNetRoleClaims] (
    [Id] int NOT NULL IDENTITY,
    [RoleId] int NOT NULL,
    [ClaimType] nvarchar(max) NULL,
    [ClaimValue] nvarchar(max) NULL,
    CONSTRAINT [PK_AspNetRoleClaims] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_AspNetRoleClaims_AspNetRoles_RoleId] FOREIGN KEY ([RoleId]) REFERENCES [AspNetRoles] ([Id])
);
GO

CREATE TABLE [AspNetUserClaims] (
    [Id] int NOT NULL IDENTITY,
    [UserId] int NOT NULL,
    [ClaimType] nvarchar(max) NULL,
    [ClaimValue] nvarchar(max) NULL,
    CONSTRAINT [PK_AspNetUserClaims] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_AspNetUserClaims_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id])
);
GO

CREATE TABLE [AspNetUserLogins] (
    [LoginProvider] nvarchar(450) NOT NULL,
    [ProviderKey] nvarchar(450) NOT NULL,
    [ProviderDisplayName] nvarchar(max) NULL,
    [UserId] int NOT NULL,
    CONSTRAINT [PK_AspNetUserLogins] PRIMARY KEY ([LoginProvider], [ProviderKey]),
    CONSTRAINT [FK_AspNetUserLogins_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id])
);
GO

CREATE TABLE [AspNetUserRoles] (
    [UserId] int NOT NULL,
    [RoleId] int NOT NULL,
    CONSTRAINT [PK_AspNetUserRoles] PRIMARY KEY ([UserId], [RoleId]),
    CONSTRAINT [FK_AspNetUserRoles_AspNetRoles_RoleId] FOREIGN KEY ([RoleId]) REFERENCES [AspNetRoles] ([Id]),
    CONSTRAINT [FK_AspNetUserRoles_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id])
);
GO

CREATE TABLE [AspNetUserTokens] (
    [UserId] int NOT NULL,
    [LoginProvider] nvarchar(450) NOT NULL,
    [Name] nvarchar(450) NOT NULL,
    [Value] nvarchar(max) NULL,
    CONSTRAINT [PK_AspNetUserTokens] PRIMARY KEY ([UserId], [LoginProvider], [Name]),
    CONSTRAINT [FK_AspNetUserTokens_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id])
);
GO

CREATE TABLE [integration_audit].[AuditLog] (
    [Id] bigint NOT NULL IDENTITY,
    [UserId] int NOT NULL,
    [Action] nvarchar(max) NULL,
    [EntityName] nvarchar(max) NULL,
    [EntityId] nvarchar(max) NULL,
    [OldValues] nvarchar(max) NULL,
    [NewValues] nvarchar(max) NULL,
    [Timestamp] datetime2 NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [CreatedBy] int NULL,
    [UpdatedAt] datetime2 NULL,
    [UpdatedBy] int NULL,
    [RowVersion] rowversion NULL,
    CONSTRAINT [PK_AuditLog] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_AuditLog_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id])
);
GO

CREATE TABLE [integration_audit].[MobileScanEvent] (
    [Id] bigint NOT NULL IDENTITY,
    [ClientTxnId] nvarchar(255) NOT NULL,
    [Barcode] nvarchar(max) NOT NULL,
    [ScannedQty] decimal(18,4) NULL,
    [UserId] int NULL,
    [ScanTime] datetime2 NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [CreatedBy] int NULL,
    [UpdatedAt] datetime2 NULL,
    [UpdatedBy] int NULL,
    [RowVersion] rowversion NULL,
    CONSTRAINT [PK_MobileScanEvent] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_MobileScanEvent_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id])
);
GO

CREATE TABLE [mdm].[UserDevice] (
    [Id] int NOT NULL IDENTITY,
    [UserId] int NOT NULL,
    [DeviceId] nvarchar(255) NOT NULL,
    [Status] nvarchar(max) NULL,
    [CreatedAt] datetime2 NOT NULL,
    [CreatedBy] int NULL,
    [UpdatedAt] datetime2 NULL,
    [UpdatedBy] int NULL,
    [RowVersion] rowversion NULL,
    CONSTRAINT [PK_UserDevice] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_UserDevice_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id])
);
GO

CREATE TABLE [erp_stage].[ErpSyncError] (
    [Id] int NOT NULL IDENTITY,
    [SyncRunId] int NOT NULL,
    [ErrorMessage] nvarchar(max) NULL,
    [RawPayload] nvarchar(max) NULL,
    [CreatedAt] datetime2 NOT NULL,
    [CreatedBy] int NULL,
    [UpdatedAt] datetime2 NULL,
    [UpdatedBy] int NULL,
    [RowVersion] rowversion NULL,
    CONSTRAINT [PK_ErpSyncError] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_ErpSyncError_ErpSyncRun_SyncRunId] FOREIGN KEY ([SyncRunId]) REFERENCES [erp_stage].[ErpSyncRun] ([Id])
);
GO

CREATE TABLE [mdm].[Item] (
    [Id] int NOT NULL IDENTITY,
    [ItemCode] nvarchar(50) NOT NULL,
    [Name] nvarchar(max) NULL,
    [BaseUomId] int NOT NULL,
    [PickStrategy] nvarchar(max) NULL,
    [Status] nvarchar(max) NOT NULL,
    [IsLotControlled] bit NOT NULL,
    [IsSerialControlled] bit NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [CreatedBy] int NULL,
    [UpdatedAt] datetime2 NULL,
    [UpdatedBy] int NULL,
    [RowVersion] rowversion NULL,
    CONSTRAINT [PK_Item] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Item_Uom_BaseUomId] FOREIGN KEY ([BaseUomId]) REFERENCES [mdm].[Uom] ([Id])
);
GO

CREATE TABLE [mdm].[UomConversion] (
    [Id] int NOT NULL IDENTITY,
    [FromUomId] int NOT NULL,
    [ToUomId] int NOT NULL,
    [ConversionRate] decimal(18,4) NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [CreatedBy] int NULL,
    [UpdatedAt] datetime2 NULL,
    [UpdatedBy] int NULL,
    [RowVersion] rowversion NULL,
    CONSTRAINT [PK_UomConversion] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_UomConversion_Uom_FromUomId] FOREIGN KEY ([FromUomId]) REFERENCES [mdm].[Uom] ([Id]),
    CONSTRAINT [FK_UomConversion_Uom_ToUomId] FOREIGN KEY ([ToUomId]) REFERENCES [mdm].[Uom] ([Id])
);
GO

CREATE TABLE [quality_control].[CycleCountPlan] (
    [Id] int NOT NULL IDENTITY,
    [PlanName] nvarchar(255) NOT NULL,
    [WarehouseId] int NOT NULL,
    [ScheduledDate] datetime2 NOT NULL,
    [Status] nvarchar(max) NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [CreatedBy] int NULL,
    [UpdatedAt] datetime2 NULL,
    [UpdatedBy] int NULL,
    [RowVersion] rowversion NULL,
    CONSTRAINT [PK_CycleCountPlan] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_CycleCountPlan_Warehouse_WarehouseId] FOREIGN KEY ([WarehouseId]) REFERENCES [mdm].[Warehouse] ([Id])
);
GO

CREATE TABLE [erp_stage].[ErpPurchaseOrderHeader] (
    [Id] int NOT NULL IDENTITY,
    [PoNumber] nvarchar(100) NOT NULL,
    [WarehouseId] int NOT NULL,
    [SupplierId] int NULL,
    [ErpStatus] nvarchar(50) NULL,
    [CreatedAt] datetime2 NOT NULL,
    [CreatedBy] int NULL,
    [UpdatedAt] datetime2 NULL,
    [UpdatedBy] int NULL,
    [RowVersion] rowversion NULL,
    CONSTRAINT [PK_ErpPurchaseOrderHeader] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_ErpPurchaseOrderHeader_Supplier_SupplierId] FOREIGN KEY ([SupplierId]) REFERENCES [mdm].[Supplier] ([Id]),
    CONSTRAINT [FK_ErpPurchaseOrderHeader_Warehouse_WarehouseId] FOREIGN KEY ([WarehouseId]) REFERENCES [mdm].[Warehouse] ([Id])
);
GO

CREATE TABLE [erp_stage].[ErpSalesOrderHeader] (
    [Id] int NOT NULL IDENTITY,
    [SoNumber] nvarchar(100) NOT NULL,
    [WarehouseId] int NOT NULL,
    [CustomerId] int NULL,
    [ErpStatus] nvarchar(50) NULL,
    [CreatedAt] datetime2 NOT NULL,
    [CreatedBy] int NULL,
    [UpdatedAt] datetime2 NULL,
    [UpdatedBy] int NULL,
    [RowVersion] rowversion NULL,
    CONSTRAINT [PK_ErpSalesOrderHeader] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_ErpSalesOrderHeader_Customer_CustomerId] FOREIGN KEY ([CustomerId]) REFERENCES [mdm].[Customer] ([Id]),
    CONSTRAINT [FK_ErpSalesOrderHeader_Warehouse_WarehouseId] FOREIGN KEY ([WarehouseId]) REFERENCES [mdm].[Warehouse] ([Id])
);
GO

CREATE TABLE [wms_core].[InboundReceiptHeader] (
    [Id] int NOT NULL IDENTITY,
    [IdempotencyKey] nvarchar(100) NULL,
    [ReceiptNo] nvarchar(100) NOT NULL,
    [WarehouseId] int NOT NULL,
    [SupplierId] int NULL,
    [Status] nvarchar(max) NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [CreatedBy] int NULL,
    [UpdatedAt] datetime2 NULL,
    [UpdatedBy] int NULL,
    [RowVersion] rowversion NULL,
    CONSTRAINT [PK_InboundReceiptHeader] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_InboundReceiptHeader_Supplier_SupplierId] FOREIGN KEY ([SupplierId]) REFERENCES [mdm].[Supplier] ([Id]),
    CONSTRAINT [FK_InboundReceiptHeader_Warehouse_WarehouseId] FOREIGN KEY ([WarehouseId]) REFERENCES [mdm].[Warehouse] ([Id])
);
GO

CREATE TABLE [quality_control].[QuarantineOrder] (
    [Id] int NOT NULL IDENTITY,
    [WarehouseId] int NOT NULL,
    [ReasonCodeId] int NULL,
    [Status] nvarchar(max) NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [CreatedBy] int NULL,
    [UpdatedAt] datetime2 NULL,
    [UpdatedBy] int NULL,
    [RowVersion] rowversion NULL,
    CONSTRAINT [PK_QuarantineOrder] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_QuarantineOrder_ReasonCode_ReasonCodeId] FOREIGN KEY ([ReasonCodeId]) REFERENCES [mdm].[ReasonCode] ([Id]),
    CONSTRAINT [FK_QuarantineOrder_Warehouse_WarehouseId] FOREIGN KEY ([WarehouseId]) REFERENCES [mdm].[Warehouse] ([Id])
);
GO

CREATE TABLE [wms_core].[ReturnReceiptHeader] (
    [Id] int NOT NULL IDENTITY,
    [ReturnNo] nvarchar(100) NOT NULL,
    [WarehouseId] int NOT NULL,
    [Status] nvarchar(max) NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [CreatedBy] int NULL,
    [UpdatedAt] datetime2 NULL,
    [UpdatedBy] int NULL,
    [RowVersion] rowversion NULL,
    CONSTRAINT [PK_ReturnReceiptHeader] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_ReturnReceiptHeader_Warehouse_WarehouseId] FOREIGN KEY ([WarehouseId]) REFERENCES [mdm].[Warehouse] ([Id])
);
GO

CREATE TABLE [wms_core].[ShipmentHeader] (
    [Id] int NOT NULL IDENTITY,
    [IdempotencyKey] nvarchar(100) NULL,
    [ShipmentCode] nvarchar(100) NOT NULL,
    [WarehouseId] int NOT NULL,
    [Status] nvarchar(max) NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [CreatedBy] int NULL,
    [UpdatedAt] datetime2 NULL,
    [UpdatedBy] int NULL,
    [RowVersion] rowversion NULL,
    CONSTRAINT [PK_ShipmentHeader] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_ShipmentHeader_Warehouse_WarehouseId] FOREIGN KEY ([WarehouseId]) REFERENCES [mdm].[Warehouse] ([Id])
);
GO

CREATE TABLE [wms_core].[UserWarehouseMapping] (
    [UserId] int NOT NULL,
    [WarehouseId] int NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [CreatedBy] int NULL,
    [UpdatedAt] datetime2 NULL,
    [UpdatedBy] int NULL,
    [RowVersion] rowversion NULL,
    CONSTRAINT [PK_UserWarehouseMapping] PRIMARY KEY ([UserId], [WarehouseId]),
    CONSTRAINT [FK_UserWarehouseMapping_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id]),
    CONSTRAINT [FK_UserWarehouseMapping_Warehouse_WarehouseId] FOREIGN KEY ([WarehouseId]) REFERENCES [mdm].[Warehouse] ([Id])
);
GO

CREATE TABLE [wms_core].[WavePicking] (
    [Id] int NOT NULL IDENTITY,
    [IdempotencyKey] nvarchar(100) NULL,
    [WaveNo] nvarchar(100) NOT NULL,
    [WarehouseId] int NOT NULL,
    [Status] nvarchar(max) NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [CreatedBy] int NULL,
    [UpdatedAt] datetime2 NULL,
    [UpdatedBy] int NULL,
    [RowVersion] rowversion NULL,
    CONSTRAINT [PK_WavePicking] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_WavePicking_Warehouse_WarehouseId] FOREIGN KEY ([WarehouseId]) REFERENCES [mdm].[Warehouse] ([Id])
);
GO

CREATE TABLE [mdm].[Zone] (
    [Id] int NOT NULL IDENTITY,
    [WarehouseId] int NOT NULL,
    [ZoneCode] nvarchar(50) NOT NULL,
    [ZoneType] nvarchar(max) NULL,
    [CreatedAt] datetime2 NOT NULL,
    [CreatedBy] int NULL,
    [UpdatedAt] datetime2 NULL,
    [UpdatedBy] int NULL,
    [RowVersion] rowversion NULL,
    CONSTRAINT [PK_Zone] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Zone_Warehouse_WarehouseId] FOREIGN KEY ([WarehouseId]) REFERENCES [mdm].[Warehouse] ([Id])
);
GO

CREATE TABLE [mdm].[ItemBarcode] (
    [Id] int NOT NULL IDENTITY,
    [ItemId] int NOT NULL,
    [Barcode] nvarchar(100) NOT NULL,
    [UomId] int NULL,
    [CreatedAt] datetime2 NOT NULL,
    [CreatedBy] int NULL,
    [UpdatedAt] datetime2 NULL,
    [UpdatedBy] int NULL,
    [RowVersion] rowversion NULL,
    CONSTRAINT [PK_ItemBarcode] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_ItemBarcode_Item_ItemId] FOREIGN KEY ([ItemId]) REFERENCES [mdm].[Item] ([Id]),
    CONSTRAINT [FK_ItemBarcode_Uom_UomId] FOREIGN KEY ([UomId]) REFERENCES [mdm].[Uom] ([Id])
);
GO

CREATE TABLE [mdm].[ItemWarehousePolicy] (
    [Id] int NOT NULL IDENTITY,
    [ItemId] int NOT NULL,
    [WarehouseId] int NOT NULL,
    [MinStock] decimal(18,4) NOT NULL,
    [MaxStock] decimal(18,4) NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [CreatedBy] int NULL,
    [UpdatedAt] datetime2 NULL,
    [UpdatedBy] int NULL,
    [RowVersion] rowversion NULL,
    CONSTRAINT [PK_ItemWarehousePolicy] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_ItemWarehousePolicy_Item_ItemId] FOREIGN KEY ([ItemId]) REFERENCES [mdm].[Item] ([Id]),
    CONSTRAINT [FK_ItemWarehousePolicy_Warehouse_WarehouseId] FOREIGN KEY ([WarehouseId]) REFERENCES [mdm].[Warehouse] ([Id])
);
GO

CREATE TABLE [erp_stage].[ErpPurchaseOrderLine] (
    [Id] int NOT NULL IDENTITY,
    [PoHeaderId] int NOT NULL,
    [ItemId] int NOT NULL,
    [OrderedQty] decimal(18,4) NOT NULL,
    [OpenQty] decimal(18,4) NOT NULL,
    [UomId] int NULL,
    [CreatedAt] datetime2 NOT NULL,
    [CreatedBy] int NULL,
    [UpdatedAt] datetime2 NULL,
    [UpdatedBy] int NULL,
    [RowVersion] rowversion NULL,
    CONSTRAINT [PK_ErpPurchaseOrderLine] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_ErpPurchaseOrderLine_ErpPurchaseOrderHeader_PoHeaderId] FOREIGN KEY ([PoHeaderId]) REFERENCES [erp_stage].[ErpPurchaseOrderHeader] ([Id]),
    CONSTRAINT [FK_ErpPurchaseOrderLine_Item_ItemId] FOREIGN KEY ([ItemId]) REFERENCES [mdm].[Item] ([Id]),
    CONSTRAINT [FK_ErpPurchaseOrderLine_Uom_UomId] FOREIGN KEY ([UomId]) REFERENCES [mdm].[Uom] ([Id])
);
GO

CREATE TABLE [erp_stage].[ErpSalesOrderLine] (
    [Id] int NOT NULL IDENTITY,
    [SoHeaderId] int NOT NULL,
    [ItemId] int NOT NULL,
    [OrderedQty] decimal(18,4) NOT NULL,
    [OpenQty] decimal(18,4) NOT NULL,
    [UomId] int NULL,
    [CreatedAt] datetime2 NOT NULL,
    [CreatedBy] int NULL,
    [UpdatedAt] datetime2 NULL,
    [UpdatedBy] int NULL,
    [RowVersion] rowversion NULL,
    CONSTRAINT [PK_ErpSalesOrderLine] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_ErpSalesOrderLine_ErpSalesOrderHeader_SoHeaderId] FOREIGN KEY ([SoHeaderId]) REFERENCES [erp_stage].[ErpSalesOrderHeader] ([Id]),
    CONSTRAINT [FK_ErpSalesOrderLine_Item_ItemId] FOREIGN KEY ([ItemId]) REFERENCES [mdm].[Item] ([Id]),
    CONSTRAINT [FK_ErpSalesOrderLine_Uom_UomId] FOREIGN KEY ([UomId]) REFERENCES [mdm].[Uom] ([Id])
);
GO

CREATE TABLE [wms_core].[ReturnReceiptLine] (
    [Id] int NOT NULL IDENTITY,
    [ReturnHeaderId] int NOT NULL,
    [ItemId] int NOT NULL,
    [Qty] decimal(18,4) NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [CreatedBy] int NULL,
    [UpdatedAt] datetime2 NULL,
    [UpdatedBy] int NULL,
    [RowVersion] rowversion NULL,
    CONSTRAINT [PK_ReturnReceiptLine] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_ReturnReceiptLine_Item_ItemId] FOREIGN KEY ([ItemId]) REFERENCES [mdm].[Item] ([Id]),
    CONSTRAINT [FK_ReturnReceiptLine_ReturnReceiptHeader_ReturnHeaderId] FOREIGN KEY ([ReturnHeaderId]) REFERENCES [wms_core].[ReturnReceiptHeader] ([Id])
);
GO

CREATE TABLE [wms_core].[CrossDockingOrder] (
    [Id] int NOT NULL IDENTITY,
    [InboundReceiptId] int NOT NULL,
    [OutboundShipmentId] int NOT NULL,
    [Status] nvarchar(max) NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [CreatedBy] int NULL,
    [UpdatedAt] datetime2 NULL,
    [UpdatedBy] int NULL,
    [RowVersion] rowversion NULL,
    CONSTRAINT [PK_CrossDockingOrder] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_CrossDockingOrder_InboundReceiptHeader_InboundReceiptId] FOREIGN KEY ([InboundReceiptId]) REFERENCES [wms_core].[InboundReceiptHeader] ([Id]),
    CONSTRAINT [FK_CrossDockingOrder_ShipmentHeader_OutboundShipmentId] FOREIGN KEY ([OutboundShipmentId]) REFERENCES [wms_core].[ShipmentHeader] ([Id])
);
GO

CREATE TABLE [quality_control].[CycleCountSession] (
    [Id] int NOT NULL IDENTITY,
    [IdempotencyKey] nvarchar(100) NULL,
    [SessionNo] nvarchar(100) NOT NULL,
    [ZoneId] int NULL,
    [Status] nvarchar(max) NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [CreatedBy] int NULL,
    [UpdatedAt] datetime2 NULL,
    [UpdatedBy] int NULL,
    [RowVersion] rowversion NULL,
    CONSTRAINT [PK_CycleCountSession] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_CycleCountSession_Zone_ZoneId] FOREIGN KEY ([ZoneId]) REFERENCES [mdm].[Zone] ([Id])
);
GO

CREATE TABLE [mdm].[Location] (
    [Id] int NOT NULL IDENTITY,
    [WarehouseId] int NOT NULL,
    [ZoneId] int NULL,
    [ProfileId] int NULL,
    [Code] nvarchar(50) NOT NULL,
    [Aisle] nvarchar(max) NULL,
    [Rack] nvarchar(max) NULL,
    [Level] nvarchar(max) NULL,
    [Bin] nvarchar(max) NULL,
    [Status] nvarchar(max) NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [CreatedBy] int NULL,
    [UpdatedAt] datetime2 NULL,
    [UpdatedBy] int NULL,
    [RowVersion] rowversion NULL,
    CONSTRAINT [PK_Location] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Location_LocationProfile_ProfileId] FOREIGN KEY ([ProfileId]) REFERENCES [mdm].[LocationProfile] ([Id]),
    CONSTRAINT [FK_Location_Warehouse_WarehouseId] FOREIGN KEY ([WarehouseId]) REFERENCES [mdm].[Warehouse] ([Id]),
    CONSTRAINT [FK_Location_Zone_ZoneId] FOREIGN KEY ([ZoneId]) REFERENCES [mdm].[Zone] ([Id])
);
GO

CREATE TABLE [wms_core].[DraftLine] (
    [Id] int NOT NULL IDENTITY,
    [ReceiptHeaderId] int NOT NULL,
    [ItemId] int NOT NULL,
    [PoLineId] int NULL,
    [UomId] int NULL,
    [ExpectedQty] decimal(18,4) NOT NULL,
    [ReceivedQty] decimal(18,4) NOT NULL,
    [AcceptedQty] decimal(18,4) NOT NULL,
    [RejectedQty] decimal(18,4) NOT NULL,
    [HoldQty] decimal(18,4) NOT NULL,
    [Status] nvarchar(max) NULL,
    [CreatedAt] datetime2 NOT NULL,
    [CreatedBy] int NULL,
    [UpdatedAt] datetime2 NULL,
    [UpdatedBy] int NULL,
    [RowVersion] rowversion NULL,
    CONSTRAINT [PK_DraftLine] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_DraftLine_ErpPurchaseOrderLine_PoLineId] FOREIGN KEY ([PoLineId]) REFERENCES [erp_stage].[ErpPurchaseOrderLine] ([Id]),
    CONSTRAINT [FK_DraftLine_InboundReceiptHeader_ReceiptHeaderId] FOREIGN KEY ([ReceiptHeaderId]) REFERENCES [wms_core].[InboundReceiptHeader] ([Id]),
    CONSTRAINT [FK_DraftLine_Item_ItemId] FOREIGN KEY ([ItemId]) REFERENCES [mdm].[Item] ([Id]),
    CONSTRAINT [FK_DraftLine_Uom_UomId] FOREIGN KEY ([UomId]) REFERENCES [mdm].[Uom] ([Id])
);
GO

CREATE TABLE [wms_core].[InboundReceiptLine] (
    [Id] int NOT NULL IDENTITY,
    [ReceiptHeaderId] int NOT NULL,
    [PoLineId] int NULL,
    [ItemId] int NOT NULL,
    [UomId] int NULL,
    [ReceivedQty] decimal(18,4) NOT NULL,
    [AcceptedQty] decimal(18,4) NOT NULL,
    [RejectedQty] decimal(18,4) NOT NULL,
    [HoldQty] decimal(18,4) NOT NULL,
    [ReasonCodeId] int NULL,
    [SubstituteItemId] int NULL,
    [Status] nvarchar(max) NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [CreatedBy] int NULL,
    [UpdatedAt] datetime2 NULL,
    [UpdatedBy] int NULL,
    [RowVersion] rowversion NULL,
    CONSTRAINT [PK_InboundReceiptLine] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_InboundReceiptLine_ErpPurchaseOrderLine_PoLineId] FOREIGN KEY ([PoLineId]) REFERENCES [erp_stage].[ErpPurchaseOrderLine] ([Id]),
    CONSTRAINT [FK_InboundReceiptLine_InboundReceiptHeader_ReceiptHeaderId] FOREIGN KEY ([ReceiptHeaderId]) REFERENCES [wms_core].[InboundReceiptHeader] ([Id]),
    CONSTRAINT [FK_InboundReceiptLine_Item_ItemId] FOREIGN KEY ([ItemId]) REFERENCES [mdm].[Item] ([Id]),
    CONSTRAINT [FK_InboundReceiptLine_Item_SubstituteItemId] FOREIGN KEY ([SubstituteItemId]) REFERENCES [mdm].[Item] ([Id]),
    CONSTRAINT [FK_InboundReceiptLine_ReasonCode_ReasonCodeId] FOREIGN KEY ([ReasonCodeId]) REFERENCES [mdm].[ReasonCode] ([Id]),
    CONSTRAINT [FK_InboundReceiptLine_Uom_UomId] FOREIGN KEY ([UomId]) REFERENCES [mdm].[Uom] ([Id])
);
GO

CREATE TABLE [wms_core].[BackorderTracking] (
    [Id] int NOT NULL IDENTITY,
    [SoLineId] int NOT NULL,
    [BackorderQty] decimal(18,4) NOT NULL,
    [Status] nvarchar(max) NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [CreatedBy] int NULL,
    [UpdatedAt] datetime2 NULL,
    [UpdatedBy] int NULL,
    [RowVersion] rowversion NULL,
    CONSTRAINT [PK_BackorderTracking] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_BackorderTracking_ErpSalesOrderLine_SoLineId] FOREIGN KEY ([SoLineId]) REFERENCES [erp_stage].[ErpSalesOrderLine] ([Id])
);
GO

CREATE TABLE [quality_control].[CycleCountLine] (
    [Id] bigint NOT NULL IDENTITY,
    [SessionId] int NOT NULL,
    [LocationId] int NOT NULL,
    [ItemId] int NOT NULL,
    [SystemQty] decimal(18,4) NOT NULL,
    [CountedQty] decimal(18,4) NOT NULL,
    [Variance] AS [CountedQty] - [SystemQty],
    [Status] nvarchar(max) NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [CreatedBy] int NULL,
    [UpdatedAt] datetime2 NULL,
    [UpdatedBy] int NULL,
    [RowVersion] rowversion NULL,
    CONSTRAINT [PK_CycleCountLine] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_CycleCountLine_CycleCountSession_SessionId] FOREIGN KEY ([SessionId]) REFERENCES [quality_control].[CycleCountSession] ([Id]),
    CONSTRAINT [FK_CycleCountLine_Item_ItemId] FOREIGN KEY ([ItemId]) REFERENCES [mdm].[Item] ([Id]),
    CONSTRAINT [FK_CycleCountLine_Location_LocationId] FOREIGN KEY ([LocationId]) REFERENCES [mdm].[Location] ([Id])
);
GO

CREATE TABLE [wms_core].[HandlingUnit] (
    [Id] int NOT NULL IDENTITY,
    [HuBarcode] nvarchar(100) NOT NULL,
    [LocationId] int NULL,
    [Status] nvarchar(max) NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [CreatedBy] int NULL,
    [UpdatedAt] datetime2 NULL,
    [UpdatedBy] int NULL,
    [RowVersion] rowversion NULL,
    CONSTRAINT [PK_HandlingUnit] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_HandlingUnit_Location_LocationId] FOREIGN KEY ([LocationId]) REFERENCES [mdm].[Location] ([Id])
);
GO

CREATE TABLE [wms_core].[InternalTransfer] (
    [Id] int NOT NULL IDENTITY,
    [IdempotencyKey] nvarchar(100) NULL,
    [TransferNo] nvarchar(100) NOT NULL,
    [ItemId] int NOT NULL,
    [FromLocationId] int NOT NULL,
    [ToLocationId] int NOT NULL,
    [Qty] decimal(18,4) NOT NULL,
    [ReasonCodeId] int NULL,
    [ApprovedBy] int NULL,
    [Status] nvarchar(max) NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [CreatedBy] int NULL,
    [UpdatedAt] datetime2 NULL,
    [UpdatedBy] int NULL,
    [RowVersion] rowversion NULL,
    CONSTRAINT [PK_InternalTransfer] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_InternalTransfer_Item_ItemId] FOREIGN KEY ([ItemId]) REFERENCES [mdm].[Item] ([Id]),
    CONSTRAINT [FK_InternalTransfer_Location_FromLocationId] FOREIGN KEY ([FromLocationId]) REFERENCES [mdm].[Location] ([Id]),
    CONSTRAINT [FK_InternalTransfer_Location_ToLocationId] FOREIGN KEY ([ToLocationId]) REFERENCES [mdm].[Location] ([Id]),
    CONSTRAINT [FK_InternalTransfer_ReasonCode_ReasonCodeId] FOREIGN KEY ([ReasonCodeId]) REFERENCES [mdm].[ReasonCode] ([Id])
);
GO

CREATE TABLE [wms_core].[InventoryAdjustment] (
    [Id] int NOT NULL IDENTITY,
    [IdempotencyKey] nvarchar(100) NULL,
    [ItemId] int NOT NULL,
    [LocationId] int NOT NULL,
    [AdjustedQty] decimal(18,4) NOT NULL,
    [ReasonCodeId] int NULL,
    [ApprovedBy] int NULL,
    [Status] nvarchar(max) NOT NULL,
    [ApproverId] int NULL,
    [CreatedAt] datetime2 NOT NULL,
    [CreatedBy] int NULL,
    [UpdatedAt] datetime2 NULL,
    [UpdatedBy] int NULL,
    [RowVersion] rowversion NULL,
    CONSTRAINT [PK_InventoryAdjustment] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_InventoryAdjustment_AspNetUsers_ApproverId] FOREIGN KEY ([ApproverId]) REFERENCES [AspNetUsers] ([Id]),
    CONSTRAINT [FK_InventoryAdjustment_Item_ItemId] FOREIGN KEY ([ItemId]) REFERENCES [mdm].[Item] ([Id]),
    CONSTRAINT [FK_InventoryAdjustment_Location_LocationId] FOREIGN KEY ([LocationId]) REFERENCES [mdm].[Location] ([Id]),
    CONSTRAINT [FK_InventoryAdjustment_ReasonCode_ReasonCodeId] FOREIGN KEY ([ReasonCodeId]) REFERENCES [mdm].[ReasonCode] ([Id])
);
GO

CREATE TABLE [wms_core].[InventoryLedger] (
    [Id] bigint NOT NULL IDENTITY,
    [TransactionType] nvarchar(max) NOT NULL,
    [ItemId] int NOT NULL,
    [Qty] decimal(18,4) NOT NULL,
    [FromLocationId] int NULL,
    [ToLocationId] int NULL,
    [SourceDocId] nvarchar(max) NULL,
    [Timestamp] datetime2 NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [CreatedBy] int NULL,
    [UpdatedAt] datetime2 NULL,
    [UpdatedBy] int NULL,
    [RowVersion] rowversion NULL,
    CONSTRAINT [PK_InventoryLedger] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_InventoryLedger_Item_ItemId] FOREIGN KEY ([ItemId]) REFERENCES [mdm].[Item] ([Id]),
    CONSTRAINT [FK_InventoryLedger_Location_FromLocationId] FOREIGN KEY ([FromLocationId]) REFERENCES [mdm].[Location] ([Id]),
    CONSTRAINT [FK_InventoryLedger_Location_ToLocationId] FOREIGN KEY ([ToLocationId]) REFERENCES [mdm].[Location] ([Id])
);
GO

CREATE TABLE [wms_core].[PickTask] (
    [Id] bigint NOT NULL IDENTITY,
    [IdempotencyKey] nvarchar(100) NULL,
    [TaskNo] nvarchar(100) NOT NULL,
    [ItemId] int NOT NULL,
    [SoLineId] int NULL,
    [SuggestedLocationId] int NULL,
    [LotNo] nvarchar(max) NULL,
    [RequestedQty] decimal(18,4) NOT NULL,
    [PickedQty] decimal(18,4) NOT NULL,
    [Status] nvarchar(max) NOT NULL,
    [AssignedTo] int NULL,
    [CompletedBy] int NULL,
    [CompletedAt] datetime2 NULL,
    [AssignedUserId] int NULL,
    [CreatedAt] datetime2 NOT NULL,
    [CreatedBy] int NULL,
    [UpdatedAt] datetime2 NULL,
    [UpdatedBy] int NULL,
    [RowVersion] rowversion NULL,
    CONSTRAINT [PK_PickTask] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_PickTask_AspNetUsers_AssignedUserId] FOREIGN KEY ([AssignedUserId]) REFERENCES [AspNetUsers] ([Id]),
    CONSTRAINT [FK_PickTask_ErpSalesOrderLine_SoLineId] FOREIGN KEY ([SoLineId]) REFERENCES [erp_stage].[ErpSalesOrderLine] ([Id]),
    CONSTRAINT [FK_PickTask_Item_ItemId] FOREIGN KEY ([ItemId]) REFERENCES [mdm].[Item] ([Id]),
    CONSTRAINT [FK_PickTask_Location_SuggestedLocationId] FOREIGN KEY ([SuggestedLocationId]) REFERENCES [mdm].[Location] ([Id])
);
GO

CREATE TABLE [quality_control].[QualityOrder] (
    [Id] int NOT NULL IDENTITY,
    [IdempotencyKey] nvarchar(100) NULL,
    [QualityOrderNo] nvarchar(100) NOT NULL,
    [ItemId] int NOT NULL,
    [DraftLineId] int NULL,
    [Qty] decimal(18,4) NOT NULL,
    [Status] nvarchar(max) NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [CreatedBy] int NULL,
    [UpdatedAt] datetime2 NULL,
    [UpdatedBy] int NULL,
    [RowVersion] rowversion NULL,
    CONSTRAINT [PK_QualityOrder] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_QualityOrder_DraftLine_DraftLineId] FOREIGN KEY ([DraftLineId]) REFERENCES [wms_core].[DraftLine] ([Id]),
    CONSTRAINT [FK_QualityOrder_Item_ItemId] FOREIGN KEY ([ItemId]) REFERENCES [mdm].[Item] ([Id])
);
GO

CREATE TABLE [quality_control].[CycleCountReview] (
    [Id] int NOT NULL IDENTITY,
    [CycleCountLineId] bigint NOT NULL,
    [ReviewerId] int NOT NULL,
    [Comments] nvarchar(max) NULL,
    [CreatedAt] datetime2 NOT NULL,
    [CreatedBy] int NULL,
    [UpdatedAt] datetime2 NULL,
    [UpdatedBy] int NULL,
    [RowVersion] rowversion NULL,
    CONSTRAINT [PK_CycleCountReview] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_CycleCountReview_AspNetUsers_ReviewerId] FOREIGN KEY ([ReviewerId]) REFERENCES [AspNetUsers] ([Id]),
    CONSTRAINT [FK_CycleCountReview_CycleCountLine_CycleCountLineId] FOREIGN KEY ([CycleCountLineId]) REFERENCES [quality_control].[CycleCountLine] ([Id])
);
GO

CREATE TABLE [wms_core].[HandlingUnitContent] (
    [Id] int NOT NULL IDENTITY,
    [HandlingUnitId] int NOT NULL,
    [ItemId] int NOT NULL,
    [Qty] decimal(18,4) NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [CreatedBy] int NULL,
    [UpdatedAt] datetime2 NULL,
    [UpdatedBy] int NULL,
    [RowVersion] rowversion NULL,
    CONSTRAINT [PK_HandlingUnitContent] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_HandlingUnitContent_HandlingUnit_HandlingUnitId] FOREIGN KEY ([HandlingUnitId]) REFERENCES [wms_core].[HandlingUnit] ([Id]),
    CONSTRAINT [FK_HandlingUnitContent_Item_ItemId] FOREIGN KEY ([ItemId]) REFERENCES [mdm].[Item] ([Id])
);
GO

CREATE TABLE [wms_core].[InventoryOnHand] (
    [Id] bigint NOT NULL IDENTITY,
    [WarehouseId] int NOT NULL,
    [LocationId] int NOT NULL,
    [ItemId] int NOT NULL,
    [OwnerId] int NULL,
    [LotNo] nvarchar(450) NULL,
    [SerialNumber] nvarchar(450) NULL,
    [HandlingUnitId] int NULL,
    [InventoryStatusId] int NOT NULL,
    [AvailableQty] decimal(18,4) NOT NULL,
    [ReservedQty] decimal(18,4) NOT NULL,
    [AllocatedQty] decimal(18,4) NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [CreatedBy] int NULL,
    [UpdatedAt] datetime2 NULL,
    [UpdatedBy] int NULL,
    [RowVersion] rowversion NULL,
    CONSTRAINT [PK_InventoryOnHand] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_InventoryOnHand_HandlingUnit_HandlingUnitId] FOREIGN KEY ([HandlingUnitId]) REFERENCES [wms_core].[HandlingUnit] ([Id]),
    CONSTRAINT [FK_InventoryOnHand_InventoryStatus_InventoryStatusId] FOREIGN KEY ([InventoryStatusId]) REFERENCES [mdm].[InventoryStatus] ([Id]),
    CONSTRAINT [FK_InventoryOnHand_Item_ItemId] FOREIGN KEY ([ItemId]) REFERENCES [mdm].[Item] ([Id]),
    CONSTRAINT [FK_InventoryOnHand_Location_LocationId] FOREIGN KEY ([LocationId]) REFERENCES [mdm].[Location] ([Id]),
    CONSTRAINT [FK_InventoryOnHand_Owner_OwnerId] FOREIGN KEY ([OwnerId]) REFERENCES [mdm].[Owner] ([Id]),
    CONSTRAINT [FK_InventoryOnHand_Warehouse_WarehouseId] FOREIGN KEY ([WarehouseId]) REFERENCES [mdm].[Warehouse] ([Id])
);
GO

CREATE TABLE [wms_core].[PutawayTask] (
    [Id] bigint NOT NULL IDENTITY,
    [IdempotencyKey] nvarchar(100) NULL,
    [TaskNo] nvarchar(100) NOT NULL,
    [ItemId] int NOT NULL,
    [ReceiptHeaderId] int NULL,
    [TargetLocationId] int NULL,
    [HandlingUnitId] int NULL,
    [Quantity] decimal(18,4) NOT NULL,
    [Status] nvarchar(max) NOT NULL,
    [AssignedTo] int NULL,
    [AssignedUserId] int NULL,
    [CreatedAt] datetime2 NOT NULL,
    [CreatedBy] int NULL,
    [UpdatedAt] datetime2 NULL,
    [UpdatedBy] int NULL,
    [RowVersion] rowversion NULL,
    CONSTRAINT [PK_PutawayTask] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_PutawayTask_AspNetUsers_AssignedUserId] FOREIGN KEY ([AssignedUserId]) REFERENCES [AspNetUsers] ([Id]),
    CONSTRAINT [FK_PutawayTask_HandlingUnit_HandlingUnitId] FOREIGN KEY ([HandlingUnitId]) REFERENCES [wms_core].[HandlingUnit] ([Id]),
    CONSTRAINT [FK_PutawayTask_InboundReceiptHeader_ReceiptHeaderId] FOREIGN KEY ([ReceiptHeaderId]) REFERENCES [wms_core].[InboundReceiptHeader] ([Id]),
    CONSTRAINT [FK_PutawayTask_Item_ItemId] FOREIGN KEY ([ItemId]) REFERENCES [mdm].[Item] ([Id]),
    CONSTRAINT [FK_PutawayTask_Location_TargetLocationId] FOREIGN KEY ([TargetLocationId]) REFERENCES [mdm].[Location] ([Id])
);
GO

CREATE TABLE [wms_core].[ShipmentLine] (
    [Id] int NOT NULL IDENTITY,
    [ShipmentHeaderId] int NOT NULL,
    [PickTaskId] bigint NULL,
    [ShippedQty] decimal(18,4) NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [CreatedBy] int NULL,
    [UpdatedAt] datetime2 NULL,
    [UpdatedBy] int NULL,
    [RowVersion] rowversion NULL,
    CONSTRAINT [PK_ShipmentLine] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_ShipmentLine_PickTask_PickTaskId] FOREIGN KEY ([PickTaskId]) REFERENCES [wms_core].[PickTask] ([Id]),
    CONSTRAINT [FK_ShipmentLine_ShipmentHeader_ShipmentHeaderId] FOREIGN KEY ([ShipmentHeaderId]) REFERENCES [wms_core].[ShipmentHeader] ([Id])
);
GO

CREATE TABLE [wms_core].[WavePickingLine] (
    [Id] int NOT NULL IDENTITY,
    [WavePickingId] int NOT NULL,
    [PickTaskId] bigint NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [CreatedBy] int NULL,
    [UpdatedAt] datetime2 NULL,
    [UpdatedBy] int NULL,
    [RowVersion] rowversion NULL,
    CONSTRAINT [PK_WavePickingLine] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_WavePickingLine_PickTask_PickTaskId] FOREIGN KEY ([PickTaskId]) REFERENCES [wms_core].[PickTask] ([Id]),
    CONSTRAINT [FK_WavePickingLine_WavePicking_WavePickingId] FOREIGN KEY ([WavePickingId]) REFERENCES [wms_core].[WavePicking] ([Id])
);
GO

CREATE TABLE [quality_control].[QualityCheckResult] (
    [Id] int NOT NULL IDENTITY,
    [QualityOrderId] int NOT NULL,
    [Result] nvarchar(max) NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [CreatedBy] int NULL,
    [UpdatedAt] datetime2 NULL,
    [UpdatedBy] int NULL,
    [RowVersion] rowversion NULL,
    CONSTRAINT [PK_QualityCheckResult] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_QualityCheckResult_QualityOrder_QualityOrderId] FOREIGN KEY ([QualityOrderId]) REFERENCES [quality_control].[QualityOrder] ([Id])
);
GO

CREATE TABLE [quality_control].[CountAdjustmentApproval] (
    [Id] int NOT NULL IDENTITY,
    [ReviewId] int NOT NULL,
    [ApproverId] int NOT NULL,
    [IsApproved] bit NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [CreatedBy] int NULL,
    [UpdatedAt] datetime2 NULL,
    [UpdatedBy] int NULL,
    [RowVersion] rowversion NULL,
    CONSTRAINT [PK_CountAdjustmentApproval] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_CountAdjustmentApproval_AspNetUsers_ApproverId] FOREIGN KEY ([ApproverId]) REFERENCES [AspNetUsers] ([Id]),
    CONSTRAINT [FK_CountAdjustmentApproval_CycleCountReview_ReviewId] FOREIGN KEY ([ReviewId]) REFERENCES [quality_control].[CycleCountReview] ([Id])
);
GO

CREATE TABLE [wms_core].[Reservation] (
    [Id] bigint NOT NULL IDENTITY,
    [InventoryId] bigint NOT NULL,
    [Qty] decimal(18,4) NOT NULL,
    [DemandSourceType] nvarchar(max) NOT NULL,
    [DemandSourceId] int NOT NULL,
    [ExpiryDate] datetime2 NULL,
    [Status] nvarchar(max) NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [CreatedBy] int NULL,
    [UpdatedAt] datetime2 NULL,
    [UpdatedBy] int NULL,
    [RowVersion] rowversion NULL,
    CONSTRAINT [PK_Reservation] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Reservation_InventoryOnHand_InventoryId] FOREIGN KEY ([InventoryId]) REFERENCES [wms_core].[InventoryOnHand] ([Id])
);
GO

CREATE TABLE [wms_core].[Allocation] (
    [Id] bigint NOT NULL IDENTITY,
    [ReservationId] bigint NOT NULL,
    [LocationId] int NOT NULL,
    [Qty] decimal(18,4) NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [CreatedBy] int NULL,
    [UpdatedAt] datetime2 NULL,
    [UpdatedBy] int NULL,
    [RowVersion] rowversion NULL,
    CONSTRAINT [PK_Allocation] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Allocation_Location_LocationId] FOREIGN KEY ([LocationId]) REFERENCES [mdm].[Location] ([Id]),
    CONSTRAINT [FK_Allocation_Reservation_ReservationId] FOREIGN KEY ([ReservationId]) REFERENCES [wms_core].[Reservation] ([Id])
);
GO

-- 3. CREATE INDEXES
CREATE INDEX [IX_Allocation_LocationId] ON [wms_core].[Allocation] ([LocationId]);
GO
CREATE INDEX [IX_Allocation_ReservationId] ON [wms_core].[Allocation] ([ReservationId]);
GO
CREATE INDEX [IX_AspNetRoleClaims_RoleId] ON [AspNetRoleClaims] ([RoleId]);
GO
CREATE UNIQUE INDEX [RoleNameIndex] ON [AspNetRoles] ([NormalizedName]) WHERE [NormalizedName] IS NOT NULL;
GO
CREATE INDEX [IX_AspNetUserClaims_UserId] ON [AspNetUserClaims] ([UserId]);
GO
CREATE INDEX [IX_AspNetUserLogins_UserId] ON [AspNetUserLogins] ([UserId]);
GO
CREATE INDEX [IX_AspNetUserRoles_RoleId] ON [AspNetUserRoles] ([RoleId]);
GO
CREATE INDEX [EmailIndex] ON [AspNetUsers] ([NormalizedEmail]);
GO
CREATE UNIQUE INDEX [UserNameIndex] ON [AspNetUsers] ([NormalizedUserName]) WHERE [NormalizedUserName] IS NOT NULL;
GO
CREATE INDEX [IX_AuditLog_UserId] ON [integration_audit].[AuditLog] ([UserId]);
GO
CREATE INDEX [IX_BackorderTracking_SoLineId] ON [wms_core].[BackorderTracking] ([SoLineId]);
GO
CREATE INDEX [IX_CountAdjustmentApproval_ApproverId] ON [quality_control].[CountAdjustmentApproval] ([ApproverId]);
GO
CREATE INDEX [IX_CountAdjustmentApproval_ReviewId] ON [quality_control].[CountAdjustmentApproval] ([ReviewId]);
GO
CREATE INDEX [IX_CrossDockingOrder_InboundReceiptId] ON [wms_core].[CrossDockingOrder] ([InboundReceiptId]);
GO
CREATE INDEX [IX_CrossDockingOrder_OutboundShipmentId] ON [wms_core].[CrossDockingOrder] ([OutboundShipmentId]);
GO
CREATE UNIQUE INDEX [IX_Customer_Code] ON [mdm].[Customer] ([Code]);
GO
CREATE INDEX [IX_CycleCountLine_ItemId] ON [quality_control].[CycleCountLine] ([ItemId]);
GO
CREATE INDEX [IX_CycleCountLine_LocationId] ON [quality_control].[CycleCountLine] ([LocationId]);
GO
CREATE INDEX [IX_CycleCountLine_SessionId] ON [quality_control].[CycleCountLine] ([SessionId]);
GO
CREATE INDEX [IX_CycleCountPlan_WarehouseId] ON [quality_control].[CycleCountPlan] ([WarehouseId]);
GO
CREATE INDEX [IX_CycleCountReview_CycleCountLineId] ON [quality_control].[CycleCountReview] ([CycleCountLineId]);
GO
CREATE INDEX [IX_CycleCountReview_ReviewerId] ON [quality_control].[CycleCountReview] ([ReviewerId]);
GO
CREATE UNIQUE INDEX [IX_CycleCountSession_IdempotencyKey] ON [quality_control].[CycleCountSession] ([IdempotencyKey]) WHERE [IdempotencyKey] IS NOT NULL;
GO
CREATE UNIQUE INDEX [IX_CycleCountSession_SessionNo] ON [quality_control].[CycleCountSession] ([SessionNo]);
GO
CREATE INDEX [IX_CycleCountSession_ZoneId] ON [quality_control].[CycleCountSession] ([ZoneId]);
GO
CREATE INDEX [IX_DraftLine_ItemId] ON [wms_core].[DraftLine] ([ItemId]);
GO
CREATE INDEX [IX_DraftLine_PoLineId] ON [wms_core].[DraftLine] ([PoLineId]);
GO
CREATE INDEX [IX_DraftLine_ReceiptHeaderId] ON [wms_core].[DraftLine] ([ReceiptHeaderId]);
GO
CREATE INDEX [IX_DraftLine_UomId] ON [wms_core].[DraftLine] ([UomId]);
GO
CREATE UNIQUE INDEX [IX_ErpPurchaseOrderHeader_PoNumber] ON [erp_stage].[ErpPurchaseOrderHeader] ([PoNumber]);
GO
CREATE INDEX [IX_ErpPurchaseOrderHeader_SupplierId] ON [erp_stage].[ErpPurchaseOrderHeader] ([SupplierId]);
GO
CREATE INDEX [IX_ErpPurchaseOrderHeader_WarehouseId] ON [erp_stage].[ErpPurchaseOrderHeader] ([WarehouseId]);
GO
CREATE INDEX [IX_ErpPurchaseOrderLine_ItemId] ON [erp_stage].[ErpPurchaseOrderLine] ([ItemId]);
GO
CREATE INDEX [IX_ErpPurchaseOrderLine_PoHeaderId] ON [erp_stage].[ErpPurchaseOrderLine] ([PoHeaderId]);
GO
CREATE INDEX [IX_ErpPurchaseOrderLine_UomId] ON [erp_stage].[ErpPurchaseOrderLine] ([UomId]);
GO
CREATE INDEX [IX_ErpSalesOrderHeader_CustomerId] ON [erp_stage].[ErpSalesOrderHeader] ([CustomerId]);
GO
CREATE UNIQUE INDEX [IX_ErpSalesOrderHeader_SoNumber] ON [erp_stage].[ErpSalesOrderHeader] ([SoNumber]);
GO
CREATE INDEX [IX_ErpSalesOrderHeader_WarehouseId] ON [erp_stage].[ErpSalesOrderHeader] ([WarehouseId]);
GO
CREATE INDEX [IX_ErpSalesOrderLine_ItemId] ON [erp_stage].[ErpSalesOrderLine] ([ItemId]);
GO
CREATE INDEX [IX_ErpSalesOrderLine_SoHeaderId] ON [erp_stage].[ErpSalesOrderLine] ([SoHeaderId]);
GO
CREATE INDEX [IX_ErpSalesOrderLine_UomId] ON [erp_stage].[ErpSalesOrderLine] ([UomId]);
GO
CREATE INDEX [IX_ErpSyncError_SyncRunId] ON [erp_stage].[ErpSyncError] ([SyncRunId]);
GO
CREATE UNIQUE INDEX [IX_HandlingUnit_HuBarcode] ON [wms_core].[HandlingUnit] ([HuBarcode]);
GO
CREATE INDEX [IX_HandlingUnit_LocationId] ON [wms_core].[HandlingUnit] ([LocationId]);
GO
CREATE INDEX [IX_HandlingUnitContent_HandlingUnitId] ON [wms_core].[HandlingUnitContent] ([HandlingUnitId]);
GO
CREATE INDEX [IX_HandlingUnitContent_ItemId] ON [wms_core].[HandlingUnitContent] ([ItemId]);
GO
CREATE UNIQUE INDEX [IX_InboundReceiptHeader_IdempotencyKey] ON [wms_core].[InboundReceiptHeader] ([IdempotencyKey]) WHERE [IdempotencyKey] IS NOT NULL;
GO
CREATE UNIQUE INDEX [IX_InboundReceiptHeader_ReceiptNo] ON [wms_core].[InboundReceiptHeader] ([ReceiptNo]);
GO
CREATE INDEX [IX_InboundReceiptHeader_SupplierId] ON [wms_core].[InboundReceiptHeader] ([SupplierId]);
GO
CREATE INDEX [IX_InboundReceiptHeader_WarehouseId] ON [wms_core].[InboundReceiptHeader] ([WarehouseId]);
GO
CREATE INDEX [IX_InboundReceiptLine_ItemId] ON [wms_core].[InboundReceiptLine] ([ItemId]);
GO
CREATE INDEX [IX_InboundReceiptLine_PoLineId] ON [wms_core].[InboundReceiptLine] ([PoLineId]);
GO
CREATE INDEX [IX_InboundReceiptLine_ReasonCodeId] ON [wms_core].[InboundReceiptLine] ([ReasonCodeId]);
GO
CREATE INDEX [IX_InboundReceiptLine_ReceiptHeaderId] ON [wms_core].[InboundReceiptLine] ([ReceiptHeaderId]);
GO
CREATE INDEX [IX_InboundReceiptLine_SubstituteItemId] ON [wms_core].[InboundReceiptLine] ([SubstituteItemId]);
GO
CREATE INDEX [IX_InboundReceiptLine_UomId] ON [wms_core].[InboundReceiptLine] ([UomId]);
GO
CREATE INDEX [IX_InternalTransfer_FromLocationId] ON [wms_core].[InternalTransfer] ([FromLocationId]);
GO
CREATE UNIQUE INDEX [IX_InternalTransfer_IdempotencyKey] ON [wms_core].[InternalTransfer] ([IdempotencyKey]) WHERE [IdempotencyKey] IS NOT NULL;
GO
CREATE INDEX [IX_InternalTransfer_ItemId] ON [wms_core].[InternalTransfer] ([ItemId]);
GO
CREATE INDEX [IX_InternalTransfer_ReasonCodeId] ON [wms_core].[InternalTransfer] ([ReasonCodeId]);
GO
CREATE INDEX [IX_InternalTransfer_ToLocationId] ON [wms_core].[InternalTransfer] ([ToLocationId]);
GO
CREATE UNIQUE INDEX [IX_InternalTransfer_TransferNo] ON [wms_core].[InternalTransfer] ([TransferNo]);
GO
CREATE INDEX [IX_InventoryAdjustment_ApproverId] ON [wms_core].[InventoryAdjustment] ([ApproverId]);
GO
CREATE UNIQUE INDEX [IX_InventoryAdjustment_IdempotencyKey] ON [wms_core].[InventoryAdjustment] ([IdempotencyKey]) WHERE [IdempotencyKey] IS NOT NULL;
GO
CREATE INDEX [IX_InventoryAdjustment_ItemId] ON [wms_core].[InventoryAdjustment] ([ItemId]);
GO
CREATE INDEX [IX_InventoryAdjustment_LocationId] ON [wms_core].[InventoryAdjustment] ([LocationId]);
GO
CREATE INDEX [IX_InventoryAdjustment_ReasonCodeId] ON [wms_core].[InventoryAdjustment] ([ReasonCodeId]);
GO
CREATE INDEX [IX_InventoryLedger_FromLocationId] ON [wms_core].[InventoryLedger] ([FromLocationId]);
GO
CREATE INDEX [IX_InventoryLedger_ItemId] ON [wms_core].[InventoryLedger] ([ItemId]);
GO
CREATE INDEX [IX_InventoryLedger_ToLocationId] ON [wms_core].[InventoryLedger] ([ToLocationId]);
GO
CREATE INDEX [IX_InventoryOnHand_HandlingUnitId] ON [wms_core].[InventoryOnHand] ([HandlingUnitId]);
GO
CREATE INDEX [IX_InventoryOnHand_InventoryStatusId] ON [wms_core].[InventoryOnHand] ([InventoryStatusId]);
GO
CREATE INDEX [IX_InventoryOnHand_ItemId] ON [wms_core].[InventoryOnHand] ([ItemId]);
GO
CREATE INDEX [IX_InventoryOnHand_LocationId] ON [wms_core].[InventoryOnHand] ([LocationId]);
GO
CREATE INDEX [IX_InventoryOnHand_OwnerId] ON [wms_core].[InventoryOnHand] ([OwnerId]);
GO
CREATE UNIQUE INDEX [UQ_Inventory_Dimension_Master] ON [wms_core].[InventoryOnHand] ([WarehouseId], [LocationId], [ItemId], [OwnerId], [LotNo], [SerialNumber], [HandlingUnitId], [InventoryStatusId]);
GO
CREATE UNIQUE INDEX [IX_InventoryStatus_StatusCode] ON [mdm].[InventoryStatus] ([StatusCode]);
GO
CREATE INDEX [IX_Item_BaseUomId] ON [mdm].[Item] ([BaseUomId]);
GO
CREATE UNIQUE INDEX [IX_ItemBarcode_Barcode] ON [mdm].[ItemBarcode] ([Barcode]);
GO
CREATE INDEX [IX_ItemBarcode_ItemId] ON [mdm].[ItemBarcode] ([ItemId]);
GO
CREATE INDEX [IX_ItemBarcode_UomId] ON [mdm].[ItemBarcode] ([UomId]);
GO
CREATE INDEX [IX_ItemWarehousePolicy_ItemId] ON [mdm].[ItemWarehousePolicy] ([ItemId]);
GO
CREATE INDEX [IX_ItemWarehousePolicy_WarehouseId] ON [mdm].[ItemWarehousePolicy] ([WarehouseId]);
GO
CREATE INDEX [IX_Location_ProfileId] ON [mdm].[Location] ([ProfileId]);
GO
CREATE UNIQUE INDEX [IX_Location_WarehouseId_Code] ON [mdm].[Location] ([WarehouseId], [Code]);
GO
CREATE INDEX [IX_Location_ZoneId] ON [mdm].[Location] ([ZoneId]);
GO
CREATE UNIQUE INDEX [IX_MobileScanEvent_ClientTxnId] ON [integration_audit].[MobileScanEvent] ([ClientTxnId]);
GO
CREATE INDEX [IX_MobileScanEvent_UserId] ON [integration_audit].[MobileScanEvent] ([UserId]);
GO
CREATE UNIQUE INDEX [IX_Owner_Code] ON [mdm].[Owner] ([Code]);
GO
CREATE INDEX [IX_PickTask_AssignedUserId] ON [wms_core].[PickTask] ([AssignedUserId]);
GO
CREATE UNIQUE INDEX [IX_PickTask_IdempotencyKey] ON [wms_core].[PickTask] ([IdempotencyKey]) WHERE [IdempotencyKey] IS NOT NULL;
GO
CREATE INDEX [IX_PickTask_ItemId] ON [wms_core].[PickTask] ([ItemId]);
GO
CREATE INDEX [IX_PickTask_SoLineId] ON [wms_core].[PickTask] ([SoLineId]);
GO
CREATE INDEX [IX_PickTask_SuggestedLocationId] ON [wms_core].[PickTask] ([SuggestedLocationId]);
GO
CREATE UNIQUE INDEX [IX_PickTask_TaskNo] ON [wms_core].[PickTask] ([TaskNo]);
GO
CREATE INDEX [IX_PutawayTask_AssignedUserId] ON [wms_core].[PutawayTask] ([AssignedUserId]);
GO
CREATE INDEX [IX_PutawayTask_HandlingUnitId] ON [wms_core].[PutawayTask] ([HandlingUnitId]);
GO
CREATE UNIQUE INDEX [IX_PutawayTask_IdempotencyKey] ON [wms_core].[PutawayTask] ([IdempotencyKey]) WHERE [IdempotencyKey] IS NOT NULL;
GO
CREATE INDEX [IX_PutawayTask_ItemId] ON [wms_core].[PutawayTask] ([ItemId]);
GO
CREATE INDEX [IX_PutawayTask_ReceiptHeaderId] ON [wms_core].[PutawayTask] ([ReceiptHeaderId]);
GO
CREATE INDEX [IX_PutawayTask_TargetLocationId] ON [wms_core].[PutawayTask] ([TargetLocationId]);
GO
CREATE UNIQUE INDEX [IX_PutawayTask_TaskNo] ON [wms_core].[PutawayTask] ([TaskNo]);
GO
CREATE INDEX [IX_QualityCheckResult_QualityOrderId] ON [quality_control].[QualityCheckResult] ([QualityOrderId]);
GO
CREATE INDEX [IX_QualityOrder_DraftLineId] ON [quality_control].[QualityOrder] ([DraftLineId]);
GO
CREATE UNIQUE INDEX [IX_QualityOrder_IdempotencyKey] ON [quality_control].[QualityOrder] ([IdempotencyKey]) WHERE [IdempotencyKey] IS NOT NULL;
GO
CREATE INDEX [IX_QualityOrder_ItemId] ON [quality_control].[QualityOrder] ([ItemId]);
GO
CREATE UNIQUE INDEX [IX_QualityOrder_QualityOrderNo] ON [quality_control].[QualityOrder] ([QualityOrderNo]);
GO
CREATE INDEX [IX_QuarantineOrder_ReasonCodeId] ON [quality_control].[QuarantineOrder] ([ReasonCodeId]);
GO
CREATE INDEX [IX_QuarantineOrder_WarehouseId] ON [quality_control].[QuarantineOrder] ([WarehouseId]);
GO
CREATE UNIQUE INDEX [IX_ReasonCode_Code] ON [mdm].[ReasonCode] ([Code]);
GO
CREATE INDEX [IX_Reservation_InventoryId] ON [wms_core].[Reservation] ([InventoryId]);
GO
CREATE UNIQUE INDEX [IX_ReturnReceiptHeader_ReturnNo] ON [wms_core].[ReturnReceiptHeader] ([ReturnNo]);
GO
CREATE INDEX [IX_ReturnReceiptHeader_WarehouseId] ON [wms_core].[ReturnReceiptHeader] ([WarehouseId]);
GO
CREATE INDEX [IX_ReturnReceiptLine_ItemId] ON [wms_core].[ReturnReceiptLine] ([ItemId]);
GO
CREATE INDEX [IX_ReturnReceiptLine_ReturnHeaderId] ON [wms_core].[ReturnReceiptLine] ([ReturnHeaderId]);
GO
CREATE UNIQUE INDEX [IX_ShipmentHeader_IdempotencyKey] ON [wms_core].[ShipmentHeader] ([IdempotencyKey]) WHERE [IdempotencyKey] IS NOT NULL;
GO
CREATE UNIQUE INDEX [IX_ShipmentHeader_ShipmentCode] ON [wms_core].[ShipmentHeader] ([ShipmentCode]);
GO
CREATE INDEX [IX_ShipmentHeader_WarehouseId] ON [wms_core].[ShipmentHeader] ([WarehouseId]);
GO
CREATE INDEX [IX_ShipmentLine_PickTaskId] ON [wms_core].[ShipmentLine] ([PickTaskId]);
GO
CREATE INDEX [IX_ShipmentLine_ShipmentHeaderId] ON [wms_core].[ShipmentLine] ([ShipmentHeaderId]);
GO
CREATE UNIQUE INDEX [IX_Supplier_Code] ON [mdm].[Supplier] ([Code]);
GO
CREATE UNIQUE INDEX [IX_Uom_Code] ON [mdm].[Uom] ([Code]);
GO
CREATE INDEX [IX_UomConversion_FromUomId] ON [mdm].[UomConversion] ([FromUomId]);
GO
CREATE INDEX [IX_UomConversion_ToUomId] ON [mdm].[UomConversion] ([ToUomId]);
GO
CREATE INDEX [IX_UserDevice_UserId] ON [mdm].[UserDevice] ([UserId]);
GO
CREATE INDEX [IX_UserWarehouseMapping_WarehouseId] ON [wms_core].[UserWarehouseMapping] ([WarehouseId]);
GO
CREATE UNIQUE INDEX [IX_Warehouse_Code] ON [mdm].[Warehouse] ([Code]);
GO
CREATE UNIQUE INDEX [IX_WavePicking_IdempotencyKey] ON [wms_core].[WavePicking] ([IdempotencyKey]) WHERE [IdempotencyKey] IS NOT NULL;
GO
CREATE INDEX [IX_WavePicking_WarehouseId] ON [wms_core].[WavePicking] ([WarehouseId]);
GO
CREATE UNIQUE INDEX [IX_WavePicking_WaveNo] ON [wms_core].[WavePicking] ([WaveNo]);
GO
CREATE INDEX [IX_WavePickingLine_PickTaskId] ON [wms_core].[WavePickingLine] ([PickTaskId]);
GO
CREATE INDEX [IX_WavePickingLine_WavePickingId] ON [wms_core].[WavePickingLine] ([WavePickingId]);
GO
CREATE INDEX [IX_Zone_WarehouseId] ON [mdm].[Zone] ([WarehouseId]);
GO

-- 4. SEED DATA (Based on DbSeeder.cs)
SET IDENTITY_INSERT [mdm].[Warehouse] ON;
INSERT INTO [mdm].[Warehouse] ([Id], [Code], [Name], [Status], [CreatedAt])
VALUES (1, 'WH-MAIN', 'Main Warehouse', 'Active', GETUTCDATE());
SET IDENTITY_INSERT [mdm].[Warehouse] OFF;
GO

SET IDENTITY_INSERT [mdm].[Zone] ON;
INSERT INTO [mdm].[Zone] ([Id], [WarehouseId], [ZoneCode], [ZoneType], [CreatedAt])
VALUES (1, 1, 'Z-PICK', 'Picking', GETUTCDATE());
SET IDENTITY_INSERT [mdm].[Zone] OFF;
GO

SET IDENTITY_INSERT [mdm].[Location] ON;
INSERT INTO [mdm].[Location] ([Id], [WarehouseId], [ZoneId], [Code], [Status], [CreatedAt])
VALUES 
(1, 1, 1, 'LOC-STAGING', 'Active', GETUTCDATE()),
(2, 1, 1, 'LOC-PACKING', 'Active', GETUTCDATE()),
(3, 1, 1, 'LOC-A-01-01', 'Active', GETUTCDATE());
SET IDENTITY_INSERT [mdm].[Location] OFF;
GO

SET IDENTITY_INSERT [mdm].[Uom] ON;
INSERT INTO [mdm].[Uom] ([Id], [Code], [Name], [Status], [CreatedAt])
VALUES (1, 'PCS', 'Pieces', 'Active', GETUTCDATE());
SET IDENTITY_INSERT [mdm].[Uom] OFF;
GO

SET IDENTITY_INSERT [mdm].[Item] ON;
INSERT INTO [mdm].[Item] ([Id], [ItemCode], [Name], [BaseUomId], [Status], [IsLotControlled], [IsSerialControlled], [CreatedAt])
VALUES 
(1, 'ITEM-001', 'Laptop Dell XPS', 1, 'Active', 0, 0, GETUTCDATE()),
(2, 'ITEM-002', 'Mouse Logitech', 1, 'Active', 0, 0, GETUTCDATE());
SET IDENTITY_INSERT [mdm].[Item] OFF;
GO

SET IDENTITY_INSERT [mdm].[ItemBarcode] ON;
INSERT INTO [mdm].[ItemBarcode] ([Id], [ItemId], [Barcode], [UomId], [CreatedAt])
VALUES 
(1, 1, 'DELLXPS001', 1, GETUTCDATE()),
(2, 2, 'LOGIMOUSE002', 1, GETUTCDATE());
SET IDENTITY_INSERT [mdm].[ItemBarcode] OFF;
GO

SET IDENTITY_INSERT [mdm].[Supplier] ON;
INSERT INTO [mdm].[Supplier] ([Id], [Code], [Name], [Status], [CreatedAt])
VALUES (1, 'SUP-001', 'Dell Vietnam', 'Active', GETUTCDATE());
SET IDENTITY_INSERT [mdm].[Supplier] OFF;
GO

SET IDENTITY_INSERT [erp_stage].[ErpPurchaseOrderHeader] ON;
INSERT INTO [erp_stage].[ErpPurchaseOrderHeader] ([Id], [PoNumber], [WarehouseId], [SupplierId], [ErpStatus], [CreatedAt])
VALUES (1, 'PO-2026-001', 1, 1, 'Open', GETUTCDATE());
SET IDENTITY_INSERT [erp_stage].[ErpPurchaseOrderHeader] OFF;
GO

SET IDENTITY_INSERT [erp_stage].[ErpPurchaseOrderLine] ON;
INSERT INTO [erp_stage].[ErpPurchaseOrderLine] ([Id], [PoHeaderId], [ItemId], [OrderedQty], [OpenQty], [UomId], [CreatedAt])
VALUES 
(1, 1, 1, 10, 10, 1, GETUTCDATE()),
(2, 1, 2, 50, 50, 1, GETUTCDATE());
SET IDENTITY_INSERT [erp_stage].[ErpPurchaseOrderLine] OFF;
GO

SET IDENTITY_INSERT [mdm].[InventoryStatus] ON;
INSERT INTO [mdm].[InventoryStatus] ([Id], [StatusCode], [IsAllocatable], [CreatedAt])
VALUES (1, 'Available', 1, GETUTCDATE());
SET IDENTITY_INSERT [mdm].[InventoryStatus] OFF;
GO

PRINT 'Database WmsDb created and seeded successfully.';
GO
