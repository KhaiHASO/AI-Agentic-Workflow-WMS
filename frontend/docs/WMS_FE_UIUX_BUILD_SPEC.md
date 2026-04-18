# WMS FE UI/UX Build Spec (Mock-Data, No API)

Version: 1.0
Language: Vietnamese UI + English route/component naming
Target: Agent dựng UI/UX chạy được bằng mock data, chưa cần kết nối API
Base template: Dashcode Next – Tailwind & Next.js Admin Dashboard

---

## 1. Mục tiêu của file này

Đây là file đặc tả duy nhất để agent bám theo và dựng một prototype FE hoàn chỉnh cho hệ thống WMS.

Yêu cầu bắt buộc:
- Dùng Next.js + Tailwind, dựa trên Dashcode layout/admin shell.
- Không cần kết nối API thật.
- Toàn bộ dữ liệu dùng mock data cứng hoặc local state.
- Tất cả màn hình phải chạy được.
- Tất cả nút bấm chính phải có hành vi thật ở mức FE: mở modal, chuyển trang, đổi trạng thái, thêm/xóa/sửa local state, hiện toast, hiện step/status, lọc table.
- Bao phủ toàn bộ nghiệp vụ trong tài liệu: inbound, putaway, cross-dock, outbound, wave, picking, shipment, inventory, count, quality, quarantine, return, integration, master data, reports.
- Không dựng theo CRUD thuần DB; dựng theo luồng nghiệp vụ.

Prototype mong muốn:
- Chạy được end-to-end ở mức UI.
- Người dùng có thể click demo từ dashboard vào các flow chính.
- Có đủ trạng thái để trình bày cho hội đồng / BA / khách hàng.

---

## 2. Tech direction bắt buộc

- Next.js App Router
- TypeScript
- Tailwind CSS
- Reuse component từ Dashcode ở mức layout/card/table/form/modal/tab/chart nếu phù hợp
- State cục bộ bằng React state hoặc Zustand
- Mock data để trong `src/mock/*`
- Không dùng backend giả lập phức tạp
- Có thể dùng `localStorage` để giữ trạng thái demo nếu cần
- Toast / notification phải hoạt động
- Các route phải điều hướng thật

Không cần ở giai đoạn này:
- auth thật
- phân quyền backend thật
- websocket thật
- API integration thật
- upload file thật

---

## 3. Nguyên tắc UI/UX tổng quát

### 3.1. Triết lý dựng FE
Không dựng một rừng trang CRUD theo bảng DB. FE phải xoay quanh:
- Dashboard điều hành
- Workbench tác nghiệp
- Detail pages theo chứng từ
- Admin/master data
- Integration/reports

### 3.2. 3 loại màn hình
1. **List Page**: table + filter + action menu
2. **Detail Page**: summary + tabs + action bar + timeline
3. **Workbench Page**: màn hình thao tác chính cho scan/confirm/count, ít distraction, thao tác nhanh

### 3.3. Quy tắc status màu
- Draft: gray
- Open / Ready: blue
- In Progress: amber
- Completed / Submitted: green
- Failed / Rejected: red
- Hold / Quarantine: purple

### 3.4. Quy tắc nút bấm
- Primary action: màu nổi, nằm bên phải header hoặc trong workbench footer
- Secondary action: outline
- Danger action: đỏ, luôn có confirm modal
- Row action: dropdown menu

### 3.5. Quy tắc demo button behavior
Mọi nút chính phải có hành vi thật ở FE:
- Create → mở form/modal và thêm record mock
- Edit → sửa local state
- Submit/Confirm → đổi status local state + toast
- Retry → tăng counter attempts + đổi badge
- Scan → push record vào recent scans + cập nhật qty
- Approve/Reject → đổi workflow state

---

## 4. Layout tổng thể

### 4.1. App shell
- Left sidebar
- Topbar
- Main content area
- Optional right drawer

### 4.2. Sidebar structure
- Dashboard
- Inbound
- Outbound
- Inventory
- Counting & Quality
- Integration
- Master Data
- Reports

### 4.3. Topbar
- Breadcrumb
- Search box (demo)
- Warehouse switcher
- Notification bell
- User avatar dropdown

### 4.4. Warehouse switcher
Prototype mặc định có 2 warehouse:
- WH-HCM
- WH-DN

