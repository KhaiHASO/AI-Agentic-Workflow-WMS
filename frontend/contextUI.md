# WMS API & Database Design Context

## Route: `/add-user` (WMS Module)

### 1. Data Retrieval (GET List/Filters)
- **Query Parameters:**
  - `[Input: text]` Label: "Search" -> Likely Key: `search`
- **Table / Grid Data Schema:** No data table found.

### 2. Data Mutation (POST/PUT Form)
- **Payload Fields:**
  - `[Input: file]` Label: "field" -> Key: `imageUpload`
    - Validation: [Required: No] | [Readonly: No]
    - Default/Sample Value: `Empty`
  - `[Input: text]` Label: "Full Name" -> Key: `name`
    - Validation: [Required: Yes] | [Readonly: No]
    - Default/Sample Value: `Empty`
  - `[Input: email]` Label: "Email" -> Key: `email`
    - Validation: [Required: Yes] | [Readonly: No]
    - Default/Sample Value: `Empty`
  - `[Input: email]` Label: "Phone" -> Key: `number`
    - Validation: [Required: No] | [Readonly: No]
    - Default/Sample Value: `Empty`
  - `[Input: select-one]` Label: "Department" -> Key: `depart`
    - Validation: [Required: Yes] | [Readonly: No]
    - Default/Sample Value: `Enter Event Title`
  - `[Input: select-one]` Label: "Designation" -> Key: `desig`
    - Validation: [Required: Yes] | [Readonly: No]
    - Default/Sample Value: `Enter Designation Title`
  - `[Input: textarea]` Label: "Description" -> Key: `#0`
    - Validation: [Required: No] | [Readonly: No]
    - Default/Sample Value: `Empty`

### 3. Business Actions (Endpoints Needed)
- `[Action: POST]` UI Text: "Toggle Theme" -> Suggested Endpoint: `[POST] /api/add-user/post`
- `[Action: DELETE]` UI Text: "Cancel" -> Suggested Endpoint: `[DELETE] /api/add-user/delete`
- `[Action: POST]` UI Text: "Save" -> Suggested Endpoint: `[POST] /api/add-user/post`

---

## Route: `/assign-role` (WMS Module)

### 1. Data Retrieval (GET List/Filters)
- **Query Parameters:**
  - `[Input: text]` Label: "Search" -> Likely Key: `search`
  - `[Input: dropdown]` Label: "filter" -> Likely Key: `filter`
  - `[Input: text]` Label: "Search" -> Likely Key: `search`
  - `[Input: dropdown]` Label: "filter" -> Likely Key: `filter`
- **Table / Grid Data Schema:**
  - `[Column]` "S.L" -> Likely Key: `sL` | Type: `Number` | Sample: `01`
  - `[Column]` "Username" -> Likely Key: `username` | Type: `String` | Sample: `Kathryn Murphy`
  - `[Column]` "Role Permission" -> Likely Key: `rolePermission` | Type: `String` | Sample: `Waiter`
  - `[Column]` "Action" -> Likely Key: `action` | Type: `String` | Sample: `Assign Role`
- **Pagination Detected:** Yes

### 2. Data Mutation (POST/PUT Form)
- **Payload Fields:**
  - `[Input: checkbox]` Label: "checkbox" -> Key: `checkbox`
    - Validation: [Required: No] | [Readonly: No]
    - Default/Sample Value: `on`
  - `[Input: checkbox]` Label: "checkbox" -> Key: `checkbox`
    - Validation: [Required: No] | [Readonly: No]
    - Default/Sample Value: `on`
  - `[Input: checkbox]` Label: "checkbox" -> Key: `checkbox`
    - Validation: [Required: No] | [Readonly: No]
    - Default/Sample Value: `on`
  - `[Input: checkbox]` Label: "checkbox" -> Key: `checkbox`
    - Validation: [Required: No] | [Readonly: No]
    - Default/Sample Value: `on`
  - `[Input: checkbox]` Label: "checkbox" -> Key: `checkbox`
    - Validation: [Required: No] | [Readonly: No]
    - Default/Sample Value: `on`
  - `[Input: checkbox]` Label: "checkbox" -> Key: `checkbox`
    - Validation: [Required: No] | [Readonly: No]
    - Default/Sample Value: `on`
  - `[Input: checkbox]` Label: "checkbox" -> Key: `checkbox`
    - Validation: [Required: No] | [Readonly: No]
    - Default/Sample Value: `on`
  - `[Input: checkbox]` Label: "checkbox" -> Key: `checkbox`
    - Validation: [Required: No] | [Readonly: No]
    - Default/Sample Value: `on`
  - `[Input: checkbox]` Label: "checkbox" -> Key: `checkbox`
    - Validation: [Required: No] | [Readonly: No]
    - Default/Sample Value: `on`
  - `[Input: checkbox]` Label: "checkbox" -> Key: `checkbox`
    - Validation: [Required: No] | [Readonly: No]
    - Default/Sample Value: `on`

### 3. Business Actions (Endpoints Needed)
- `[Action: POST]` UI Text: "Toggle Theme" -> Suggested Endpoint: `[POST] /api/assign-role/post`
- `[Action: POST]` UI Text: "Assign Role" -> Suggested Endpoint: `[POST] /api/assign-role/post`

---

## Route: `/company` (WMS Module)

### 1. Data Retrieval (GET List/Filters)
- **Query Parameters:**
  - `[Input: text]` Label: "Search" -> Likely Key: `search`
  - `[Input: text]` Label: "Full Name *" -> Likely Key: `fullName`
- **Table / Grid Data Schema:** No data table found.

