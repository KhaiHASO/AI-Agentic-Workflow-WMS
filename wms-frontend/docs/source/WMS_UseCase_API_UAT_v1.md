**USE CASE CHI TIẾT + API SPEC + UAT/TEST CASE MATRIX**

Hệ thống WMS tích hợp ERP FAST\
(EPE Smart Warehouse Management System)

Phiên bản: 1.0 \| Ngày phát hành: 12/04/2026

*Tài liệu phục vụ BA • Dev • QA • UAT • Triển khai*

  -----------------------------------------------------------------------
  Tài liệu này được xây dựng như phần tiếp nối của BRD/SRS tổng hợp.
  Trọng tâm là đặc tả use case đủ sâu để giao việc cho Dev/QA, quy chuẩn
  API tích hợp và ma trận kiểm thử/UAT để chuẩn bị triển khai thực tế.
  -----------------------------------------------------------------------

  -----------------------------------------------------------------------

# 1. Thông tin tài liệu

  -----------------------------------------------------------------------
  **Tên tài liệu**                    Use Case chi tiết + API Spec +
                                      UAT/Test Case Matrix -- WMS tích
                                      hợp ERP FAST
  ----------------------------------- -----------------------------------
  **Phạm vi**                         Core MVP + các luồng nâng cao đã
                                      được nêu trong tài liệu nhận hàng
                                      động và roadmap Phase 2

  **Đối tượng sử dụng**               Business Analyst, Solution
                                      Architect, Backend/Frontend Dev,
                                      QA, PM, Kho, Kế toán, Đối tác ERP
                                      FAST

  **Nguyên tắc tích hợp**             ERP FAST là nguồn chuẩn của chứng
                                      từ tài chính; WMS là hệ tác nghiệp
                                      kho, đọc dữ liệu qua sync/read-only
                                      và đẩy kết quả chuẩn hóa qua API/SP

  **Tài liệu nguồn**                  Dynamic Inbound & ERP Integration;
                                      Phân tích dự án WMS EPE; EPE
                                      Strategic Upgrade; DacTaV2
  -----------------------------------------------------------------------

# 2. Danh sách actor

  -----------------------------------------------------------------------
  **Mã**                  **Actor**               **Vai trò**
  ----------------------- ----------------------- -----------------------
  ACT-01                  Thủ kho                 Tạo master receipt,
                                                  scan inbound, xử lý
                                                  exception, submit
                                                  draft, putaway,
                                                  shipment confirm

  ACT-02                  Công nhân kho / Picker  Quét nhận hàng, quét
                                                  pick, xác nhận vị trí,
                                                  xác nhận handling unit

  ACT-03                  Quản lý kho /           Duyệt over-receipt,
                          Supervisor              substitute item, review
                                                  cycle count, override
                                                  location/lot

  ACT-04                  QC                      Đánh giá chất lượng, QA
                                                  hold, reject, return to
                                                  vendor

  ACT-05                  Kế toán                 Theo dõi chứng từ đối
                                                  soát, trạng thái push
                                                  ERP, chênh lệch
                                                  GRN/goods issue

  ACT-06                  Quản trị hệ thống       Quản trị
                                                  user/role/device,
                                                  mapping master, giám
                                                  sát integration audit,
                                                  retry message

  ACT-07                  ERP FAST                Cung cấp master/PO/SO
                                                  và nhận GRN/goods
                                                  issue/adjustment đã
                                                  chuẩn hóa

  ACT-08                  System Scheduler        Kích hoạt đồng bộ định
                                                  kỳ và job background
  -----------------------------------------------------------------------

# 3. Ma trận use case tổng quan

  -----------------------------------------------------------------------
  **UC ID**         **Tên use case**  **Phân hệ**       **Actor chính**
  ----------------- ----------------- ----------------- -----------------
  UC-01             Đồng bộ Master    Tích hợp ERP /    System Scheduler,
                    Data từ ERP FAST  Master Data       ERP FAST

  UC-02             Đồng bộ PO mở và  Inbound           System Scheduler,
                    tạo nguồn nhận    Integration       ERP FAST
                    hàng chờ xử lý                      

  UC-03             Tạo Master        Inbound Receiving Thủ kho
                    Receipt theo nhà                    
                    cung cấp hoặc                       
                    chuyến xe                           

  UC-04             Quét hàng vào     Inbound Receiving Thủ kho, Công
                    Draft và tự đối                     nhân kho
                    chiếu                               

  UC-05             Xử lý ngoại lệ số Inbound           Thủ kho
                    lượng: thiếu, dư, Exceptions        
                    hàng ngoài PO                       

  UC-06             Xử lý hàng lỗi,   Quality Control   Thủ kho, QC
                    QA Hold và Return                   
                    to Vendor                           

  UC-07             Quy đổi đơn vị    Inbound           Thủ kho,
                    tính và xử lý mã  Exceptions        Supervisor
                    thay thế                            

  UC-08             Rã pallet lộn xộn Inbound Advanced  Thủ kho
                    và nhận blind                       
                    receiving                           

  UC-09             Submit Draft, tạo Inbound           Thủ kho
                    GRN và backorder  Integration       

  UC-10             Putaway và/hoặc   Inbound /         Thủ kho, Nhân
                    cross-docking sau Internal Movement viên xe nâng
                    khi nhận                            

  UC-11             Đồng bộ SO, cấp   Outbound Planning System Scheduler,
                    phát tồn và tạo                     Quản lý kho
                    pick task                           

  UC-12             Quét lấy hàng,    Outbound          Nhân viên lấy
                    xác nhận pick và  Execution         hàng, Thủ kho
                    đóng gói giao                       

  UC-13             Kiểm kê cycle     Inventory Control Thủ kho, Nhân
                    count, review                       viên kiểm kê
                    chênh lệch và                       
                    điều chỉnh tồn                      

  UC-14             Theo dõi          Reporting &       Quản lý kho, Ban
                    dashboard tồn kho Dashboard         giám đốc, Kế toán
                    và cảnh báo vận                     
                    hành                                

  UC-15             Quản trị lỗi tích Integration &     Quản trị hệ thống
                    hợp, retry và     Administration    
                    audit                               
  -----------------------------------------------------------------------

# 4. Use case chi tiết

## UC-01. Đồng bộ Master Data từ ERP FAST

  -----------------------------------------------------------------------
  **Phân hệ**                         Tích hợp ERP / Master Data
  ----------------------------------- -----------------------------------
  **Actor chính**                     System Scheduler, ERP FAST

  **Actor phụ**                       Quản trị hệ thống, Quản lý kho

  **Mục tiêu**                        WMS lấy danh mục chuẩn từ ERP FAST
                                      để đảm bảo item, supplier,
                                      customer, UoM và mã tham chiếu luôn
                                      đồng nhất trước khi tác nghiệp.

  **Kích hoạt**                       Đến lịch sync tự động 5--10
                                      phút/lần hoặc người dùng bấm "Đồng
                                      bộ dữ liệu nền".

  **API liên quan**                   GET /erp/v1/items; GET
                                      /erp/v1/suppliers; GET /erp/v1/uoms

  **Entity chính**                    ErpSyncRun; ErpItemSnapshot;
                                      ErpSupplierSnapshot; Item;
                                      ItemBarcode; Uom
  -----------------------------------------------------------------------

### Tiền điều kiện

-   Kênh kết nối ERP ↔ WMS đã được cấu hình và xác thực.

-   ERP FAST có API hoặc read-only view để xuất dữ liệu master.

-   WMS đã có bảng mapping mã tham chiếu và lịch đồng bộ.

### Luồng chính

1.  WMS khởi tạo sync run, ghi nhận request-id và thời điểm bắt đầu.

2.  WMS gọi nguồn dữ liệu ERP để lấy item, supplier, customer, UoM và
    các thay đổi mới kể từ lần sync trước.

3.  WMS kiểm tra chữ ký phiên bản hoặc thời điểm cập nhật cuối của từng
    bản ghi.

4.  Nếu bản ghi mới thì tạo mới trong vùng staging; nếu bản ghi đã tồn
    tại thì cập nhật snapshot và lịch sử thay đổi.

5.  WMS chuẩn hóa dữ liệu theo rule nội bộ như bỏ khoảng trắng thừa,
    chuẩn hóa mã viết hoa và map đơn vị tính.

6.  WMS ghi kết quả sync thành công, cập nhật watermark cho lần đồng bộ
    tiếp theo.

7.  Hệ thống gửi log kết quả và cảnh báo nếu có bản ghi lỗi, trùng hoặc
    thiếu mapping.

### Luồng thay thế / ngoại lệ

-   Nếu ERP không phản hồi, WMS đánh dấu sync failed, tăng bộ đếm retry
    > và không ghi đè dữ liệu cũ.

-   Nếu phát hiện master bị thiếu khóa chính hoặc mã trùng, bản ghi được
    > đưa vào danh sách exception để quản trị xử lý.

-   Nếu cùng một request được gửi lại, cơ chế idempotent không tạo bản
    > ghi trùng.

### Hậu điều kiện

-   Dữ liệu master sẵn sàng cho inbound, outbound, inventory và
    > dashboard.

-   Lịch sử đồng bộ và lỗi được lưu để kiểm toán.

### Quy tắc nghiệp vụ

-   ERP FAST là system of record cho dữ liệu tài chính và chứng từ gốc.