Switch warehouse sẽ thay filter mặc định của nhiều page và đổi số liệu mock hiển thị.

---

## 5. Route tree bắt buộc

```txt
app/
  (auth)/
    login/page.tsx

  (dashboard)/
    dashboard/page.tsx
    dashboard/alerts/page.tsx
    dashboard/integration-health/page.tsx

    inbound/purchase-orders/page.tsx
    inbound/master-receipts/page.tsx
    inbound/master-receipts/[id]/page.tsx
    inbound/drafts/[id]/page.tsx
    inbound/receipts/[id]/page.tsx
    inbound/putaway-tasks/page.tsx
    inbound/putaway-tasks/[id]/page.tsx
    inbound/cross-dock/page.tsx
    inbound/cross-dock/[id]/page.tsx

    outbound/sales-orders/page.tsx
    outbound/waves/page.tsx
    outbound/waves/[id]/page.tsx
    outbound/pick-tasks/page.tsx
    outbound/pick-tasks/[id]/page.tsx
    outbound/shipments/page.tsx
    outbound/shipments/[id]/page.tsx
    outbound/backorders/page.tsx

    inventory/on-hand/page.tsx
    inventory/ledger/page.tsx
    inventory/handling-units/page.tsx
    inventory/handling-units/[id]/page.tsx
    inventory/transfers/page.tsx
    inventory/adjustments/page.tsx

    counting/sessions/page.tsx
    counting/sessions/[id]/page.tsx
    counting/review/page.tsx

    quality/orders/page.tsx
    quality/orders/[id]/page.tsx
    quality/quarantine/page.tsx
    quality/returns/page.tsx

    integration/erp-sync/page.tsx
    integration/messages/page.tsx
    integration/api-logs/page.tsx
    integration/mobile-events/page.tsx

    master-data/items/page.tsx
    master-data/items/[id]/page.tsx
    master-data/barcodes/page.tsx
    master-data/uoms/page.tsx
    master-data/suppliers/page.tsx
    master-data/customers/page.tsx
    master-data/warehouses/page.tsx
    master-data/locations/page.tsx
    master-data/profiles/page.tsx
    master-data/statuses/page.tsx
    master-data/reasons/page.tsx
    master-data/owners/page.tsx
    master-data/users/page.tsx
    master-data/devices/page.tsx

    reports/inbound/page.tsx
    reports/outbound/page.tsx
    reports/inventory/page.tsx
    reports/productivity/page.tsx
```

---

## 6. Thư mục component đề xuất

```txt
src/
  components/
    layout/
    common/
    data-display/
    filters/
    forms/
    status/
    timeline/
    workbench/
  mock/
    dashboard.ts
    inbound.ts
    outbound.ts
    inventory.ts
    counting.ts
    quality.ts
    integration.ts
    masterData.ts
    reports.ts
  store/
    demo-store.ts
  lib/
    format.ts
    helpers.ts
```

### Component dùng chung bắt buộc
- `PageHeader`
- `FilterBar`
- `StatusBadge`
- `KpiCard`
- `SummaryCard`
- `DataTable`
- `ActionMenu`
- `DetailTabs`
- `AuditTimeline`
- `ConfirmModal`
- `RightDrawer`
- `EmptyState`
- `BarcodeInput`
- `QtyInput`
- `RecentScanList`
- `TaskProgressHeader`

### Workbench components bắt buộc
- `ReceivingWorkbench`
- `PutawayWorkbench`
- `PickingWorkbench`
- `CountWorkbench`
- `ExceptionPanel`
- `SubstitutionPanel`

---

## 7. Global mock data yêu cầu

Agent phải tạo mock data đủ để demo các case sau:
- 6 PO mở
- 5 Master Receipts với đủ status Draft / Scanning / Ready / Submitted / Closed
- 4 Inbound Receipts
- 8 Putaway Tasks
- 6 SO mở
- 4 Waves
- 10 Pick Tasks
- 4 Shipments
- 6 Backorders
- 30 Inventory On-hand rows
- 40 Inventory Ledger rows
- 8 Handling Units
- 5 Internal Transfers
- 5 Inventory Adjustments
- 4 Cycle Count Sessions
- 8 Count Variances
- 5 Quality Orders
- 4 Quarantine Orders
- 4 Returns
- 10 Integration Messages
- 20 API Logs
- 12 Mobile Scan Events
- đủ master data cho item, barcode, location, supplier, customer, warehouse, reason code