### 2. Data Mutation (POST/PUT Form)
- **Payload Fields:**
  - `[Input: text]` Label: "Full Name" -> Key: `name`
    - Validation: [Required: Yes] | [Readonly: No]
    - Default/Sample Value: `Empty`
  - `[Input: email]` Label: "Email" -> Key: `email`
    - Validation: [Required: Yes] | [Readonly: No]
    - Default/Sample Value: `Empty`
  - `[Input: email]` Label: "Phone Number" -> Key: `number`
    - Validation: [Required: No] | [Readonly: No]
    - Default/Sample Value: `Empty`
  - `[Input: url]` Label: "Website" -> Key: `Website`
    - Validation: [Required: No] | [Readonly: No]
    - Default/Sample Value: `Empty`
  - `[Input: select-one]` Label: "Country" -> Key: `country`
    - Validation: [Required: Yes] | [Readonly: No]
    - Default/Sample Value: `Select Country`
  - `[Input: select-one]` Label: "City" -> Key: `city`
    - Validation: [Required: Yes] | [Readonly: No]
    - Default/Sample Value: `Select City`
  - `[Input: select-one]` Label: "State" -> Key: `state`
    - Validation: [Required: Yes] | [Readonly: No]
    - Default/Sample Value: `Select State`
  - `[Input: text]` Label: "Zip Code" -> Key: `zip`
    - Validation: [Required: Yes] | [Readonly: No]
    - Default/Sample Value: `Empty`
  - `[Input: text]` Label: "Address" -> Key: `address`
    - Validation: [Required: Yes] | [Readonly: No]
    - Default/Sample Value: `Empty`

### 3. Business Actions (Endpoints Needed)
- `[Action: POST]` UI Text: "Toggle Theme" -> Suggested Endpoint: `[POST] /api/company/post`
- `[Action: POST]` UI Text: "Reset" -> Suggested Endpoint: `[POST] /api/company/post`
- `[Action: PUT]` UI Text: "Save Change" -> Suggested Endpoint: `[PUT] /api/company/put`

---

## Route: `/currencies` (Add New Currency)

### 1. Data Retrieval (GET List/Filters)
- **Query Parameters:**
  - `[Input: text]` Label: "Search" -> Likely Key: `search`
  - `[Input: dropdown]` Label: "filter" -> Likely Key: `filter`
  - `[Input: text]` Label: "Search" -> Likely Key: `search`
  - `[Input: text]` Label: "Name" -> Likely Key: `name`
  - `[Input: dropdown]` Label: "Country" -> Likely Key: `country`
  - `[Input: dropdown]` Label: "Code" -> Likely Key: `code`
  - `[Input: dropdown]` Label: "Is Cryptocurrency" -> Likely Key: `isCryptocurrency`
  - `[Input: text]` Label: "Name" -> Likely Key: `name`
  - `[Input: dropdown]` Label: "Country" -> Likely Key: `country`
  - `[Input: dropdown]` Label: "Code" -> Likely Key: `code`
  - `[Input: dropdown]` Label: "Is Cryptocurrency" -> Likely Key: `isCryptocurrency`
- **Table / Grid Data Schema:**
  - `[Column]` "S.L" -> Likely Key: `sL` | Type: `Number` | Sample: `01`
  - `[Column]` "Name" -> Likely Key: `name` | Type: `String` | Sample: `Dollars(Default)`
  - `[Column]` "Symbol" -> Likely Key: `symbol` | Type: `String` | Sample: `$`
  - `[Column]` "Code" -> Likely Key: `code` | Type: `String` | Sample: `USD`
  - `[Column]` "Is Cryptocurrency" -> Likely Key: `isCryptocurrency` | Type: `String` | Sample: `No`
  - `[Column]` "Status" -> Likely Key: `status` | Type: `String` | Sample: `N/A`
  - `[Column]` "Action" -> Likely Key: `action` | Type: `String` | Sample: `N/A`
- **Pagination Detected:** Yes

### 2. Data Mutation (POST/PUT Form)
- **Payload Fields:**
  - `[Input: checkbox]` Label: "field" -> Key: `field`
    - Validation: [Required: No] | [Readonly: No]
    - Default/Sample Value: `on`
  - `[Input: checkbox]` Label: "field" -> Key: `field`
    - Validation: [Required: No] | [Readonly: No]
    - Default/Sample Value: `on`
  - `[Input: checkbox]` Label: "field" -> Key: `field`
    - Validation: [Required: No] | [Readonly: No]
    - Default/Sample Value: `on`
  - `[Input: checkbox]` Label: "field" -> Key: `field`
    - Validation: [Required: No] | [Readonly: No]
    - Default/Sample Value: `on`
  - `[Input: checkbox]` Label: "field" -> Key: `field`
    - Validation: [Required: No] | [Readonly: No]
    - Default/Sample Value: `on`
  - `[Input: checkbox]` Label: "field" -> Key: `field`
    - Validation: [Required: No] | [Readonly: No]
    - Default/Sample Value: `on`
  - `[Input: checkbox]` Label: "field" -> Key: `field`
    - Validation: [Required: No] | [Readonly: No]
    - Default/Sample Value: `on`
  - `[Input: checkbox]` Label: "field" -> Key: `field`
    - Validation: [Required: No] | [Readonly: No]
    - Default/Sample Value: `on`
  - `[Input: checkbox]` Label: "field" -> Key: `field`
    - Validation: [Required: No] | [Readonly: No]
    - Default/Sample Value: `on`
  - `[Input: text]` Label: "Name" -> Key: `name`
    - Validation: [Required: No] | [Readonly: No]
    - Default/Sample Value: `Empty`
  - `[Input: select-one]` Label: "Country" -> Key: `country`
    - Validation: [Required: No] | [Readonly: No]
    - Default/Sample Value: `Select symbol`
  - `[Input: select-one]` Label: "Code" -> Key: `code`
    - Validation: [Required: No] | [Readonly: No]
    - Default/Sample Value: `Select Code`
  - `[Input: select-one]` Label: "Is Cryptocurrency" -> Key: `currency`
    - Validation: [Required: No] | [Readonly: No]
    - Default/Sample Value: `No`
  - `[Input: text]` Label: "Name" -> Key: `editname`
    - Validation: [Required: No] | [Readonly: No]
    - Default/Sample Value: `Empty`
  - `[Input: select-one]` Label: "Country" -> Key: `editcountry`
    - Validation: [Required: No] | [Readonly: No]
    - Default/Sample Value: `Select symbol`
  - `[Input: select-one]` Label: "Code" -> Key: `editcode`
    - Validation: [Required: No] | [Readonly: No]
    - Default/Sample Value: `Select Code`
  - `[Input: select-one]` Label: "Is Cryptocurrency" -> Key: `editcurrency`
    - Validation: [Required: No] | [Readonly: No]
    - Default/Sample Value: `No`

