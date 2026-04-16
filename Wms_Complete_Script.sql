-- ====================================================================================
-- EPE SMART WMS DATABASE SCRIPT - V1.0
-- BA/Solution: Dựa trên BRD_SRS_WMS_EPE_v1.docx
-- ====================================================================================

-- 1. TẠO SCHEMAS
IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = 'mdm') EXEC('CREATE SCHEMA mdm');
GO
IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = 'erp_stage') EXEC('CREATE SCHEMA erp_stage');
GO
IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = 'wms_core') EXEC('CREATE SCHEMA wms_core');
GO
IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = 'quality_control') EXEC('CREATE SCHEMA quality_control');
GO
IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = 'integration_audit') EXEC('CREATE SCHEMA integration_audit');
GO

-- ====================================================================================
-- SCHEMA: MDM (MASTER DATA MANAGEMENT)
-- ====================================================================================

CREATE TABLE mdm.Uom (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Code NVARCHAR(50) NOT NULL UNIQUE,
    Name NVARCHAR(255),
    CreatedAt DATETIME2 DEFAULT GETUTCDATE()
);

CREATE TABLE mdm.Supplier (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Code NVARCHAR(50) NOT NULL UNIQUE,
    Name NVARCHAR(255),
    Status NVARCHAR(50) DEFAULT 'Active',
    CreatedAt DATETIME2 DEFAULT GETUTCDATE()
);

CREATE TABLE mdm.Customer (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Code NVARCHAR(50) NOT NULL UNIQUE,
    Name NVARCHAR(255),
    Status NVARCHAR(50) DEFAULT 'Active',
    CreatedAt DATETIME2 DEFAULT GETUTCDATE()
);

CREATE TABLE mdm.Warehouse (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Code NVARCHAR(50) NOT NULL UNIQUE,
    Name NVARCHAR(255),
    Address NVARCHAR(MAX),
    Status NVARCHAR(50) DEFAULT 'Active'
);

CREATE TABLE mdm.Zone (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    WarehouseId INT NOT NULL FOREIGN KEY REFERENCES mdm.Warehouse(Id),
    ZoneCode NVARCHAR(50) NOT NULL,
    ZoneType NVARCHAR(50), -- Inbound, Storage, Outbound
    CONSTRAINT UQ_Zone_Warehouse UNIQUE (ZoneCode, WarehouseId)
);

CREATE TABLE mdm.LocationProfile (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    ProfileCode NVARCHAR(50) NOT NULL UNIQUE,
    MaxWeight DECIMAL(18,4),
    MaxVolume DECIMAL(18,4),
    AllowMixedItems BIT DEFAULT 0,
    AllowMixedLots BIT DEFAULT 0
);

CREATE TABLE mdm.Location (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    WarehouseId INT NOT NULL FOREIGN KEY REFERENCES mdm.Warehouse(Id),
    ZoneId INT FOREIGN KEY REFERENCES mdm.Zone(Id),
    ProfileId INT FOREIGN KEY REFERENCES mdm.LocationProfile(Id),
    Code NVARCHAR(50) NOT NULL,
    Aisle NVARCHAR(50),
    Rack NVARCHAR(50),
    Level NVARCHAR(50),
    Bin NVARCHAR(50),
    Status NVARCHAR(50) DEFAULT 'Active',
    CONSTRAINT UQ_Location_Code_Warehouse UNIQUE (Code, WarehouseId)
);

CREATE TABLE mdm.Item (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    ItemCode NVARCHAR(50) NOT NULL UNIQUE,
    Name NVARCHAR(255),
    BaseUomId INT FOREIGN KEY REFERENCES mdm.Uom(Id),
    IsLotControlled BIT DEFAULT 0,
    IsSerialControlled BIT DEFAULT 0,
    ShelfLifeDays INT,
    PickStrategy NVARCHAR(50) DEFAULT 'FIFO',
    Status NVARCHAR(50) DEFAULT 'Active'
);

CREATE TABLE mdm.ItemBarcode (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    ItemId INT NOT NULL FOREIGN KEY REFERENCES mdm.Item(Id),
    UomId INT FOREIGN KEY REFERENCES mdm.Uom(Id),
    Barcode NVARCHAR(255) NOT NULL UNIQUE,
    BarcodeType NVARCHAR(50) -- Vendor, Internal, Pallet
);

