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
IF SCHEMA_ID(N'wms_core') IS NULL EXEC(N'CREATE SCHEMA [wms_core];');

IF SCHEMA_ID(N'integration_audit') IS NULL EXEC(N'CREATE SCHEMA [integration_audit];');

IF SCHEMA_ID(N'quality_control') IS NULL EXEC(N'CREATE SCHEMA [quality_control];');

IF SCHEMA_ID(N'mdm') IS NULL EXEC(N'CREATE SCHEMA [mdm];');

IF SCHEMA_ID(N'erp_stage') IS NULL EXEC(N'CREATE SCHEMA [erp_stage];');

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
    [Name] nvarchar(max) NULL,
    [Status] nvarchar(max) NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [CreatedBy] int NULL,
    [UpdatedAt] datetime2 NULL,
    [UpdatedBy] int NULL,
    [RowVersion] rowversion NULL,
    CONSTRAINT [PK_Customer] PRIMARY KEY ([Id])
);

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
    CONSTRAINT [FK_AuditLog_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE NO ACTION
);

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
    CONSTRAINT [FK_MobileScanEvent_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE NO ACTION
);

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
    CONSTRAINT [FK_UserDevice_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE NO ACTION
);

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
    CONSTRAINT [FK_ErpSyncError_ErpSyncRun_SyncRunId] FOREIGN KEY ([SyncRunId]) REFERENCES [erp_stage].[ErpSyncRun] ([Id]) ON DELETE NO ACTION
);

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
    CONSTRAINT [FK_Item_Uom_BaseUomId] FOREIGN KEY ([BaseUomId]) REFERENCES [mdm].[Uom] ([Id]) ON DELETE NO ACTION
);

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
    CONSTRAINT [FK_UomConversion_Uom_FromUomId] FOREIGN KEY ([FromUomId]) REFERENCES [mdm].[Uom] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_UomConversion_Uom_ToUomId] FOREIGN KEY ([ToUomId]) REFERENCES [mdm].[Uom] ([Id]) ON DELETE NO ACTION
);

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
    CONSTRAINT [FK_CycleCountPlan_Warehouse_WarehouseId] FOREIGN KEY ([WarehouseId]) REFERENCES [mdm].[Warehouse] ([Id]) ON DELETE NO ACTION
);

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
    CONSTRAINT [FK_ErpPurchaseOrderHeader_Supplier_SupplierId] FOREIGN KEY ([SupplierId]) REFERENCES [mdm].[Supplier] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_ErpPurchaseOrderHeader_Warehouse_WarehouseId] FOREIGN KEY ([WarehouseId]) REFERENCES [mdm].[Warehouse] ([Id]) ON DELETE NO ACTION
);

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
    CONSTRAINT [FK_ErpSalesOrderHeader_Customer_CustomerId] FOREIGN KEY ([CustomerId]) REFERENCES [mdm].[Customer] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_ErpSalesOrderHeader_Warehouse_WarehouseId] FOREIGN KEY ([WarehouseId]) REFERENCES [mdm].[Warehouse] ([Id]) ON DELETE NO ACTION
);

CREATE TABLE [wms_core].[InboundReceiptHeader] (
    [Id] int NOT NULL IDENTITY,
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
    CONSTRAINT [FK_InboundReceiptHeader_Supplier_SupplierId] FOREIGN KEY ([SupplierId]) REFERENCES [mdm].[Supplier] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_InboundReceiptHeader_Warehouse_WarehouseId] FOREIGN KEY ([WarehouseId]) REFERENCES [mdm].[Warehouse] ([Id]) ON DELETE NO ACTION
);

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
    CONSTRAINT [FK_QuarantineOrder_ReasonCode_ReasonCodeId] FOREIGN KEY ([ReasonCodeId]) REFERENCES [mdm].[ReasonCode] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_QuarantineOrder_Warehouse_WarehouseId] FOREIGN KEY ([WarehouseId]) REFERENCES [mdm].[Warehouse] ([Id]) ON DELETE NO ACTION
);

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
    CONSTRAINT [FK_ReturnReceiptHeader_Warehouse_WarehouseId] FOREIGN KEY ([WarehouseId]) REFERENCES [mdm].[Warehouse] ([Id]) ON DELETE NO ACTION
);

CREATE TABLE [wms_core].[ShipmentHeader] (
    [Id] int NOT NULL IDENTITY,
    [ShipmentCode] nvarchar(100) NOT NULL,
    [WarehouseId] int NOT NULL,
    [Status] nvarchar(max) NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [CreatedBy] int NULL,
    [UpdatedAt] datetime2 NULL,
    [UpdatedBy] int NULL,
    [RowVersion] rowversion NULL,
    CONSTRAINT [PK_ShipmentHeader] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_ShipmentHeader_Warehouse_WarehouseId] FOREIGN KEY ([WarehouseId]) REFERENCES [mdm].[Warehouse] ([Id]) ON DELETE NO ACTION
);