-   WMS chỉ tác nghiệp trên snapshot cục bộ, không can thiệp trực tiếp
    > vào database lõi của ERP.

-   Một item có thể có nhiều barcode; cần hỗ trợ barcode vendor, barcode
    > nội bộ, carton và pallet.

## UC-02. Đồng bộ PO mở và tạo nguồn nhận hàng chờ xử lý

  -----------------------------------------------------------------------
  **Phân hệ**                         Inbound Integration
  ----------------------------------- -----------------------------------
  **Actor chính**                     System Scheduler, ERP FAST

  **Actor phụ**                       Thủ kho, Quản lý kho

  **Mục tiêu**                        Kéo danh sách PO đã duyệt và còn mở
                                      từ ERP FAST về WMS để kho có dữ
                                      liệu chuẩn bị nhận hàng trước khi
                                      xe đến.

  **Kích hoạt**                       Đến lịch sync hoặc người dùng bấm
                                      "Đồng bộ PO mở".

  **API liên quan**                   GET /erp/v1/purchase-orders/open

  **Entity chính**                    ErpPurchaseOrderHeader;
                                      ErpPurchaseOrderLine;
                                      ErpDocumentStatusHistory
  -----------------------------------------------------------------------

### Tiền điều kiện

-   PO đã được duyệt cuối cùng trên ERP FAST.

-   Item và supplier liên quan đã tồn tại trong master data của WMS.

### Luồng chính

8.  WMS gọi API ERP để lấy danh sách PO trạng thái Open hoặc Partially
    Received.

9.  WMS lấy header và line details: PO number, vendor, expected date,
    item, UoM, expected qty.

10. Hệ thống đối chiếu với snapshot cũ theo ExternalDocNo +
    ExternalLineNo.

11. Nếu PO mới thì tạo mới trong vùng staging; nếu PO đã có thì cập nhật
    version, hash và trạng thái.

12. WMS sinh danh sách "Chờ nhận hàng" theo supplier, expected date và
    mức ưu tiên.

13. Những line còn nợ từ lần nhận trước được giữ trạng thái backorder để
    gom ở chuyến tiếp theo.

### Luồng thay thế / ngoại lệ

-   Nếu ERP sửa số lượng hoặc hủy line khi kho đang nhận dở, WMS giữ
    > version hiện hành và cảnh báo conflict cho quản lý.

-   Nếu vendor hoặc item chưa có mapping, line bị treo ở trạng thái
    > Integration Hold.

### Hậu điều kiện

-   Danh sách PO chờ nhận hiển thị trên web admin và scanner app.

-   Toàn bộ line nhận dở vẫn còn cơ sở để xử lý partial receipt và
    > backorder.

### Quy tắc nghiệp vụ

-   Chỉ đồng bộ PO đã được phê duyệt cuối cùng.

-   PO đóng hoàn toàn không xuất hiện trong danh sách chờ nhận.

-   PO nhận thiếu phải được giữ trạng thái Partially Received/Backorder
    > cho chuyến sau.

## UC-03. Tạo Master Receipt theo nhà cung cấp hoặc chuyến xe

  --------------------------------------------------------------------------
  **Phân hệ**                         Inbound Receiving
  ----------------------------------- --------------------------------------
  **Actor chính**                     Thủ kho

  **Actor phụ**                       Quản lý kho

  **Mục tiêu**                        Gom nhiều PO của cùng nhà cung cấp
                                      hoặc cùng chuyến xe thành một phiếu
                                      nhận tổng để thao tác thuận tiện tại
                                      cửa kho.

  **Kích hoạt**                       Xe hàng đến cổng kho; thủ kho chọn
                                      supplier, ASN hoặc biển số xe.

  **API liên quan**                   POST /wms/v1/inbound/master-receipts;
                                      GET
                                      /wms/v1/inbound/master-receipts/{id}

  **Entity chính**                    InboundReceiptHeader;
                                      InboundReceiptLine
  --------------------------------------------------------------------------

### Tiền điều kiện

-   Có ít nhất một PO mở hoặc backorder của nhà cung cấp.

-   Thủ kho đã đăng nhập scanner hoặc web mobile app.

### Luồng chính

14. Thủ kho nhập/chọn supplier hoặc định danh chuyến xe.

15. WMS truy vấn các PO mở, partial và backorder liên quan.

16. Hệ thống tự động gom line của nhiều PO thành một Master Receipt duy
    nhất.

17. Màn hình hiển thị tổng item cần nhận, theo dõi expected qty theo
    từng line gốc.

18. Thủ kho xác nhận tạo Draft để bắt đầu quét hàng.

### Luồng thay thế / ngoại lệ

-   Nếu supplier không có PO mở, hệ thống chỉ cho phép tạo blind receipt
    > khi có quyền đặc biệt.

-   Nếu một phần line đang bị user khác thao tác, hệ thống khóa mềm và
    > hiển thị cảnh báo concurrency.

### Hậu điều kiện

-   Master Receipt và Draft trạng thái Open được tạo.

-   Nguồn dữ liệu sẵn sàng cho scan-to-draft và xử lý ngoại lệ.

### Quy tắc nghiệp vụ

-   Một Master Receipt có thể chứa line của nhiều PO nhưng phải theo
    > cùng một supplier/chuyến logic.

-   Backorder line phải được kéo vào Draft nếu cùng vendor và còn dư nợ
    > giao.

## UC-04. Quét hàng vào Draft và tự đối chiếu

  -----------------------------------------------------------------------------
  **Phân hệ**                         Inbound Receiving
  ----------------------------------- -----------------------------------------
  **Actor chính**                     Thủ kho, Công nhân kho

  **Actor phụ**                       Quản lý kho

  **Mục tiêu**                        Cho phép quét barcode liên tục trên thiết
                                      bị cầm tay để tự đối chiếu
                                      item/UoM/lot/qty với danh sách cần nhận.

  **Kích hoạt**                       Người dùng quét barcode của kiện, carton,
                                      cuộn hoặc pallet.

  **API liên quan**                   POST
                                      /wms/v1/inbound/drafts/{draftId}/scans;
                                      GET /wms/v1/inbound/drafts/{draftId}

  **Entity chính**                    MobileScanEvent; InboundReceiptLine;
                                      HandlingUnit; HandlingUnitContent; Lot
  -----------------------------------------------------------------------------

### Tiền điều kiện

-   Master Receipt ở trạng thái Open.

-   Thiết bị scanner đã kết nối mạng hoặc có cơ chế lưu tạm offline.

### Luồng chính

19. Thiết bị gửi scan event cùng client transaction id lên WMS.

20. WMS nhận dạng barcode theo item barcode, UoM, handling unit hoặc
    lot/expiry embedded.

21. Hệ thống đối chiếu scan với các line đang mở trong Draft.

22. Nếu khớp, hệ thống tăng received qty và hiển thị tick/tiến độ trên
    line tương ứng.

23. Nếu quét pallet hoặc HU, hệ thống bóc nội dung và cộng số lượng theo
    từng item/lot tương ứng.

24. Màn hình cập nhật real-time trạng thái line: đủ, thiếu, dư, hold
    hoặc exception.

25. Mọi sự kiện quét đều được lưu vào scan log để truy vết.

### Luồng thay thế / ngoại lệ

-   Nếu barcode không tồn tại trong PO, hệ thống báo đỏ và chuyển sang
    > luồng Unexpected Item.

-   Nếu quét vượt định mức, hệ thống kích hoạt rule over-receipt hard
    > stop hoặc soft warning.

-   Nếu thiết bị mất mạng, client lưu scan cục bộ và đẩy lại sau; WMS
    > dùng idempotency key để chống ghi trùng.

### Hậu điều kiện

-   Draft phản ánh số lượng thực nhận đang diễn ra tại sân kho.

-   Tất cả scan event có thể audit và phát lại để điều tra sự cố.

### Quy tắc nghiệp vụ

-   Màn hình hiện trường phải tối ưu cho thao tác quét, không phụ thuộc
    > nhập tay.

-   ClientTxnId là khóa chống double submit khi scanner gửi lại gói tin.

## UC-05. Xử lý ngoại lệ số lượng: thiếu, dư, hàng ngoài PO

  ---------------------------------------------------------------------------------------------
  **Phân hệ**                         Inbound Exceptions
  ----------------------------------- ---------------------------------------------------------
  **Actor chính**                     Thủ kho

  **Actor phụ**                       Quản lý kho

  **Mục tiêu**                        Kiểm soát các tình huống partial receipt, over-receipt và
                                      unexpected item mà không làm sai lệch chứng từ nhập.

  **Kích hoạt**                       Hệ thống hoặc người dùng phát hiện line thiếu/dư/hàng
                                      không thuộc PO.

  **API liên quan**                   PATCH /wms/v1/inbound/drafts/{draftId}/lines/{lineId};
                                      POST
                                      /wms/v1/inbound/drafts/{draftId}/approvals/over-receipt

  **Entity chính**                    InboundReceiptLine; ReasonCode; AuditLog
  ---------------------------------------------------------------------------------------------

### Tiền điều kiện

-   Draft đang mở và đã phát sinh chênh lệch so với expected qty hoặc
    > expected item.

### Luồng chính

26. WMS đánh dấu line thiếu bằng màu vàng và hiển thị expected/received.

27. Đối với hàng dư, hệ thống dừng quét hoặc yêu cầu supervisor PIN tùy
    policy.

