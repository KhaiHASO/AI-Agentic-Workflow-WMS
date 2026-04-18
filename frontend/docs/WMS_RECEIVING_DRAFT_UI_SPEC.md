# WMS Receiving Draft UI Spec (Chi tiết cho toàn bộ kịch bản nhận hàng)

Version: 1.0
Mục tiêu: Agent dùng file này để dựng thật kỹ riêng module **Receiving Draft / Receiving Workbench** nhằm bao phủ toàn bộ các kịch bản nhận hàng so với PO, ngoại lệ số lượng, lot/serial/expiry, quality control, substitution, quarantine và xử lý thao tác scan.

File này là phần bổ sung chuyên sâu cho:
- WMS_FE_UIUX_BUILD_SPEC.md
- WMS_BE_IMPLEMENTATION_SPEC.md

---

## 1. Mục tiêu của màn Receiving Draft

Đây là màn hình tác nghiệp quan trọng nhất của WMS inbound.

Nó phải cho phép người dùng:
- nhận hàng theo PO
- scan barcode nhanh
- đối chiếu ngay với PO line
- xử lý thiếu / thừa / sai item / sai barcode
- xử lý lot / serial / expiry
- tách qty tốt / hỏng / chờ QC
- chọn hàng thay thế nếu policy cho phép
- gửi hàng sang QC / quarantine khi cần
- validate trước khi submit
- submit thành inbound receipt + staging inventory + putaway pending

Yêu cầu UI:
- không phải CRUD form thông thường
- phải là **workbench screen** chuyên dụng
- tối ưu thao tác nhiều scan liên tục
- hiển thị ngay “đã nhận được gì, còn thiếu gì, lỗi gì”

---

## 2. Những kịch bản nhận hàng phải được UI bao phủ

Agent phải đảm bảo UI xử lý được đầy đủ các case sau.

### Nhóm A — Match chuẩn theo PO
1. Scan barcode khớp đúng item trong PO
2. Nhận đúng đủ số lượng theo line
3. Nhận một phần line rồi tiếp tục nhận sau
4. Cùng một line nhận nhiều lần
5. Một PO có nhiều line cùng item nhưng khác UOM / lot / yêu cầu QC

### Nhóm B — Sai lệch số lượng
6. Nhận thiếu so với PO
7. Nhận dư trong ngưỡng cho phép
8. Nhận dư vượt ngưỡng → cần cảnh báo / cần approval / cần reason
9. Submit khi còn line chưa nhận đủ
10. Đóng line chưa nhận đủ và đánh reason

### Nhóm C — Sai item / ngoài PO
11. Scan item không tồn tại trong PO
12. Scan barcode chưa được map
13. Scan barcode map được item nhưng item không thuộc PO
14. Chọn thủ công line PO để gán scan vừa quét
15. Chuyển item ngoài PO sang “Unexpected Receipt” nếu policy cho phép

### Nhóm D — Substitute / Replacement
16. Item gốc thiếu nhưng cho phép item thay thế
17. Chọn substitute item từ danh sách mapping
18. Ghi rõ line gốc và line thay thế
19. Cảnh báo nếu substitute không nằm trong policy

### Nhóm E — Chất lượng / hư hỏng
20. Một phần qty đạt, một phần hư hỏng
21. Toàn bộ lô phải QC trước khi nhập usable stock
22. QC sampling: chỉ một phần đi QC
23. Damaged qty chuyển sang quarantine/hold
24. Rejected qty không vào available stock
25. Ghi lý do hư hỏng / reason code / ảnh đính kèm giả lập UI

### Nhóm F — Lot / Expiry / Serial
26. Item bắt buộc nhập lot number
27. Item bắt buộc expiry date
28. Item bắt buộc serial number từng đơn vị
29. Trùng serial phải báo lỗi ngay
30. Expiry ngắn hơn ngưỡng tối thiểu phải cảnh báo
31. Một scan có thể mở form nhập lot/expiry/serial trước khi cộng qty

### Nhóm G — Handling Unit / pallet / mixed receipt
32. Nhận theo pallet/HU
33. Một HU chứa nhiều item
34. Scan HU trước rồi scan line bên trong
35. Tách HU hoặc tạo HU mới khi nhận

### Nhóm H — Vận hành thực tế
36. Nhập tay khi barcode bị mờ
37. Paste batch barcode / upload batch giả lập
38. Undo scan gần nhất
39. Chỉnh qty bằng tay nếu scan sai
40. Chuyển line sang trạng thái chờ supervisor review
41. Lưu draft giữa chừng
42. Hủy draft
43. Reopen draft nếu chưa submit
44. Audit trail mọi thay đổi