CREATE TABLE [wms_core].[UserWarehouseMapping] (
    [UserId] int NOT NULL,
    [WarehouseId] int NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [CreatedBy] int NULL,
    [UpdatedAt] datetime2 NULL,
    [UpdatedBy] int NULL,
    [RowVersion] rowversion NULL,
    CONSTRAINT [PK_UserWarehouseMapping] PRIMARY KEY ([UserId], [WarehouseId]),
    CONSTRAINT [FK_UserWarehouseMapping_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_UserWarehouseMapping_Warehouse_WarehouseId] FOREIGN KEY ([WarehouseId]) REFERENCES [mdm].[Warehouse] ([Id]) ON DELETE NO ACTION
);

CREATE TABLE [wms_core].[WavePicking] (
    [Id] int NOT NULL IDENTITY,
    [WaveNo] nvarchar(100) NOT NULL,
    [WarehouseId] int NOT NULL,
    [Status] nvarchar(max) NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [CreatedBy] int NULL,
    [UpdatedAt] datetime2 NULL,
    [UpdatedBy] int NULL,
    [RowVersion] rowversion NULL,
    CONSTRAINT [PK_WavePicking] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_WavePicking_Warehouse_WarehouseId] FOREIGN KEY ([WarehouseId]) REFERENCES [mdm].[Warehouse] ([Id]) ON DELETE NO ACTION
);

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
    CONSTRAINT [FK_Zone_Warehouse_WarehouseId] FOREIGN KEY ([WarehouseId]) REFERENCES [mdm].[Warehouse] ([Id]) ON DELETE NO ACTION
);

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
    CONSTRAINT [FK_ItemBarcode_Item_ItemId] FOREIGN KEY ([ItemId]) REFERENCES [mdm].[Item] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_ItemBarcode_Uom_UomId] FOREIGN KEY ([UomId]) REFERENCES [mdm].[Uom] ([Id]) ON DELETE NO ACTION
);

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
    CONSTRAINT [FK_ItemWarehousePolicy_Item_ItemId] FOREIGN KEY ([ItemId]) REFERENCES [mdm].[Item] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_ItemWarehousePolicy_Warehouse_WarehouseId] FOREIGN KEY ([WarehouseId]) REFERENCES [mdm].[Warehouse] ([Id]) ON DELETE NO ACTION
);

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
    CONSTRAINT [FK_ErpPurchaseOrderLine_ErpPurchaseOrderHeader_PoHeaderId] FOREIGN KEY ([PoHeaderId]) REFERENCES [erp_stage].[ErpPurchaseOrderHeader] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_ErpPurchaseOrderLine_Item_ItemId] FOREIGN KEY ([ItemId]) REFERENCES [mdm].[Item] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_ErpPurchaseOrderLine_Uom_UomId] FOREIGN KEY ([UomId]) REFERENCES [mdm].[Uom] ([Id]) ON DELETE NO ACTION
);

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
    CONSTRAINT [FK_ErpSalesOrderLine_ErpSalesOrderHeader_SoHeaderId] FOREIGN KEY ([SoHeaderId]) REFERENCES [erp_stage].[ErpSalesOrderHeader] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_ErpSalesOrderLine_Item_ItemId] FOREIGN KEY ([ItemId]) REFERENCES [mdm].[Item] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_ErpSalesOrderLine_Uom_UomId] FOREIGN KEY ([UomId]) REFERENCES [mdm].[Uom] ([Id]) ON DELETE NO ACTION
);

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
    CONSTRAINT [FK_DraftLine_InboundReceiptHeader_ReceiptHeaderId] FOREIGN KEY ([ReceiptHeaderId]) REFERENCES [wms_core].[InboundReceiptHeader] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_DraftLine_Item_ItemId] FOREIGN KEY ([ItemId]) REFERENCES [mdm].[Item] ([Id]) ON DELETE NO ACTION
);

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
    CONSTRAINT [FK_ReturnReceiptLine_Item_ItemId] FOREIGN KEY ([ItemId]) REFERENCES [mdm].[Item] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_ReturnReceiptLine_ReturnReceiptHeader_ReturnHeaderId] FOREIGN KEY ([ReturnHeaderId]) REFERENCES [wms_core].[ReturnReceiptHeader] ([Id]) ON DELETE NO ACTION
);

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
    CONSTRAINT [FK_CrossDockingOrder_InboundReceiptHeader_InboundReceiptId] FOREIGN KEY ([InboundReceiptId]) REFERENCES [wms_core].[InboundReceiptHeader] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_CrossDockingOrder_ShipmentHeader_OutboundShipmentId] FOREIGN KEY ([OutboundShipmentId]) REFERENCES [wms_core].[ShipmentHeader] ([Id]) ON DELETE NO ACTION
);