28. Đối với hàng không có trong PO, WMS tạo exception line và chặn
    submit nếu chưa xử lý.

29. Thủ kho chọn hành động: chấp nhận nhận một phần, từ chối hàng ngoài
    PO, hoặc xin duyệt over-receipt.

30. Hệ thống ghi reason code, approver và timestamp cho từng quyết định.

31. Các line được cập nhật trạng thái tương ứng để chờ submit.

### Luồng thay thế / ngoại lệ

-   Nếu policy là Hard Stop, line over-receipt không được lưu accepted
    > qty vượt expected.

-   Nếu policy là Soft Warning, supervisor nhập PIN để cho phép phần
    > over-receipt.

-   Hàng ngoài PO chỉ được nhận nếu user có quyền tạo blind receipt hoặc
    > linked substitute.

### Hậu điều kiện

-   Tất cả ngoại lệ số lượng được chuẩn hóa thành line-level decision.

-   Dữ liệu đủ điều kiện để push GRN minh bạch về ERP.

### Quy tắc nghiệp vụ

-   Không được accepted qty + rejected qty \> received qty.

-   Over-receipt phải có bằng chứng duyệt nếu vượt policy.

-   Partial receipt phải sinh logic backorder cho phần chưa giao.

## UC-06. Xử lý hàng lỗi, QA Hold và Return to Vendor

  ----------------------------------------------------------------------------------------------
  **Phân hệ**                         Quality Control
  ----------------------------------- ----------------------------------------------------------
  **Actor chính**                     Thủ kho, QC

  **Actor phụ**                       Quản lý kho, Kế toán

  **Mục tiêu**                        Tách bạch hàng đạt, hàng lỗi, hàng cần QA Hold và hàng trả
                                      vendor ngay trong quá trình nhận.

  **Kích hoạt**                       Người dùng kiểm tra ngoại quan/lot/expiry và đánh dấu line
                                      cần xử lý chất lượng.

  **API liên quan**                   PATCH
                                      /wms/v1/inbound/drafts/{draftId}/lines/{lineId}/quality;
                                      POST /wms/v1/returns/vendors; POST
                                      /wms/v1/quarantine/orders

  **Entity chính**                    QualityOrder; QualityCheckResult; QuarantineOrder;
                                      ReturnReceiptHeader; ReturnReceiptLine; InventoryStatus
  ----------------------------------------------------------------------------------------------

### Tiền điều kiện

-   Draft có line đã quét đủ hoặc một phần nhưng cần đánh giá chất
    > lượng, bao bì hoặc hạn dùng.

### Luồng chính

32. Thủ kho hoặc QC chọn line cần đánh giá chất lượng.

33. Hệ thống cho phép split line thành Accepted, Rejected hoặc QA Hold.

34. Người dùng nhập số lượng, reason code, disposition và đính kèm hình
    ảnh nếu cần.

35. Nếu hàng bị reject, WMS sinh Return to Vendor line hoặc phiếu trả.

36. Nếu hàng vi phạm shelf-life nhưng chưa quyết định trả, line chuyển
    status QA Hold/Quarantine.

37. Accepted qty vẫn tiếp tục luồng putaway; rejected/hold qty bị chặn
    khỏi tồn Available.

### Luồng thay thế / ngoại lệ

-   Nếu item yêu cầu QC bắt buộc, không cho submit toàn bộ line ở trạng
    > thái Accepted khi chưa có kết luận QC.

-   Nếu vendor đồng ý giao bù ở chuyến sau, rejected qty không cộng vào
    > backorder nhận tốt mà ghi vào disposition riêng.

### Hậu điều kiện

-   Kho chỉ tăng tồn Available cho phần đạt chuẩn.

-   Rejected/Hold qty được theo dõi riêng, phục vụ trả hàng hoặc nhượng
    > bộ chất lượng.

### Quy tắc nghiệp vụ

-   Inventory status Hold/QC/Blocked không được cấp phát cho outbound.

-   Lot chạy FEFO bắt buộc phải có expiry date và phải qua rule
    > shelf-life tối thiểu.

## UC-07. Quy đổi đơn vị tính và xử lý mã thay thế

  -------------------------------------------------------------------------------------------------
  **Phân hệ**                         Inbound Exceptions
  ----------------------------------- -------------------------------------------------------------
  **Actor chính**                     Thủ kho, Supervisor

  **Actor phụ**                       Thu mua, Kế toán

  **Mục tiêu**                        Cho phép nhận đúng bản chất vật tư khi barcode quét ra đơn vị
                                      tính khác hoặc mã tương đương với line PO.

  **Kích hoạt**                       Quét barcode không khớp đúng UoM hoặc quét item thay thế A+
                                      cho line A.

  **API liên quan**                   POST
                                      /wms/v1/inbound/drafts/{draftId}/lines/{lineId}/substitute;
                                      GET /wms/v1/master/uom-conversions

  **Entity chính**                    UomConversion; ItemWarehousePolicy; InboundReceiptLine;
                                      AuditLog
  -------------------------------------------------------------------------------------------------

### Tiền điều kiện

-   Hệ thống đã có bảng UoM conversion hoặc danh mục substitute item
    > được phép.

-   Người dùng có quyền phù hợp với mức độ can thiệp.

### Luồng chính

38. WMS nhận diện barcode thuộc item/UoM khác so với line gốc.

39. Nếu có UoM conversion, hệ thống tự quy đổi về base UoM của PO và
    cộng qty.

40. Nếu là substitute item, supervisor mở chức năng "Chuyển đổi mã tương
    đương".

41. Supervisor liên kết item thực nhận vào line PO gốc và nhập lý
    do/duyệt.

42. WMS lưu mối quan hệ gốc--thay thế và đưa cờ điều chỉnh về ERP khi
    submit.

### Luồng thay thế / ngoại lệ

-   Nếu không có rule conversion hoặc substitute mapping, line bị giữ
    > exception và không được submit.

-   Nếu item substitute có policy không cho phép thay thế, hệ thống chặn
    > cứng.

### Hậu điều kiện

-   Draft phản ánh đúng số lượng ở đơn vị chuẩn.

-   ERP nhận được flag điều chỉnh chứng từ nếu phát sinh substitute
    > item.

### Quy tắc nghiệp vụ

-   1 thùng = n cuộn phải được cấu hình trên UomConversion trước khi
    > nhận.

-   Substitute item phải ghi rõ approver và tham chiếu tới line PO gốc.

## UC-08. Rã pallet lộn xộn và nhận blind receiving

  ----------------------------------------------------------------------------------
  **Phân hệ**                         Inbound Advanced
  ----------------------------------- ----------------------------------------------
  **Actor chính**                     Thủ kho

  **Actor phụ**                       Quản lý kho

  **Mục tiêu**                        Cho phép quét một pallet chứa nhiều item,
                                      nhiều PO hoặc nhiều lot mà không phải mở từng
                                      PO riêng lẻ.

  **Kích hoạt**                       Thủ kho chọn chế độ Blind Receiving / Mixed
                                      Pallet.

  **API liên quan**                   POST
                                      /wms/v1/inbound/drafts/{draftId}/blind-mode;
                                      POST /wms/v1/inbound/drafts/{draftId}/scans

  **Entity chính**                    HandlingUnit; HandlingUnitContent;
                                      InboundReceiptLine; InventoryOnHand
  ----------------------------------------------------------------------------------

### Tiền điều kiện

-   Master Receipt đã gom đủ line liên quan của supplier hoặc chuyến xe.

-   Thiết bị hỗ trợ quét barcode kiện, lot, pallet.

### Luồng chính

43. WMS chuyển Draft sang chế độ nhận hỗn hợp.

44. Thủ kho rã pallet và quét từng kiện theo thứ tự thực tế.

45. Mỗi scan được hệ thống tự map vào line PO đúng ở nền.

46. Hệ thống tổng hợp kết quả cho từng PO sau khi pallet được xử lý
    xong.

47. Màn hình hiển thị kết quả cuối như PO nào hoàn tất, PO nào thiếu
    hoặc dư.

### Luồng thay thế / ngoại lệ

-   Nếu một kiện thuộc item không có trong danh sách PO đã gom, hệ thống
    > tạo exception unexpected item.

-   Nếu cùng item nhưng khác lot/status, hệ thống vẫn phải ghi nhận theo
    > dimension tồn kho riêng.

### Hậu điều kiện

-   Pallet hỗn hợp được chuẩn hóa thành các line nhận riêng biệt.

-   Người dùng không cần thao tác PO-by-PO ở hiện trường.

### Quy tắc nghiệp vụ

-   Mixed pallet không làm mất truy vết về PO gốc, lot và handling unit.

-   Inventory on hand phải theo full dimension Warehouse + Location +
    > Item + Lot + HU + Status.

## UC-09. Submit Draft, tạo GRN và backorder

  ------------------------------------------------------------------------------
  **Phân hệ**                         Inbound Integration
  ----------------------------------- ------------------------------------------
  **Actor chính**                     Thủ kho

  **Actor phụ**                       Quản lý kho, ERP FAST, Kế toán

  **Mục tiêu**                        Chốt bản nháp thành giao dịch chính thức,
                                      tăng tồn, sinh putaway và đẩy GRN minh
                                      bạch về ERP FAST.

  **Kích hoạt**                       Người dùng bấm "Xác nhận lưu / Submit".

  **API liên quan**                   POST
                                      /wms/v1/inbound/drafts/{draftId}/submit;
                                      POST /erp/v1/grns

  **Entity chính**                    InventoryLedger; InventoryOnHand;
                                      PutawayTask; IntegrationOutbox;
                                      IdempotencyKey; ErpReferenceMap
  ------------------------------------------------------------------------------