---

## 3. Layout tổng thể của Receiving Workbench

Màn hình phải chia 4 khu vực rõ ràng.

## 3.1. Header cố định
Hiển thị:
- Receipt No
- PO Number
- Supplier
- Warehouse
- Dock / staging location
- Status chip
- Người thao tác
- Thời gian bắt đầu
- Progress tổng

### Header actions
- `Lưu draft`
- `Validate`
- `Submit`
- `Hủy draft`
- `Mở Audit`

---

## 3.2. Cột trái — Summary & PO Context
Khối này luôn nhìn thấy.

### Thông tin cần có
- Supplier card
- Receipt summary card
- PO summary card
- Progress bars:
  - Lines completed / total
  - Expected qty vs received qty
  - QC pending qty
  - Damaged qty
  - Unexpected qty

### Quick filters
- Tất cả line
- Chưa nhận
- Đang nhận
- Đã xong
- Có ngoại lệ
- Chờ QC
- Dư / thiếu

### Danh sách line mini
Mỗi line hiển thị:
- line no
- item code
- item name ngắn
- expected qty
- received qty
- badge trạng thái

Click line ở đây sẽ focus line đó ở giữa.

---

## 3.3. Khu giữa — Scan & Line Processing Workbench
Đây là vùng chính.

### Phần trên cùng
- ô scan barcode lớn, luôn auto-focus
- nút `Scan`
- nút `Nhập tay`
- nút `Batch Scan`
- toggle `Auto select line`
- toggle `Auto open lot/serial form`

### Ngay dưới ô scan
Hiển thị “Scan result banner” lớn:
- Success xanh: item khớp line 003, +12 qty
- Warning vàng: qty vượt PO line
- Error đỏ: barcode không hợp lệ / item ngoài PO
- Info tím: item yêu cầu QC / serial entry

### Bảng line chính
Cột nên có:
- Line No
- Item Code
- Item Name
- Barcode matched
- Expected Qty
- Received Qty
- Accepted Qty
- QC Qty
- Damaged Qty
- Rejected Qty
- UOM
- Lot/Serial/Expiry Required
- Variance
- Status
- Action

### Status line đề xuất
- Not Started
- Partial
- Ready
- Exception
- QC Pending
- Completed
- Closed Short
- Unexpected

### Hành động từng line
- `Scan vào line`
- `Nhập tay qty`
- `Lot/Serial`
- `Đánh dấu thiếu`
- `Đánh dấu hỏng`
- `Substitute`
- `Send QC`
- `Close line`
- `Undo last`

---

## 3.4. Cột phải — Resolution / Exception / Quality Panel
Cột phải phải đổi nội dung theo context dòng đang chọn.

### Chế độ 1: Line Detail
Hiển thị:
- item image placeholder
- line rules
- allowed over-receipt %
- substitution policy
- QC policy
- lot / serial / expiry policy
- pending action checklist

### Chế độ 2: Exception Panel
Hiển thị khi có mismatch:
- reason code dropdown
- notes textarea
- qty affected
- approver required? chip
- buttons hành động

### Chế độ 3: QC Panel
Hiển thị khi line yêu cầu QC:
- total qty line
- qty đưa QC
- qty accepted
- qty rejected
- hold/quarantine qty
- sample rule info

---

## 3.5. Footer sticky action bar
Luôn nằm dưới cùng.

### Nội dung
- tổng expected
- tổng received
- total exceptions
- total QC pending
- validation state

### Nút
- `Lưu draft`
- `Validate tất cả`
- `Submit Receipt`
- `In nhãn HU` (nếu bật)

---

## 4. Tab / chế độ hiển thị trong màn Receiving

Agent nên hỗ trợ ít nhất 6 tab hoặc view mode:
- `All Lines`
- `Unreceived`
- `In Progress`
- `Exceptions`
- `QC / Hold`
- `Completed`
- `Audit`

Audit view hiển thị timeline hành động scan và chỉnh sửa.

---

## 5. Chi tiết behavior khi scan

## 5.1. Scan barcode đúng item và đúng line
UI phải:
- hiện banner success
- tăng received qty
- thêm record vào recent scans
- highlight line vừa cập nhật
- nếu line đủ qty và không còn pending field → status `Ready` hoặc `Completed`

## 5.2. Scan barcode đúng item nhưng nhiều line cùng item
UI phải mở modal:
- `Chọn line PO cần nhận`
- show danh sách line còn mở
- auto suggest line có shortage lớn nhất