CREATE TABLE [quality_control].[CycleCountSession] (
    [Id] int NOT NULL IDENTITY,
    [SessionNo] nvarchar(100) NOT NULL,
    [ZoneId] int NULL,
    [Status] nvarchar(max) NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [CreatedBy] int NULL,
    [UpdatedAt] datetime2 NULL,
    [UpdatedBy] int NULL,
    [RowVersion] rowversion NULL,
    CONSTRAINT [PK_CycleCountSession] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_CycleCountSession_Zone_ZoneId] FOREIGN KEY ([ZoneId]) REFERENCES [mdm].[Zone] ([Id]) ON DELETE NO ACTION
);

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
    CONSTRAINT [FK_Location_LocationProfile_ProfileId] FOREIGN KEY ([ProfileId]) REFERENCES [mdm].[LocationProfile] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_Location_Warehouse_WarehouseId] FOREIGN KEY ([WarehouseId]) REFERENCES [mdm].[Warehouse] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_Location_Zone_ZoneId] FOREIGN KEY ([ZoneId]) REFERENCES [mdm].[Zone] ([Id]) ON DELETE NO ACTION
);

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
    CONSTRAINT [FK_InboundReceiptLine_ErpPurchaseOrderLine_PoLineId] FOREIGN KEY ([PoLineId]) REFERENCES [erp_stage].[ErpPurchaseOrderLine] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_InboundReceiptLine_InboundReceiptHeader_ReceiptHeaderId] FOREIGN KEY ([ReceiptHeaderId]) REFERENCES [wms_core].[InboundReceiptHeader] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_InboundReceiptLine_Item_ItemId] FOREIGN KEY ([ItemId]) REFERENCES [mdm].[Item] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_InboundReceiptLine_ReasonCode_ReasonCodeId] FOREIGN KEY ([ReasonCodeId]) REFERENCES [mdm].[ReasonCode] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_InboundReceiptLine_Uom_UomId] FOREIGN KEY ([UomId]) REFERENCES [mdm].[Uom] ([Id]) ON DELETE NO ACTION
);

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
    CONSTRAINT [FK_BackorderTracking_ErpSalesOrderLine_SoLineId] FOREIGN KEY ([SoLineId]) REFERENCES [erp_stage].[ErpSalesOrderLine] ([Id]) ON DELETE NO ACTION
);

CREATE TABLE [quality_control].[QualityOrder] (
    [Id] int NOT NULL IDENTITY,
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
    CONSTRAINT [FK_QualityOrder_DraftLine_DraftLineId] FOREIGN KEY ([DraftLineId]) REFERENCES [wms_core].[DraftLine] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_QualityOrder_Item_ItemId] FOREIGN KEY ([ItemId]) REFERENCES [mdm].[Item] ([Id]) ON DELETE NO ACTION
);

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
    CONSTRAINT [FK_CycleCountLine_CycleCountSession_SessionId] FOREIGN KEY ([SessionId]) REFERENCES [quality_control].[CycleCountSession] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_CycleCountLine_Item_ItemId] FOREIGN KEY ([ItemId]) REFERENCES [mdm].[Item] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_CycleCountLine_Location_LocationId] FOREIGN KEY ([LocationId]) REFERENCES [mdm].[Location] ([Id]) ON DELETE NO ACTION
);

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
    CONSTRAINT [FK_HandlingUnit_Location_LocationId] FOREIGN KEY ([LocationId]) REFERENCES [mdm].[Location] ([Id]) ON DELETE NO ACTION
);

CREATE TABLE [wms_core].[InternalTransfer] (
    [Id] int NOT NULL IDENTITY,
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
    CONSTRAINT [FK_InternalTransfer_Item_ItemId] FOREIGN KEY ([ItemId]) REFERENCES [mdm].[Item] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_InternalTransfer_Location_FromLocationId] FOREIGN KEY ([FromLocationId]) REFERENCES [mdm].[Location] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_InternalTransfer_Location_ToLocationId] FOREIGN KEY ([ToLocationId]) REFERENCES [mdm].[Location] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_InternalTransfer_ReasonCode_ReasonCodeId] FOREIGN KEY ([ReasonCodeId]) REFERENCES [mdm].[ReasonCode] ([Id]) ON DELETE NO ACTION
);

