# WMS Backend Implementation Spec (For Agent)

Version: 1.0
Language: Vietnamese
Target: Agent triển khai backend nghiệp vụ cho WMS dựa trên 122 endpoint đã scaffold xong
Current status: Controllers đã bao phủ đủ endpoint; Build Succeeded
Goal: Agent bám theo file này để triển khai logic nghiệp vụ, DTO, validation, transaction, integration, test và seed data

---

## 1. Mục tiêu của file này

Đây là tài liệu đặc tả backend ở mức implementation để agent tiếp tục công việc từ trạng thái hiện tại.

Hiện trạng đã có:
- 13 Controllers
- 122 endpoint bao phủ tài liệu
- Build thành công
- Chưa có hoặc chưa hoàn thiện logic nghiệp vụ chi tiết phía sau từng endpoint

Mục tiêu tiếp theo:
- Không viết thêm controller mới nếu không thật sự cần
- Tập trung triển khai service layer, business rules, state machine, transaction, audit, outbox, test
- Ưu tiên các flow xương sống end-to-end trước khi làm hết toàn bộ chi tiết thứ cấp

---

## 2. Phạm vi của agent

Agent phải tiếp quản các phần sau:
- DTO request/response
- Validation
- Service layer
- Business rules
- State transition
- Repository/EF logic
- Inventory movement/ledger
- Integration outbox/retry
- Seed data
- Swagger examples
- Unit test + integration test

Agent không cần làm ở giai đoạn này:
- tối ưu hiệu năng cấp production sâu
- distributed architecture phức tạp
- event bus ngoài hệ thống
- auth enterprise SSO
- realtime websocket

---

## 3. Kiến trúc backend khuyến nghị

Nếu codebase hiện tại còn đơn giản, agent nên giữ hướng monolith sạch, không refactor quá lớn.

### 3.1. Layer đề xuất
- `Controllers/` → chỉ nhận request, validate model binding cơ bản, gọi service
- `Application/Services/` → business orchestration
- `Application/DTOs/` → request/response contracts
- `Domain/Entities/` → entity + enum + state rules nếu có
- `Infrastructure/Persistence/` → EF Core DbContext, mapping, migrations
- `Infrastructure/Integrations/` → ERP adapters, retry, outbox processors
- `Tests/` → unit + integration

### 3.2. Quy tắc quan trọng
- Không nhét business logic dài trong controller
- Không để service return entity EF thẳng ra API
- Không thao tác inventory rời rạc; mọi biến động tồn phải đi qua service trung tâm
- Mọi transaction nghiệp vụ chính phải có audit và ledger liên quan

---

## 4. Controllers hiện có (giữ nguyên)

Agent phải bám vào các controller hiện có:
- `AuthController`
- `UsersDevicesController`
- `WmsMasterDataController`
- `ErpController`
- `InboundController`
- `PutawayCrossDockController`
- `OutboundController`
- `InventoryController`
- `CycleCountController`
- `QualityReturnController`
- `MobileController`
- `IntegrationController`
- `ReportsController`

Nguyên tắc:
- Không tách thêm controller nhỏ nếu chưa cần
- Chỉ thêm service, DTO, validator, mapper, helper, repository theo sau controller

---

## 5. Chuẩn API contract bắt buộc

### 5.1. Response envelope thống nhất
Tất cả API nên trả theo mẫu:

```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {},
  "errors": null,
  "traceId": "..."
}
```

### 5.2. Danh mục lỗi nghiệp vụ
Agent cần chuẩn hóa lỗi theo code, ví dụ:
- `PO_NOT_FOUND`
- `SO_NOT_FOUND`
- `RECEIPT_ALREADY_SUBMITTED`
- `DRAFT_NOT_READY`
- `INVALID_BARCODE`
- `LOCATION_NOT_ALLOWED`
- `INSUFFICIENT_STOCK`
- `TASK_ALREADY_COMPLETED`
- `COUNT_SESSION_CLOSED`
- `QUARANTINE_ALREADY_RELEASED`
- `INTEGRATION_RETRY_LIMIT_EXCEEDED`

### 5.3. Paging/filter chuẩn
Các list endpoint nên hỗ trợ thống nhất:
- `page`
- `pageSize`
- `search`
- `sortBy`
- `sortDir`
- filters đặc thù theo module

### 5.4. Swagger examples
Mỗi endpoint chính phải có:
- sample request
- sample success response
- sample business error response

---

## 6. DTO cần có

Agent phải tạo hoặc hoàn thiện DTO theo nhóm.

### 6.1. Auth
- LoginRequestDto
- LoginResponseDto
- RefreshTokenRequestDto
- UserProfileDto
- WarehouseAccessDto
- DeviceRegistrationDto

