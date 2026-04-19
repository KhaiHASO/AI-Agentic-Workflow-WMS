# WMS Putaway Task UI Spec (Chi tiết cho Putaway Workbench)

Version: 1.0
Mục tiêu: Agent dùng file này để dựng thật kỹ riêng module **Putaway Task / Putaway Workbench** của WMS, bảo đảm UI bao phủ đầy đủ các tình huống thao tác cất hàng từ staging/inbound receipt sang location đích.

File này là phần bổ sung chuyên sâu cho:
- WMS_FE_UIUX_BUILD_SPEC.md
- WMS_BE_IMPLEMENTATION_SPEC.md
- WMS_ADDITIONAL_DEEP_UI_AREAS.md

---

## 1. Mục tiêu của màn Putaway Workbench

Putaway là màn hình tác nghiệp sau khi nhận hàng, nơi người dùng di chuyển hàng từ:
- staging area
- dock
- receiving HU / pallet
- temporary location

sang:
- bin/location đích chính thức
- reserve area
- picking area
- quarantine / hold area (nếu có ngoại lệ)

UI phải hỗ trợ:
- xác nhận nguồn hàng đúng
- gợi ý vị trí đích phù hợp
- scan vị trí đích
- kiểm tra profile/capacity/zone compatibility
- xử lý partial putaway
- split nhiều location
- move theo item hoặc theo HU
- xử lý mixed pallet
- xử lý ngoại lệ location đầy / sai zone / hàng QC hold
- hoàn tất task và cập nhật trạng thái rõ ràng

Đây phải là **workbench UI**, không phải form CRUD.

---

## 2. Các kịch bản Putaway bắt buộc phải bao phủ

### Nhóm A — Putaway chuẩn
1. Putaway một task một line từ staging sang location đích gợi ý
2. Putaway toàn bộ qty vào 1 location
3. Xác nhận xong task → Completed
4. Chuỗi task liên tiếp cùng receipt/HU

### Nhóm B — Partial & Split
5. Putaway một phần qty, còn lại để later
6. Split qty sang 2 hoặc nhiều location
7. Tạo child move cho split qty
8. Giữ task ở trạng thái InProgress khi còn qty chưa putaway

### Nhóm C — Theo HU / pallet
9. Scan HU và xác nhận toàn bộ HU contents
10. Mixed HU có nhiều item → chọn item/line cần cất
11. Move cả HU sang location đích
12. Split HU trước khi cất

### Nhóm D — Location validation
13. Location đúng zone/profile/capacity → cho xác nhận
14. Location đầy → cảnh báo/chặn
15. Location sai zone hoặc sai profile → cảnh báo/chặn
16. Location không active hoặc không tồn tại → lỗi
17. Gợi ý alternative locations khi location mặc định không dùng được

### Nhóm E — Inventory status / special handling
18. Hàng QC hold chỉ được putaway vào hold/quarantine zone
19. Damaged stock không được vào normal picking bin
20. Serial/lot-controlled item phải giữ metadata trong quá trình move
21. FEFO/FIFO suggestion thể hiện logic location ưu tiên phù hợp

### Nhóm F — Ngoại lệ thực tế
22. Scan sai HU
23. Scan sai vị trí đích
24. Chọn nhầm task
25. Xóa/undo move vừa xác nhận trước khi complete
26. Gửi supervisor review
27. Reassign task
28. Skip task và chuyển sang task khác

---

## 3. Layout tổng thể của Putaway Workbench

Màn hình nên chia 4 vùng lớn.

## 3.1. Header cố định
Hiển thị:
- Task No
- Receipt No / Source Doc
- Warehouse
- Assigned User
- Status chip
- Priority
- Created time
- SLA / overdue indicator

### Header actions
- `Lưu tạm`
- `Đổi người xử lý`
- `Bỏ qua task`
- `Báo ngoại lệ`
- `Mở Audit`

---

## 3.2. Cột trái — Task Queue / Summary
Hiển thị danh sách task liên quan để thao tác nhanh.

### Nội dung
- tổng số task pending
- số task overdue
- task cùng receipt/HU
- filter nhanh:
  - All
  - Assigned to me
  - Overdue
  - Exceptions
  - Completed

### Mỗi task card mini hiển thị
- task no
- source HU / item
- qty remaining
- suggested destination
- badge trạng thái
- overdue chip nếu có

Click task sẽ đổi context phần giữa.

---