CREATE TABLE [wms_core].[InventoryAdjustment] (
    [Id] int NOT NULL IDENTITY,
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
    CONSTRAINT [FK_InventoryAdjustment_AspNetUsers_ApproverId] FOREIGN KEY ([ApproverId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_InventoryAdjustment_Item_ItemId] FOREIGN KEY ([ItemId]) REFERENCES [mdm].[Item] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_InventoryAdjustment_Location_LocationId] FOREIGN KEY ([LocationId]) REFERENCES [mdm].[Location] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_InventoryAdjustment_ReasonCode_ReasonCodeId] FOREIGN KEY ([ReasonCodeId]) REFERENCES [mdm].[ReasonCode] ([Id]) ON DELETE NO ACTION
);

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
    CONSTRAINT [FK_InventoryLedger_Item_ItemId] FOREIGN KEY ([ItemId]) REFERENCES [mdm].[Item] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_InventoryLedger_Location_FromLocationId] FOREIGN KEY ([FromLocationId]) REFERENCES [mdm].[Location] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_InventoryLedger_Location_ToLocationId] FOREIGN KEY ([ToLocationId]) REFERENCES [mdm].[Location] ([Id]) ON DELETE NO ACTION
);

CREATE TABLE [wms_core].[PickTask] (
    [Id] bigint NOT NULL IDENTITY,
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
    CONSTRAINT [FK_PickTask_AspNetUsers_AssignedUserId] FOREIGN KEY ([AssignedUserId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_PickTask_ErpSalesOrderLine_SoLineId] FOREIGN KEY ([SoLineId]) REFERENCES [erp_stage].[ErpSalesOrderLine] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_PickTask_Item_ItemId] FOREIGN KEY ([ItemId]) REFERENCES [mdm].[Item] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_PickTask_Location_SuggestedLocationId] FOREIGN KEY ([SuggestedLocationId]) REFERENCES [mdm].[Location] ([Id]) ON DELETE NO ACTION
);

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
    CONSTRAINT [FK_QualityCheckResult_QualityOrder_QualityOrderId] FOREIGN KEY ([QualityOrderId]) REFERENCES [quality_control].[QualityOrder] ([Id]) ON DELETE NO ACTION
);

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
    CONSTRAINT [FK_CycleCountReview_AspNetUsers_ReviewerId] FOREIGN KEY ([ReviewerId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_CycleCountReview_CycleCountLine_CycleCountLineId] FOREIGN KEY ([CycleCountLineId]) REFERENCES [quality_control].[CycleCountLine] ([Id]) ON DELETE NO ACTION
);

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
    CONSTRAINT [FK_HandlingUnitContent_HandlingUnit_HandlingUnitId] FOREIGN KEY ([HandlingUnitId]) REFERENCES [wms_core].[HandlingUnit] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_HandlingUnitContent_Item_ItemId] FOREIGN KEY ([ItemId]) REFERENCES [mdm].[Item] ([Id]) ON DELETE NO ACTION
);

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
    CONSTRAINT [FK_InventoryOnHand_HandlingUnit_HandlingUnitId] FOREIGN KEY ([HandlingUnitId]) REFERENCES [wms_core].[HandlingUnit] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_InventoryOnHand_InventoryStatus_InventoryStatusId] FOREIGN KEY ([InventoryStatusId]) REFERENCES [mdm].[InventoryStatus] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_InventoryOnHand_Item_ItemId] FOREIGN KEY ([ItemId]) REFERENCES [mdm].[Item] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_InventoryOnHand_Location_LocationId] FOREIGN KEY ([LocationId]) REFERENCES [mdm].[Location] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_InventoryOnHand_Owner_OwnerId] FOREIGN KEY ([OwnerId]) REFERENCES [mdm].[Owner] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_InventoryOnHand_Warehouse_WarehouseId] FOREIGN KEY ([WarehouseId]) REFERENCES [mdm].[Warehouse] ([Id]) ON DELETE NO ACTION
);