### 3. Business Actions (Endpoints Needed)
- `[Action: POST]` UI Text: "Toggle Theme" -> Suggested Endpoint: `[POST] /api/currencies/post`
- `[Action: POST]` UI Text: "Add Currency" -> Suggested Endpoint: `[POST] /api/currencies/post`
- `[Action: POST]` UI Text: "Reset" -> Suggested Endpoint: `[POST] /api/currencies/post`
- `[Action: PUT]` UI Text: "Save Change" -> Suggested Endpoint: `[PUT] /api/currencies/put`
- `[Action: DELETE]` UI Text: "Cancel" -> Suggested Endpoint: `[DELETE] /api/currencies/delete`
- `[Action: PUT]` UI Text: "Update" -> Suggested Endpoint: `[PUT] /api/currencies/put`

---

## Route: `/inbound-draft` (WMS Module)

### 1. Data Retrieval (GET List/Filters)
- **Query Parameters:**
  - `[Input: text]` Label: "Search" -> Likely Key: `search`
- **Table / Grid Data Schema:** No data table found.

### 2. Data Mutation (POST/PUT Form)
- **Payload Fields:**
  - No mutation form detected on this route.

### 3. Business Actions (Endpoints Needed)
- `[Action: POST]` UI Text: "Toggle Theme" -> Suggested Endpoint: `[POST] /api/inbound-draft/post`
- `[Action: POST]` UI Text: "BẮT ĐẦU NHẬN HÀNG" -> Suggested Endpoint: `[POST] /api/inbound-draft/post`

---

## Route: `/master-data` (WMS Module)

### 1. Data Retrieval (GET List/Filters)
- **Query Parameters:**
  - `[Input: text]` Label: "Search" -> Likely Key: `search`
- **Table / Grid Data Schema:**
  - `[Column]` "THÔNG TIN SẢN PHẨM" -> Likely Key: `thNgTinSNPhM` | Type: `String` | Sample: `RM
Màng PE 5kg (Loại A)
Mã ERP: RM-001`
  - `[Column]` "ĐVT GỐC" -> Likely Key: `VtGC` | Type: `String` | Sample: `ROLL`
  - `[Column]` "QUẢN LÝ LÔ" -> Likely Key: `quNLL` | Type: `String` | Sample: `N/A`
  - `[Column]` "CHIẾN LƯỢC PICK" -> Likely Key: `chiNLCPick` | Type: `String` | Sample: `FEFO`
  - `[Column]` "TRẠNG THÁI" -> Likely Key: `trNgThI` | Type: `String` | Sample: `Hoạt động`
  - `[Column]` "HÀNH ĐỘNG" -> Likely Key: `hNhNg` | Type: `String` | Sample: `N/A`
- **Pagination Detected:** No

### 2. Data Mutation (POST/PUT Form)
- **Payload Fields:**
  - No mutation form detected on this route.

### 3. Business Actions (Endpoints Needed)
- `[Action: POST]` UI Text: "Toggle Theme" -> Suggested Endpoint: `[POST] /api/master-data/post`
- `[Action: POST]` UI Text: "Sản Phẩm" -> Suggested Endpoint: `[POST] /api/master-data/post`
- `[Action: POST]` UI Text: "Quy Đổi ĐVT" -> Suggested Endpoint: `[POST] /api/master-data/post`
- `[Action: POST]` UI Text: "Nhà Cung Cấp" -> Suggested Endpoint: `[POST] /api/master-data/post`
- `[Action: POST]` UI Text: "ĐỒNG BỘ ERP" -> Suggested Endpoint: `[POST] /api/master-data/post`
- `[Action: POST]` UI Text: "THÊM MỚI" -> Suggested Endpoint: `[POST] /api/master-data/post`

---

## Route: `/sync-logs` (WMS Module)

### 1. Data Retrieval (GET List/Filters)
- **Query Parameters:**
  - `[Input: text]` Label: "Search" -> Likely Key: `search`
- **Table / Grid Data Schema:**
  - `[Column]` "PHIÊN / ID" -> Likely Key: `phiNId` | Type: `String` | Sample: `SYNC-001`
  - `[Column]` "ĐỐI TƯỢNG" -> Likely Key: `ITNg` | Type: `String` | Sample: `ITEM`
  - `[Column]` "HƯỚNG" -> Likely Key: `hNg` | Type: `String` | Sample: `← PULL (ERP-IN)`
  - `[Column]` "THỜI GIAN" -> Likely Key: `thIGian` | Type: `String` | Sample: `4/12/2026, 7:00:00 AM
Xử lý: 1m 5s`
  - `[Column]` "SỐ BẢN GHI" -> Likely Key: `sBNGhi` | Type: `Number` | Sample: `500`
  - `[Column]` "TRẠNG THÁI" -> Likely Key: `trNgThI` | Type: `String` | Sample: `KHỚP (SYNCED)`
  - `[Column]` "NỘI DUNG LỖI / LOG" -> Likely Key: `nIDungLILog` | Type: `String` | Sample: `Sẵn sàng (Clean)`
  - `[Column]` "THAO TÁC" -> Likely Key: `thaoTC` | Type: `String` | Sample: `N/A`
- **Pagination Detected:** No

### 2. Data Mutation (POST/PUT Form)
- **Payload Fields:**
  - No mutation form detected on this route.