### 6.2. Master Data
- ItemDto / ItemDetailDto
- CreateItemDto / UpdateItemDto
- BarcodeDto
- UomDto
- SupplierDto
- CustomerDto
- WarehouseDto
- LocationDto
- LocationProfileDto
- InventoryStatusDto
- ReasonCodeDto
- DeviceDto

### 6.3. Inbound
- CreateMasterReceiptDto
- MasterReceiptDto
- MasterReceiptDetailDto
- DraftLineDto
- ScanEventDto
- BatchScanEventDto
- ExceptionUpdateDto
- SubstitutionDto
- ValidateDraftResultDto
- SubmitDraftResultDto
- InboundReceiptDto

### 6.4. Putaway / HU
- PutawayTaskDto
- PutawayConfirmDto
- HandlingUnitDto
- MoveHuDto
- CrossDockOrderDto

### 6.5. Outbound
- SalesOrderDto
- WaveDto
- CreateWaveDto
- ReleaseWaveDto
- PickTaskDto
- PickScanDto
- PickConfirmDto
- ShipmentDto
- PackShipmentDto
- ConfirmShipmentDto
- BackorderDto

### 6.6. Inventory
- InventoryOnHandDto
- InventoryLedgerDto
- InventoryAdjustmentDto
- CreateAdjustmentDto
- InternalTransferDto
- CreateInternalTransferDto
- InventoryMovementResultDto

### 6.7. Cycle Count
- CycleCountSessionDto
- CreateCycleCountSessionDto
- CountLineDto
- SubmitCountDto
- CountVarianceDto
- ReviewVarianceDto
- ApproveCountAdjustmentDto

### 6.8. Quality / Return
- QualityOrderDto
- RecordQualityResultDto
- QuarantineOrderDto
- ReturnOrderDto
- ReceiveReturnDto
- ReturnDecisionDto

### 6.9. Integration / Reports
- SyncJobDto
- IntegrationMessageDto
- RetryMessageDto
- ApiCallLogDto
- HealthStatusDto
- InboundSummaryDto
- OutboundSummaryDto
- InventoryAgingDto
- ProductivityReportDto

---

## 7. Validation rules bắt buộc

Agent phải thêm validation rõ ràng, ưu tiên FluentValidation hoặc equivalent.

### Ví dụ các rule bắt buộc
- barcode không được rỗng
- qty phải > 0 với scan/adjust/transfer/pack
- không submit draft khi còn line chưa hợp lệ nếu policy không cho phép
- không confirm putaway khi location đích không hợp lệ
- không release wave khi chưa có order line
- không confirm shipment nếu chưa pack đủ theo policy
- không approve count adjustment nếu session chưa review
- không release quarantine nếu trạng thái không phải Open/Hold

Validation message nên dễ đọc, thiên về business.

---

## 8. State machine bắt buộc

Đây là phần agent phải implement rõ ràng.

### 8.1. Master Receipt
States:
- Draft
- Scanning
- Ready
- Submitted
- PutawayPending
- Closed
- Cancelled

Allowed transitions:
- Draft → Scanning
- Draft/Scanning → Ready
- Ready → Submitted
- Submitted → PutawayPending
- PutawayPending → Closed
- Draft/Scanning/Ready → Cancelled

### 8.2. Putaway Task
States:
- Open
- Assigned
- InProgress
- Completed
- Exception
- Cancelled

### 8.3. Wave
States:
- Draft
- Released
- Closed
- Cancelled

### 8.4. Pick Task
States:
- Open
- Assigned
- InProgress
- Completed
- ShortPick
- Cancelled

### 8.5. Shipment
States:
- Draft
- Packed
- Confirmed
- GiPushed
- GiFailed
- Cancelled

### 8.6. Cycle Count Session
States:
- Draft
- Counting
- Submitted
- Reviewed
- Approved
- Cancelled

### 8.7. Quality Order
States:
- Open
- Inspecting
- Hold
- Accepted
- Rejected
- Released

### 8.8. Quarantine
States:
- Open
- Released
- Disposed
- Transferred

### 8.9. Integration Message
States:
- Pending
- Processing
- Success
- Failed
- RetryScheduled
- DeadLetter

Agent cần mã hóa chuyển trạng thái rõ ràng, không cho set status tùy tiện.

---

## 9. Domain flows phải implement trước

Agent phải ưu tiên 5 flow end-to-end sau.

## 9.1. Flow A — Inbound happy path
Kịch bản:
1. Lấy PO mở từ ERP
2. Tạo Master Receipt
3. Scan barcode vào draft
4. Validate draft
5. Submit draft
6. Sinh inbound receipt
7. Ghi inventory staging / receipt ledger
8. Tạo putaway tasks