CREATE TABLE [wms_core].[PutawayTask] (
    [Id] bigint NOT NULL IDENTITY,
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
    CONSTRAINT [FK_PutawayTask_AspNetUsers_AssignedUserId] FOREIGN KEY ([AssignedUserId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_PutawayTask_HandlingUnit_HandlingUnitId] FOREIGN KEY ([HandlingUnitId]) REFERENCES [wms_core].[HandlingUnit] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_PutawayTask_InboundReceiptHeader_ReceiptHeaderId] FOREIGN KEY ([ReceiptHeaderId]) REFERENCES [wms_core].[InboundReceiptHeader] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_PutawayTask_Item_ItemId] FOREIGN KEY ([ItemId]) REFERENCES [mdm].[Item] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_PutawayTask_Location_TargetLocationId] FOREIGN KEY ([TargetLocationId]) REFERENCES [mdm].[Location] ([Id]) ON DELETE NO ACTION
);

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
    CONSTRAINT [FK_ShipmentLine_PickTask_PickTaskId] FOREIGN KEY ([PickTaskId]) REFERENCES [wms_core].[PickTask] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_ShipmentLine_ShipmentHeader_ShipmentHeaderId] FOREIGN KEY ([ShipmentHeaderId]) REFERENCES [wms_core].[ShipmentHeader] ([Id]) ON DELETE NO ACTION
);

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
    CONSTRAINT [FK_WavePickingLine_PickTask_PickTaskId] FOREIGN KEY ([PickTaskId]) REFERENCES [wms_core].[PickTask] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_WavePickingLine_WavePicking_WavePickingId] FOREIGN KEY ([WavePickingId]) REFERENCES [wms_core].[WavePicking] ([Id]) ON DELETE NO ACTION
);

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
    CONSTRAINT [FK_CountAdjustmentApproval_AspNetUsers_ApproverId] FOREIGN KEY ([ApproverId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_CountAdjustmentApproval_CycleCountReview_ReviewId] FOREIGN KEY ([ReviewId]) REFERENCES [quality_control].[CycleCountReview] ([Id]) ON DELETE NO ACTION
);

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
    CONSTRAINT [FK_Reservation_InventoryOnHand_InventoryId] FOREIGN KEY ([InventoryId]) REFERENCES [wms_core].[InventoryOnHand] ([Id]) ON DELETE NO ACTION
);

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
    CONSTRAINT [FK_Allocation_Location_LocationId] FOREIGN KEY ([LocationId]) REFERENCES [mdm].[Location] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_Allocation_Reservation_ReservationId] FOREIGN KEY ([ReservationId]) REFERENCES [wms_core].[Reservation] ([Id]) ON DELETE NO ACTION
);

CREATE INDEX [IX_Allocation_LocationId] ON [wms_core].[Allocation] ([LocationId]);

CREATE INDEX [IX_Allocation_ReservationId] ON [wms_core].[Allocation] ([ReservationId]);

CREATE INDEX [IX_AspNetRoleClaims_RoleId] ON [AspNetRoleClaims] ([RoleId]);

CREATE UNIQUE INDEX [RoleNameIndex] ON [AspNetRoles] ([NormalizedName]) WHERE [NormalizedName] IS NOT NULL;

CREATE INDEX [IX_AspNetUserClaims_UserId] ON [AspNetUserClaims] ([UserId]);

CREATE INDEX [IX_AspNetUserLogins_UserId] ON [AspNetUserLogins] ([UserId]);

CREATE INDEX [IX_AspNetUserRoles_RoleId] ON [AspNetUserRoles] ([RoleId]);

CREATE INDEX [EmailIndex] ON [AspNetUsers] ([NormalizedEmail]);

CREATE UNIQUE INDEX [UserNameIndex] ON [AspNetUsers] ([NormalizedUserName]) WHERE [NormalizedUserName] IS NOT NULL;

CREATE INDEX [IX_AuditLog_UserId] ON [integration_audit].[AuditLog] ([UserId]);

CREATE INDEX [IX_BackorderTracking_SoLineId] ON [wms_core].[BackorderTracking] ([SoLineId]);

CREATE INDEX [IX_CountAdjustmentApproval_ApproverId] ON [quality_control].[CountAdjustmentApproval] ([ApproverId]);

CREATE INDEX [IX_CountAdjustmentApproval_ReviewId] ON [quality_control].[CountAdjustmentApproval] ([ReviewId]);

CREATE INDEX [IX_CrossDockingOrder_InboundReceiptId] ON [wms_core].[CrossDockingOrder] ([InboundReceiptId]);

CREATE INDEX [IX_CrossDockingOrder_OutboundShipmentId] ON [wms_core].[CrossDockingOrder] ([OutboundShipmentId]);

CREATE UNIQUE INDEX [IX_Customer_Code] ON [mdm].[Customer] ([Code]);

CREATE INDEX [IX_CycleCountLine_ItemId] ON [quality_control].[CycleCountLine] ([ItemId]);

CREATE INDEX [IX_CycleCountLine_LocationId] ON [quality_control].[CycleCountLine] ([LocationId]);

CREATE INDEX [IX_CycleCountLine_SessionId] ON [quality_control].[CycleCountLine] ([SessionId]);

CREATE INDEX [IX_CycleCountPlan_WarehouseId] ON [quality_control].[CycleCountPlan] ([WarehouseId]);

CREATE INDEX [IX_CycleCountReview_CycleCountLineId] ON [quality_control].[CycleCountReview] ([CycleCountLineId]);

CREATE INDEX [IX_CycleCountReview_ReviewerId] ON [quality_control].[CycleCountReview] ([ReviewerId]);