### 3. Business Actions (Endpoints Needed)
- `[Action: POST]` UI Text: "Toggle Theme" -> Suggested Endpoint: `[POST] /api/sync-logs/post`
- `[Action: POST]` UI Text: "Lọc bản tin lỗi" -> Suggested Endpoint: `[POST] /api/sync-logs/post`
- `[Action: POST]` UI Text: "BUỘC ĐỒNG BỘ TOÀN BỘ" -> Suggested Endpoint: `[POST] /api/sync-logs/post`
- `[Action: POST]` UI Text: "RETRY (PHÁT LẠI)" -> Suggested Endpoint: `[POST] /api/sync-logs/post`

---

## Route: `/putaway` (WMS Module)

### 1. Data Retrieval (GET List/Filters)
- **Query Parameters:**
  - `[Input: text]` Label: "Search" -> Likely Key: `search`
  - `[Input: text]` Label: "QUÉT VỊ TRÍ..." -> Likely Key: `quTVTr`
- **Table / Grid Data Schema:**
  - `[Column]` "NHIỆM VỤ / PALLET" -> Likely Key: `nhiMVPallet` | Type: `String` | Sample: `#PT-000221
Pallet: LP-000981`
  - `[Column]` "SẢN PHẨM" -> Likely Key: `sNPhM` | Type: `String` | Sample: `RM-001
NGUYÊN VẬT LIỆU`
  - `[Column]` "SỐ LƯỢNG" -> Likely Key: `sLNg` | Type: `Number` | Sample: `55`
  - `[Column]` "VỊ TRÍ ĐÍCH (TARGET)" -> Likely Key: `vTrChTarget` | Type: `String` | Sample: `WH-A-STG-01-01`
  - `[Column]` "XÁC NHẬN QUÉT" -> Likely Key: `xCNhNQuT` | Type: `String` | Sample: `XÁC NHẬN`
- **Pagination Detected:** No

### 2. Data Mutation (POST/PUT Form)
- **Payload Fields:**
  - `[Input: text]` Label: "QUÉT VỊ TRÍ..." -> Key: `quTVTr`
    - Validation: [Required: No] | [Readonly: No]
    - Default/Sample Value: `Empty`

### 3. Business Actions (Endpoints Needed)
- `[Action: POST]` UI Text: "Toggle Theme" -> Suggested Endpoint: `[POST] /api/putaway/post`
- `[Action: POST]` UI Text: "XÁC NHẬN" -> Suggested Endpoint: `[POST] /api/putaway/post`

---

## Route: `/sales-orders` (WMS Module)

### 1. Data Retrieval (GET List/Filters)
- **Query Parameters:**
  - `[Input: text]` Label: "Search" -> Likely Key: `search`
- **Table / Grid Data Schema:**
  - `[Column]` "" -> Likely Key: `` | Type: `String` | Sample: `N/A`
  - `[Column]` "MÃ ĐƠN (SO)" -> Likely Key: `mNSo` | Type: `String` | Sample: `SO-2026-001`
  - `[Column]` "KHÁCH HÀNG" -> Likely Key: `khChHNg` | Type: `String` | Sample: `CUS
Công ty Samsung VN`
  - `[Column]` "SỐ LƯỢNG" -> Likely Key: `sLNg` | Type: `Number` | Sample: `150`
  - `[Column]` "NGÀY GIAO" -> Likely Key: `ngYGiao` | Type: `String` | Sample: `13/04/2026`
  - `[Column]` "ĐỘ ƯU TIÊN" -> Likely Key: `UTiN` | Type: `String` | Sample: `HIGH`
  - `[Column]` "TRẠNG THÁI ERP" -> Likely Key: `trNgThIErp` | Type: `String` | Sample: `Approved`
- **Pagination Detected:** No

### 2. Data Mutation (POST/PUT Form)
- **Payload Fields:**
  - `[Input: checkbox]` Label: "field" -> Key: `field`
    - Validation: [Required: No] | [Readonly: Yes]
    - Default/Sample Value: `on`
  - `[Input: checkbox]` Label: "field" -> Key: `field`
    - Validation: [Required: No] | [Readonly: Yes]
    - Default/Sample Value: `on`
  - `[Input: checkbox]` Label: "field" -> Key: `field`
    - Validation: [Required: No] | [Readonly: Yes]
    - Default/Sample Value: `on`
  - `[Input: checkbox]` Label: "field" -> Key: `field`
    - Validation: [Required: No] | [Readonly: Yes]
    - Default/Sample Value: `on`

### 3. Business Actions (Endpoints Needed)
- `[Action: POST]` UI Text: "Toggle Theme" -> Suggested Endpoint: `[POST] /api/sales-orders/post`
- `[Action: POST]` UI Text: "GOM WAVE (0)" -> Suggested Endpoint: `[POST] /api/sales-orders/post`

---

## Route: `/pick-task` (WMS Module)

### 1. Data Retrieval (GET List/Filters)
- **Query Parameters:**
  - `[Input: text]` Label: "Search" -> Likely Key: `search`
- **Table / Grid Data Schema:**
  - `[Column]` "VỊ TRÍ (SOURCE)" -> Likely Key: `vTrSource` | Type: `String` | Sample: `WH-A-PCK-01-01`
  - `[Column]` "SẢN PHẨM & LÔ" -> Likely Key: `sNPhML` | Type: `String` | Sample: `FG-001
Lô: LOT-20260413-01 | SO: SO-000781`
  - `[Column]` "SỐ LƯỢNG" -> Likely Key: `sLNg` | Type: `String` | Sample: `50
Yêu cầu`
  - `[Column]` "TIẾN ĐỘ" -> Likely Key: `tiN` | Type: `String` | Sample: `0/50`
  - `[Column]` "XÁC NHẬN (QUÉT)" -> Likely Key: `xCNhNQuT` | Type: `String` | Sample: `N/A`
  - `[Column]` "NGOẠI LỆ" -> Likely Key: `ngoIL` | Type: `String` | Sample: `Xử lý`