CREATE TABLE mdm.UomConversion (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    FromUomId INT NOT NULL FOREIGN KEY REFERENCES mdm.Uom(Id),
    ToUomId INT NOT NULL FOREIGN KEY REFERENCES mdm.Uom(Id),
    ItemId INT FOREIGN KEY REFERENCES mdm.Item(Id),
    ConversionRate DECIMAL(18,6) NOT NULL
);

CREATE TABLE mdm.InventoryStatus (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    StatusCode NVARCHAR(50) NOT NULL UNIQUE,
    IsAllocatable BIT DEFAULT 1
);

CREATE TABLE mdm.ReasonCode (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Code NVARCHAR(50) NOT NULL UNIQUE,
    Type NVARCHAR(50), -- Inbound, Outbound, Adjustment
    Description NVARCHAR(255)
);

-- ====================================================================================
-- SCHEMA: ERP_STAGE (VÙNG ĐỆM ĐỒNG BỘ ERP FAST)
-- ====================================================================================

CREATE TABLE erp_stage.ErpPurchaseOrderHeader (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    PoNumber NVARCHAR(100) NOT NULL UNIQUE,
    SupplierId INT FOREIGN KEY REFERENCES mdm.Supplier(Id),
    ExpectedDate DATETIME2,
    ErpStatus NVARCHAR(50),
    VersionHash NVARCHAR(255),
    CreatedAt DATETIME2 DEFAULT GETUTCDATE()
);

CREATE TABLE erp_stage.ErpPurchaseOrderLine (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    PoHeaderId INT NOT NULL FOREIGN KEY REFERENCES erp_stage.ErpPurchaseOrderHeader(Id),
    [LineNo] INT NOT NULL,
    ItemId INT NOT NULL FOREIGN KEY REFERENCES mdm.Item(Id),
    UomId INT FOREIGN KEY REFERENCES mdm.Uom(Id),
    OrderedQty DECIMAL(18,4) NOT NULL,
    OpenQty DECIMAL(18,4) NOT NULL
);

CREATE TABLE erp_stage.ErpSalesOrderHeader (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    SoNumber NVARCHAR(100) NOT NULL UNIQUE,
    CustomerId INT FOREIGN KEY REFERENCES mdm.Customer(Id),
    ExpectedDate DATETIME2,
    ErpStatus NVARCHAR(50),
    VersionHash NVARCHAR(255),
    CreatedAt DATETIME2 DEFAULT GETUTCDATE()
);

CREATE TABLE erp_stage.ErpSalesOrderLine (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    SoHeaderId INT NOT NULL FOREIGN KEY REFERENCES erp_stage.ErpSalesOrderHeader(Id),
    [LineNo] INT NOT NULL,
    ItemId INT NOT NULL FOREIGN KEY REFERENCES mdm.Item(Id),
    UomId INT FOREIGN KEY REFERENCES mdm.Uom(Id),
    OrderedQty DECIMAL(18,4) NOT NULL,
    OpenQty DECIMAL(18,4) NOT NULL
);

-- ====================================================================================
-- SCHEMA: WMS_CORE (TRÁI TIM TÁC NGHIỆP WMS)
-- ====================================================================================

CREATE TABLE wms_core.InboundReceiptHeader (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    ReceiptNo NVARCHAR(100) NOT NULL UNIQUE,
    SupplierId INT FOREIGN KEY REFERENCES mdm.Supplier(Id),
    VehicleNo NVARCHAR(50),
    Status NVARCHAR(50) DEFAULT 'Open',
    CreatedAt DATETIME2 DEFAULT GETUTCDATE()
);