### Endpoint ưu tiên
- `GET /erp/v1/purchase-orders/open`
- `POST /wms/v1/master-receipts`
- `GET /wms/v1/master-receipts/{id}`
- `POST /wms/v1/drafts/{draftId}/scan-events`
- `POST /wms/v1/drafts/{draftId}/scan-events/batch`
- `PATCH /wms/v1/draft-lines/{lineId}/exceptions`
- `POST /wms/v1/draft-lines/{lineId}/substitutions`
- `POST /wms/v1/drafts/{draftId}/validate`
- `POST /wms/v1/drafts/{draftId}/submit`
- `GET /wms/v1/inbound-receipts/{id}`
- `POST /wms/v1/putaway-tasks/generate`

### Business rules
- Item scan phải match item hoặc barcode hợp lệ
- Cho phép short/excess/damage theo reason code
- Substitution chỉ hợp lệ nếu policy hoặc mapping cho phép
- Submit phải khóa draft
- Submit phải ghi ledger và audit

## 9.2. Flow B — Putaway
1. Sinh task từ receipt
2. Assign user
3. Confirm putaway
4. Chuyển tồn từ staging sang location chính thức
5. Ghi ledger movement

### Endpoint ưu tiên
- `GET /wms/v1/putaway-tasks`
- `GET /wms/v1/putaway-tasks/{id}`
- `POST /wms/v1/putaway-tasks/{id}/confirm`
- `POST /wms/v1/handling-units/{id}/move`

## 9.3. Flow C — Outbound happy path
1. Lấy SO mở từ ERP
2. Tạo wave
3. Release wave
4. Sinh/đọc pick tasks
5. Scan pick
6. Confirm pick
7. Tạo shipment
8. Confirm shipment
9. Push goods issue

### Endpoint ưu tiên
- `GET /erp/v1/sales-orders/open`
- `POST /wms/v1/waves`
- `POST /wms/v1/waves/{id}/release`
- `GET /wms/v1/pick-tasks`
- `GET /wms/v1/pick-tasks/{id}`
- `POST /wms/v1/pick-tasks/{id}/scan-events`
- `POST /wms/v1/pick-tasks/{id}/confirm`
- `POST /wms/v1/shipments`
- `POST /wms/v1/shipments/{id}/confirm`
- `POST /integration/v1/goods-issue/push`

### Business rules
- Không pick vượt available qty
- Có thể short pick và sinh backorder
- Shipment confirm phải ghi ledger xuất kho
- GI push tạo integration message hoặc gọi adapter tùy kiến trúc

## 9.4. Flow D — Inventory
1. Xem on-hand
2. Xem ledger
3. Tạo adjustment
4. Tạo transfer
5. Ghi đầy đủ movement

### Endpoint ưu tiên
- `GET /wms/v1/inventory/on-hand`
- `GET /wms/v1/inventory/ledger`
- `POST /wms/v1/inventory/adjustments`
- `POST /wms/v1/internal-transfers`
- `POST /wms/v1/internal-transfers/{id}/confirm`

## 9.5. Flow E — Count / Quality / Retry
1. Submit count session
2. Sinh variance
3. Review variance
4. Approve adjustment
5. Record quality result
6. Release quarantine
7. Retry integration message

### Endpoint ưu tiên
- `POST /wms/v1/cycle-count-sessions/{id}/submit`
- `GET /wms/v1/cycle-count-sessions/{id}/variances`
- `POST /wms/v1/cycle-count-sessions/{id}/review`
- `POST /wms/v1/cycle-count-sessions/{id}/approve-adjustment`
- `POST /wms/v1/quality-orders/{id}/result`
- `POST /wms/v1/quarantine-orders/{id}/release`
- `POST /integration/v1/messages/{id}/retry`

---

## 10. Inventory ledger là trung tâm

Agent phải xem `InventoryLedger` là sự thật nghiệp vụ của tồn kho.

Mọi biến động tồn phải ghi ledger, gồm:
- inbound submit
- putaway confirm
- pick confirm / shipment confirm
- adjustment post
- transfer confirm
- quarantine move/release
- return receive/restock
- count approve adjustment

### Ledger fields nên có
- Id
- Timestamp
- WarehouseId
- LocationId
- ItemId
- LotNo
- SerialNo
- HuId
- MovementType
- DocumentType
- DocumentId / DocumentNo
- QtyBefore
- QtyDelta
- QtyAfter
- InventoryStatusBefore
- InventoryStatusAfter
- ReasonCode
- PerformedBy
- Notes

---

## 11. Transaction boundaries

Agent phải đảm bảo transaction rõ ràng ở các nghiệp vụ chính.

### Trong 1 transaction DB
- submit draft
- confirm putaway
- confirm shipment
- post inventory adjustment
- confirm transfer
- approve count adjustment
- record quality decision có ảnh hưởng tồn

### Sau transaction hoặc qua outbox
- push ERP
- retry integration
- background sync
- heavy report refresh

---

## 12. Integration design tối thiểu