### Mock edge cases bắt buộc
- 1 receipt có line short
- 1 receipt có substitute item
- 1 putaway task overdue
- 1 pick task short pick
- 1 shipment fail push ERP
- 1 count session có variance lớn
- 1 quality order bị hold
- 1 quarantine order chờ release
- 1 backorder chưa resolve
- 1 integration message retry 3 lần thất bại

---

## 8. Screen-by-screen specification

## 8.1. Login `/login`
### Mục tiêu
Chỉ là login demo.
### UI
- form email/password
- chọn role demo: Clerk / Supervisor / Admin / Integration
- nút `Đăng nhập`
### Behavior
- submit xong vào `/dashboard`
- role lưu local state

---

## 8.2. Dashboard `/dashboard`
### Sections
- KPI cards: Open PO, Receipts Waiting, Putaway Pending, Open SO, Picking In Progress, Quarantine Qty, Failed Integrations
- Inbound trend chart
- Outbound trend chart
- Inventory by status chart
- Alert list
- Quick actions

### Quick actions buttons
- `Tạo Master Receipt`
- `Mở Receiving Workbench`
- `Xem Putaway`
- `Tạo Wave`
- `Mở Pick Task`
- `Xem Count Review`
- `Xem Retry Queue`

### Behavior
- click KPI hoặc quick action phải navigate thật tới module tương ứng

---

## 8.3. Dashboard Alerts `/dashboard/alerts`
### UI
- severity tabs: Critical / Warning / Info
- alert table
### Buttons
- `Open Task`
- `Acknowledge`
### Behavior
- acknowledge đổi local flag
- open task chuyển tới page liên quan

---

## 8.4. Dashboard Integration Health `/dashboard/integration-health`
### UI
- health cards theo luồng sync
- failed jobs table
### Buttons
- `Retry Failed Job`
- `View Logs`

---

## 8.5. Inbound Purchase Orders `/inbound/purchase-orders`
### UI
- filter: warehouse, supplier, eta, po no
- table PO
- right drawer hiển thị lines
### Buttons
- `Làm mới ERP`
- `Xem chi tiết`
- `Tạo Master Receipt`
### Behavior
- create receipt sẽ sinh record mới status Draft và navigate qua `/inbound/master-receipts/[id]`

---

## 8.6. Master Receipts `/inbound/master-receipts`
### UI
- status tabs
- table receipts
- summary cards
### Buttons
- `Tạo mới`
- `Mở`
- `Xóa draft`
- `Submit`
### Behavior
- submit chỉ cho Draft/Ready
- delete chỉ cho Draft

---

## 8.7. Master Receipt Detail `/inbound/master-receipts/[id]`
### Tabs
- Overview
- Draft Lines
- Exceptions
- Audit Trail
### Buttons
- `Bắt đầu scan`
- `Validate`
- `Submit Draft`
- `Hủy receipt`
### Behavior
- start scan → `/inbound/drafts/[id]`
- validate → toast + cập nhật status `Ready`
- submit → đổi `Submitted` và tạo inbound receipt mock

---

## 8.8. Receiving Workbench `/inbound/drafts/[id]`
### Layout
- left summary panel
- center scan input + draft lines table
- right exception/substitution panel
- sticky footer action bar

### Draft line columns
- Item code
- Item name
- Expected qty
- Scanned qty
- Accepted qty
- Rejected qty
- Status

### Buttons
- `Scan`
- `Đánh dấu thiếu`
- `Đánh dấu hư hỏng`
- `Dùng hàng thay thế`
- `Validate`
- `Submit`

### Behavior demo
- scan barcode hợp lệ → tăng scanned qty của line tương ứng, thêm event vào recent scan list, phát toast success
- scan barcode lỗi → toast error
- mark short / damaged → mở modal nhập reason
- substitute → mở drawer chọn item thay thế
- validate → kiểm tra local conditions, nếu đủ thì status `Ready`
- submit → đổi status, tạo inbound receipt, chuyển sang `/inbound/receipts/[id]`

---