## 3.3. Khu giữa — Main Putaway Action Panel
Đây là vùng chính.

### Phần trên
- ô scan source (HU/item) lớn
- ô scan destination location lớn
- status banner kết quả scan
- quick toggle:
  - `Move by HU`
  - `Move by Item`
  - `Auto-complete when qty=0`

### Task detail card
Hiển thị:
- source type: HU / item / pallet
- source location hiện tại
- item code + item name
- receipt line / lot / serial / expiry
- qty to putaway
- qty already put away
- qty remaining
- inventory status (Available / Hold / QC / Damaged)

### Destination card
Hiển thị:
- suggested location
- zone
- bin type
- capacity status
- current occupancy
- compatibility status

### Move entry section
Fields:
- source confirmed? yes/no
- destination confirmed? yes/no
- move qty
- target location
- target HU (optional)
- note

### Main action buttons
- `Scan nguồn`
- `Scan vị trí đích`
- `Xác nhận move`
- `Split qty`
- `Đổi location`
- `Undo move cuối`

---

## 3.4. Cột phải — Suggestion / Exception / History Panel
Cột này đổi context theo bước thao tác.

### Mode 1: Suggested Locations
Hiển thị 3–5 vị trí gợi ý với thông tin:
- location code
- zone
- bin type
- capacity usage
- compatible / blocked
- reason suggestion

### Mode 2: Exception Resolution
Khi có lỗi, hiện:
- error reason
- allowed actions
- exception form
- supervisor required? badge

### Mode 3: Move History
Hiển thị recent confirmed moves trong task hiện tại.

---

## 3.5. Footer sticky action bar
Hiển thị:
- remaining qty
- destination validity
- warnings count
- progress of current task

### Nút
- `Lưu tạm`
- `Validate task`
- `Hoàn tất task`
- `Task tiếp theo`

---

## 4. Status và step của Putaway Task

### Status task
- Open
- Assigned
- InProgress
- Completed
- Exception
- Cancelled

### Step UI đề xuất
1. Confirm source
2. Confirm destination
3. Confirm qty
4. Review warnings
5. Complete move

Step progress phải hiện rõ ở đầu panel giữa.

---

## 5. Hành vi scan nguồn

## 5.1. Scan source đúng
UI phải:
- highlight task đang active
- hiện banner success
- mở đủ thông tin item/HU
- khóa nhầm task khác

## 5.2. Scan source sai HU / sai item
UI phải:
- banner đỏ
- hiện source expected vs scanned
- action:
  - scan lại
  - xem HU contents
  - báo ngoại lệ

## 5.3. Mixed HU
Nếu HU chứa nhiều item:
- mở drawer `HU Contents`
- cho chọn line/item cần move
- hiển thị qty của từng item trong HU

---

## 6. Hành vi scan vị trí đích

## 6.1. Location hợp lệ
UI phải hiển thị:
- location matched
- zone/profile ok
- capacity ok
- suggestion badge `Recommended`

## 6.2. Location đầy
UI phải:
- cảnh báo đỏ hoặc vàng tùy policy
- hiển thị current occupancy / max capacity
- cho chọn alternative

## 6.3. Location sai profile/zone
Ví dụ:
- hàng pallet vào bin nhỏ
- hàng QC hold vào normal zone
- hàng frozen vào ambient

UI phải:
- chặn hoặc warning tùy config
- giải thích ngắn gọn lý do
- cho chọn location khác

## 6.4. Location không tồn tại / inactive
UI phải lỗi rõ ràng:
- `Location không hợp lệ`
- `Location đã khóa`
- `Location không khả dụng`

---

## 7. Cơ chế nhập qty move

Agent phải hỗ trợ 3 kiểu:
1. Move toàn bộ remaining qty
2. Nhập qty thủ công
3. Split move thành nhiều location

### UI cần có
- ô qty editable
- nút `Max`
- nút `Chia qty`
- validate không vượt remaining qty

### Nếu partial
Sau khi confirm move partial:
- qty remaining giảm
- task vẫn InProgress
- move history ghi 1 dòng mới

---

## 8. Split qty sang nhiều location

### Khi nào cần
- location đích không đủ capacity
- muốn chia reserve + pick face
- mixed strategy theo bin size

### Modal `Split Putaway`
Hiển thị:
- total remaining qty
- danh sách locations split
- qty mỗi location
- tổng qty đã phân bổ
- validation tổng = remaining