- **Pagination Detected:** No

### 2. Data Mutation (POST/PUT Form)
- **Payload Fields:**
  - `[Input: text]` Label: "Quét Mã/Vị trí..." -> Key: `quTMVTr`
    - Validation: [Required: No] | [Readonly: No]
    - Default/Sample Value: `Empty`

### 3. Business Actions (Endpoints Needed)
- `[Action: POST]` UI Text: "Toggle Theme" -> Suggested Endpoint: `[POST] /api/pick-task/post`
- `[Action: POST]` UI Text: "In Pick List" -> Suggested Endpoint: `[POST] /api/pick-task/post`
- `[Action: POST]` UI Text: "XÁC NHẬN HOÀN TẤT ĐỢT" -> Suggested Endpoint: `[POST] /api/pick-task/post`
- `[Action: POST]` UI Text: "Xử lý" -> Suggested Endpoint: `[POST] /api/pick-task/post`
- `[Action: POST]` UI Text: "Báo thiếu hàng (Short)" -> Suggested Endpoint: `[POST] /api/pick-task/post`
- `[Action: POST]` UI Text: "Đổi vị trí/Lô (Override)" -> Suggested Endpoint: `[POST] /api/pick-task/post`
- `[Action: POST]` UI Text: "Yêu cầu kiểm kho" -> Suggested Endpoint: `[POST] /api/pick-task/post`

---

## Route: `/shipment` (1)

### 1. Data Retrieval (GET List/Filters)
- **Query Parameters:**
  - `[Input: text]` Label: "Search" -> Likely Key: `search`
- **Table / Grid Data Schema:**
  - `[Column]` "Mã Giao Hàng" -> Likely Key: `mGiaoHNg` | Type: `String` | Sample: `SHP-00045`
  - `[Column]` "Chứng Từ Gốc (SO)" -> Likely Key: `chNgTGCSo` | Type: `String` | Sample: `SO-000781`
  - `[Column]` "Đơn Vị Vận Chuyển" -> Likely Key: `NVVNChuyN` | Type: `String` | Sample: `VN-POST`
  - `[Column]` "Biển Số Xe" -> Likely Key: `biNSXe` | Type: `String` | Sample: `60H-98765`
  - `[Column]` "Cửa Xuất (Dock)" -> Likely Key: `cAXuTDock` | Type: `String` | Sample: `DOOR-02`
  - `[Column]` "Trạng Thái" -> Likely Key: `trNgThI` | Type: `String` | Sample: `Sẵn Sàng Giao`
  - `[Column]` "Hành Động" -> Likely Key: `hNhNg` | Type: `String` | Sample: `CHỐT GIAO HÀNG`
- **Pagination Detected:** No

### 2. Data Mutation (POST/PUT Form)
- **Payload Fields:**
  - No mutation form detected on this route.

### 3. Business Actions (Endpoints Needed)
- `[Action: POST]` UI Text: "Toggle Theme" -> Suggested Endpoint: `[POST] /api/shipment/post`
- `[Action: POST]` UI Text: "CHỐT GIAO HÀNG" -> Suggested Endpoint: `[POST] /api/shipment/post`

---

## Route: `/inventory` (4)

### 1. Data Retrieval (GET List/Filters)
- **Query Parameters:**
  - `[Input: text]` Label: "Search" -> Likely Key: `search`
  - `[Input: text]` Label: "Vị trí, SKU, Lô..." -> Likely Key: `vTrSkuL`
- **Table / Grid Data Schema:**
  - `[Column]` "VỊ TRÍ (LOCATION)" -> Likely Key: `vTrLocation` | Type: `String` | Sample: `WH-A-STG-01-01-L1`
  - `[Column]` "SẢN PHẨM (ITEM)" -> Likely Key: `sNPhMItem` | Type: `String` | Sample: `RM-001
Phân loại: Raw Material`
  - `[Column]` "LÔ (LOT NO)" -> Likely Key: `lLotNo` | Type: `String` | Sample: `LOT-20260412-01`
  - `[Column]` "HẠN SỬ DỤNG" -> Likely Key: `hNSDNg` | Type: `Date` | Sample: `2026-10-12`
  - `[Column]` "SỐ LƯỢNG" -> Likely Key: `sLNg` | Type: `Number` | Sample: `50`
  - `[Column]` "ĐVT" -> Likely Key: `Vt` | Type: `String` | Sample: `ROLL`
  - `[Column]` "TRẠNG THÁI" -> Likely Key: `trNgThI` | Type: `String` | Sample: `SẴN SÀNG`
  - `[Column]` "KHÓA / GIỮ HÀNG" -> Likely Key: `khAGiHNg` | Type: `String` | Sample: `HOLD/BLOCK`
- **Pagination Detected:** No

### 2. Data Mutation (POST/PUT Form)
- **Payload Fields:**
  - No mutation form detected on this route.

### 3. Business Actions (Endpoints Needed)
- `[Action: POST]` UI Text: "Toggle Theme" -> Suggested Endpoint: `[POST] /api/inventory/post`
- `[Action: POST]` UI Text: "TẠO LỆNH NHẬP" -> Suggested Endpoint: `[POST] /api/inventory/post`
- `[Action: POST]` UI Text: "EXPORT" -> Suggested Endpoint: `[POST] /api/inventory/post`
- `[Action: POST]` UI Text: "HOLD/BLOCK" -> Suggested Endpoint: `[POST] /api/inventory/post`

---

## Route: `/ledger` (WMS Module)

### 1. Data Retrieval (GET List/Filters)
- **Query Parameters:**
  - `[Input: text]` Label: "Search" -> Likely Key: `search`
  - `[Input: text]` Label: "Tìm SKU, Mã TXN..." -> Likely Key: `tMSkuMTxn`