## 8.9. Inbound Receipt Detail `/inbound/receipts/[id]`
### Tabs
- Header
- Receipt Lines
- Exceptions
- Putaway Tasks
- ERP Push
- Audit
### Buttons
- `Generate Putaway`
- `Push GRN`
- `Retry Push`
### Behavior
- generate putaway → sinh tasks mock
- push grn → đổi push status success/fail ngẫu nhiên theo mock flag

---

## 8.10. Putaway Task List `/inbound/putaway-tasks`
### UI
- filter by warehouse/zone/status/assignee/overdue
- table tasks
### Buttons
- `Mở task`
- `Assign`
- `Confirm`
### Behavior
- open → task detail
- assign → modal chọn user mock
- confirm → đổi complete nếu task simple

---

## 8.11. Putaway Workbench `/inbound/putaway-tasks/[id]`
### UI
- task progress header
- source HU/item info
- suggested location
- actual location input
- qty confirm
### Buttons
- `Scan HU`
- `Scan vị trí đích`
- `Xác nhận putaway`
- `Báo ngoại lệ`
### Behavior
- complete task → status Completed + update related inventory location

---

## 8.12. Cross Dock List `/inbound/cross-dock`
### UI
- table + status tabs
### Buttons
- `Tạo cross-dock`
- `Mở`
- `Confirm`
- `Cancel`

## 8.13. Cross Dock Detail `/inbound/cross-dock/[id]`
### Tabs
- Overview
- Source Receipt
- Target Shipment
- Audit
### Buttons
- `Confirm Cross-Dock`
- `Hủy`

---

## 8.14. Sales Orders `/outbound/sales-orders`
### UI
- SO list + filters
### Buttons
- `Làm mới ERP`
- `Xem chi tiết`
- `Thêm vào wave`
- `Kiểm tra tồn`
### Behavior
- add to wave mở modal tạo wave mới hoặc gán wave cũ

---

## 8.15. Waves `/outbound/waves`
### UI
- summary cards + wave table
### Buttons
- `Tạo wave`
- `Release`
- `Open`
- `Cancel`
### Behavior
- create wave sinh mock wave từ selected orders

---

## 8.16. Wave Detail `/outbound/waves/[id]`
### Tabs
- Orders
- Tasks
- Shortages
- Activity
### Buttons
- `Generate Pick Tasks`
- `Release`
- `Reassign`
### Behavior
- generate pick tasks → sinh tasks mock và navigate sang task list nếu muốn

---

## 8.17. Pick Tasks `/outbound/pick-tasks`
### UI
- filter by wave/assignee/status/zone
- table tasks
### Buttons
- `Assign Picker`
- `Open Task`
- `Short Pick`
- `Complete`

---

## 8.18. Picking Workbench `/outbound/pick-tasks/[id]`
### UI
- current task header
- scan location step
- scan item/HU step
- qty confirm
- short pick panel
### Buttons
- `Scan vị trí`
- `Scan item`
- `Xác nhận qty`
- `Short Pick`
- `Task kế tiếp`
### Behavior
- short pick tạo backorder mock nếu thiếu qty
- complete → cập nhật shipment progress mock

---

## 8.19. Shipments `/outbound/shipments`
### UI
- shipment table + tabs
### Buttons
- `Create Shipment`
- `Open`
- `Pack`
- `Confirm Shipment`
- `Push GI`

## 8.20. Shipment Detail `/outbound/shipments/[id]`
### Tabs
- Shipment Info
- Lines
- Packing
- Labels
- Integration
- Audit
### Buttons
- `Pack`
- `Confirm Shipment`
- `Push GI`
- `Retry Push`
### Behavior
- pack → đổi packed qty
- confirm → status Confirmed
- push gi → cập nhật integration state

---

## 8.21. Backorders `/outbound/backorders`
### UI
- shortage table
### Buttons
- `Reallocate`
- `Move to Next Wave`
- `Cancel Line`
- `Resolve`
### Behavior
- resolve → status closed

---

## 8.22. Inventory On-hand `/inventory/on-hand`
### UI
- powerful filters
- large table
- right detail drawer
- top summary cards
### Buttons
- `View Ledger`
- `Create Adjustment`
- `Create Transfer`
- `Quarantine`
- `Print Label`
### Behavior
- view ledger navigate with prefilled filter
- adjustment/transfer/quarantine mở modal và sinh record mock