CREATE TABLE wms_core.DraftLine (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    ReceiptHeaderId INT NOT NULL FOREIGN KEY REFERENCES wms_core.InboundReceiptHeader(Id),
    PoLineId INT FOREIGN KEY REFERENCES erp_stage.ErpPurchaseOrderLine(Id),
    ItemId INT NOT NULL FOREIGN KEY REFERENCES mdm.Item(Id),
    UomId INT FOREIGN KEY REFERENCES mdm.Uom(Id),
    ExpectedQty DECIMAL(18,4) DEFAULT 0,
    ReceivedQty DECIMAL(18,4) DEFAULT 0,
    AcceptedQty DECIMAL(18,4) DEFAULT 0,
    RejectedQty DECIMAL(18,4) DEFAULT 0,
    HoldQty DECIMAL(18,4) DEFAULT 0,
    SubstituteItemId INT FOREIGN KEY REFERENCES mdm.Item(Id),
    ReasonCodeId INT FOREIGN KEY REFERENCES mdm.ReasonCode(Id),
    Status NVARCHAR(50),
    CONSTRAINT CHK_DraftLine_Qty CHECK ((AcceptedQty + RejectedQty + HoldQty) <= ReceivedQty)
);

CREATE TABLE wms_core.HandlingUnit (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    LicensePlate NVARCHAR(100) NOT NULL UNIQUE,
    LocationId INT FOREIGN KEY REFERENCES mdm.Location(Id),
    Status NVARCHAR(50) DEFAULT 'Active'
);

CREATE TABLE wms_core.InventoryLedger (
    Id BIGINT IDENTITY(1,1) PRIMARY KEY,
    TransactionType NVARCHAR(50) NOT NULL,
    ItemId INT NOT NULL FOREIGN KEY REFERENCES mdm.Item(Id),
    LotNo NVARCHAR(100),
    Qty DECIMAL(18,4) NOT NULL,
    FromLocationId INT FOREIGN KEY REFERENCES mdm.Location(Id),
    ToLocationId INT FOREIGN KEY REFERENCES mdm.Location(Id),
    SourceDocId NVARCHAR(100),
    Timestamp DATETIME2 DEFAULT GETUTCDATE(),
    CreatedBy NVARCHAR(100)
);

CREATE TABLE wms_core.InventoryOnHand (
    Id BIGINT IDENTITY(1,1) PRIMARY KEY,
    WarehouseId INT NOT NULL FOREIGN KEY REFERENCES mdm.Warehouse(Id),
    LocationId INT NOT NULL FOREIGN KEY REFERENCES mdm.Location(Id),
    ItemId INT NOT NULL FOREIGN KEY REFERENCES mdm.Item(Id),
    LotNo NVARCHAR(100) DEFAULT 'N/A',
    SerialNumber NVARCHAR(100) DEFAULT 'N/A',
    HandlingUnitId INT FOREIGN KEY REFERENCES wms_core.HandlingUnit(Id),
    InventoryStatusId INT NOT NULL FOREIGN KEY REFERENCES mdm.InventoryStatus(Id),
    AvailableQty DECIMAL(18,4) DEFAULT 0,
    ReservedQty DECIMAL(18,4) DEFAULT 0,
    UpdatedAt DATETIME2 DEFAULT GETUTCDATE(),
    CONSTRAINT UQ_InventoryOnHand UNIQUE (WarehouseId, LocationId, ItemId, LotNo, SerialNumber, HandlingUnitId, InventoryStatusId)
);

CREATE TABLE wms_core.PutawayTask (
    Id BIGINT IDENTITY(1,1) PRIMARY KEY,
    TaskNo NVARCHAR(100) NOT NULL UNIQUE,
    ReceiptHeaderId INT FOREIGN KEY REFERENCES wms_core.InboundReceiptHeader(Id),
    ItemId INT NOT NULL FOREIGN KEY REFERENCES mdm.Item(Id),
    HandlingUnitId INT FOREIGN KEY REFERENCES wms_core.HandlingUnit(Id),
    TargetLocationId INT FOREIGN KEY REFERENCES mdm.Location(Id),
    Quantity DECIMAL(18,4),
    Status NVARCHAR(50) DEFAULT 'Pending'
);

CREATE TABLE wms_core.PickTask (
    Id BIGINT IDENTITY(1,1) PRIMARY KEY,
    TaskNo NVARCHAR(100) NOT NULL UNIQUE,
    SoLineId INT FOREIGN KEY REFERENCES erp_stage.ErpSalesOrderLine(Id),
    SuggestedLocationId INT FOREIGN KEY REFERENCES mdm.Location(Id),
    ItemId INT NOT NULL FOREIGN KEY REFERENCES mdm.Item(Id),
    LotNo NVARCHAR(100),
    RequestedQty DECIMAL(18,4),
    PickedQty DECIMAL(18,4) DEFAULT 0,
    Status NVARCHAR(50) DEFAULT 'Open'
);