CREATE UNIQUE INDEX [IX_CycleCountSession_SessionNo] ON [quality_control].[CycleCountSession] ([SessionNo]);

CREATE INDEX [IX_CycleCountSession_ZoneId] ON [quality_control].[CycleCountSession] ([ZoneId]);

CREATE INDEX [IX_DraftLine_ItemId] ON [wms_core].[DraftLine] ([ItemId]);

CREATE INDEX [IX_DraftLine_ReceiptHeaderId] ON [wms_core].[DraftLine] ([ReceiptHeaderId]);

CREATE UNIQUE INDEX [IX_ErpPurchaseOrderHeader_PoNumber] ON [erp_stage].[ErpPurchaseOrderHeader] ([PoNumber]);

CREATE INDEX [IX_ErpPurchaseOrderHeader_SupplierId] ON [erp_stage].[ErpPurchaseOrderHeader] ([SupplierId]);

CREATE INDEX [IX_ErpPurchaseOrderHeader_WarehouseId] ON [erp_stage].[ErpPurchaseOrderHeader] ([WarehouseId]);

CREATE INDEX [IX_ErpPurchaseOrderLine_ItemId] ON [erp_stage].[ErpPurchaseOrderLine] ([ItemId]);

CREATE INDEX [IX_ErpPurchaseOrderLine_PoHeaderId] ON [erp_stage].[ErpPurchaseOrderLine] ([PoHeaderId]);

CREATE INDEX [IX_ErpPurchaseOrderLine_UomId] ON [erp_stage].[ErpPurchaseOrderLine] ([UomId]);

CREATE INDEX [IX_ErpSalesOrderHeader_CustomerId] ON [erp_stage].[ErpSalesOrderHeader] ([CustomerId]);

CREATE UNIQUE INDEX [IX_ErpSalesOrderHeader_SoNumber] ON [erp_stage].[ErpSalesOrderHeader] ([SoNumber]);

CREATE INDEX [IX_ErpSalesOrderHeader_WarehouseId] ON [erp_stage].[ErpSalesOrderHeader] ([WarehouseId]);

CREATE INDEX [IX_ErpSalesOrderLine_ItemId] ON [erp_stage].[ErpSalesOrderLine] ([ItemId]);

CREATE INDEX [IX_ErpSalesOrderLine_SoHeaderId] ON [erp_stage].[ErpSalesOrderLine] ([SoHeaderId]);

CREATE INDEX [IX_ErpSalesOrderLine_UomId] ON [erp_stage].[ErpSalesOrderLine] ([UomId]);

CREATE INDEX [IX_ErpSyncError_SyncRunId] ON [erp_stage].[ErpSyncError] ([SyncRunId]);

CREATE INDEX [IX_HandlingUnit_LocationId] ON [wms_core].[HandlingUnit] ([LocationId]);

CREATE INDEX [IX_HandlingUnitContent_HandlingUnitId] ON [wms_core].[HandlingUnitContent] ([HandlingUnitId]);

CREATE INDEX [IX_HandlingUnitContent_ItemId] ON [wms_core].[HandlingUnitContent] ([ItemId]);

CREATE UNIQUE INDEX [IX_InboundReceiptHeader_ReceiptNo] ON [wms_core].[InboundReceiptHeader] ([ReceiptNo]);

CREATE INDEX [IX_InboundReceiptHeader_SupplierId] ON [wms_core].[InboundReceiptHeader] ([SupplierId]);

CREATE INDEX [IX_InboundReceiptHeader_WarehouseId] ON [wms_core].[InboundReceiptHeader] ([WarehouseId]);

CREATE INDEX [IX_InboundReceiptLine_ItemId] ON [wms_core].[InboundReceiptLine] ([ItemId]);

CREATE INDEX [IX_InboundReceiptLine_PoLineId] ON [wms_core].[InboundReceiptLine] ([PoLineId]);

CREATE INDEX [IX_InboundReceiptLine_ReasonCodeId] ON [wms_core].[InboundReceiptLine] ([ReasonCodeId]);

CREATE INDEX [IX_InboundReceiptLine_ReceiptHeaderId] ON [wms_core].[InboundReceiptLine] ([ReceiptHeaderId]);

CREATE INDEX [IX_InboundReceiptLine_UomId] ON [wms_core].[InboundReceiptLine] ([UomId]);

CREATE INDEX [IX_InternalTransfer_FromLocationId] ON [wms_core].[InternalTransfer] ([FromLocationId]);

CREATE INDEX [IX_InternalTransfer_ItemId] ON [wms_core].[InternalTransfer] ([ItemId]);