---

## 8.23. Inventory Ledger `/inventory/ledger`
### UI
- time range filter
- ledger table
### Buttons
- `Open Source Doc`
- `Export`
### Behavior
- open source doc route theo doc type mock

---

## 8.24. Handling Units `/inventory/handling-units`
### UI
- HU table
### Buttons
- `Create HU`
- `Open`
- `Move`
- `Print Label`

## 8.25. Handling Unit Detail `/inventory/handling-units/[id]`
### Tabs
- HU Info
- Contents
- Movements
- Linked Docs
### Buttons
- `Move HU`
- `Split HU`
- `Merge HU`
- `Print`

---

## 8.26. Internal Transfers `/inventory/transfers`
### UI
- transfer table
### Buttons
- `Create Transfer`
- `Approve`
- `Confirm`
- `Cancel`
### Behavior
- create → modal form
- confirm → đổi inventory location mock

---

## 8.27. Inventory Adjustments `/inventory/adjustments`
### UI
- adjustment table + workflow chips
### Buttons
- `Create Adjustment`
- `Submit Approval`
- `Approve`
- `Post`
### Behavior
- post → update on-hand qty mock

---

## 8.28. Count Sessions `/counting/sessions`
### UI
- session cards + table
### Buttons
- `Create Session`
- `Assign Counter`
- `Open Session`
- `Submit`

---

## 8.29. Count Workbench `/counting/sessions/[id]`
### UI
- session summary
- location step
- item list
- scan count input
- discrepancy badge
### Buttons
- `Scan vị trí`
- `Scan item`
- `Submit Count`
- `Save Draft`
- `Finish Session`
### Behavior
- submit count → update line local state
- finish → generate variances if mismatch

---

## 8.30. Count Review `/counting/review`
### UI
- variance table
### Buttons
- `Accept Variance`
- `Request Recount`
- `Approve Adjustment`

---

## 8.31. Quality Orders `/quality/orders`
### UI
- qc order list
### Buttons
- `Create QC Order`
- `Open`
- `Record Result`
- `Send to Quarantine`

## 8.32. Quality Order Detail `/quality/orders/[id]`
### Tabs
- Overview
- Inspection Result
- Attachments
- Related Inventory
- Audit
### Buttons
- `Accept`
- `Reject`
- `Hold`
- `Move to Quarantine`
- `Release`

---

## 8.33. Quarantine `/quality/quarantine`
### UI
- quarantine table
### Buttons
- `Release`
- `Dispose`
- `Transfer`
- `View History`

---

## 8.34. Returns `/quality/returns`
### UI
- return list
### Buttons
- `Create Return`
- `Receive Return`
- `Inspect`
- `Restock`
- `Reject`

---

## 8.35. Integration ERP Sync `/integration/erp-sync`
### UI
- sync cards
- recent jobs table
### Buttons
- `Sync Items`
- `Sync Suppliers`
- `Sync PO`
- `Sync SO`
- `View Logs`
### Behavior
- sync button cập nhật recent job list mock

---

## 8.36. Integration Messages `/integration/messages`
### UI
- outbox / retry table
- payload drawer
### Buttons
- `Open Payload`
- `Retry`
- `Mark Resolved`
### Behavior
- retry tăng attempts, có thể đổi status từ Failed sang Success theo mock flag

---

## 8.37. API Logs `/integration/api-logs`
### UI
- table logs
- request/response drawer
### Buttons
- `Search by Correlation ID`
- `Open Request`
- `Open Response`
- `Export`

---

## 8.38. Mobile Events `/integration/mobile-events`
### UI
- scan event table
### Buttons
- `Filter Device`
- `Open Event`

---

## 8.39. Master Data pages
### Pages
- items
- item detail
- barcodes
- uoms
- suppliers
- customers
- warehouses
- locations
- profiles
- statuses
- reasons
- owners
- users
- devices

### Common behavior
- search, filter, create, edit, disable
- create/edit dùng modal hoặc drawer
- item detail có tabs: basic info, barcodes, uom conversions, warehouse policies, audit

---