### 12.1. ERP read APIs
Có thể mock hoặc adapter thật, nhưng agent phải tách abstraction:
- `IErpReadService`
- `IErpWriteService`

### 12.2. Outbox/Message pattern
Tối thiểu cần bảng/message entity cho:
- message type
- payload json
- status
- attempts
- nextRetryAt
- lastError
- correlationId
- sourceDocumentNo

### 12.3. Retry rules
- max attempts mặc định 5
- exponential backoff đơn giản hoặc fixed delay
- quá số lần → DeadLetter
- retry action API phải ghi audit

---

## 13. Auth và warehouse context

Tối thiểu ở mức demo/business:
- login trả user profile + role + warehouse access
- mọi nghiệp vụ có warehouse scope
- list/query mặc định filter theo warehouse hiện hành

Role tối thiểu:
- Clerk
- Supervisor
- Admin
- Integration

Không cần auth enterprise phức tạp ở giai đoạn này, nhưng cần chuẩn bị field role/permission rõ ràng.

---

## 14. Seed data bắt buộc

Agent phải tạo seed data để FE và Swagger test được.

### Seed tối thiểu
- 2 warehouses
- 4 zones/warehouse
- 20 locations
- 30 items
- 40 barcodes
- 5 suppliers
- 5 customers
- 6 PO mở
- 6 SO mở
- 5 master receipts đa trạng thái
- 8 putaway tasks
- 4 waves
- 10 pick tasks
- 4 shipments
- 30 on-hand rows
- 40 ledger rows
- 4 count sessions
- 5 quality orders
- 4 quarantine orders
- 10 integration messages

### Edge case seed
- 1 draft có line short
- 1 substitution case
- 1 overdue putaway
- 1 short pick
- 1 GI push failed
- 1 count variance lớn
- 1 quarantine pending
- 1 integration dead-letter

---

## 15. Reports yêu cầu tối thiểu

ReportsController chưa cần quá nặng về BI, nhưng agent phải trả được dữ liệu tổng hợp hợp lý từ data hiện có.

### Báo cáo tối thiểu
- inbound summary
- outbound summary
- inventory aging
- inventory by location
- putaway productivity
- pick performance
- cycle count accuracy
- quarantine status
- order fulfillment
- integration status

Có thể query trực tiếp DB bằng aggregate đơn giản.

---

## 16. Testing strategy bắt buộc

### 16.1. Unit tests
Agent phải có test cho:
- validate draft
- submit draft
- confirm putaway
- create/release wave
- short pick
- confirm shipment
- post adjustment
- approve count adjustment
- release quarantine
- retry integration message

### 16.2. Integration tests
Ít nhất phải có:
- inbound happy path
- outbound happy path
- inventory transfer flow
- count review flow
- quality to quarantine flow
- integration retry flow

### 16.3. Test principle
- test theo flow nghiệp vụ, không chỉ test endpoint status code
- verify DB side effects
- verify ledger side effects
- verify message status changes

---

## 17. Logging, audit, observability

### Audit log nên có cho các action chính
- create/edit/delete master data
- submit draft
- confirm putaway
- release wave
- confirm shipment
- approve adjustment
- release quarantine
- retry integration message

### Structured log tối thiểu
- traceId
- userId
- warehouseId
- endpoint
- documentNo
- status/result

---

## 18. Ưu tiên triển khai theo sprint

## Sprint 1
- chốt DTO + response envelope
- validation
- inbound flow đầy đủ
- seed data inbound
- swagger examples inbound
- unit/integration tests inbound

## Sprint 2
- putaway + inventory ledger chuẩn
- handling unit move
- transfer/adjustment cơ bản
- tests inventory

## Sprint 3
- outbound + wave + picking + shipment + GI push
- backorder
- tests outbound

## Sprint 4
- cycle count + review + approve
- quality + quarantine + return
- tests count/quality

## Sprint 5
- integration logs + retry + health
- reports
- cleanup swagger + test coverage + seed polish

---

## 19. Definition of Done

Agent chỉ được xem là hoàn thành khi:
- 122 endpoint build thành công
- endpoint chính có DTO rõ ràng
- service layer hiện diện cho các module chính
- 5 flow xương sống chạy thật end-to-end
- inventory ledger cập nhật đúng sau các nghiệp vụ chính
- retry integration hoạt động đúng trạng thái
- swagger usable, có examples
- seed data đủ demo
- có test unit và integration cho flow chính
- không còn business logic lớn nhét trong controller

---

## 20. Chỉ dẫn cuối cho agent

**Do not spend time adding more routes. Keep the 13 existing controllers, implement clean service-layer business logic behind them, prioritize the five core end-to-end warehouse flows, make inventory ledger and status transitions consistent, seed enough data for FE/demo, and back everything with validation, Swagger examples, and tests.**