### Tiền điều kiện

-   Draft đã được xử lý toàn bộ exception bắt buộc.

-   Người dùng có quyền submit.

### Luồng chính

48. WMS khóa Draft khỏi chỉnh sửa đồng thời và chạy kiểm tra cuối.

49. Hệ thống tổng hợp accepted, rejected, hold, over-receipt và shortage
    theo từng line.

50. WMS ghi inventory ledger cho phần accepted và trạng thái liên quan
    cho phần hold/reject.

51. Hệ thống sinh putaway task cho accepted qty.

52. WMS đóng gói payload GRN và push về ERP FAST qua API/SP với
    idempotency key.

53. Phần thiếu được bóc tách thành backorder line cho chuyến giao sau.

54. Draft chuyển trạng thái Submitted; GRN integration status được ghi
    nhận.

### Luồng thay thế / ngoại lệ

-   Nếu ERP trả lỗi tạm thời, WMS vẫn commit nghiệp vụ nội bộ và đưa
    > message sang outbox retry.

-   Nếu ERP từ chối do version mismatch, WMS đánh dấu Integration Error
    > và yêu cầu kế toán/kho đối soát.

### Hậu điều kiện

-   Tồn kho và thẻ kho được cập nhật ở WMS.

-   ERP nhận kết quả thực nhận để làm căn cứ thanh toán.

-   Backorder được chuẩn bị cho lần giao tiếp theo.

### Quy tắc nghiệp vụ

-   Submit phải idempotent; gửi lại cùng request không được tạo GRN
    > trùng.

-   Backorder = ordered - accepted - rejected theo policy đã chốt.

## UC-10. Putaway và/hoặc cross-docking sau khi nhận

  -----------------------------------------------------------------------------
  **Phân hệ**                         Inbound / Internal Movement
  ----------------------------------- -----------------------------------------
  **Actor chính**                     Thủ kho, Nhân viên xe nâng

  **Actor phụ**                       Quản lý kho

  **Mục tiêu**                        Điều phối hàng nhận đạt chuẩn vào vị trí
                                      lưu trữ phù hợp hoặc giao thẳng nếu có
                                      nhu cầu xuất khẩn.

  **Kích hoạt**                       WMS sinh putaway task hoặc phát hiện nhu
                                      cầu cross-docking.

  **API liên quan**                   GET /wms/v1/putaway/tasks; POST
                                      /wms/v1/putaway/tasks/{taskId}/confirm;
                                      POST /wms/v1/cross-dock/confirm

  **Entity chính**                    PutawayTask; Location; LocationCapacity;
                                      InventoryLedger; InventoryOnHand
  -----------------------------------------------------------------------------

### Tiền điều kiện

-   Draft đã submit thành công.

-   Accepted qty đang ở inbound staging hoặc HU trung gian.

### Luồng chính

55. WMS đánh giá policy item và nhu cầu outbound hiện tại.

56. Nếu có lệnh xuất khẩn phù hợp, hệ thống phát pop-up cross-docking và
    gợi ý cửa xuất.

57. Nếu không cross-dock, WMS gợi ý vị trí putaway theo capacity, zone,
    type và policy.

58. Nhân viên quét HU/item, quét vị trí đích và xác nhận cất hàng.

59. WMS cập nhật from-location, to-location trong inventory ledger và
    tồn hiện tại.

### Luồng thay thế / ngoại lệ

-   Nếu vị trí gợi ý đầy hoặc không hợp lệ, người dùng chọn vị trí khác
    > theo quyền.

-   Nếu hàng còn ở QA Hold thì không được cất vào khu Available.

### Hậu điều kiện

-   Hàng nằm đúng vị trí hoặc được chuyển thẳng sang outbound staging.

-   Tồn kho theo location luôn chính xác để phục vụ picking.

### Quy tắc nghiệp vụ

-   Location phải kiểm soát sức chứa và loại vị trí.

-   Cross-docking chỉ áp dụng cho hàng được phép bỏ qua putaway theo
    > rule.

## UC-11. Đồng bộ SO, cấp phát tồn và tạo pick task

  -----------------------------------------------------------------------
  **Phân hệ**                         Outbound Planning
  ----------------------------------- -----------------------------------
  **Actor chính**                     System Scheduler, Quản lý kho

  **Actor phụ**                       ERP FAST

  **Mục tiêu**                        Nhận SO/lệnh xuất từ ERP, kiểm tra
                                      tồn, cấp phát và sinh nhiệm vụ lấy
                                      hàng cho kho.

  **Kích hoạt**                       Đến lịch sync SO hoặc người quản lý
                                      bấm "Tạo đợt xuất".

  **API liên quan**                   GET /erp/v1/sales-orders/open; POST
                                      /wms/v1/outbound/waves

  **Entity chính**                    ErpSalesOrderHeader;
                                      ErpSalesOrderLine;
                                      InventoryReservation;
                                      InventoryAllocation; OutboundWave;
                                      PickTask
  -----------------------------------------------------------------------

### Tiền điều kiện

-   SO hoặc lệnh xuất đã được duyệt trên ERP.

-   Tồn kho khả dụng đã có theo location/lot/status.

### Luồng chính

60. WMS lấy SO open từ ERP FAST.

61. Hệ thống kiểm tra tồn khả dụng theo item, lot, status và policy
    FIFO/FEFO.

62. WMS tạo reservation/allocation cho số lượng có thể xuất.

63. Các line được nhóm thành wave/pick task theo khu vực, ưu tiên và cửa
    xuất.

64. Pick task được phân cho người dùng hoặc thiết bị thực hiện.

### Luồng thay thế / ngoại lệ

-   Nếu không đủ tồn, line chuyển trạng thái Short/Backorder outbound.

-   Nếu đang có hold hoặc count lock tại location, hệ thống không cấp
    > phát từ vị trí đó.

### Hậu điều kiện

-   Pick task sẵn sàng cho scan-to-pick.

-   Tồn khả dụng được giữ chỗ để tránh cấp phát trùng.

### Quy tắc nghiệp vụ

-   Không cho PickedQty \> ReservedQty.

-   FEFO áp dụng cho item có shelf-life; FIFO áp dụng cho item thường
    > theo policy.

## UC-12. Quét lấy hàng, xác nhận pick và đóng gói giao

  -----------------------------------------------------------------------------
  **Phân hệ**                         Outbound Execution
  ----------------------------------- -----------------------------------------
  **Actor chính**                     Nhân viên lấy hàng, Thủ kho

  **Actor phụ**                       Quản lý kho

  **Mục tiêu**                        Thực hiện lấy hàng theo scanner, kiểm tra
                                      đúng item/lot/location và xác nhận
                                      shipment.

  **Kích hoạt**                       Người dùng mở pick task trên scanner và
                                      bắt đầu lấy hàng.

  **API liên quan**                   POST /wms/v1/picks/{pickTaskId}/scan;
                                      POST
                                      /wms/v1/shipments/{shipmentId}/confirm;
                                      POST /erp/v1/goods-issues

  **Entity chính**                    PickTask; PickConfirm; ShipmentHeader;
                                      ShipmentLine; InventoryLedger
  -----------------------------------------------------------------------------

### Tiền điều kiện

-   Đã có pick task ở trạng thái Released.

-   Tồn tại vị trí gợi ý và số lượng reservation tương ứng.

### Luồng chính

65. Người dùng quét pick task, quét location nguồn.

66. Hệ thống kiểm tra location có khớp suggested location hay không.

67. Người dùng quét item/HU/lot và nhập hoặc quét số lượng.

68. WMS đối chiếu với allocation; nếu hợp lệ thì ghi picked qty.

69. Khi đủ, hệ thống chuyển line sang picked và gợi ý đóng gói/ship
    staging.

70. Sau khi toàn bộ line hoàn tất, người dùng xác nhận shipment.

71. WMS trừ tồn, ghi ledger và push goods issue về ERP.

### Luồng thay thế / ngoại lệ

-   Nếu vị trí gợi ý hết hàng nhưng vị trí khác còn, người dùng yêu cầu
    > re-allocation theo quyền.

-   Nếu lot gợi ý không lấy được, hệ thống cho đổi lot và audit lý do.

-   Nếu phát hiện thiếu hàng khi pick, line chuyển short picked để quản
    > lý xử lý.

### Hậu điều kiện

-   Shipment ở trạng thái Confirmed/Ready to Dispatch.

-   ERP nhận chứng từ xuất thực tế.

### Quy tắc nghiệp vụ

-   Không cho xuất từ inventory status Hold/QC/Blocked.

-   Mọi thay đổi vị trí/lot lúc pick phải có audit trail.