## 8.40. Reports pages
### `/reports/inbound`
- cards + charts + detail table
### `/reports/outbound`
- cards + charts + detail table
### `/reports/inventory`
- aging, stock by status, stock by location
### `/reports/productivity`
- putaway, pick, count accuracy, leaderboard

### Buttons
- `Filter`
- `Export`
- `Drill Down`

---

## 9. Role-based visibility

### Clerk
Thấy:
- dashboard cơ bản
- inbound workbench
- putaway
- picking
- shipments
- counting

### Supervisor
Thấy thêm:
- alerts
- review/approval
- waves
- reports
- quarantine

### Admin
Thấy thêm:
- master data
- users/devices
- settings style modules

### Integration
Thấy thêm:
- ERP sync
- messages
- api logs
- mobile events

Role chỉ cần áp dụng ở FE bằng menu/filter route visibility demo.

---

## 10. Acceptance criteria cho agent

Agent chỉ được xem là hoàn thành khi:
- Có đủ toàn bộ routes trong spec
- Không có route nào trắng / placeholder trống
- Mỗi route đều có dữ liệu mock hiển thị
- Mỗi route đều có action buttons thật
- Các flow chính chạy demo được:
  - PO → Master Receipt → Receiving Draft → Submit → Receipt → Generate Putaway
  - SO → Wave → Pick Task → Shipment → Push GI
  - Inventory → Adjustment/Transfer/Quarantine
  - Count Session → Variance → Review/Approve
  - Quality Order → Quarantine / Release
  - Integration Message → Retry
- Có toast success/error
- Có modal confirm cho action quan trọng
- Có status badge nhất quán
- Có responsive mức cơ bản cho tablet/laptop; mobile không cần hoàn hảo

---

## 11. Priority implementation order

### Phase 1
- app shell
- login demo
- dashboard
- sidebar
- mock store

### Phase 2
- inbound full flow
- putaway

### Phase 3
- outbound full flow
- shipment
- backorder

### Phase 4
- inventory
- handling unit
- transfer
- adjustment

### Phase 5
- counting
- quality
- quarantine
- returns

### Phase 6
- integration
- master data
- reports

---

## 12. UI language guideline

Text hiển thị cho người dùng dùng tiếng Việt ngắn gọn, rõ nghiệp vụ.
Ví dụ:
- Tạo Master Receipt
- Bắt đầu scan
- Xác nhận putaway
- Tạo wave
- Xác nhận shipment
- Duyệt chênh lệch
- Retry tích hợp

Không dùng text quá kỹ thuật ở mặt trước trừ nơi dành cho integration/admin.

---

## 13. Demo seed flows bắt buộc

### Flow A: Inbound happy path
PO-24001 → Master Receipt MR-24001 → Receiving Draft → Validate → Submit → Receipt IR-24001 → Generate Putaway → Putaway Done

### Flow B: Inbound exception
PO-24002 → Draft có line short và 1 substitute item

### Flow C: Outbound happy path
SO-24001 → Wave WV-24001 → Pick Task PT-24001 → Shipment SH-24001 → Push GI Success

### Flow D: Outbound short pick
SO-24002 → Pick Task short pick → tạo Backorder BO-24001

### Flow E: Count variance
Session CC-24001 → variance line → review → approve adjustment

### Flow F: Quality hold
Quality Order QO-24001 → Hold → Quarantine → Release

### Flow G: Integration retry
Message MSG-24009 fail 3 lần → Retry → Success

---

## 14. Deliverable expectation từ agent

Agent nên sinh ra một FE prototype có thể chạy bằng `npm run dev`, gồm:
- đủ routes
- đủ sidebar navigation
- đủ mock data
- đủ hành vi FE
- đủ workbench screens
- nhìn chuyên nghiệp, sạch, đồng bộ style admin dashboard

Mức độ hoàn thành kỳ vọng:
- Không phải production ready
- Nhưng phải đủ để BA/mentor/user click qua toàn bộ màn hình và thấy rõ toàn bộ nghiệp vụ đã được UI hóa

---

## 15. Câu chốt để agent hiểu đúng

**Build a fully runnable WMS frontend prototype using Next.js + Tailwind on top of Dashcode admin shell, with hardcoded mock data, complete navigation, complete UI coverage of all business flows, and real front-end interactions for all major buttons and state transitions, but no backend/API integration yet.**