## 5.3. Scan barcode không map
UI phải hiện modal:
- `Barcode chưa được nhận diện`
- lựa chọn:
  - nhập tay item code
  - tìm item thủ công
  - đánh dấu unexpected
  - hủy scan

## 5.4. Scan item ngoài PO
UI phải hiện warning drawer:
- item không thuộc PO
- action:
  - chuyển Unexpected Receipt
  - map vào line thay thế (nếu policy)
  - bỏ qua

## 5.5. Scan làm vượt expected qty
Phải tách 2 cấp:
- trong ngưỡng over-receipt cho phép → warning vàng + cho tiếp tục
- vượt ngưỡng → chặn hoặc yêu cầu supervisor reason/approval

---

## 6. Cơ chế nhập số lượng

Agent phải hỗ trợ 3 cách nhập qty:
1. mỗi scan = +1 hoặc +pack size theo barcode config
2. scan xong nhập qty tay
3. batch scan / paste list

### UI cần có
- nút `+ / -`
- ô qty editable
- nút `Áp dụng`
- nút `Reset line`

### Undo
- phải có `Undo last scan`
- phải có history ngắn 5 sự kiện gần nhất

---

## 7. Kịch bản thiếu / dư so với PO

## 7.1. Nhận thiếu
UI cho phép:
- giữ line Partial
- close short với reason
- chờ đợt giao tiếp theo

### Modal `Close Short`
Trường:
- short qty
- reason code
- note
- flag `expect next delivery`

## 7.2. Nhận dư
### Nếu trong tolerance
- warning badge `Over by +x`
- cho submit nếu có reason

### Nếu vượt tolerance
- status `Exception`
- bắt buộc reason
- có thể yêu cầu supervisor approval mock UI

---

## 8. Kịch bản damaged / rejected / QC

## 8.1. Tách chất lượng trên cùng 1 line
UI phải cho tách qty thành:
- Accepted Qty
- QC Qty
- Damaged Qty
- Rejected Qty

### Modal `Record Quality Split`
Fields:
- total received qty
- accepted qty
- damaged qty
- qc qty
- rejected qty
- reason code
- note

Ràng buộc:
`accepted + damaged + qc + rejected = received processed qty`

## 8.2. Send to QC
Nếu item yêu cầu QC:
- line status phải chuyển `QC Pending`
- accepted stock chưa vào available
- hiển thị chip `Hold before release`

### QC mini-flow ngay trong UI
Buttons:
- `Accept after QC`
- `Reject after QC`
- `Move to Quarantine`

## 8.3. Quarantine
Damaged hoặc QC fail phải có hành động:
- `Send to Quarantine`
- chọn reason code
- chọn quarantine location / zone giả lập

---

## 9. Kịch bản lot / serial / expiry

## 9.1. Lot required
Sau scan, UI phải mở drawer `Lot Details`:
- lot no
- mfg date
- expiry date
- qty thuộc lot này

Một line có thể có nhiều lot.

## 9.2. Serial required
Phải hỗ trợ serial grid:
- mỗi serial một dòng
- nhập nhanh / paste nhiều serial
- validate trùng serial ngay lập tức

### Buttons
- `Thêm serial`
- `Paste danh sách`
- `Validate serial`
- `Xóa serial trùng`

## 9.3. Expiry control
Nếu expiry dưới ngưỡng chính sách:
- warning vàng nếu còn chấp nhận
- error đỏ nếu không chấp nhận
- hiển thị rule: “Minimum remaining shelf life: xx days”

---

## 10. Kịch bản substitute item

### Khi nào xuất hiện
- line gốc thiếu hàng từ supplier
- item scan vào thuộc danh sách substitute mapping

### UI cần có modal `Substitute Item`
Hiển thị:
- original item
- scanned item
- substitute ratio / UOM conversion
- qty quy đổi
- policy allowed/blocked
- note

### Actions
- `Chấp nhận thay thế`
- `Từ chối`
- `Gửi supervisor review`

Sau khi chấp nhận:
- line gốc phải hiển thị linked substitute
- audit phải ghi rõ mapping thay thế

---

## 11. Unexpected receipt / non-PO receipt

Nếu policy cho phép nhận ngoài PO, UI phải có vùng riêng.

### Tab / bucket riêng
- `Unexpected Items`

### Fields mỗi item unexpected
- barcode
- item code nếu nhận diện được
- qty
- reason
- action pending

### Actions
- `Map vào line`
- `Tạo line unexpected`
- `Reject`
- `Move to hold`