### Actions
- `Thêm dòng location`
- `Áp dụng split`
- `Xác nhận từng move`

UI sau split phải hiển thị child moves rõ ràng.

---

## 9. Suggested Locations UI

### Mỗi suggestion card nên hiển thị
- location code
- zone
- distance / proximity (giả lập)
- bin type
- available capacity
- preferred by strategy badge

### Badges gợi ý
- Best Fit
- Near Picking
- Reserve Area
- Same Lot Zone
- FEFO Preferred

### Actions
- `Chọn location này`
- `Xem chi tiết`

---

## 10. Kịch bản inventory status đặc biệt

## 10.1. QC / Hold stock
Nếu source inventory status là Hold / QC Pending:
- UI phải gợi ý location thuộc Hold/QC zone
- không cho chọn normal pick bin nếu policy chặn

## 10.2. Damaged stock
- phải gợi ý damage/quarantine area
- banner cảnh báo đỏ đậm

## 10.3. Lot / expiry / serial-controlled
UI phải hiển thị rõ metadata đang được move:
- lot no
- expiry
- serial count

Không được để user mất context item metadata khi putaway.

---

## 11. Modal/drawer bắt buộc

Agent phải có ít nhất các modal/drawer sau:
- `HU Contents Drawer`
- `Location Detail Drawer`
- `Alternative Locations Drawer`
- `Split Putaway Modal`
- `Quantity Entry Modal`
- `Capacity Warning Modal`
- `Exception Reason Modal`
- `Supervisor Review Modal`
- `Reassign Task Modal`
- `Audit Drawer`

---

## 12. Kịch bản ngoại lệ và UI xử lý

## 12.1. Location đầy
- warning/chặn
- show alternative list
- action `Chọn location khác`

## 12.2. Sai source
- banner đỏ
- action `Scan lại`
- action `Xem HU`
- action `Report mismatch`

## 12.3. Remaining qty không về 0 nhưng user muốn complete
- mở confirm modal
- options:
  - keep task open
  - mark partial complete
  - split to follow-up task

## 12.4. Task overdue
- hiển thị SLA badge đỏ ở header và task list
- action `Đẩy ưu tiên`

## 12.5. Undo move
Chỉ cho phép undo move gần nhất khi task chưa complete.

---

## 13. Chế độ task list page `/inbound/putaway-tasks`

Ngoài workbench, list page cũng phải đủ dùng.

### Filters
- warehouse
- zone
- status
- assignee
- overdue
- source doc
- source HU
- item code

### Columns
- Task No
- Source Doc
- Source HU/Item
- Source Location
- Suggested Destination
- Qty Remaining
- Assignee
- Priority
- Status
- SLA
- Actions

### Bulk actions
- `Assign`
- `Reassign`
- `Mark Priority`
- `Open Workbench`

---

## 14. Move history / Audit UI

Trong task detail phải có timeline:
- task created
- assigned
- source scanned
- location scanned
- qty confirmed
- split created
- exception raised
- move completed
- task completed

Mỗi event hiển thị:
- time
- user
- action
- qty
- source/destination snapshot

---

## 15. Mock data gợi ý cho agent

### Putaway task sample fields
- taskNo
- receiptNo
- sourceType
- sourceHuId
- itemCode
- itemName
- lotNo
- expiryDate
- serialCount
- sourceLocation
- suggestedLocation
- currentStatus
- qtyTotal
- qtyMoved
- qtyRemaining
- inventoryStatus
- assignee
- priority
- dueAt
- allowedZones[]
- alternativeLocations[]

### Alternative location sample fields
- locationCode
- zone
- binType
- availableCapacity
- compatible
- recommendationReason

---

## 16. Acceptance criteria riêng cho Putaway UI

Agent chỉ được xem là hoàn thành module này khi:
- scan source và destination hoạt động bằng mock state thật
- validate được location capacity/profile/zone
- xử lý được move toàn phần và partial
- hỗ trợ split qty nhiều location
- hỗ trợ move by HU và mixed HU
- có alternative location flow
- có exception handling rõ ràng
- có audit/history
- có task queue chuyển task mượt
- các nút chính đều có hành vi thật, không phải placeholder

---

## 17. Câu chốt cho agent

**Build Putaway as a warehouse execution workbench: confirm source, validate destination, handle capacity/profile/zone rules, support full and partial moves, split quantities across locations, move by HU or by item, resolve exceptions, and complete tasks with clear audit and task progression — all with real front-end interactions using mock data.**

