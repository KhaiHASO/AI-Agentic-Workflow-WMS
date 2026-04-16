# WMS Backend API Documentation

Hệ thống cung cấp đầy đủ các API cho quản lý kho (WMS), được phân loại theo Actor (Vai trò người dùng) và luồng nghiệp vụ.

**Base URL:** `http://localhost:5000/api` (hoặc cấu hình trong `launchSettings.json`)
**Auth:** Yêu cầu JWT Token trong Header `Authorization: Bearer <token>` cho hầu hết các endpoint.

---

## 1. Actor: System Admin (Quản trị viên)
Dùng để quản lý người dùng, phân quyền và giám sát hệ thống.

| Chức năng | Endpoint | Phương thức | Ghi chú |
| :--- | :--- | :--- | :--- |
| **Quản lý User** | `/Users` | GET, POST, PUT, DELETE | Danh sách và thông tin người dùng |
| **Quản lý Role** | `/Roles` | GET, POST | Quản lý các nhóm quyền |
| **Phân quyền** | `/Management/assign-role` | POST | Gán Role cho User (Yêu cầu quyền Admin) |
| **Audit Log** | `/IntegrationAudit/api-logs` | GET | Xem nhật ký gọi API hệ thống |
| **Outbox Log** | `/IntegrationAudit/outbox` | GET | Kiểm tra hàng chờ tích hợp ERP |

---

## 2. Actor: Inventory Manager (Quản lý Master Data - MDM)
Thiết lập cấu trúc kho, thông tin sản phẩm và đối tác.

### Cấu trúc Kho (Warehouse Structure)
*   **Warehouses:** `/Warehouses` (GET, POST, PUT, DELETE)
*   **Zones:** `/Zones` (GET, POST, PUT, DELETE) - Phân khu trong kho.
*   **Locations:** `/Locations` (GET, POST, PUT, DELETE) - Vị trí chi tiết (Ô/Kệ).
*   **Location Profiles:** `/LocationProfiles` (GET, POST, PUT, DELETE) - Cấu hình thuộc tính vị trí (Sức chứa, loại hàng).

### Thông tin Sản phẩm & Đối tác
*   **Items (Sản phẩm):** `/Items` (GET, POST, PUT, DELETE)
*   **UOM (Đơn vị tính):** `/Uoms` (GET, POST, PUT, DELETE)
*   **Suppliers (Nhà cung cấp):** `/Suppliers` (GET, POST, PUT, DELETE)
*   **Customers (Khách hàng):** `/Customers` (GET, POST, PUT, DELETE)
*   **Inventory Status:** `/InventoryStatuses` (GET, POST, PUT, DELETE) - Trạng thái hàng (Available, QA Hold, Damaged).
*   **Reason Codes:** `/ReasonCodes` (GET, POST, PUT, DELETE) - Mã lý do điều chỉnh/hủy.

---

## 3. Actor: Inbound & Outbound Specialist (Nhân viên Vận hành)
Xử lý luồng hàng hóa nhập và xuất kho.

### Inbound (Nhập kho)
*   **Purchase Orders (ERP):** `/PurchaseOrders` (GET, POST, PUT, DELETE) - Đơn mua hàng từ ERP.
*   **Inbound Receipts:** `/InboundReceipts` (GET, POST, PUT, DELETE) - Phiếu nhận hàng thực tế tại kho.
*   **Putaway Tasks:** `/PutawayTasks` (GET, POST, PUT, DELETE) - Nhiệm vụ cất hàng vào vị trí.

### Outbound (Xuất kho)
*   **Sales Orders (ERP):** `/SalesOrders` (GET, POST, PUT, DELETE) - Đơn bán hàng từ ERP.
*   **Pick Tasks:** `/PickTasks` (GET, POST, PUT, DELETE) - Nhiệm vụ lấy hàng từ kệ.
*   **Shipments:** `/Shipments` (GET, POST, PUT, DELETE) - Quản lý chuyến hàng xuất đi.

---

## 4. Actor: QC & Warehouse Worker (Kiểm soát & Nhân viên hiện trường)
Thực hiện các tác vụ kiểm tra và quét mã vạch.

*   **Inventory On-Hand:** `/Inventory` (GET, POST, PUT, DELETE) - Xem tồn kho chi tiết theo vị trí/lô.
*   **Quality Orders:** `/QualityOrders` (GET, POST, PUT, DELETE) - Lệnh kiểm tra chất lượng hàng hóa.
*   **Cycle Counting:** 
    *   `/CycleCountSessions`: Quản lý đợt kiểm kê.
    *   `/CycleCounts`: Chi tiết các dòng kiểm kê (Vị trí, Số lượng thực tế).
*   **Handling Units (LP):** `/HandlingUnits` (GET, POST, PUT, DELETE) - Quản lý Pallet/Thùng hàng (License Plate).
*   **Mobile Scans:** `/MobileScanEvents` (GET, POST) - Lịch sử các lần quét Barcode từ thiết bị cầm tay.

---

## 5. Phân luồng Dashboard (Theo Role)
Endpoint `/Dashboard/summary` trả về dữ liệu tổng hợp tùy chỉnh cho từng Actor:

*   **Worker:** Số lượng task Putaway/Pick đang chờ.
*   **Supervisor:** Hàng đang bị Hold QA, các đơn PO chưa hoàn tất.
*   **Accountant:** Các Shipment đang chờ xử lý chứng từ.
*   **Admin:** Lỗi API hệ thống và tổng số người dùng.

---

## Lưu ý kỹ thuật
1. **Dữ liệu quan hệ:** Các API GET đều đã được cấu hình `.Include()` để lấy đầy đủ thông tin liên quan (ví dụ: lấy Item sẽ kèm theo đơn vị tính BaseUom).
2. **Xử lý Identity:** Khi tạo User qua API, hệ thống tự động băm mật khẩu và gán vào Identity Store của ASP.NET Core.
3. **Lịch sử giao dịch:** Mọi biến động kho được ghi nhận tại `/Ledger` (GET) - Nhật ký giao dịch tồn kho.