## UC-13. Kiểm kê cycle count, review chênh lệch và điều chỉnh tồn

  --------------------------------------------------------------------------------------
  **Phân hệ**                         Inventory Control
  ----------------------------------- --------------------------------------------------
  **Actor chính**                     Thủ kho, Nhân viên kiểm kê

  **Actor phụ**                       Quản lý kho, Kế toán

  **Mục tiêu**                        Kiểm kê định kỳ bằng scanner, khóa giao dịch tại
                                      điểm đếm và điều chỉnh tồn có phê duyệt.

  **Kích hoạt**                       Đến lịch cycle count hoặc quản lý tạo đếm đột
                                      xuất/spot count.

  **API liên quan**                   POST /wms/v1/cycle-count/plans; POST
                                      /wms/v1/cycle-count/sessions/{sessionId}/submit;
                                      POST /wms/v1/inventory-adjustments/{id}/approve

  **Entity chính**                    CycleCountPlan; CycleCountSession; CycleCountLine;
                                      CycleCountReview; CountAdjustmentApproval;
                                      InventoryHold; StockAdjustment
  --------------------------------------------------------------------------------------

### Tiền điều kiện

-   Kế hoạch kiểm kê hoặc cycle count plan đã được tạo.

-   User có quyền kiểm kê và vị trí được phân công.

### Luồng chính

72. Quản lý tạo plan/session theo warehouse, zone, location hoặc item.

73. WMS khóa mềm tồn tại phạm vi kiểm kê để hạn chế giao dịch đồng thời.

74. Nhân viên kiểm kê quét location, HU, item, lot và ghi số lượng đếm
    thực tế.

75. Hệ thống so sánh counted qty với on-hand hiện tại và sinh variance.

76. Nếu variance trong ngưỡng cho phép, hệ thống đề xuất auto-approve;
    nếu vượt ngưỡng thì chờ review.

77. Quản lý kho hoặc người được ủy quyền xem xét, phê duyệt hoặc yêu cầu
    đếm lại.

78. Sau khi duyệt, WMS ghi adjustment ledger và mở khóa vị trí.

### Luồng thay thế / ngoại lệ

-   Nếu trong lúc count có giao dịch inbound/outbound chen vào, session
    > phải báo concurrency conflict.

-   Nếu phát hiện HU nằm sai vị trí, hệ thống cho ghi nhận relocation
    > kết hợp count correction.

### Hậu điều kiện

-   Tồn kho thực tế và sổ giao dịch được hiệu chỉnh chính thức.

-   Biên bản chênh lệch và phê duyệt được lưu kiểm toán.

### Quy tắc nghiệp vụ

-   Count adjustment trên ngưỡng phải có phê duyệt cấp trên.

-   Blind count không được hiển thị tồn hệ thống cho người đếm.

## UC-14. Theo dõi dashboard tồn kho và cảnh báo vận hành

  --------------------------------------------------------------------------
  **Phân hệ**                         Reporting & Dashboard
  ----------------------------------- --------------------------------------
  **Actor chính**                     Quản lý kho, Ban giám đốc, Kế toán

  **Actor phụ**                       Hệ thống

  **Mục tiêu**                        Cung cấp bức tranh realtime về tồn,
                                      hiệu suất và rủi ro nhập/xuất để ra
                                      quyết định nhanh.

  **Kích hoạt**                       Người dùng mở dashboard hoặc hệ thống
                                      phát cảnh báo ngưỡng.

  **API liên quan**                   GET
                                      /wms/v1/dashboard/inventory/summary;
                                      GET /wms/v1/dashboard/alerts

  **Entity chính**                    InventoryOnHand; InventoryLedger;
                                      InboundReceiptLine; PickTask;
                                      CycleCountLine; IntegrationOutbox
  --------------------------------------------------------------------------

### Tiền điều kiện

-   Dữ liệu inbound, outbound, inventory ledger và count đã được ghi
    > nhận trên WMS.

### Luồng chính

79. WMS tổng hợp tồn theo location, item, lot, status và warehouse.

80. Hệ thống tính KPI nhập/xuất, thời gian xử lý, số line exception, số
    lượng hold/quarantine, tỷ lệ lệch count.

81. Dashboard hiển thị biểu đồ, bảng cảnh báo và drill-down theo chiều
    dữ liệu.

82. Người dùng lọc theo kho, ca, ngày, vendor hoặc item.

83. Nếu vượt ngưỡng tồn thấp, tồn âm logic, tỷ lệ lệch cao hoặc
    integration queue lỗi, hệ thống phát cảnh báo.

### Luồng thay thế / ngoại lệ

-   Nếu một widget không có dữ liệu, hệ thống hiển thị trạng thái no
    > data thay vì lỗi.

-   Nếu người dùng không có quyền xem giá trị nhạy cảm, widget bị ẩn
    > hoặc chỉ hiện số lượng.

### Hậu điều kiện

-   Quản lý có thông tin realtime để điều phối nguồn lực và xử lý rủi
    > ro.

### Quy tắc nghiệp vụ

-   Dashboard ưu tiên dữ liệu operational gần realtime từ WMS, không chờ
    > báo cáo cuối ngày từ ERP.

-   Số liệu tài chính cuối cùng vẫn do ERP chịu trách nhiệm.

## UC-15. Quản trị lỗi tích hợp, retry và audit

  -----------------------------------------------------------------------------
  **Phân hệ**                         Integration & Administration
  ----------------------------------- -----------------------------------------
  **Actor chính**                     Quản trị hệ thống

  **Actor phụ**                       Quản lý kho, ERP FAST

  **Mục tiêu**                        Theo dõi thông điệp tích hợp, xử lý lỗi,
                                      phát lại bản ghi và bảo đảm không tạo
                                      chứng từ trùng.

  **Kích hoạt**                       Có message lỗi, timeout, duplicate hoặc
                                      người quản trị mở màn hình tích hợp.

  **API liên quan**                   GET /wms/v1/integration/messages; POST
                                      /wms/v1/integration/retries/{messageId}

  **Entity chính**                    IntegrationInbox; IntegrationOutbox;
                                      IntegrationRetry; ApiCallLog;
                                      IdempotencyKey; AuditLog
  -----------------------------------------------------------------------------

### Tiền điều kiện

-   WMS đã ghi nhận integration inbox/outbox và api call log.

### Luồng chính

84. Quản trị xem hàng đợi tích hợp theo trạng thái Pending, Success,
    Failed, Dead-letter.

85. Người dùng mở chi tiết request, response, correlation id, payload
    hash và lịch sử retry.

86. Nếu lỗi có thể khôi phục, quản trị chọn Retry.

87. WMS gửi lại thông điệp với cùng idempotency key hoặc correlation key
    phù hợp.

88. Nếu ERP đã nhận trước đó, WMS ghi nhận duplicate-safe và không tạo
    thêm chứng từ.

89. Quản trị có thể export log phục vụ kiểm toán hoặc phân tích root
    cause.

### Luồng thay thế / ngoại lệ

-   Nếu message vi phạm dữ liệu nguồn, hệ thống yêu cầu sửa dữ liệu
    > business trước khi retry.

-   Nếu quá số lần retry, message vào dead-letter queue và cần xử lý
    > tay.

### Hậu điều kiện

-   Hàng đợi tích hợp được làm sạch và thông điệp có thể được theo dõi
    > end-to-end.

### Quy tắc nghiệp vụ

-   Mọi push sang ERP phải có Idempotency-Key và Request-Id.

-   Không xóa log tích hợp trước thời hạn lưu trữ audit.

# 5. API Specification

Mục tiêu của phần này là chuẩn hóa hợp đồng tích hợp giữa WMS và ERP
FAST, đồng thời thống nhất các endpoint nội bộ phục vụ scanner/web
admin. Trong triển khai thực tế, đường dẫn có thể thay đổi theo domain
và API gateway, nhưng ngữ nghĩa, field bắt buộc, cơ chế idempotent và
quy tắc lỗi nên giữ ổn định.

## 5.1 Quy ước chung

-   Mọi request tích hợp quan trọng đều phải có X-Request-Id để trace
    > end-to-end.

-   Các lệnh tạo chứng từ hoặc xác nhận nghiệp vụ phải dùng
    > Idempotency-Key để chống tạo trùng khi retry.

-   Thời gian dùng ISO-8601 UTC; số lượng dùng decimal; mã chứng từ giữ
    > nguyên theo hệ thống gốc.

-   Trả lỗi theo cấu trúc chuẩn: code, message, details, requestId,
    > retriable.

-   Các request từ scanner cần thêm X-Device-Id và clientTxnId để chống
    > double submit.

-   ERP FAST là owner của item/supplier/PO/SO; WMS là owner của draft,
    > putaway, pick task, scan event và inventory ledger.

## 5.2 Mô hình response lỗi chuẩn

  -----------------------------------------------------------------------
  **Trường**                          **Ý nghĩa**
  ----------------------------------- -----------------------------------
  code                                Mã lỗi nghiệp vụ hoặc kỹ thuật, ví
                                      dụ INVALID_QTY_SPLIT, ERP_TIMEOUT,
                                      DUPLICATE_REQUEST

  message                             Thông điệp ngắn, thân thiện với hệ
                                      thống tiêu thụ

  details                             Danh sách chi tiết theo field/line
                                      nếu có

  requestId                           Giá trị X-Request-Id để trace log

  retriable                           true/false -- có nên retry tự động
                                      hay không
  -----------------------------------------------------------------------