CREATE INDEX [IX_InternalTransfer_ReasonCodeId] ON [wms_core].[InternalTransfer] ([ReasonCodeId]);

CREATE INDEX [IX_InternalTransfer_ToLocationId] ON [wms_core].[InternalTransfer] ([ToLocationId]);

CREATE UNIQUE INDEX [IX_InternalTransfer_TransferNo] ON [wms_core].[InternalTransfer] ([TransferNo]);

CREATE INDEX [IX_InventoryAdjustment_ApproverId] ON [wms_core].[InventoryAdjustment] ([ApproverId]);

CREATE INDEX [IX_InventoryAdjustment_ItemId] ON [wms_core].[InventoryAdjustment] ([ItemId]);

CREATE INDEX [IX_InventoryAdjustment_LocationId] ON [wms_core].[InventoryAdjustment] ([LocationId]);

CREATE INDEX [IX_InventoryAdjustment_ReasonCodeId] ON [wms_core].[InventoryAdjustment] ([ReasonCodeId]);

CREATE INDEX [IX_InventoryLedger_FromLocationId] ON [wms_core].[InventoryLedger] ([FromLocationId]);

CREATE INDEX [IX_InventoryLedger_ItemId] ON [wms_core].[InventoryLedger] ([ItemId]);

CREATE INDEX [IX_InventoryLedger_ToLocationId] ON [wms_core].[InventoryLedger] ([ToLocationId]);

CREATE INDEX [IX_InventoryOnHand_HandlingUnitId] ON [wms_core].[InventoryOnHand] ([HandlingUnitId]);

CREATE INDEX [IX_InventoryOnHand_InventoryStatusId] ON [wms_core].[InventoryOnHand] ([InventoryStatusId]);

CREATE INDEX [IX_InventoryOnHand_ItemId] ON [wms_core].[InventoryOnHand] ([ItemId]);

CREATE INDEX [IX_InventoryOnHand_LocationId] ON [wms_core].[InventoryOnHand] ([LocationId]);

CREATE INDEX [IX_InventoryOnHand_OwnerId] ON [wms_core].[InventoryOnHand] ([OwnerId]);

CREATE UNIQUE INDEX [UQ_Inventory_Dimension_Master] ON [wms_core].[InventoryOnHand] ([WarehouseId], [LocationId], [ItemId], [OwnerId], [LotNo], [SerialNumber], [HandlingUnitId], [InventoryStatusId]) WHERE [OwnerId] IS NOT NULL AND [LotNo] IS NOT NULL AND [SerialNumber] IS NOT NULL AND [HandlingUnitId] IS NOT NULL;

CREATE UNIQUE INDEX [IX_InventoryStatus_StatusCode] ON [mdm].[InventoryStatus] ([StatusCode]);

CREATE INDEX [IX_Item_BaseUomId] ON [mdm].[Item] ([BaseUomId]);

CREATE INDEX [IX_ItemBarcode_ItemId] ON [mdm].[ItemBarcode] ([ItemId]);

CREATE INDEX [IX_ItemBarcode_UomId] ON [mdm].[ItemBarcode] ([UomId]);

CREATE INDEX [IX_ItemWarehousePolicy_ItemId] ON [mdm].[ItemWarehousePolicy] ([ItemId]);

CREATE INDEX [IX_ItemWarehousePolicy_WarehouseId] ON [mdm].[ItemWarehousePolicy] ([WarehouseId]);

CREATE INDEX [IX_Location_ProfileId] ON [mdm].[Location] ([ProfileId]);

CREATE UNIQUE INDEX [IX_Location_WarehouseId_Code] ON [mdm].[Location] ([WarehouseId], [Code]);

CREATE INDEX [IX_Location_ZoneId] ON [mdm].[Location] ([ZoneId]);

CREATE INDEX [IX_MobileScanEvent_UserId] ON [integration_audit].[MobileScanEvent] ([UserId]);

CREATE UNIQUE INDEX [IX_Owner_Code] ON [mdm].[Owner] ([Code]);

CREATE INDEX [IX_PickTask_AssignedUserId] ON [wms_core].[PickTask] ([AssignedUserId]);

CREATE INDEX [IX_PickTask_ItemId] ON [wms_core].[PickTask] ([ItemId]);

CREATE INDEX [IX_PickTask_SoLineId] ON [wms_core].[PickTask] ([SoLineId]);

CREATE INDEX [IX_PickTask_SuggestedLocationId] ON [wms_core].[PickTask] ([SuggestedLocationId]);

CREATE UNIQUE INDEX [IX_PickTask_TaskNo] ON [wms_core].[PickTask] ([TaskNo]);

CREATE INDEX [IX_PutawayTask_AssignedUserId] ON [wms_core].[PutawayTask] ([AssignedUserId]);