CREATE TABLE wms_core.ShipmentHeader (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    ShipmentCode NVARCHAR(100) NOT NULL UNIQUE,
    Carrier NVARCHAR(100),
    VehicleNo NVARCHAR(50),
    Dock NVARCHAR(50),
    Status NVARCHAR(50) DEFAULT 'Pending',
    CreatedDate DATETIME2 DEFAULT GETUTCDATE()
);

-- ====================================================================================
-- SCHEMA: QUALITY_CONTROL (KIỂM KÊ VÀ QC)
-- ====================================================================================

CREATE TABLE quality_control.CycleCountSession (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    SessionNo NVARCHAR(100) NOT NULL UNIQUE,
    ZoneId INT FOREIGN KEY REFERENCES mdm.Zone(Id),
    Status NVARCHAR(50) DEFAULT 'Open',
    CreatedBy NVARCHAR(100),
    CreatedAt DATETIME2 DEFAULT GETUTCDATE()
);

CREATE TABLE quality_control.CycleCountLine (
    Id BIGINT IDENTITY(1,1) PRIMARY KEY,
    SessionId INT NOT NULL FOREIGN KEY REFERENCES quality_control.CycleCountSession(Id),
    LocationId INT NOT NULL FOREIGN KEY REFERENCES mdm.Location(Id),
    ItemId INT NOT NULL FOREIGN KEY REFERENCES mdm.Item(Id),
    LotNo NVARCHAR(100),
    SystemQty DECIMAL(18,4),
    CountedQty DECIMAL(18,4),
    Variance AS (CountedQty - SystemQty),
    Status NVARCHAR(50) DEFAULT 'Pending Review'
);

CREATE TABLE quality_control.QualityOrder (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    QualityOrderId NVARCHAR(100) NOT NULL UNIQUE,
    DraftLineId INT FOREIGN KEY REFERENCES wms_core.DraftLine(Id),
    ItemId INT NOT NULL FOREIGN KEY REFERENCES mdm.Item(Id),
    LotNo NVARCHAR(100),
    Qty DECIMAL(18,4),
    Status NVARCHAR(50) DEFAULT 'QA Hold',
    CreatedAt DATETIME2 DEFAULT GETUTCDATE()
);

-- ====================================================================================
-- SCHEMA: INTEGRATION_AUDIT (LOG VÀ TÍCH HỢP)
-- ====================================================================================

CREATE TABLE integration_audit.MobileScanEvent (
    Id BIGINT IDENTITY(1,1) PRIMARY KEY,
    ClientTxnId NVARCHAR(255) NOT NULL UNIQUE,
    Barcode NVARCHAR(255) NOT NULL,
    ScannedQty DECIMAL(18,4),
    LocationCode NVARCHAR(100),
    UserId NVARCHAR(100),
    ScanTime DATETIME2 DEFAULT GETUTCDATE()
);

CREATE TABLE integration_audit.IntegrationOutbox (
    Id BIGINT IDENTITY(1,1) PRIMARY KEY,
    IdempotencyKey NVARCHAR(255) NOT NULL UNIQUE,
    MessageType NVARCHAR(100),
    Payload NVARCHAR(MAX),
    Status NVARCHAR(50) DEFAULT 'Pending',
    RetryCount INT DEFAULT 0,
    ErrorMessage NVARCHAR(MAX),
    CreatedAt DATETIME2 DEFAULT GETUTCDATE(),
    UpdatedAt DATETIME2 DEFAULT GETUTCDATE()
);

CREATE TABLE integration_audit.ApiCallLog (
    Id BIGINT IDENTITY(1,1) PRIMARY KEY,
    Endpoint NVARCHAR(255),
    Method NVARCHAR(10),
    RequestPayload NVARCHAR(MAX),
    ResponsePayload NVARCHAR(MAX),
    StatusCode INT,
    CorrelationId NVARCHAR(255),
    Timestamp DATETIME2 DEFAULT GETUTCDATE()
);
GO