{\"code\":\"ERP_TIMEOUT\",\"message\":\"ERP did not respond in
time\",\"details\":\[\],\"requestId\":\"rq-1001\",\"retriable\":true}

## 5.3 Danh mục endpoint

  -----------------------------------------------------------------------------------------------------------------------------
  **API ID**     **Method**     **Path**                                                     **Owner**      **Mục đích**
  -------------- -------------- ------------------------------------------------------------ -------------- -------------------
  API-01         GET            /erp/v1/items                                                ERP FAST       WMS pull item
                                                                                                            master và thông tin
                                                                                                            điều khiển như UoM,
                                                                                                            lot control, serial
                                                                                                            control,
                                                                                                            shelf-life, policy
                                                                                                            pick.

  API-02         GET            /erp/v1/suppliers                                            ERP FAST       Đồng bộ nhà cung
                                                                                                            cấp, địa chỉ và mã
                                                                                                            vendor cho inbound.

  API-03         GET            /erp/v1/purchase-orders/open                                 ERP FAST       WMS pull tất cả PO
                                                                                                            open/partially
                                                                                                            received để chuẩn
                                                                                                            bị nhận hàng.

  API-04         POST           /wms/v1/inbound/master-receipts                              WMS            Khởi tạo phiếu nhận
                                                                                                            tổng và Draft cho
                                                                                                            supplier/chuyến xe.

  API-05         POST           /wms/v1/inbound/drafts/{draftId}/scans                       WMS            Tiếp nhận scan
                                                                                                            event từ scanner và
                                                                                                            tự đối chiếu vào
                                                                                                            Draft.

  API-06         PATCH          /wms/v1/inbound/drafts/{draftId}/lines/{lineId}              WMS            Cho phép split
                                                                                                            line, nhập
                                                                                                            accepted/rejected
                                                                                                            qty, reason code và
                                                                                                            quyết định
                                                                                                            partial/over.

  API-07         POST           /wms/v1/inbound/drafts/{draftId}/lines/{lineId}/substitute   WMS            Link item thay thế
                                                                                                            vào line gốc để
                                                                                                            tiếp tục nhận và
                                                                                                            push flag điều
                                                                                                            chỉnh về ERP.

  API-08         POST           /wms/v1/inbound/drafts/{draftId}/submit                      WMS            Khóa Draft, ghi
                                                                                                            ledger, sinh
                                                                                                            putaway/backorder
                                                                                                            và tạo message GRN
                                                                                                            outbound sang ERP.

  API-09         POST           /erp/v1/grns                                                 ERP FAST       Nhận kết quả thực
                                                                                                            nhận từ WMS để phục
                                                                                                            vụ đối soát và
                                                                                                            thanh toán.

  API-10         POST           /wms/v1/putaway/tasks/{taskId}/confirm                       WMS            Hoàn tất di chuyển
                                                                                                            hàng từ staging đến
                                                                                                            location đích hoặc
                                                                                                            staging outbound.

  API-11         GET            /erp/v1/sales-orders/open                                    ERP FAST       Đồng bộ nhu cầu
                                                                                                            xuất kho từ ERP
                                                                                                            sang WMS.

  API-12         POST           /wms/v1/outbound/waves                                       WMS            Gom lệnh xuất và
                                                                                                            sinh pick task theo
                                                                                                            policy FIFO/FEFO.

  API-13         POST           /wms/v1/picks/{pickTaskId}/scan                              WMS            Đối chiếu location,
                                                                                                            item, lot, HU và
                                                                                                            qty trong quá trình
                                                                                                            xuất kho.

  API-14         POST           /wms/v1/shipments/{shipmentId}/confirm                       WMS            Chốt xuất kho thực
                                                                                                            tế và tạo message
                                                                                                            goods issue cho
                                                                                                            ERP.

  API-15         POST           /wms/v1/cycle-count/sessions/{sessionId}/submit              WMS            Nộp kết quả kiểm kê
                                                                                                            và sinh variance để
                                                                                                            review/approve.

  API-16         POST           /wms/v1/integration/retries/{messageId}                      WMS            Cho phép phát lại
                                                                                                            message failed
                                                                                                            trong outbox/inbox
                                                                                                            có kiểm soát.
  -----------------------------------------------------------------------------------------------------------------------------

### API-01. Lấy danh mục Item từ ERP

  -----------------------------------------------------------------------
  **Method**                          GET
  ----------------------------------- -----------------------------------
  **Path**                            /erp/v1/items

  **Owner**                           ERP FAST

  **Mục đích**                        WMS pull item master và thông tin
                                      điều khiển như UoM, lot control,
                                      serial control, shelf-life, policy
                                      pick.

  **Query params**                    modifiedSince, page, pageSize

  **Headers bắt buộc**                Authorization, X-Request-Id

  **Thành công**                      200 OK

  **Lỗi chuẩn**                       400 invalid modifiedSince; 401
                                      unauthorized; 500 internal ERP
                                      error
  -----------------------------------------------------------------------

#### Request mẫu

> GET
> /erp/v1/items?modifiedSince=2026-04-12T00:00:00Z&page=1&pageSize=500

#### Response mẫu

> {\
> \"requestId\": \"8d4c2b8f\",\
> \"items\": \[\
> {\
> \"erpItemCode\": \"RM-001\",\
> \"itemName\": \"Màng PE 5kg\",\
> \"baseUom\": \"ROLL\",\
> \"isLotControlled\": true,\
> \"shelfLifeDays\": 180,\
> \"pickStrategy\": \"FEFO\",\
> \"barcodes\": \[\
> \"893\...\",\
> \"INT-RM-001\"\
> \]\
> },\
> {\
> \"erpItemCode\": \"RM-002\",\
> \"itemName\": \"Băng keo 48mm\",\
> \"baseUom\": \"BOX\",\
> \"isLotControlled\": false,\
> \"pickStrategy\": \"FIFO\"\
> }\
> \],\
> \"page\": 1,\
> \"pageSize\": 500,\
> \"hasMore\": false\
> }

#### Quy tắc áp dụng

-   ERP là nguồn chuẩn cho item master.

-   Mỗi item có thể trả nhiều barcode.

-   Trường dữ liệu phải hỗ trợ lot/serial/shelf-life ngay từ phase đầu
    > để không phải đổi model.

### API-02. Lấy supplier từ ERP

  -----------------------------------------------------------------------
  **Method**                          GET
  ----------------------------------- -----------------------------------
  **Path**                            /erp/v1/suppliers

  **Owner**                           ERP FAST

  **Mục đích**                        Đồng bộ nhà cung cấp, địa chỉ và mã
                                      vendor cho inbound.

  **Query params**                    modifiedSince, page, pageSize

  **Headers bắt buộc**                Authorization, X-Request-Id

  **Thành công**                      200 OK

  **Lỗi chuẩn**                       401 unauthorized; 500 internal ERP
                                      error
  -----------------------------------------------------------------------

#### Request mẫu

> GET /erp/v1/suppliers?modifiedSince=2026-04-12T00:00:00Z

#### Response mẫu

> {\
> \"requestId\": \"e8a1\",\
> \"suppliers\": \[\
> {\
> \"vendorCode\": \"VND-A\",\
> \"vendorName\": \"Nhà cung cấp A\",\
> \"status\": \"Active\",\
> \"addresses\": \[\
> {\
> \"type\": \"Billing\",\
> \"city\": \"Biên Hòa\"\
> }\
> \]\
> }\
> \]\
> }

#### Quy tắc áp dụng

-   Vendor code dùng làm khóa gom chuyến inbound theo supplier.

### API-03. Lấy PO mở từ ERP

  -----------------------------------------------------------------------
  **Method**                          GET
  ----------------------------------- -----------------------------------
  **Path**                            /erp/v1/purchase-orders/open

  **Owner**                           ERP FAST

  **Mục đích**                        WMS pull tất cả PO open/partially
                                      received để chuẩn bị nhận hàng.

  **Query params**                    supplierCode, modifiedSince,
                                      expectedDateFrom, expectedDateTo,
                                      page, pageSize

  **Headers bắt buộc**                Authorization, X-Request-Id

  **Thành công**                      200 OK

  **Lỗi chuẩn**                       409 version conflict; 500 internal
                                      ERP error
  -----------------------------------------------------------------------

#### Request mẫu

> GET
> /erp/v1/purchase-orders/open?supplierCode=VND-A&expectedDateFrom=2026-04-12

#### Response mẫu

> {\
> \"requestId\": \"rq-1001\",\
> \"purchaseOrders\": \[\
> {\
> \"poNumber\": \"PO-2026-00045\",\
> \"vendorCode\": \"VND-A\",\
> \"expectedDate\": \"2026-04-12\",\
> \"status\": \"Open\",\
> \"lines\": \[\
> {\
> \"lineNo\": 1,\
> \"itemCode\": \"RM-001\",\
> \"uom\": \"ROLL\",\
> \"orderedQty\": 100,\
> \"openQty\": 100\
> },\
> {\
> \"lineNo\": 2,\
> \"itemCode\": \"RM-002\",\
> \"uom\": \"BOX\",\
> \"orderedQty\": 10,\
> \"openQty\": 4\
> }\
> \]\
> }\
> \]\
> }

#### Quy tắc áp dụng

-   Chỉ trả PO đã duyệt cuối cùng.

-   OpenQty phải phản ánh phần còn nợ sau các GRN trước đó.

### API-04. Tạo Master Receipt

  -----------------------------------------------------------------------
  **Method**                          POST
  ----------------------------------- -----------------------------------
  **Path**                            /wms/v1/inbound/master-receipts

  **Owner**                           WMS

  **Mục đích**                        Khởi tạo phiếu nhận tổng và Draft
                                      cho supplier/chuyến xe.

  **Query params**                    \-

  **Headers bắt buộc**                Authorization, X-Request-Id,
                                      X-User-Id

  **Thành công**                      201 Created

  **Lỗi chuẩn**                       400 invalid supplier; 409 receipt
                                      already open for same vehicle; 422
                                      no open PO found
  -----------------------------------------------------------------------

#### Request mẫu

> {\
> \"supplierCode\": \"VND-A\",\
> \"vehicleNo\": \"60C-12345\",\
> \"receiptMode\": \"CONSOLIDATED\",\
> \"includeBackorders\": true,\
> \"notes\": \"Xe giao sáng\"\
> }

#### Response mẫu

> {\
> \"masterReceiptId\": \"MR-000123\",\
> \"draftId\": \"DR-000123\",\
> \"status\": \"Open\",\
> \"lineCount\": 8,\
> \"poRefs\": \[\
> \"PO-2026-00045\",\
> \"PO-2026-00052\"\
> \]\
> }

#### Quy tắc áp dụng

-   Có thể gom nhiều PO cùng supplier.

-   Backorder line được kéo vào nếu includeBackorders = true.

### API-05. Ghi nhận scan vào Draft

  ----------------------------------------------------------------------------
  **Method**                          POST
  ----------------------------------- ----------------------------------------
  **Path**                            /wms/v1/inbound/drafts/{draftId}/scans

  **Owner**                           WMS

  **Mục đích**                        Tiếp nhận scan event từ scanner và tự
                                      đối chiếu vào Draft.

  **Query params**                    \-

  **Headers bắt buộc**                Authorization, X-Request-Id,
                                      Idempotency-Key, X-Device-Id

  **Thành công**                      200 OK

  **Lỗi chuẩn**                       404 draft not found; 409 duplicate
                                      clientTxnId; 422 unexpected item/over
                                      receipt
  ----------------------------------------------------------------------------

#### Request mẫu

> {\
> \"clientTxnId\": \"SCN-20260412-00001\",\
> \"barcode\": \"8931234567890\",\
> \"scannedQty\": 1,\
> \"scanTime\": \"2026-04-12T08:32:10Z\",\
> \"scanMode\": \"ITEM\",\
> \"locationCode\": \"INB-STAGE-01\"\
> }

#### Response mẫu

> {\
> \"draftId\": \"DR-000123\",\
> \"matched\": true,\
> \"lineId\": \"DRL-00045\",\
> \"itemCode\": \"RM-001\",\
> \"receivedQty\": 55,\
> \"expectedQty\": 100,\
> \"lineStatus\": \"PARTIAL\"\
> }

#### Quy tắc áp dụng

-   clientTxnId là khóa chống submit trùng từ scanner.

-   Nếu over-receipt hoặc unexpected item, response phải trả reason code
    > gợi ý để UI hiển thị ngay.

### API-06. Cập nhật line ngoại lệ inbound

  -------------------------------------------------------------------------------------
  **Method**                          PATCH
  ----------------------------------- -------------------------------------------------
  **Path**                            /wms/v1/inbound/drafts/{draftId}/lines/{lineId}

  **Owner**                           WMS

  **Mục đích**                        Cho phép split line, nhập accepted/rejected qty,
                                      reason code và quyết định partial/over.

  **Query params**                    \-

  **Headers bắt buộc**                Authorization, X-Request-Id, X-User-Id

  **Thành công**                      200 OK

  **Lỗi chuẩn**                       403 no permission; 422 invalid qty split
  -------------------------------------------------------------------------------------

#### Request mẫu

> {\
> \"acceptedQty\": 90,\
> \"rejectedQty\": 10,\
> \"holdQty\": 0,\
> \"reasonCode\": \"PACK_DAMAGED\",\
> \"decision\": \"QA_REJECT\"\
> }

#### Response mẫu

> {\
> \"lineId\": \"DRL-00045\",\
> \"status\": \"READY_TO_SUBMIT\",\
> \"acceptedQty\": 90,\
> \"rejectedQty\": 10\
> }

#### Quy tắc áp dụng

-   AcceptedQty + RejectedQty + HoldQty không được vượt ReceivedQty.

### API-07. Đăng ký mã thay thế cho line PO

  ------------------------------------------------------------------------------------------------
  **Method**                          POST
  ----------------------------------- ------------------------------------------------------------
  **Path**                            /wms/v1/inbound/drafts/{draftId}/lines/{lineId}/substitute

  **Owner**                           WMS

  **Mục đích**                        Link item thay thế vào line gốc để tiếp tục nhận và push
                                      flag điều chỉnh về ERP.

  **Query params**                    \-

  **Headers bắt buộc**                Authorization, X-Request-Id, X-Approver-Id

  **Thành công**                      200 OK

  **Lỗi chuẩn**                       403 invalid approval; 422 substitute not allowed
  ------------------------------------------------------------------------------------------------

#### Request mẫu

> {\
> \"substituteItemCode\": \"RM-001A\",\
> \"approvalPin\": \"\*\*\*\*\",\
> \"reasonCode\": \"SUPPLIER_SUBSTITUTE\",\
> \"notes\": \"Đã được thu mua xác nhận qua điện thoại\"\
> }

#### Response mẫu

> {\
> \"lineId\": \"DRL-00045\",\
> \"originalItemCode\": \"RM-001\",\
> \"substituteItemCode\": \"RM-001A\",\
> \"status\": \"SUBSTITUTE_APPROVED\"\
> }

#### Quy tắc áp dụng

-   Chỉ supervisor hoặc role tương đương mới được xác nhận substitute.

### API-08. Submit Draft và tạo GRN nội bộ

  -----------------------------------------------------------------------------
  **Method**                          POST
  ----------------------------------- -----------------------------------------
  **Path**                            /wms/v1/inbound/drafts/{draftId}/submit

  **Owner**                           WMS

  **Mục đích**                        Khóa Draft, ghi ledger, sinh
                                      putaway/backorder và tạo message GRN
                                      outbound sang ERP.

  **Query params**                    \-

  **Headers bắt buộc**                Authorization, X-Request-Id,
                                      Idempotency-Key

  **Thành công**                      202 Accepted

  **Lỗi chuẩn**                       409 draft already submitted; 422
                                      unresolved exceptions
  -----------------------------------------------------------------------------

#### Request mẫu

> {\
> \"submittedBy\": \"user.wh01\",\
> \"submitTime\": \"2026-04-12T09:00:00Z\",\
> \"finalCheck\": true\
> }

#### Response mẫu

> {\
> \"grnNo\": \"GRN-2026-00152\",\
> \"status\": \"SUBMITTED\",\
> \"acceptedLines\": 7,\
> \"backorderLines\": 2,\
> \"putawayTaskCount\": 5,\
> \"integrationStatus\": \"PENDING_PUSH_ERP\"\
> }

#### Quy tắc áp dụng

-   Submit phải idempotent và không được tạo GRN trùng.

### API-09. Push GRN từ WMS về ERP

  -----------------------------------------------------------------------
  **Method**                          POST
  ----------------------------------- -----------------------------------
  **Path**                            /erp/v1/grns

  **Owner**                           ERP FAST

  **Mục đích**                        Nhận kết quả thực nhận từ WMS để
                                      phục vụ đối soát và thanh toán.

  **Query params**                    \-

  **Headers bắt buộc**                Authorization, X-Request-Id,
                                      Idempotency-Key, X-Source-System:
                                      WMS

  **Thành công**                      201 Created

  **Lỗi chuẩn**                       409 duplicate idempotency key; 422
                                      PO version mismatch; 500 ERP
                                      processing error
  -----------------------------------------------------------------------

#### Request mẫu

> {\
> \"grnNo\": \"GRN-2026-00152\",\
> \"masterReceiptId\": \"MR-000123\",\
> \"vendorCode\": \"VND-A\",\
> \"poResults\": \[\
> {\
> \"poNumber\": \"PO-2026-00045\",\
> \"lineNo\": 1,\
> \"itemCode\": \"RM-001\",\
> \"acceptedQty\": 90,\
> \"rejectedQty\": 10,\
> \"backorderQty\": 0\
> },\
> {\
> \"poNumber\": \"PO-2026-00045\",\
> \"lineNo\": 2,\
> \"itemCode\": \"RM-002\",\
> \"acceptedQty\": 4,\
> \"rejectedQty\": 0,\
> \"backorderQty\": 6\
> }\
> \]\
> }

#### Response mẫu

> {\
> \"erpReceiptNo\": \"NK-ERP-000981\",\
> \"status\": \"ACCEPTED\",\
> \"message\": \"GRN received\"\
> }

#### Quy tắc áp dụng

-   ERP chỉ ghi nhận chứng từ một lần cho cùng Idempotency-Key.

-   BackorderQty giúp ERP giữ PO ở trạng thái nhận một phần.

### API-10. Xác nhận putaway hoặc cross-dock

  ----------------------------------------------------------------------------
  **Method**                          POST
  ----------------------------------- ----------------------------------------
  **Path**                            /wms/v1/putaway/tasks/{taskId}/confirm

  **Owner**                           WMS

  **Mục đích**                        Hoàn tất di chuyển hàng từ staging đến
                                      location đích hoặc staging outbound.

  **Query params**                    \-

  **Headers bắt buộc**                Authorization, X-Request-Id, X-Device-Id

  **Thành công**                      200 OK

  **Lỗi chuẩn**                       404 task not found; 422 invalid
                                      destination or capacity exceeded
  ----------------------------------------------------------------------------

#### Request mẫu

> {\
> \"taskType\": \"PUTAWAY\",\
> \"fromLocation\": \"INB-STAGE-01\",\
> \"toLocation\": \"WH-A-01-02-P03\",\
> \"handlingUnitBarcode\": \"LP-000981\",\
> \"confirmedQty\": 20\
> }

#### Response mẫu

> {\
> \"taskId\": \"PT-000221\",\
> \"status\": \"COMPLETED\",\
> \"updatedOnHand\": 20\
> }

#### Quy tắc áp dụng

-   Location đích phải hợp lệ theo loại vị trí và sức chứa.

### API-11. Lấy SO mở từ ERP

  -----------------------------------------------------------------------
  **Method**                          GET
  ----------------------------------- -----------------------------------
  **Path**                            /erp/v1/sales-orders/open

  **Owner**                           ERP FAST

  **Mục đích**                        Đồng bộ nhu cầu xuất kho từ ERP
                                      sang WMS.

  **Query params**                    modifiedSince, status, page,
                                      pageSize

  **Headers bắt buộc**                Authorization, X-Request-Id

  **Thành công**                      200 OK

  **Lỗi chuẩn**                       401 unauthorized; 500 ERP error
  -----------------------------------------------------------------------

#### Request mẫu

> GET /erp/v1/sales-orders/open?status=Approved

#### Response mẫu

> {\
> \"salesOrders\": \[\
> {\
> \"soNumber\": \"SO-000781\",\
> \"customerCode\": \"CUS-01\",\
> \"status\": \"Approved\",\
> \"lines\": \[\
> {\
> \"lineNo\": 1,\
> \"itemCode\": \"FG-001\",\
> \"qty\": 50\
> }\
> \]\
> }\
> \]\
> }

#### Quy tắc áp dụng

-   SO hủy hoặc hold không được cấp phát pick task.

### API-12. Tạo wave và pick task

  -----------------------------------------------------------------------
  **Method**                          POST
  ----------------------------------- -----------------------------------
  **Path**                            /wms/v1/outbound/waves

  **Owner**                           WMS

  **Mục đích**                        Gom lệnh xuất và sinh pick task
                                      theo policy FIFO/FEFO.

  **Query params**                    \-

  **Headers bắt buộc**                Authorization, X-Request-Id

  **Thành công**                      201 Created

  **Lỗi chuẩn**                       422 insufficient stock; 409
                                      allocation conflict
  -----------------------------------------------------------------------

#### Request mẫu

> {\
> \"warehouseCode\": \"WH-A\",\
> \"soNumbers\": \[\
> \"SO-000781\"\
> \],\
> \"allocationPolicy\": \"AUTO\"\
> }

#### Response mẫu

> {\
> \"waveNo\": \"WV-00012\",\
> \"pickTaskCount\": 3,\
> \"status\": \"RELEASED\"\
> }

#### Quy tắc áp dụng

-   Không cấp phát từ status Hold/QC/Blocked.

### API-13. Ghi nhận scan khi pick

  -----------------------------------------------------------------------
  **Method**                          POST
  ----------------------------------- -----------------------------------
  **Path**                            /wms/v1/picks/{pickTaskId}/scan

  **Owner**                           WMS

  **Mục đích**                        Đối chiếu location, item, lot, HU
                                      và qty trong quá trình xuất kho.

  **Query params**                    \-

  **Headers bắt buộc**                Authorization, X-Request-Id,
                                      Idempotency-Key, X-Device-Id

  **Thành công**                      200 OK

  **Lỗi chuẩn**                       409 duplicate clientTxnId; 422
                                      wrong location/lot/item
  -----------------------------------------------------------------------

#### Request mẫu

> {\
> \"clientTxnId\": \"PK-20260412-0001\",\
> \"locationCode\": \"WH-A-01-01-P01\",\
> \"barcode\": \"FG-001-LOT-20260501\",\
> \"pickedQty\": 10\
> }

#### Response mẫu

> {\
> \"pickTaskId\": \"PKT-00012\",\
> \"pickedQty\": 10,\
> \"remainingQty\": 40,\
> \"status\": \"IN_PROGRESS\"\
> }

#### Quy tắc áp dụng

-   Mọi override location hoặc lot phải lưu audit.

### API-14. Xác nhận shipment và push goods issue

  ----------------------------------------------------------------------------
  **Method**                          POST
  ----------------------------------- ----------------------------------------
  **Path**                            /wms/v1/shipments/{shipmentId}/confirm

  **Owner**                           WMS

  **Mục đích**                        Chốt xuất kho thực tế và tạo message
                                      goods issue cho ERP.

  **Query params**                    \-

  **Headers bắt buộc**                Authorization, X-Request-Id,
                                      Idempotency-Key

  **Thành công**                      202 Accepted

  **Lỗi chuẩn**                       422 shipment not fully picked; 409
                                      already confirmed
  ----------------------------------------------------------------------------

#### Request mẫu

> {\
> \"shipmentNo\": \"SHP-00045\",\
> \"confirmedBy\": \"user.ship01\",\
> \"dockDoor\": \"DOOR-02\",\
> \"vehicleNo\": \"60H-98765\"\
> }

#### Response mẫu

> {\
> \"shipmentId\": \"SHP-00045\",\
> \"status\": \"CONFIRMED\",\
> \"erpPushStatus\": \"PENDING\"\
> }

#### Quy tắc áp dụng

-   Shipment chỉ confirm khi toàn bộ line đã resolved thành picked hoặc
    > short-picked có duyệt.

### API-15. Tạo và nộp cycle count session

  -------------------------------------------------------------------------------------
  **Method**                          POST
  ----------------------------------- -------------------------------------------------
  **Path**                            /wms/v1/cycle-count/sessions/{sessionId}/submit

  **Owner**                           WMS

  **Mục đích**                        Nộp kết quả kiểm kê và sinh variance để
                                      review/approve.

  **Query params**                    \-

  **Headers bắt buộc**                Authorization, X-Request-Id

  **Thành công**                      200 OK

  **Lỗi chuẩn**                       409 session already closed; 422 invalid count
                                      line
  -------------------------------------------------------------------------------------

#### Request mẫu

> {\
> \"submittedBy\": \"cc.user01\",\
> \"lines\": \[\
> {\
> \"locationCode\": \"WH-A-01-01-P01\",\
> \"itemCode\": \"FG-001\",\
> \"lotNo\": \"LOT-001\",\
> \"countedQty\": 48\
> }\
> \]\
> }

#### Response mẫu

> {\
> \"sessionId\": \"CC-00021\",\
> \"varianceCount\": 1,\
> \"status\": \"PENDING_REVIEW\"\
> }

#### Quy tắc áp dụng

-   Blind count không trả on-hand system trong payload phản hồi cho
    > người đếm.

### API-16. Retry message tích hợp

  -----------------------------------------------------------------------------
  **Method**                          POST
  ----------------------------------- -----------------------------------------
  **Path**                            /wms/v1/integration/retries/{messageId}

  **Owner**                           WMS

  **Mục đích**                        Cho phép phát lại message failed trong
                                      outbox/inbox có kiểm soát.

  **Query params**                    \-

  **Headers bắt buộc**                Authorization, X-Request-Id, X-User-Id

  **Thành công**                      202 Accepted

  **Lỗi chuẩn**                       403 no permission; 409 max retry exceeded
  -----------------------------------------------------------------------------

#### Request mẫu

> {\
> \"reason\": \"ERP timeout resolved\",\
> \"force\": false\
> }

#### Response mẫu

> {\
> \"messageId\": \"MSG-0091\",\
> \"retryNo\": 2,\
> \"status\": \"REQUEUED\"\
> }

#### Quy tắc áp dụng

-   Retry giữ nguyên correlation/idempotency semantics của thông điệp
    > gốc.

# 6. Hướng dẫn dùng UAT/Test Case Matrix

-   Workbook đính kèm đi kèm tài liệu này là ma trận UAT/Test Case vận
    > hành chính thức cho vòng kiểm thử.

-   Sheet UAT_Functional tập trung vào kịch bản business theo use case;
    > sheet API_Tests tập trung vào contract và hành vi endpoint.

-   Cột Actual Result, Status, Tester, Test Date, Defect ID và Evidence
    > để trống khi bàn giao nhằm đội QA/UAT cập nhật trong quá trình
    > chạy.

-   Mỗi test case đã gắn UC ID và API ID để truy ngược sang use case và
    > hợp đồng tích hợp.

# 7. Khuyến nghị triển khai

-   Chốt trước policy over-receipt, substitute item, shelf-life và quyền
    > override để Dev không phải hard-code lại sau.

-   Chuẩn hóa request/response envelope, idempotency và correlation ID
    > ngay từ sprint đầu.

-   Ưu tiên build đầy đủ audit log và scan event ngay trong MVP, vì đây
    > là phần cứu hệ thống khi gặp sự cố thực địa.

-   Trước UAT chính thức cần mock hoặc có UAT endpoint từ ERP FAST để
    > kiểm chứng end-to-end các chứng từ GRN và goods issue.

# 8. Tài liệu tham chiếu

-   Tài liệu Đặc tả Kỹ thuật & Nghiệp vụ Quy trình Nhận hàng Động
    > (Dynamic Inbound) & Tích hợp ERP

-   PhanTichDuAnWareHouseEPE

-   EPE_Warehouse_Strategic_Upgrade

-   DacTaV2
