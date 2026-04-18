# WMS Additional Deep UI Areas (Ngoài Receiving Draft)

Version: 1.0
Mục tiêu: Liệt kê và mô tả các khu vực còn lại của WMS cần UI chuyên sâu để agent không dựng hời hợt kiểu CRUD table.

File này là phần bổ sung sau:
- WMS_FE_UIUX_BUILD_SPEC.md
- WMS_BE_IMPLEMENTATION_SPEC.md
- WMS_RECEIVING_DRAFT_UI_SPEC.md

---

## 1. Kết luận nhanh

Ngoài **Receiving Draft**, còn 8 khu vực bắt buộc phải làm UI chuyên sâu:

1. Putaway Workbench
2. Picking Workbench
3. Cycle Count Workbench
4. Shipment Packing & Confirmation
5. Inventory Control Console
6. Quality / Quarantine Console
7. Wave Planning Console
8. Integration Operations Console

Nếu các khu vực này chỉ làm kiểu table + modal CRUD, hệ thống sẽ nhìn như ERP admin chứ không phải WMS tác nghiệp thật.

---

## 2. Putaway Workbench

### Vì sao cần UI chuyên sâu
Putaway không phải chỉ là “đổi trạng thái task”.
Nó là flow thao tác thực địa:
- lấy hàng từ staging/HU
- xác nhận item đúng
- chọn location đích
- check capacity / profile / zone
- xử lý lệch location, mixed pallet, partial putaway, exception

### Những case phải bao phủ
- scan HU rồi putaway toàn bộ
- scan item lẻ
- partial putaway
- split sang nhiều location
- location đích không phù hợp profile
- location đầy
- chuyển sang suggested alternate location
- mixed HU
- damaged / hold hàng đang ở staging

### UI nên có
- task progress header
- source info card
- destination suggestion panel
- scan source / scan destination / qty confirm
- alternative locations panel
- exception drawer
- recent move history

### Nút bấm bắt buộc
- `Scan HU`
- `Scan Item`
- `Scan vị trí đích`
- `Xác nhận putaway`
- `Chia qty`
- `Đổi vị trí`
- `Báo ngoại lệ`
- `Hoàn tất task`

### Modal/drawer cần có
- location capacity warning
- alternate location selector
- split qty modal
- exception reason modal
- HU content drawer

---

## 3. Picking Workbench

### Vì sao cần UI chuyên sâu
Picking là module sống còn của outbound. Đây là nơi dễ phát sinh nhầm hàng, nhầm vị trí, thiếu hàng, short pick, thay thế source bin, multi-order pick.

### Những case phải bao phủ
- pick đúng line đúng location
- pick theo item hoặc theo HU
- short pick
- pick một phần
- bin/location không còn hàng
- phải đổi source location
- scan sai item
- scan đúng item nhưng sai lot/serial
- multi-order wave pick
- confirm xong mới cập nhật shipment progress

### UI nên có
- current task header
- source location card
- line details
- barcode scan input
- qty confirm area
- shortage / alternate source panel
- next task suggestion
- route progress trong wave

### Nút bấm bắt buộc
- `Scan vị trí`
- `Scan item`
- `Xác nhận qty`
- `Short Pick`
- `Đổi source`
- `Bỏ qua task`
- `Task tiếp theo`

### Modal/drawer cần có
- short pick modal
- alternate source drawer
- serial/lot confirmation drawer
- backorder preview modal

---

## 4. Cycle Count Workbench

### Vì sao cần UI chuyên sâu
Count không chỉ là nhập số lượng. Nó là quy trình đối chiếu thực tế với tồn hệ thống, có blind count, recount, variance review, approval.

### Những case phải bao phủ
- count theo location
- count theo item
- blind count
- recount
- variance lớn cần review
- lot/serial count
- count HU nguyên pallet
- khóa session sau submit
- compare expected vs counted chỉ hiện với role phù hợp

### UI nên có
- session header
- location stepper
- expected/counted line list
- discrepancy badges
- recount flag panel
- variance summary
- review / approve split screen

### Nút bấm bắt buộc
- `Scan vị trí`
- `Scan item`
- `Nhập số đếm`
- `Lưu tạm`
- `Submit Session`
- `Yêu cầu đếm lại`
- `Duyệt chênh lệch`

### Modal/drawer cần có
- blind count mode notice
- recount modal
- approve adjustment modal
- variance detail drawer

---

## 5. Shipment Packing & Confirmation

### Vì sao cần UI chuyên sâu
Nhiều hệ thống chỉ làm shipment bằng 1 form confirm. Nhưng thực tế cần:
- pack lines vào carton/HU
- split shipment package
- check packed qty
- in label
- confirm shipment
- push GI
- retry integration

### Những case phải bao phủ
- pack theo line
- pack theo carton/HU
- thiếu qty chưa pack đủ
- split nhiều package
- package weight/volume giả lập
- confirm shipment khi chưa đủ rule
- push GI fail/retry

### UI nên có
- shipment summary
- packing workspace
- package list
- line-to-package assignment panel
- integration status panel
- label preview placeholder

### Nút bấm bắt buộc
- `Tạo package`
- `Thêm vào package`
- `Xóa khỏi package`
- `In nhãn`
- `Xác nhận shipment`
- `Push GI`
- `Retry Push`