---

## 12. Handling Unit / pallet support

### UI mode
Agent nên có toggle:
- `Receive by item`
- `Receive by HU / pallet`

### Receive by HU
Flow:
1. scan HU
2. hiện contents nếu HU đã biết
3. xác nhận qty từng item hoặc entire HU
4. tạo/assign staging HU

### Actions
- `Create HU`
- `Assign to HU`
- `Split HU`
- `Print HU Label`

---

## 13. Validation panel trước khi Submit

Khi bấm `Validate`, UI phải hiện panel tổng hợp rõ ràng.

### Validation sections
- Lines completed
- Lines still partial
- Over receipt lines
- Unexpected items
- QC pending qty
- Missing lot/serial/expiry
- Duplicate serial errors
- Unresolved exceptions

### Validation result states
- `Ready to Submit`
- `Submit with Warnings`
- `Blocked`

### Ví dụ rule block
- còn serial trùng
- line bắt buộc lot nhưng chưa nhập
- có exception chưa reason
- có QC mandatory chưa xử lý hold route

---

## 14. Submit behavior

Khi bấm `Submit Receipt`, UI phải mở confirm modal lớn.

### Confirm modal phải hiển thị
- total expected
- total received
- accepted qty
- qc qty
- damaged qty
- rejected qty
- unexpected qty
- số line partial / short
- cảnh báo còn lại nếu có

### Submit outcomes
- Success → navigate Receipt Detail
- Success with warnings → hiển thị warnings preserved
- Failed → giữ nguyên draft và highlight issue

---

## 15. Audit / Timeline trong Receiving

UI phải có audit timeline ít nhất các event sau:
- draft created
- line selected
- barcode scanned
- qty edited manually
- short reason added
- damaged recorded
- substitute accepted
- qc sent
- lot/serial added
- validation passed/failed
- draft submitted

---

## 16. Danh sách modal/drawer bắt buộc

Agent phải dựng ít nhất các modal/drawer sau:
- `Select POLine Modal`
- `Unknown Barcode Modal`
- `Unexpected Item Modal`
- `Manual Quantity Modal`
- `Close Short Modal`
- `Quality Split Modal`
- `Lot/Expiry Drawer`
- `Serial Entry Drawer`
- `Substitute Item Modal`
- `Over Receipt Approval Modal`
- `Assign HU Modal`
- `Validation Summary Drawer`
- `Submit Confirmation Modal`
- `Audit Drawer`

---

## 17. Data model gợi ý cho mock UI

### Receipt header
- receiptNo
- poNumber
- supplier
- warehouse
- dock
- status
- startedAt
- operator
- expectedTotalQty
- receivedTotalQty

### Receipt line
- lineNo
- itemCode
- itemName
- barcode
- expectedQty
- receivedQty
- acceptedQty
- qcQty
- damagedQty
- rejectedQty
- unexpectedQty
- uom
- overTolerancePct
- requiresLot
- requiresSerial
- requiresExpiry
- qcPolicy (None / Full / Sample)
- allowsSubstitution
- substitutionCandidates[]
- status
- variance
- notes

### Scan event
- timestamp
- barcode
- itemCode
- qty
- matchedLineNo
- resultType
- message

---

## 18. Màu sắc / badge đề xuất cho UX rõ ràng

- Received OK: xanh lá
- Partial: xanh dương
- Warning over/short: vàng
- Exception blocked: đỏ
- QC pending: tím
- Unexpected: cam
- Damaged: đỏ đậm
- Rejected: xám đậm

Line đang active nên có highlight border rõ.

---

## 19. Acceptance criteria riêng cho Receiving UI

Agent chỉ được xem là hoàn thành module này khi:
- scan đúng item cập nhật line real-time
- scan sai barcode có flow xử lý riêng
- xử lý được short / over / unexpected / substitute
- xử lý được lot / serial / expiry
- xử lý được QC / damaged / quarantine
- có validation summary trước submit
- có audit timeline
- có undo scan
- có save draft
- có submit với trạng thái rõ ràng
- toàn bộ hành động chạy bằng mock state thật, không phải nút giả

---

## 20. Câu chốt cho agent

**Build the Receiving Draft screen as a high-fidelity warehouse workbench, not as a CRUD form. It must cover all real receiving scenarios against PO lines: exact match, partial receipt, over receipt, unexpected item, substitution, quality split, quarantine, lot/serial/expiry capture, handling unit processing, validation, audit, and final submit — all with real front-end interactions using mock data.**