- **Table / Grid Data Schema:**
  - `[Column]` "Thời Gian & Mã TXN" -> Likely Key: `thIGianMTxn` | Type: `String` | Sample: `4/12/2026, 4:30:00 PM
ID: TXN-00001`
  - `[Column]` "Loại Giao Dịch" -> Likely Key: `loIGiaoDCh` | Type: `String` | Sample: `INBOUND_RECEIPT`
  - `[Column]` "Sản Phẩm" -> Likely Key: `sNPhM` | Type: `String` | Sample: `SKU
RM-001`
  - `[Column]` "Số Lượng" -> Likely Key: `sLNg` | Type: `Number` | Sample: `+50`
  - `[Column]` "Vị Trí Biến Động" -> Likely Key: `vTrBiNNg` | Type: `String` | Sample: `EXTERNAL
WH-A-REC-01`
  - `[Column]` "Chứng Từ Gốc" -> Likely Key: `chNgTGC` | Type: `String` | Sample: `GRN-2026-00150`
  - `[Column]` "Người Thực Hiện" -> Likely Key: `ngIThCHiN` | Type: `String` | Sample: `user.wh01`
- **Pagination Detected:** No

### 2. Data Mutation (POST/PUT Form)
- **Payload Fields:**
  - No mutation form detected on this route.

### 3. Business Actions (Endpoints Needed)
- `[Action: POST]` UI Text: "Toggle Theme" -> Suggested Endpoint: `[POST] /api/ledger/post`
- `[Action: POST]` UI Text: "Excel" -> Suggested Endpoint: `[POST] /api/ledger/post`

---

## Route: `/cycle-count` (WMS Module)

### 1. Data Retrieval (GET List/Filters)
- **Query Parameters:**
  - `[Input: text]` Label: "Search" -> Likely Key: `search`
- **Table / Grid Data Schema:**
  - `[Column]` "MÃ PHIÊN / VỊ TRÍ" -> Likely Key: `mPhiNVTr` | Type: `String` | Sample: `021
CC-00021
WH-A-STG-01-01`
  - `[Column]` "SẢN PHẨM / LÔ" -> Likely Key: `sNPhML` | Type: `String` | Sample: `RM-001
Lô: LOT-20260412-01`
  - `[Column]` "TỒN HỆ THỐNG" -> Likely Key: `tNHThNg` | Type: `Number` | Sample: `50`
  - `[Column]` "KIỂM THỰC TẾ" -> Likely Key: `kiMThCT` | Type: `Number` | Sample: `48`
  - `[Column]` "CHÊNH LỆCH (VARIANCE)" -> Likely Key: `chNhLChVariance` | Type: `Number` | Sample: `-2`
  - `[Column]` "TRẠNG THÁI" -> Likely Key: `trNgThI` | Type: `String` | Sample: `PENDING REVIEW`
  - `[Column]` "HÀNH ĐỘNG" -> Likely Key: `hNhNg` | Type: `String` | Sample: `XEM XÉT & PHÊ DUYỆT`
- **Pagination Detected:** No

### 2. Data Mutation (POST/PUT Form)
- **Payload Fields:**
  - No mutation form detected on this route.

### 3. Business Actions (Endpoints Needed)
- `[Action: POST]` UI Text: "Toggle Theme" -> Suggested Endpoint: `[POST] /api/cycle-count/post`
- `[Action: POST]` UI Text: "BẮT ĐẦU PHIÊN QUÉT MỚI" -> Suggested Endpoint: `[POST] /api/cycle-count/post`
- `[Action: POST]` UI Text: "In Báo Cáo" -> Suggested Endpoint: `[POST] /api/cycle-count/post`
- `[Action: POST]` UI Text: "XEM XÉT & PHÊ DUYỆT" -> Suggested Endpoint: `[POST] /api/cycle-count/post`

---

## Route: `/pallet-hu` (WMS Module)

### 1. Data Retrieval (GET List/Filters)
- **Query Parameters:**
  - `[Input: text]` Label: "Search" -> Likely Key: `search`
- **Table / Grid Data Schema:**
  - `[Column]` "Mã Pallet (License Plate)" -> Likely Key: `mPalletLicensePlate` | Type: `String` | Sample: `LP-000981
Loại: PALLET`
  - `[Column]` "Vị Trí Hiện Tại" -> Likely Key: `vTrHiNTI` | Type: `String` | Sample: `INB-STAGE-01`
  - `[Column]` "Trạng Thái" -> Likely Key: `trNgThI` | Type: `String` | Sample: `In Staging`
  - `[Column]` "Nội Dung SKU" -> Likely Key: `nIDungSku` | Type: `String` | Sample: `RM-001
(Lô: LOT-20260412-02)`
  - `[Column]` "Tổng SL" -> Likely Key: `tNgSl` | Type: `Number` | Sample: `55`
  - `[Column]` "Khối Lượng" -> Likely Key: `khILNg` | Type: `String` | Sample: `275 kg`
  - `[Column]` "Thao Tác" -> Likely Key: `thaoTC` | Type: `String` | Sample: `N/A`
- **Pagination Detected:** No

### 2. Data Mutation (POST/PUT Form)
- **Payload Fields:**
  - No mutation form detected on this route.

### 3. Business Actions (Endpoints Needed)
- `[Action: POST]` UI Text: "Toggle Theme" -> Suggested Endpoint: `[POST] /api/pallet-hu/post`
- `[Action: POST]` UI Text: "In Tem Pallet" -> Suggested Endpoint: `[POST] /api/pallet-hu/post`
- `[Action: POST]` UI Text: "Khởi Tạo Pallet" -> Suggested Endpoint: `[POST] /api/pallet-hu/post`

---

## Route: `/quality-control` (WMS Module)

### 1. Data Retrieval (GET List/Filters)
- **Query Parameters:**
  - `[Input: text]` Label: "Search" -> Likely Key: `search`
- **Table / Grid Data Schema:** No data table found.