### Modal/drawer cần có
- create package modal
- split package modal
- shipment confirm modal
- GI failure drawer

---

## 6. Inventory Control Console

### Vì sao cần UI chuyên sâu
Inventory không nên chỉ là 1 table tra cứu. Đây là console điều khiển tồn kho.

### Những case phải bao phủ
- xem tồn theo item / location / status / lot / serial / HU
- drill-down ledger
- adjustment tăng/giảm
- internal transfer
- hold/quarantine
- move HU
- trace nguồn gốc document

### UI nên có
- summary cards
- on-hand table mạnh filter
- detail drawer sâu
- ledger tab
- related documents tab
- quick actions sticky

### Nút bấm bắt buộc
- `Xem ledger`
- `Điều chỉnh tồn`
- `Điều chuyển`
- `Quarantine`
- `Move HU`
- `In nhãn`

### Modal/drawer cần có
- adjustment modal
- transfer modal
- quarantine modal
- HU move drawer
- source-doc viewer

---

## 7. Quality / Quarantine Console

### Vì sao cần UI chuyên sâu
QC và quarantine không phải danh sách đọc cho vui. Cần nhìn rõ hold reason, sample result, release decision, reject/dispose.

### Những case phải bao phủ
- QC full inspection
- QC sample inspection
- accept toàn bộ
- reject một phần
- chuyển quarantine
- release quarantine
- dispose hàng lỗi
- transfer sang khu khác

### UI nên có
- quality order list
- inspection detail panel
- decision split panel
- quarantine queue
- release/dispose action drawer
- history timeline

### Nút bấm bắt buộc
- `Record Result`
- `Accept`
- `Reject`
- `Hold`
- `Move to Quarantine`
- `Release`
- `Dispose`
- `Transfer`

### Modal/drawer cần có
- quality result modal
- quarantine release modal
- partial reject split modal
- dispose confirmation modal

---

## 8. Wave Planning Console

### Vì sao cần UI chuyên sâu
Wave không chỉ là create record. Supervisor cần thấy order pool, available stock, priority, shipping cut-off, shortage risk.

### Những case phải bao phủ
- chọn SO vào wave
- group theo warehouse/zone/carrier/cutoff
- detect shortage risk
- preview pick workload
- release wave
- reassign / cancel

### UI nên có
- order pool table
- selected orders panel
- shortage preview
- workload cards
- release summary

### Nút bấm bắt buộc
- `Thêm vào wave`
- `Bỏ khỏi wave`
- `Tạo wave`
- `Preview Tasks`
- `Release`
- `Cancel Wave`

### Modal/drawer cần có
- create wave modal
- shortage preview drawer
- release confirmation modal

---

## 9. Integration Operations Console

### Vì sao cần UI chuyên sâu
Nếu integration chỉ có 1 table log thì không đủ dùng. Ops cần nhìn queue, failed messages, retry state, payload, correlation.

### Những case phải bao phủ
- sync ERP master data
- push GRN/GI fail
- retry manual
- dead-letter review
- search by correlation id
- open payload/request/response

### UI nên có
- health cards
- message queue table
- failed panel
- payload drawer
- retry history
- API log timeline

### Nút bấm bắt buộc
- `Sync Items`
- `Sync PO`
- `Sync SO`
- `Open Payload`
- `Retry`
- `Mark Resolved`
- `Xem API Logs`

### Modal/drawer cần có
- retry confirm modal
- payload JSON drawer
- correlation trace drawer

---

## 10. Mức ưu tiên các UI chuyên sâu

### Priority 1 — bắt buộc làm sâu ngay
- Receiving Draft
- Putaway Workbench
- Picking Workbench
- Cycle Count Workbench

### Priority 2 — nên làm sâu sau đó
- Shipment Packing & Confirmation
- Inventory Control Console
- Quality / Quarantine Console

### Priority 3 — vẫn cần sâu nhưng sau cùng
- Wave Planning Console
- Integration Operations Console

---

## 11. Khu vực không cần quá chuyên sâu

Các page dưới đây không cần đầu tư workbench-level UI, chỉ cần clean admin UI:
- Auth / login demo
- user/device CRUD
- suppliers/customers CRUD
- warehouses/locations CRUD cơ bản
- barcodes/UOM master data
- reports dạng dashboard/table/chart

Nhưng vẫn phải làm chỉn chu, không để trống.

---

## 12. Gói tài liệu UI chuyên sâu nên có cho agent

Để agent dựng UI rất chắc tay, bộ tài liệu lý tưởng là:
- FE spec tổng
- BE spec tổng
- Receiving Draft UI spec
- Putaway Workbench UI spec
- Picking Workbench UI spec
- Cycle Count UI spec
- Shipment Packing UI spec
- Inventory Control UI spec
- Quality/Quarantine UI spec
- Wave Planning UI spec
- Integration Ops UI spec

---

## 13. Câu chốt cho agent

**Beyond Receiving Draft, treat Putaway, Picking, Cycle Count, Shipment Packing, Inventory Control, Quality/Quarantine, Wave Planning, and Integration Operations as specialized warehouse workspaces or operational consoles — not as plain CRUD pages.**