CREATE INDEX [IX_PutawayTask_HandlingUnitId] ON [wms_core].[PutawayTask] ([HandlingUnitId]);

CREATE INDEX [IX_PutawayTask_ItemId] ON [wms_core].[PutawayTask] ([ItemId]);

CREATE INDEX [IX_PutawayTask_ReceiptHeaderId] ON [wms_core].[PutawayTask] ([ReceiptHeaderId]);

CREATE INDEX [IX_PutawayTask_TargetLocationId] ON [wms_core].[PutawayTask] ([TargetLocationId]);

CREATE UNIQUE INDEX [IX_PutawayTask_TaskNo] ON [wms_core].[PutawayTask] ([TaskNo]);

CREATE INDEX [IX_QualityCheckResult_QualityOrderId] ON [quality_control].[QualityCheckResult] ([QualityOrderId]);

CREATE INDEX [IX_QualityOrder_DraftLineId] ON [quality_control].[QualityOrder] ([DraftLineId]);

CREATE INDEX [IX_QualityOrder_ItemId] ON [quality_control].[QualityOrder] ([ItemId]);

CREATE UNIQUE INDEX [IX_QualityOrder_QualityOrderNo] ON [quality_control].[QualityOrder] ([QualityOrderNo]);

CREATE INDEX [IX_QuarantineOrder_ReasonCodeId] ON [quality_control].[QuarantineOrder] ([ReasonCodeId]);

CREATE INDEX [IX_QuarantineOrder_WarehouseId] ON [quality_control].[QuarantineOrder] ([WarehouseId]);

CREATE UNIQUE INDEX [IX_ReasonCode_Code] ON [mdm].[ReasonCode] ([Code]);

CREATE INDEX [IX_Reservation_InventoryId] ON [wms_core].[Reservation] ([InventoryId]);

CREATE UNIQUE INDEX [IX_ReturnReceiptHeader_ReturnNo] ON [wms_core].[ReturnReceiptHeader] ([ReturnNo]);

CREATE INDEX [IX_ReturnReceiptHeader_WarehouseId] ON [wms_core].[ReturnReceiptHeader] ([WarehouseId]);

CREATE INDEX [IX_ReturnReceiptLine_ItemId] ON [wms_core].[ReturnReceiptLine] ([ItemId]);

CREATE INDEX [IX_ReturnReceiptLine_ReturnHeaderId] ON [wms_core].[ReturnReceiptLine] ([ReturnHeaderId]);

CREATE UNIQUE INDEX [IX_ShipmentHeader_ShipmentCode] ON [wms_core].[ShipmentHeader] ([ShipmentCode]);

CREATE INDEX [IX_ShipmentHeader_WarehouseId] ON [wms_core].[ShipmentHeader] ([WarehouseId]);

CREATE INDEX [IX_ShipmentLine_PickTaskId] ON [wms_core].[ShipmentLine] ([PickTaskId]);

CREATE INDEX [IX_ShipmentLine_ShipmentHeaderId] ON [wms_core].[ShipmentLine] ([ShipmentHeaderId]);

CREATE UNIQUE INDEX [IX_Supplier_Code] ON [mdm].[Supplier] ([Code]);

CREATE UNIQUE INDEX [IX_Uom_Code] ON [mdm].[Uom] ([Code]);

CREATE INDEX [IX_UomConversion_FromUomId] ON [mdm].[UomConversion] ([FromUomId]);

CREATE INDEX [IX_UomConversion_ToUomId] ON [mdm].[UomConversion] ([ToUomId]);

CREATE INDEX [IX_UserDevice_UserId] ON [mdm].[UserDevice] ([UserId]);

CREATE INDEX [IX_UserWarehouseMapping_WarehouseId] ON [wms_core].[UserWarehouseMapping] ([WarehouseId]);

CREATE UNIQUE INDEX [IX_Warehouse_Code] ON [mdm].[Warehouse] ([Code]);

CREATE INDEX [IX_WavePicking_WarehouseId] ON [wms_core].[WavePicking] ([WarehouseId]);

CREATE UNIQUE INDEX [IX_WavePicking_WaveNo] ON [wms_core].[WavePicking] ([WaveNo]);

CREATE INDEX [IX_WavePickingLine_PickTaskId] ON [wms_core].[WavePickingLine] ([PickTaskId]);

CREATE INDEX [IX_WavePickingLine_WavePickingId] ON [wms_core].[WavePickingLine] ([WavePickingId]);

CREATE INDEX [IX_Zone_WarehouseId] ON [mdm].[Zone] ([WarehouseId]);

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20260418075135_WmsDb_Standard_Enterprise_Final_V6_Clean', N'10.0.6');

COMMIT;
GO