### 2. Data Mutation (POST/PUT Form)
- **Payload Fields:**
  - No mutation form detected on this route.

### 3. Business Actions (Endpoints Needed)
- `[Action: POST]` UI Text: "Toggle Theme" -> Suggested Endpoint: `[POST] /api/quality-control/post`
- `[Action: POST]` UI Text: "Từ Chối" -> Suggested Endpoint: `[POST] /api/quality-control/post`
- `[Action: POST]` UI Text: "Cách Ly" -> Suggested Endpoint: `[POST] /api/quality-control/post`
- `[Action: POST]` UI Text: "Chấp Nhận & Release" -> Suggested Endpoint: `[POST] /api/quality-control/post`

---

## Route: `/relocation` (WMS Module)

### 1. Data Retrieval (GET List/Filters)
- **Query Parameters:**
  - `[Input: text]` Label: "Search" -> Likely Key: `search`
  - `[Input: text]` Label: "Ví dụ: WH-A-STG-01-01" -> Likely Key: `vDWhAStg0101`
  - `[Input: text]` Label: "Ví dụ: WH-A-PCK-01-01" -> Likely Key: `vDWhAPck0101`
- **Table / Grid Data Schema:**
  - `[Column]` "Thời Gian" -> Likely Key: `thIGian` | Type: `String` | Sample: `Chưa có lịch sử điều chuyển trong phiên này.`
  - `[Column]` "Sản Phẩm" -> Likely Key: `sNPhM` | Type: `String` | Sample: `N/A`
  - `[Column]` "Số Lượng" -> Likely Key: `sLNg` | Type: `String` | Sample: `N/A`
  - `[Column]` "Từ Vị Trí" -> Likely Key: `tVTr` | Type: `String` | Sample: `N/A`
  - `[Column]` "Đến Vị Trí" -> Likely Key: `NVTr` | Type: `String` | Sample: `N/A`
  - `[Column]` "Người Thực Hiện" -> Likely Key: `ngIThCHiN` | Type: `String` | Sample: `N/A`
  - `[Column]` "Trạng Thái" -> Likely Key: `trNgThI` | Type: `String` | Sample: `N/A`
- **Pagination Detected:** No

### 2. Data Mutation (POST/PUT Form)
- **Payload Fields:**
  - `[Input: text]` Label: "Ví dụ: WH-A-STG-01-01" -> Key: `vDWhAStg0101`
    - Validation: [Required: No] | [Readonly: No]
    - Default/Sample Value: `Empty`
  - `[Input: text]` Label: "Ví dụ: RM-001 hoặc LP-001" -> Key: `vDRm001HoCLp001`
    - Validation: [Required: No] | [Readonly: No]
    - Default/Sample Value: `Empty`
  - `[Input: text]` Label: "Ví dụ: WH-A-PCK-01-01" -> Key: `vDWhAPck0101`
    - Validation: [Required: No] | [Readonly: No]
    - Default/Sample Value: `Empty`
  - `[Input: number]` Label: "Nhập số lượng..." -> Key: `nhPSLNg`
    - Validation: [Required: No] | [Readonly: No]
    - Default/Sample Value: `Empty`

### 3. Business Actions (Endpoints Needed)
- `[Action: POST]` UI Text: "Toggle Theme" -> Suggested Endpoint: `[POST] /api/relocation/post`
- `[Action: POST]` UI Text: "Đề xuất tự động" -> Suggested Endpoint: `[POST] /api/relocation/post`
- `[Action: POST]` UI Text: "XÁC NHẬN ĐIỀU CHUYỂN" -> Suggested Endpoint: `[POST] /api/relocation/post`

---

## Route: `/warehouse-layout` (85%)

### 1. Data Retrieval (GET List/Filters)
- **Query Parameters:**
  - `[Input: text]` Label: "Search" -> Likely Key: `search`
- **Table / Grid Data Schema:**
  - `[Column]` "" -> Likely Key: `` | Type: `String` | Sample: `Tầng L4`
  - `[Column]` "Kệ 01" -> Likely Key: `k01` | Type: `String` | Sample: `A1-01
60%`
  - `[Column]` "Kệ 02" -> Likely Key: `k02` | Type: `String` | Sample: `A1-02`
  - `[Column]` "Kệ 03" -> Likely Key: `k03` | Type: `String` | Sample: `A1-03`
  - `[Column]` "Kệ 04" -> Likely Key: `k04` | Type: `String` | Sample: `A1-04
60%`
  - `[Column]` "Kệ 05" -> Likely Key: `k05` | Type: `String` | Sample: `A1-05
60%`
  - `[Column]` "Kệ 06" -> Likely Key: `k06` | Type: `String` | Sample: `A1-06`
  - `[Column]` "Kệ 07" -> Likely Key: `k07` | Type: `String` | Sample: `A1-07
60%`
  - `[Column]` "Kệ 08" -> Likely Key: `k08` | Type: `String` | Sample: `A1-08
100%`
- **Pagination Detected:** No

### 2. Data Mutation (POST/PUT Form)
- **Payload Fields:**
  - No mutation form detected on this route.

### 3. Business Actions (Endpoints Needed)
- `[Action: POST]` UI Text: "Toggle Theme" -> Suggested Endpoint: `[POST] /api/warehouse-layout/post`
- `[Action: POST]` UI Text: "Dãy A1" -> Suggested Endpoint: `[POST] /api/warehouse-layout/post`
- `[Action: POST]` UI Text: "Dãy A2" -> Suggested Endpoint: `[POST] /api/warehouse-layout/post`
- `[Action: POST]` UI Text: "Dãy B1" -> Suggested Endpoint: `[POST] /api/warehouse-layout/post`
- `[Action: POST]` UI Text: "Dãy B2" -> Suggested Endpoint: `[POST] /api/warehouse-layout/post`
- `[Action: POST]` UI Text: "Chế độ 3D" -> Suggested Endpoint: `[POST] /api/warehouse-layout/post`
- `[Action: POST]` UI Text: "Tối ưu hóa vị trí" -> Suggested Endpoint: `[POST] /api/warehouse-layout/post`

---

## Route: `/returns` (1)

### 1. Data Retrieval (GET List/Filters)
- **Query Parameters:**
  - `[Input: text]` Label: "Search" -> Likely Key: `search`
- **Table / Grid Data Schema:**
  - `[Column]` "Mã Phiếu" -> Likely Key: `mPhiU` | Type: `String` | Sample: `RTV-2026-001`
  - `[Column]` "Chứng Từ Gốc" -> Likely Key: `chNgTGC` | Type: `String` | Sample: `PO-2026-045`
  - `[Column]` "Đối Tác / NCC" -> Likely Key: `ITCNcc` | Type: `String` | Sample: `SUP
Supplier A`
  - `[Column]` "Lô Hàng" -> Likely Key: `lHNg` | Type: `String` | Sample: `LOT-20260412`
  - `[Column]` "Trạng Thái" -> Likely Key: `trNgThI` | Type: `String` | Sample: `Chờ Kiểm Định`
  - `[Column]` "Lý Do" -> Likely Key: `lDo` | Type: `String` | Sample: `Hàng lỗi kỹ thuật`
  - `[Column]` "Hành Động" -> Likely Key: `hNhNg` | Type: `String` | Sample: `N/A`
- **Pagination Detected:** No

### 2. Data Mutation (POST/PUT Form)
- **Payload Fields:**
  - No mutation form detected on this route.

### 3. Business Actions (Endpoints Needed)
- `[Action: POST]` UI Text: "Toggle Theme" -> Suggested Endpoint: `[POST] /api/returns/post`
- `[Action: POST]` UI Text: "Tạo Phiếu Mới" -> Suggested Endpoint: `[POST] /api/returns/post`

---

## Route: `/reports` (4,250)

### 1. Data Retrieval (GET List/Filters)
- **Query Parameters:**
  - `[Input: text]` Label: "Search" -> Likely Key: `search`
- **Table / Grid Data Schema:**
  - `[Column]` "Khoảng Thời Gian" -> Likely Key: `khoNgThIGian` | Type: `String` | Sample: `0 - 30 ngày`
  - `[Column]` "SL Sản Phẩm" -> Likely Key: `slSNPhM` | Type: `String` | Sample: `850 SKU`
  - `[Column]` "Giá Trị Ước Tính" -> Likely Key: `giTrCTNh` | Type: `String` | Sample: `$1.2M`
  - `[Column]` "Trạng Thái" -> Likely Key: `trNgThI` | Type: `String` | Sample: `N/A`
- **Pagination Detected:** No

### 2. Data Mutation (POST/PUT Form)
- **Payload Fields:**
  - No mutation form detected on this route.

### 3. Business Actions (Endpoints Needed)
- `[Action: POST]` UI Text: "Toggle Theme" -> Suggested Endpoint: `[POST] /api/reports/post`
- `[Action: POST]` UI Text: "30 ngày gần nhất" -> Suggested Endpoint: `[POST] /api/reports/post`

---

## Route: `/devices` (WMS Module)

### 1. Data Retrieval (GET List/Filters)
- **Query Parameters:**
  - `[Input: text]` Label: "Search" -> Likely Key: `search`
  - `[Input: text]` Label: "filter" -> Likely Key: `filter`
  - `[Input: text]` Label: "filter" -> Likely Key: `filter`
  - `[Input: text]` Label: "filter" -> Likely Key: `filter`
  - `[Input: dropdown]` Label: "filter" -> Likely Key: `filter`
- **Table / Grid Data Schema:**
  - `[Column]` "Thiết Bị" -> Likely Key: `thiTB` | Type: `String` | Sample: `SCN-001
Honeywell EDA51`
  - `[Column]` "Người Sử Dụng" -> Likely Key: `ngISDNg` | Type: `String` | Sample: `Phan Khải`
  - `[Column]` "Kết Nối" -> Likely Key: `kTNI` | Type: `String` | Sample: `ONLINE`
  - `[Column]` "Pin / Sóng" -> Likely Key: `pinSNg` | Type: `String` | Sample: `85%`
  - `[Column]` "Thời Gian Truy Cập" -> Likely Key: `thIGianTruyCP` | Type: `String` | Sample: `13/04/2026 14:30`
  - `[Column]` "Hành Động" -> Likely Key: `hNhNg` | Type: `String` | Sample: `N/A`
- **Pagination Detected:** No

### 2. Data Mutation (POST/PUT Form)
- **Payload Fields:**
  - `[Input: text]` Label: "field" -> Key: `field`
    - Validation: [Required: No] | [Readonly: No]
    - Default/Sample Value: `SCN-006`
  - `[Input: text]` Label: "field" -> Key: `field`
    - Validation: [Required: No] | [Readonly: No]
    - Default/Sample Value: `Zebra TC52`
  - `[Input: text]` Label: "field" -> Key: `field`
    - Validation: [Required: No] | [Readonly: No]
    - Default/Sample Value: `Nhân viên Kho mới`
  - `[Input: select-one]` Label: "field" -> Key: `field`
    - Validation: [Required: No] | [Readonly: No]
    - Default/Sample Value: `ANDROID_HANDHELD`

### 3. Business Actions (Endpoints Needed)
- `[Action: POST]` UI Text: "Toggle Theme" -> Suggested Endpoint: `[POST] /api/devices/post`
- `[Action: POST]` UI Text: "Đăng Ký Mới" -> Suggested Endpoint: `[POST] /api/devices/post`
- `[Action: DELETE]` UI Text: "Hủy" -> Suggested Endpoint: `[DELETE] /api/devices/delete`
- `[Action: POST]` UI Text: "Kích Hoạt Thiết Bị" -> Suggested Endpoint: `[POST] /api/devices/post`

---

