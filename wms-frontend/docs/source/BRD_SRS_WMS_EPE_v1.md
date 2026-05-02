BRD/SRS TỔNG HỢP\
HỆ THỐNG WMS TÍCH HỢP ERP FAST

EPE Smart Warehouse Management System (EPE-SWMS)\
Phiên bản baseline v1.0 -- tổng hợp nghiệp vụ và yêu cầu phần mềm

  -----------------------------------------------------------------------
  **Mục đích**          Chuẩn hóa một tài liệu BRD/SRS thống nhất để dùng
                        cho BA, Solution, Dev, QA, UAT và đối tác tích
                        hợp.
  --------------------- -------------------------------------------------
  **Phạm vi**           Bao phủ Core MVP và các năng lực mở rộng cần
                        thiết để vận hành kho thực tế ổn định, đặc biệt
                        cho inbound động, outbound, tồn kho, kiểm kê và
                        tích hợp ERP FAST.

  **Cơ sở đầu vào**     Tài liệu Dynamic Inbound & Tích hợp ERP; kế
                        hoạch/roadmap dự án WMS; slide chiến lược nâng
                        cấp kho; tài liệu tổng hợp định hướng BA/DB.

  **Lưu ý**             Những yêu cầu đã xuất hiện rõ trong hồ sơ gốc
                        được coi là baseline; các phần mở rộng như
                        quality, quarantine, lot/serial, FEFO, cycle
                        count review được nêu như yêu cầu chuẩn hóa
                        khuyến nghị để tránh thiếu hụt khi triển khai.
  -----------------------------------------------------------------------

  -----------------------------------------------------------------------
  **Định vị giải pháp**
  -----------------------------------------------------------------------
  ERP FAST tiếp tục là system of record cho chứng từ tài chính, mua và
  bán; WMS là hệ thống tác nghiệp kho độc lập, làm việc trên dữ liệu đồng
  bộ cục bộ, xử lý barcode/mobile tại hiện trường và chỉ đẩy kết quả
  chuẩn hóa ngược về ERP qua API/Stored Procedure.

  -----------------------------------------------------------------------

# 1. Thông tin tài liệu

  -------------------------------------------------------------------------
  **Tên tài BRD/SRS tổng hợp hệ    **Mã tài   EPE-SWMS-BRD-SRS-v1.0
  liệu**    thống WMS tích hợp ERP liệu**     
            FAST                              
  --------- ---------------------- ---------- -----------------------------
  **Phiên   1.0                    **Trạng    Baseline tổng hợp
  bản**                            thái**     

  **Người   Phan Hoàng Khải --     **Ngày**   2026-04-12
  soạn**    tổng hợp theo tài liệu            
            đầu vào                           

  **Đối     Ban dự án, BA, PM,     **Ngôn     Tiếng Việt
  tượng sử  Dev, QA, UAT, ERP team ngữ**      
  dụng**                                      

  **Mục     Làm tài liệu chuẩn     **Phương   Theo change request, issue
  tiêu phát phân tích, thiết kế,   thức cập   log và UAT
  hành**    phát triển, kiểm thử   nhật**     
            và nghiệm thu                     
  -------------------------------------------------------------------------

# 2. Tài liệu nguồn và phạm vi hợp nhất

Tài liệu này được hợp nhất từ bốn nguồn chính và chuẩn hóa lại thành một
bộ đặc tả duy nhất. Mục tiêu là tránh phân mảnh thông tin giữa định
hướng chiến lược, tài liệu quy trình inbound, roadmap dự án và đề xuất
BA/DB.

-   Tài liệu Đặc tả Kỹ thuật & Nghiệp vụ Quy trình Nhận hàng Động
    (Dynamic Inbound) & Tích hợp ERP.

-   PhanTichDuAnWareHouseEPE.pdf -- roadmap và phạm vi triển khai 3
    phase.

-   EPE_Warehouse_Strategic_Upgrade.pdf -- định vị chiến lược, mô hình
    tích hợp và module lõi.

-   DacTaV2.docx -- tổng hợp BA/Solution/Database và các khuyến nghị mở
    rộng cần thiết.

Các nội dung gắn nhãn "Core MVP" phản ánh trực tiếp phần đã có trong
roadmap/slide/tài liệu nghiệp vụ. Các nội dung gắn nhãn "Mở rộng chuẩn
hóa" là phần nên đặc tả ngay từ đầu để hệ thống bền hơn khi bước sang
phase 2--3.

# 3. Tóm tắt điều hành

Hệ thống WMS được xây dựng nhằm kiểm soát vận hành kho bằng barcode và
mobile scanner, quản lý vị trí lưu trữ chính xác, giảm sai sót
nhập/xuất, cung cấp tồn kho thời gian thực và tích hợp an toàn với ERP
FAST. WMS không thay thế ERP kế toán mà hoạt động như hệ thống vệ tinh
chuyên trách thực thi tại kho.

Khác biệt lớn của giải pháp là cơ chế Dynamic Inbound via Draft: hệ
thống cho phép gom nhiều PO của cùng nhà cung cấp, quét nhận thực tế
trên thiết bị cầm tay, xử lý ngoại lệ ngay tại Draft, sau đó mới chốt
tồn kho, sinh putaway và đẩy GRN chuẩn hóa về ERP.

Bộ tài liệu này do đó được viết theo hai lớp song song: BRD để mô tả mục
tiêu và yêu cầu nghiệp vụ; SRS để chuyển hóa thành yêu cầu chức năng, dữ
liệu, tích hợp và phi chức năng có thể giao cho đội phát triển.

# 4. Bối cảnh kinh doanh và bài toán cần giải quyết

Kho vận hiện tại chịu áp lực từ việc dữ liệu ERP và thực tế vật lý tại
kho lệch nhau, thao tác nhập liệu thủ công gây sai sót, không có cơ chế
đối chiếu nhanh bằng barcode, thiếu khả năng nhìn tồn theo vị
trí/lô/trạng thái theo thời gian thực và việc đối soát với kế toán bị
phụ thuộc vào chứng từ ghi tay hoặc nhập lại.

-   Không làm gián đoạn hệ thống ERP FAST hiện tại.

-   Không can thiệp trực tiếp vào bảng kế toán lõi của ERP.

-   Chuẩn hóa vận hành kho bằng mã vạch và thiết bị scanner/mobile.

-   Giảm sai sót nhập kho, xuất kho và kiểm kê.

-   Cho phép lãnh đạo theo dõi dashboard realtime mà không chờ báo cáo
    cuối ngày.

# 5. Mục tiêu kinh doanh

  --------------------------------------------------------------------------
  **ID**   **Mục tiêu**                       **Chỉ báo thành công**
  -------- ---------------------------------- ------------------------------
  BG-01    Chuẩn hóa toàn bộ nghiệp vụ kho    100% giao dịch kho chuẩn được
           trên một nền tảng WMS độc lập.     thực hiện qua WMS thay vì ghi
                                              tay/nhập lại.

  BG-02    Giảm sai sót nhập kho bằng barcode Tỷ lệ sai lệch nhập giảm rõ
           và đối chiếu tự động.              rệt; các case lệch đều có log
                                              và reason code.

  BG-03    Kiểm soát xuất kho đúng vị trí,    Mọi lần pick đều có scan
           đúng mã, đúng lô.                  confirm và truy vết được.

  BG-04    Nắm tồn kho theo thời gian thực    Dashboard và tồn chi tiết được
           tới cấp vị trí.                    cập nhật sau mỗi transaction.

  BG-05    Tích hợp an toàn với ERP FAST.     Không ghi trực tiếp vào DB kế
                                              toán lõi; mọi giao tiếp đi qua
                                              sync/view/API/SP.
  --------------------------------------------------------------------------

# 6. Phạm vi hệ thống

## 6.1. Trong phạm vi

-   Đồng bộ dữ liệu master, PO, SO từ ERP FAST theo chu kỳ hoặc theo
    lệnh đồng bộ.

-   Quản lý user, role, permission, device và log tác nghiệp.

-   Quản lý sơ đồ kho, zone, dãy, tầng, ô, vị trí staging và quarantine.

-   Nhập kho bằng barcode/scanner; hỗ trợ dynamic receiving qua Draft.

-   Putaway sau nhập, quản lý handling unit/pallet/license plate và in
    tem nhãn.

-   Xuất kho theo SO/lệnh xuất; pick task, scan-to-pick, shipment
    confirmation.

-   Quản lý tồn kho realtime, inventory ledger, điều chuyển nội bộ,
    hold/block.

-   Kiểm kê định kỳ và kiểm kê nhanh bằng mobile scanner.

-   Dashboard và báo cáo quản trị vận hành.

-   Tích hợp outbound/inbound với ERP qua API/SP và cơ chế
    log/retry/idempotency.

## 6.2. Ngoài phạm vi của baseline này

-   Thay thế chức năng kế toán, công nợ, giá vốn, bút toán hoặc mua hàng
    của ERP FAST.

-   Tự động hóa hoàn toàn bằng robot/ASRS/RFID/cân điện tử trong Core
    MVP.

-   Thuật toán tối ưu sâu như route optimization đa biến hoặc
    forecasting nâng cao ở giai đoạn đầu.

-   Các quy trình ngoài kho như sản xuất, bảo trì, nhân sự hoặc CRM.

# 7. Lộ trình phạm vi theo phase

  -------------------------------------------------------------------------
  **Phase**   **Trọng tâm**           **Nội dung chính**
  ----------- ----------------------- -------------------------------------
  Phase 1 --  Vận hành kho lõi        Master data, location, inbound,
  Core MVP                            outbound, inventory ledger, real-time
                                      inventory, alert, Web Admin,
                                      Mobile/Scanner App, API spec,
                                      testing/UAT.

  Phase 2 --  Kiểm soát chất lượng và Batch/shelf-life, quality status,
  Tối ưu nâng thuật toán              smart putaway, smart picking,
  cao                                 FIFO/FEFO, cycle count, inventory
                                      adjustment, integration API chuẩn
                                      hóa.

  Phase 3 --  Đa kho, IoT, reverse    Multi-warehouse, inter-branch
  Mở rộng     logistics, BI           transfer, IoT/hardware integration,
                                      RFID, rework/RMA, BI analytics,
                                      pilot, training, deployment.
  -------------------------------------------------------------------------

# 8. Stakeholder và vai trò người dùng

  --------------------------------------------------------------------------
  **Vai trò**         **Mục tiêu chính**    **Quyền điển hình**
  ------------------- --------------------- --------------------------------
  Ban Giám đốc        Theo dõi hiệu suất và Xem dashboard, KPI, tình trạng
                      tính minh bạch vận    tồn, cảnh báo sai lệch.
                      hành                  

  Quản lý kho         Điều phối kho và kiểm Duyệt over-receipt, chuyển mã
                      soát ngoại lệ         tương đương, duyệt điều chỉnh,
                                            quản lý layout.

  Supervisor/Leader   Xử lý ca và xác nhận  Duyệt split line, partial
                      nghiệp vụ ngoại lệ    receipt, hold/quarantine, pick
                                            exception.

  Thủ kho/Công nhân   Thao tác thực địa     Quét nhận, putaway, pick, kiểm
  kho                 bằng scanner          kê, xác nhận task.

  Kế toán             Đối soát và nhận      Theo dõi GRN, phiếu xuất, trạng
                      chứng từ chuẩn hóa từ thái đồng bộ, đối chiếu ERP.
                      kho                   

  Thu mua             Theo dõi PO, vendor,  Xem tình trạng PO, backorder,
                      giao bù               substitute item flag.

  ERP Team/Đối tác    Bảo đảm tích hợp và   Quản trị API/SP/View, UAT tích
  FAST                an toàn dữ liệu       hợp, log lỗi.
  --------------------------------------------------------------------------

# 9. Nguyên tắc kiến trúc và thiết kế

1.  ERP FAST là system of record cho tài chính và chứng từ mua/bán; WMS
    không thay ERP.

2.  WMS làm việc trên dữ liệu snapshot/sync cục bộ để scanner thao tác
    nhanh và không phụ thuộc ERP realtime.

3.  Mọi biến động tồn kho phải đi qua inventory ledger; bảng tồn hiện
    tại chỉ là snapshot tổng hợp.

4.  Tích hợp phải có idempotency để không sinh chứng từ trùng khi gửi
    lại thông điệp hoặc retry.

5.  Thiết kế ưu tiên thao tác quét mã, tối giản nhập tay, tối ưu cho
    thiết bị cầm tay tại kho.

6.  Ngoại lệ vận hành phải được thiết kế như first-class scenario, không
    coi là case phụ.

  -----------------------------------------------------------------------
  **Mô hình tích hợp đề xuất**
  -----------------------------------------------------------------------
  Đọc dữ liệu từ ERP qua API hoặc Read-only View; ghi kết quả về ERP qua
  API hoặc Stored Procedure chuẩn. Cơ chế này vừa an toàn cho ERP lõi,
  vừa cho phép WMS xử lý linh hoạt tại hiện trường.

  -----------------------------------------------------------------------

# 10. Kiến trúc nghiệp vụ tổng thể

Luồng chuẩn của hệ thống gồm hai chiều chính:

-   Inbound: ERP phê duyệt PO → WMS đồng bộ PO mở → thủ kho nhận hàng,
    quét và xử lý ngoại lệ trên Draft → WMS chốt tồn kho, putaway và
    push GRN/shortage/reject về ERP.

-   Outbound: ERP sinh SO/lệnh xuất → WMS đồng bộ chứng từ → hệ thống
    tạo reservation/allocation/pick task → thủ kho scan-to-pick → WMS
    xác nhận shipment và đẩy kết quả về ERP.

Tầng ứng dụng nên tách Web Admin cho quản lý/kế toán và Mobile/Scanner
App cho thủ kho/công nhân. Tầng dữ liệu nên tối thiểu có: Master Data,
ERP Stage/Snapshot, WMS Core, Quality/Count và Integration Audit.

# 11. Quy trình nghiệp vụ tổng thể

## 11.1. Đồng bộ dữ liệu từ ERP

Hệ thống WMS chỉ đồng bộ các chứng từ đã đủ điều kiện nghiệp vụ. Với
inbound, đó là các PO đã được duyệt cuối cùng và đang mở. Với outbound,
đó là các SO/lệnh xuất đã sẵn sàng thực hiện. Mục tiêu của cơ chế đồng
bộ là giúp kho có đủ dữ liệu để thao tác trước khi xe đến hoặc trước khi
cần xuất hàng.

-   Đồng bộ theo lịch (ví dụ 5--10 phút/lần) và có nút đồng bộ thủ công.

-   Lưu snapshot cục bộ theo header/line, bao gồm số chứng từ ngoài,
    line ngoài, thời điểm sửa gần nhất, version/hash để phát hiện thay
    đổi.

-   Ghi lịch sử chạy đồng bộ, lỗi đồng bộ, retry và mapping chứng từ
    giữa ERP -- WMS.

## 11.2. Dynamic Inbound via Draft

Đây là luồng inbound đặc trưng của giải pháp. Hệ thống cho phép gom
nhiều PO theo nhà cung cấp/chuyến xe, nhận hàng thực tế trên scanner, xử
lý ngoại lệ ngay trên Draft rồi mới submit.

7.  Bước 1 -- Định danh chuyến hàng: thủ kho chọn nhà cung cấp hoặc biển
    số xe.

8.  Bước 2 -- Consolidation: WMS tự động gom toàn bộ PO mở cùng vendor,
    bao gồm cả phần backorder từ chuyến trước, thành một Master Receipt.

9.  Bước 3 -- Scan-to-Draft: từng lần quét sẽ được đưa vào Draft Area và
    hệ thống tự động đối chiếu theo item/UoM/PO line.

10. Bước 4 -- Xử lý ngoại lệ: split line, hàng lỗi, hàng thiếu,
    over-receipt, substitute item, mixed pallet, lot/expiry violation,
    cross-docking\...

11. Bước 5 -- Submit: WMS ghi tồn kho, sinh putaway, đẩy kết quả chuẩn
    hóa về ERP và tạo backorder cho phần còn nợ.

## 11.3. Putaway sau nhận hàng

Sau khi submit inbound, các line đạt chất lượng sẽ được chuyển sang
trạng thái sẵn sàng cất hàng. WMS có thể tạo PutawayTask cho xe nâng
hoặc nhân sự kho dựa trên loại hàng, khu vực lưu trữ, năng lực chứa và
chính sách item.

-   Core MVP: cho phép gợi ý vị trí hoặc người dùng chọn vị trí hợp lệ.

-   Mở rộng chuẩn hóa: tự động đề xuất vị trí dựa trên capacity,
    compatibility, mixed-item rule và chiến lược lưu trữ.

## 11.4. Outbound -- Scan to Pick

Luồng xuất kho bắt đầu khi ERP gửi SO/lệnh xuất. WMS sẽ giữ snapshot
chứng từ, khóa/đặt chỗ tồn, tạo wave hoặc pick task, gợi ý vị trí/lô lấy
hàng, bắt buộc scan xác nhận trước khi xuất.

12. Đồng bộ SO/lệnh xuất từ ERP.

13. Kiểm tra khả dụng tồn, tạo reservation/allocation.

14. Sinh pick task theo vị trí, lô và chiến lược FIFO/FEFO.

15. Thủ kho scan tại vị trí thực tế để xác nhận item/lot/qty.

16. Xử lý thiếu hàng hoặc đổi vị trí/lô theo quyền.

17. Chốt shipment và push kết quả thực xuất về ERP.

## 11.5. Kiểm kê và điều chỉnh tồn

WMS phải hỗ trợ cả kiểm kê định kỳ, kiểm kê chọn mẫu và kiểm kê nhanh
tại vị trí. Việc quét kiểm kê cần so sánh trực tiếp với tồn hệ thống,
highlight chênh lệch và yêu cầu review/approval trước khi ghi
adjustment.

-   Cycle Count theo kế hoạch/khu vực/ABC class.

-   Blind Count hoặc Guided Count tùy nghiệp vụ.

-   Tạm khóa hoặc đánh dấu khu vực đang kiểm kê để tránh phát sinh giao
    dịch xung đột.

-   Lưu đầy đủ lịch sử đếm, review, người duyệt và phiếu điều chỉnh.

## 11.6. Quality, Quarantine và Return

Để hệ thống bền ở môi trường thực tế, các trạng thái chất lượng không
nên xử lý thủ công ngoài hệ thống. Các lô hàng lỗi, cận date, chờ QC,
hàng khách trả lại hoặc hàng cần rework cần có workflow và trạng thái rõ
ràng.

-   QA Reject/Return to Vendor tại inbound.

-   QA Hold/Quarantine đối với hàng vi phạm shelf-life hoặc cần kiểm tra
    thêm.

-   Disposition cho các hướng xử lý: Accept, Return, Rework, Scrap,
    Block, Release.

-   Ghi ledger và status change cho từng quyết định chất lượng.

# PHẦN A -- BRD (BUSINESS REQUIREMENTS DOCUMENT)

Phần BRD mô tả các yêu cầu kinh doanh ở mức mục tiêu, năng lực cần có và
quy tắc nghiệp vụ. Đây là cơ sở để chốt phạm vi với stakeholder trước
khi chi tiết hóa thành functional spec.

# 12. Năng lực nghiệp vụ bắt buộc

  -------------------------------------------------------------------------------
  **ID**   **Năng lực**         **Mô tả yêu cầu nghiệp vụ**      **Phase**
  -------- -------------------- -------------------------------- ----------------
  BR-01    Đồng bộ ERP          WMS phải đồng bộ master data,    Core MVP
                                PO, SO từ ERP FAST theo lịch     
                                hoặc theo lệnh thủ công và lưu   
                                snapshot cục bộ để tác nghiệp.   

  BR-02    Quản lý vị trí kho   Hệ thống phải quản lý kho theo   Core MVP
                                cấu trúc                         
                                warehouse/zone/aisle/rack/bin,   
                                hỗ trợ chính sách vị trí và sức  
                                chứa.                            

  BR-03    Nhập kho bằng        Thủ kho phải có thể nhận hàng    Core MVP
           barcode              bằng scanner, không phụ thuộc    
                                nhập tay, có đối chiếu trực tiếp 
                                với PO.                          

  BR-04    Dynamic receiving    WMS phải hỗ trợ gom nhiều PO     Core MVP
                                trong cùng chuyến và xử lý trên  
                                Draft trước khi chốt chứng từ.   

  BR-05    Xử lý ngoại lệ       WMS phải xử lý được nhận thiếu,  Core MVP
           inbound              nhận dư, hàng lỗi, UoM mismatch, 
                                substitute item, unexpected      
                                item, mixed pallet, backorder.   

  BR-06    Putaway              Hàng đạt phải được ghi tồn và    Core MVP
                                điều phối cất vào vị trí lưu trữ 
                                phù hợp.                         

  BR-07    Xuất kho theo lệnh   Hệ thống phải hỗ trợ             Core MVP
                                scan-to-pick theo SO/lệnh xuất,  
                                xác nhận đúng mã -- đúng vị trí  
                                -- đúng lô -- đúng số lượng.     

  BR-08    Kiểm soát tồn kho    Tồn kho phải xem được theo thời  Core MVP
                                gian thực ở cấp vị trí, lô và    
                                trạng thái; có ledger truy vết   
                                biến động.                       

  BR-09    Kiểm kê bằng scanner Hệ thống phải hỗ trợ kiểm kê     Phase 2
                                bằng mobile scanner, review      
                                chênh lệch và adjustment có phê  
                                duyệt.                           

  BR-10    Quality/Quarantine   Hệ thống phải có trạng thái chất Phase 2
                                lượng, cách ly và hướng xử lý    
                                cho hàng lỗi hoặc hàng cần QC.   
  -------------------------------------------------------------------------------

# 13. Business requirement chi tiết theo module

## 13.1. Module đồng bộ ERP

  -------------------------------------------------------------------------
  **ID**   **Yêu cầu nghiệp vụ**  **Mô tả**                        **Ưu
                                                                   tiên**
  -------- ---------------------- -------------------------------- --------
  BR-11    Đồng bộ chứng từ đủ    Chỉ đồng bộ PO/SO đã ở trạng     Must
           điều kiện              thái nghiệp vụ hợp lệ để kho     
                                  thao tác trên dữ liệu sạch.      

  BR-12    Không phụ thuộc ERP    Khi scanner thao tác, WMS dùng   Must
           realtime               snapshot cục bộ; chỉ đồng bộ     
                                  thay đổi theo nhịp hoặc theo     
                                  lệnh.                            

  BR-13    Truy vết đồng bộ       Mọi lần sync phải có log chạy,   Must
                                  log lỗi, trạng thái, số bản ghi  
                                  và lịch sử retry.                

  BR-14    Mapping chứng từ       WMS phải lưu được quan hệ giữa   Must
                                  chứng từ ERP, line ERP và chứng  
                                  từ nội bộ WMS để đối soát.       
  -------------------------------------------------------------------------

## 13.2. Module inbound

  -------------------------------------------------------------------------
  **ID**   **Yêu cầu nghiệp vụ**  **Mô tả**                        **Ưu
                                                                   tiên**
  -------- ---------------------- -------------------------------- --------
  BR-15    Gom chuyến giao hàng   Một chuyến xe có thể mang nhiều  Must
                                  PO; hệ thống phải tạo Master     
                                  Receipt hoặc Draft tổng.         

  BR-16    Quét nhận liên tục     Từng lần quét phải được đối      Must
                                  chiếu thời gian thực và tự tăng  
                                  số lượng nhận trên line phù hợp. 

  BR-17    Hỗ trợ nhận            Khi nhận thiếu, hệ thống phải    Must
           thiếu/nhiều đợt        chốt số thực nhận và tạo         
                                  backorder phần còn nợ.           

  BR-18    Hàng lỗi và trả vendor Hệ thống phải cho phép tách hàng Must
                                  đạt và hàng reject, đồng thời    
                                  đẩy thông tin cấn trừ về ERP.    

  BR-19    Hàng dư                Nhận dư phải được cấu hình theo  Should
                                  hard stop hoặc soft warning có   
                                  phê duyệt.                       

  BR-20    UoM conversion         WMS phải quy đổi được giữa đơn   Must
                                  vị mua và đơn vị quét nhận.      

  BR-21    Substitute item        Supervisor phải có quyền map mã  Should
                                  thay thế vào line PO và đẩy cờ   
                                  về ERP để điều chỉnh chứng từ.   

  BR-22    Mixed pallet           WMS phải cho phép quét rã pallet Should
                                  và tự phân bổ line ở nền hệ      
                                  thống.                           

  BR-23    Cross-docking          Khi có nhu cầu xuất nóng, hệ     Could
                                  thống có thể bỏ qua putaway và   
                                  chuyển thẳng sang cửa xuất.      
  -------------------------------------------------------------------------

## 13.3. Module outbound, tồn kho và kiểm kê

  ---------------------------------------------------------------------------
  **ID**   **Yêu cầu nghiệp vụ**    **Mô tả**                        **Ưu
                                                                     tiên**
  -------- ------------------------ -------------------------------- --------
  BR-24    Reservation/allocation   SO hợp lệ phải có cơ chế đặt chỗ Must
                                    và cấp phát tồn cho outbound.    

  BR-25    Pick by scan             Mọi lần pick phải được xác nhận  Must
                                    bằng quét item/lot/location.     

  BR-26    FIFO/FEFO                Chiến lược lấy hàng phải cấu     Should
                                    hình theo item/warehouse policy. 

  BR-27    Ledger bất biến          Mỗi giao dịch                    Must
                                    nhập/xuất/chuyển/điều chỉnh phải 
                                    sinh transaction độc lập để truy 
                                    vết.                             

  BR-28    Real-time inventory      Người dùng phải xem được tồn tức Must
                                    thời theo vị trí và trạng thái.  

  BR-29    Cycle count              Kiểm kê phải hỗ trợ review chênh Should
                                    lệch trước khi adjustment.       

  BR-30    Hold/Quarantine          Trạng thái bị hold hoặc chờ QC   Should
                                    không được phép dùng cho         
                                    pick/ship.                       
  ---------------------------------------------------------------------------

# 14. Quy tắc nghiệp vụ chính

18. PR nằm hoàn toàn trên ERP; WMS không tham gia quy trình trình ký PR.

19. Chỉ PO đã duyệt cuối cùng và còn mở mới được đồng bộ vào WMS.

20. Một line inbound chỉ được coi là hoàn tất khi AcceptedQty +
    RejectedQty phản ánh đúng thực tế và được submit.

21. Backorder được tính từ số đặt trừ số accepted trừ số rejected/return
    theo quy tắc tài chính đã chốt với ERP.

22. Hàng ở trạng thái Hold/QC/Blocked không được pick cho outbound.

23. Over-receipt nếu được phép phải có supervisor approval hoặc PIN quản
    lý.

24. Nếu item có shelf-life rule, line inbound phải thu thập được
    lot/expiry trước khi release về kho khả dụng.

25. Mọi điều chỉnh tồn phải có reason code và người duyệt theo phân
    quyền.

# PHẦN B -- SRS (SOFTWARE REQUIREMENTS SPECIFICATION)

Phần SRS chuyển hóa yêu cầu nghiệp vụ thành đặc tả phần mềm có thể phát
triển và kiểm thử. ID yêu cầu ở đây được dùng cho Dev, QA và UAT.

# 15. Kiến trúc chức năng

  ------------------------------------------------------------------------
  **Mã       **Tên module**       **Chức năng chính**
  module**                        
  ---------- -------------------- ----------------------------------------
  M01        ERP Sync             Đồng bộ master, PO, SO, log sync,
                                  mapping chứng từ, retry/idempotency.

  M02        Master & Location    Quản lý item, barcode, UoM, vendor,
                                  customer, warehouse, zone, location,
                                  policy.

  M03        Inbound              Master Receipt, Draft, scan receive,
                                  exception handling, putaway, label
                                  print.

  M04        Outbound             Reservation, allocation, pick task, pick
                                  confirm, shipment confirm.

  M05        Inventory            Ledger, on-hand, stock movement,
                                  internal transfer, hold, adjustment.

  M06        Cycle Count          Kế hoạch kiểm kê, phiên kiểm kê, quét
                                  kiểm kê, review, adjustment approval.

  M07        Quality/Return       QC order, quarantine, RTV/return
                                  receipt, disposition.
  ------------------------------------------------------------------------

# 16. Use case tổng quát

  --------------------------------------------------------------------------
  **UC**   **Diễn viên chính**  **Mục tiêu**            **Kết quả**
  -------- -------------------- ----------------------- --------------------
  UC-01    System Scheduler /   Đồng bộ master và chứng Dữ liệu snapshot sẵn
           Admin                từ từ ERP               sàng cho kho.

  UC-02    Thủ kho              Khởi tạo Master Receipt Draft tổng cho
                                                        chuyến hàng được
                                                        tạo.

  UC-03    Thủ kho              Quét nhận hàng vào      Số lượng quét được
                                Draft                   đối chiếu và cập
                                                        nhật.

  UC-04    Supervisor           Xử lý ngoại lệ inbound  Draft phản ánh đúng
                                                        thực tế vật lý.

  UC-05    Thủ kho / Supervisor Submit phiếu nhận       Tồn tăng, putaway
                                                        sinh ra, GRN push
                                                        ERP.

  UC-06    Quản lý kho          Duyệt điều              Ngoại lệ được hợp lệ
                                chỉnh/over-receipt      hóa theo phân quyền.

  UC-07    Thủ kho              Scan-to-pick            Pick được xác nhận
                                                        đúng
                                                        item/lot/location.

  UC-08    Kiểm kê viên         Quét kiểm kê            Chênh lệch được phát
                                                        hiện và đưa đi
                                                        review.
  --------------------------------------------------------------------------

# 17. Functional requirements

## 17.1. M01 -- ERP Sync

  --------------------------------------------------------------------------------
  **ID**   **Chức năng**      **Mô tả yêu cầu**              **Phase**   **Mức**
  -------- ------------------ ------------------------------ ----------- ---------
  FR-001   Master Sync        Hệ thống phải đồng bộ item,    P1          Must
                              barcode, vendor, customer, UoM             
                              và các danh mục nền từ                     
                              ERP/nguồn chuẩn.                           

  FR-002   PO Sync            Hệ thống phải đồng bộ PO đã    P1          Must
                              duyệt và đang mở, kèm đầy đủ               
                              header/line, expected date và              
                              UoM.                                       

  FR-003   SO Sync            Hệ thống phải đồng bộ SO/lệnh  P1          Must
                              xuất đủ điều kiện để tạo                   
                              outbound work.                             

  FR-004   Manual Sync        Người dùng được quyền phải có  P1          Should
                              thể bấm đồng bộ thủ công theo              
                              loại chứng từ.                             

  FR-005   Version Detection  Hệ thống phải lưu thời điểm    P1          Must
                              sửa gần nhất và version/hash               
                              để phát hiện thay đổi chứng từ             
                              ERP.                                       

  FR-006   Sync Log           Mỗi lần đồng bộ phải sinh log  P1          Must
                              trạng thái, thời gian, số bản              
                              ghi và lỗi chi tiết.                       

  FR-007   Idempotent Inbound Gói tin hoặc tài liệu gửi lại  P1          Must
                              nhiều lần không được tạo                   
                              snapshot trùng hoặc chứng từ               
                              trùng.                                     

  FR-008   ERP Push Result    WMS phải đẩy được GRN,         P1          Must
                              shortage, reject và shipment               
                              result về ERP qua API/SP.                  
  --------------------------------------------------------------------------------

## 17.2. M02 -- Master & Location

  --------------------------------------------------------------------------------
  **ID**   **Chức năng**      **Mô tả yêu cầu**              **Phase**   **Mức**
  -------- ------------------ ------------------------------ ----------- ---------
  FR-009   User Management    Quản trị tài khoản, trạng thái P1          Must
                              hoạt động và thông tin người               
                              dùng.                                      

  FR-010   Role & Permission  Cấu hình vai trò và quyền tới  P1          Must
                              chức năng, nút lệnh, trạng                 
                              thái duyệt và phạm vi kho.                 

  FR-011   Warehouse          Quản lý warehouse, zone,       P1          Must
           Structure          aisle/rack/bin/location theo               
                              cấu trúc nhiều cấp.                        

  FR-012   Location Policy    Mỗi location phải cấu hình     P1          Should
                              được loại vị trí, sức chứa,                
                              khả năng nhận/pick/quarantine              
                              và chính sách mixed                        
                              item/lot/status.                           

  FR-013   Item Master        Quản lý item, item code ERP,   P1          Must
                              tên hàng, base UoM, barcode,               
                              lot/serial flag, shelf-life,               
                              pick strategy.                             

  FR-014   Barcode Master     Một item có thể gắn nhiều      P1          Should
                              barcode theo loại: vendor,                 
                              internal, carton, pallet.                  

  FR-015   UoM Conversion     Hệ thống phải lưu quy tắc quy  P1          Must
                              đổi giữa đơn vị mua, đơn vị                
                              tồn và đơn vị quét.                        
  --------------------------------------------------------------------------------

## 17.3. M03 -- Inbound & Putaway

  --------------------------------------------------------------------------------
  **ID**   **Chức năng**      **Mô tả yêu cầu**              **Phase**   **Mức**
  -------- ------------------ ------------------------------ ----------- ---------
  FR-016   Create Master      Từ nhà cung cấp/chuyến xe, hệ  P1          Must
           Receipt            thống phải tạo được phiếu nhận             
                              tổng từ nhiều PO mở.                       

  FR-017   Draft Area         Thiết bị scanner/tablet phải   P1          Must
                              có Draft Area để nhận dữ liệu              
                              quét theo thời gian thực.                  

  FR-018   Auto Matching      Mỗi barcode quét phải được đối P1          Must
                              chiếu tự động với line PO theo             
                              item/UoM/rule.                             

  FR-019   Blind Receiving    Hệ thống nên hỗ trợ nhận mù/rã P1          Should
                              pallet rồi match ở nền đối với             
                              mixed pallet.                              

  FR-020   Split Line         Người dùng có quyền phải tách  P1          Must
                              line giữa hàng đạt và hàng                 
                              reject hoặc nhiều tình trạng               
                              khác nhau.                                 

  FR-021   Partial Receipt    Khi nhận thiếu, hệ thống phải  P1          Must
                              chốt số thực nhận và tạo                   
                              backlog/backorder phần còn                 
                              lại.                                       

  FR-022   Over Receipt       Khi nhận vượt, hệ thống phải   P1          Must
           Control            chặn hoặc cảnh báo theo cấu                
                              hình và có supervisor approval             
                              nếu cần.                                   

  FR-023   Unexpected Item    Hàng không nằm trong PO phải   P1          Must
                              bị cảnh báo đỏ và chỉ xử lý                
                              nếu có luồng blind                         
                              receipt/exception được cấp                 
                              quyền.                                     

  FR-024   Substitute Item    Supervisor phải map được item  P1          Should
                              thay thế vào line PO và lưu                
                              flag để ERP xử lý đối soát.                

  FR-025   Lot/Expiry Capture Nếu item quản lý lot hoặc      P2          Must
                              shelf-life, hệ thống phải bắt              
                              buộc thu thập lot/expiry trước             
                              khi release.                               

  FR-026   Cross Dock Trigger Nếu tồn inbound trùng với nhu  P2          Could
                              cầu xuất khẩn, hệ thống có thể             
                              tạo gợi ý cross-docking.                   

  FR-027   Submit Receipt     Submit phải đồng thời ghi tồn, P1          Must
                              sinh putaway, cập nhật trạng               
                              thái PO/receipt và đẩy kết quả             
                              về ERP.                                    

  FR-028   Putaway Task       Sau khi submit, hệ thống phải  P1          Must
                              sinh task putaway với vị trí               
                              đích hợp lệ.                               

  FR-029   Label Printing     Hệ thống phải in tem nội       P1          Should
                              bộ/LP/pallet label theo chuẩn              
                              mã định danh.                              
  --------------------------------------------------------------------------------

## 17.4. M04 -- Outbound

  --------------------------------------------------------------------------------
  **ID**   **Chức năng**      **Mô tả yêu cầu**              **Phase**   **Mức**
  -------- ------------------ ------------------------------ ----------- ---------
  FR-030   Reservation        WMS phải đặt chỗ tồn cho       P1          Must
                              SO/lệnh xuất trước khi pick.               

  FR-031   Allocation         Hệ thống phải phân bổ tồn theo P1          Must
                              rule vị trí/lô/chiến lược                  
                              pick.                                      

  FR-032   Pick Task          Hệ thống phải sinh pick task   P1          Must
                              cho thiết bị di động hoặc danh             
                              sách pick.                                 

  FR-033   Scan Confirm Pick  Mọi lần pick phải được xác     P1          Must
                              nhận bằng quét mã tại vị trí               
                              thực tế.                                   

  FR-034   Change Suggested   Người có quyền phải thay vị    P1          Should
           Source             trí hoặc lot gợi ý khi thực tế             
                              không lấy được.                            

  FR-035   Short Pick         Khi pick thiếu, hệ thống phải  P1          Must
                              ghi nhận short qty, reason                 
                              code và cập nhật chứng từ                  
                              xuất.                                      

  FR-036   FIFO/FEFO Rule     Hệ thống phải hỗ trợ cấu hình  P2          Should
                              FIFO và FEFO theo                          
                              item/warehouse policy.                     

  FR-037   Shipment           Sau khi hoàn tất pick/pack, hệ P1          Must
           Confirmation       thống phải chốt shipment và                
                              push kết quả sang ERP.                     
  --------------------------------------------------------------------------------

## 17.5. M05/M06/M07 -- Inventory, Count, Quality

  ----------------------------------------------------------------------------------
  **ID**   **Chức năng**        **Mô tả yêu cầu**              **Phase**   **Mức**
  -------- -------------------- ------------------------------ ----------- ---------
  FR-038   Inventory Ledger     Mỗi giao dịch phải ghi ledger  P1          Must
                                với transaction type, qty,                 
                                source, from/to location, user             
                                và timestamp.                              

  FR-039   Inventory On Hand    Hệ thống phải tính tồn hiện    P1          Must
                                tại theo warehouse +                       
                                location + item + lot +                    
                                serial + HU + status.                      

  FR-040   Internal Transfer    Hỗ trợ điều chuyển nội bộ giữa P1/P3       Should
                                vị trí và giữa kho (mở rộng                
                                multi-warehouse ở phase sau).              

  FR-041   Inventory Hold       Cho phép khóa tồn theo status  P2          Should
                                hold/block/QC để không sử dụng             
                                cho outbound.                              

  FR-042   Cycle Count Plan     Cho phép tạo kế hoạch kiểm kê  P2          Should
                                theo khu vực, item class hoặc              
                                định kỳ.                                   

  FR-043   Cycle Count Session  Cho phép mở phiên kiểm kê,     P2          Should
                                quét, so sánh và review chênh              
                                lệch.                                      

  FR-044   Adjustment Approval  Điều chỉnh tồn phải có reason  P2          Must
                                code và approval theo phân                 
                                quyền.                                     

  FR-045   Quality Order        Tạo lệnh kiểm tra chất lượng   P2          Should
                                cho line inbound cần QC hoặc               
                                vi phạm shelf-life.                        

  FR-046   Quarantine           Cho phép chuyển hàng sang      P2          Should
                                trạng thái hoặc khu vực                    
                                quarantine và release sau khi              
                                duyệt.                                     

  FR-047   Return/Disposition   Quản lý return receipt, return P2          Should
                                to vendor, scrap, rework và                
                                release theo disposition.                  
  ----------------------------------------------------------------------------------

## 17.6. M06 -- Dashboard & Reporting

  --------------------------------------------------------------------------------
  **ID**   **Chức năng**      **Mô tả yêu cầu**              **Phase**   **Mức**
  -------- ------------------ ------------------------------ ----------- ---------
  FR-048   Realtime Dashboard Dashboard phải hiển thị tồn    P1          Must
                              realtime, inbound/outbound                 
                              pending, cảnh báo và hiệu suất             
                              thao tác.                                  

  FR-049   Inventory Reports  Có báo cáo tồn tức thời, thẻ   P1          Must
                              kho, tồn theo vị trí, tồn theo             
                              lot/status.                                

  FR-050   Inbound Reports    Có báo cáo nhận đủ/thiếu/dư,   P1          Should
                              reject, backorder, lead time               
                              nhận hàng.                                 

  FR-051   Outbound Reports   Có báo cáo tỷ lệ pick đúng,    P1          Should
                              short pick, thời gian xử lý                
                              xuất.                                      

  FR-052   Count Reports      Có báo cáo chênh lệch kiểm kê, P2          Should
                              approval log, adjustment                   
                              history.                                   

  FR-053   Alert Center       Có cảnh báo tồn thấp, lệch     P1/P2       Should
                              nhập/xuất, sync fail, hàng cận             
                              date, task quá hạn.                        
  --------------------------------------------------------------------------------

# 18. Yêu cầu dữ liệu và mô hình logical

Để bảo đảm hệ thống có thể mở rộng nhưng không phá kiến trúc, mô hình
logical được đề xuất tách thành các lớp sau:

-   mdm -- Master data: Warehouse, Zone, Location, LocationProfile,
    Item, ItemBarcode, Uom, UomConversion, Supplier, Customer,
    InventoryStatus, ReasonCode, DispositionCode, ItemWarehousePolicy.

-   erp_stage -- Snapshot dữ liệu ERP: ErpSyncRun, ErpSyncError,
    ErpPurchaseOrderHeader/Line, ErpSalesOrderHeader/Line,
    ErpReferenceMap, ErpDocumentStatusHistory.

-   wms_core -- Tác nghiệp kho: HandlingUnit, HandlingUnitContent, Lot,
    SerialNumber, InboundReceiptHeader/Line, PutawayTask, PickTask,
    ShipmentHeader/Line, InventoryLedger, InventoryOnHand, Reservation,
    Allocation.

-   quality_control -- Chất lượng và kiểm kê: QualityOrder,
    QualityCheckResult, QuarantineOrder,
    CycleCountPlan/Session/Line/Review, ReturnReceipt,
    CountAdjustmentApproval.

-   integration_audit -- Tích hợp và audit: IntegrationInbox,
    IntegrationOutbox, IntegrationRetry, ApiCallLog, IdempotencyKey,
    AuditLog, UserDevice.

## 18.1. Ràng buộc dữ liệu cứng

-   Location(Code, WarehouseId) là unique.

-   HandlingUnit.Barcode là unique toàn hệ thống.

-   InventoryOnHand unique theo full dimension để tránh trùng tồn logic.

-   AcceptedQty + RejectedQty không được vượt ReceivedQty.

-   PickedQty không được vượt ReservedQty/AllocatedQty.

-   Lot có ExpiryDate bắt buộc nếu item dùng FEFO hoặc shelf-life rule.

-   Mọi bảng tác nghiệp phải có CreatedAt, UpdatedAt, CreatedBy,
    RowVersion.

# 19. Trạng thái và vòng đời chứng từ

  -----------------------------------------------------------------------
  **Đối tượng**     **Trạng thái đề xuất** **Ghi chú**
  ----------------- ---------------------- ------------------------------
  PO trên WMS       Pending Sync / Open /  Snapshot theo ERP và kết quả
                    Partially Received /   nhận thực tế.
                    Fully Received /       
                    Closed / Cancelled     

  Master Receipt /  Draft / In Progress /  Submitted là điểm kích hoạt
  Draft             Exception / Submitted  ledger + ERP push.
                    / Posted / Sync Failed 

  Putaway Task      Open / Assigned / In   Có thể phát sinh sau submit
                    Progress / Completed / inbound.
                    Cancelled              

  Pick Task         Open / Assigned / In   Short cần reason code và
                    Progress / Short /     approval nếu cần.
                    Completed / Cancelled  

  Cycle Count       Planned / Released /   Review bắt buộc trước
                    Counting / Pending     adjustment.
                    Review / Approved /    
                    Posted                 
  -----------------------------------------------------------------------

# 20. Yêu cầu giao diện người dùng

Giao diện phải tách rõ hai lớp:

  --------------------------------------------------------------------------
  **Ứng dụng**     **Người dùng chính**  **Yêu cầu giao diện**
  ---------------- --------------------- -----------------------------------
  Web Admin        Quản lý kho, kế toán, Dashboard, master data, cấu hình
                   admin, ERP team       quyền, theo dõi sync, phê duyệt
                                         ngoại lệ, báo cáo, audit log.

  Mobile/Scanner   Thủ kho, công nhân,   Tối ưu thao tác quét, font lớn, nút
  App              supervisor            rõ, tối đa 1--2 chạm cho thao tác
                                         chính, hỗ trợ ngoại lệ bằng action
                                         button nhanh.
  --------------------------------------------------------------------------

Đối với Draft Screen, yêu cầu bắt buộc là danh sách line trực quan, màu
trạng thái rõ, auto-fill cho tình huống chuẩn và công cụ tương tác nhanh
cho 20% case ngoại lệ.

# 21. Yêu cầu tích hợp

  ------------------------------------------------------------------------
  **ID**   **Interface**    **Dữ liệu chính**           **Yêu cầu**
  -------- ---------------- --------------------------- ------------------
  IF-01    ERP → WMS Item   Item, barcode, UoM, policy  Read-only / API;
           Sync                                         chạy theo lịch và
                                                        on-demand.

  IF-02    ERP → WMS PO     PO header, PO line, vendor, Chỉ lấy PO đã
           Sync             expected date               duyệt và còn mở.

  IF-03    ERP → WMS SO     SO header, SO line,         Dùng cho outbound
           Sync             customer, shipping info     work.

  IF-04    WMS → ERP GRN    Accepted/rejected/short qty Idempotent; phản
           Push             theo line                   hồi rõ status
                                                        thành công/thất
                                                        bại.

  IF-05    WMS → ERP        Actual ship qty, short,     Bảo đảm mapping
           Shipment Push    reason                      line để đối chiếu.

  IF-06    WMS ↔ Printer    Label template, HU/LP       Phải in được tem
                            barcode                     nội bộ ổn định.

  IF-07    WMS ↔            Barcode scan event, task    Cho phép
           Scanner/Mobile   payload                     offline-safe ở mức
                                                        retry và chống
                                                        double submit.
  ------------------------------------------------------------------------

# 22. Non-functional requirements

  ----------------------------------------------------------------------------
  **ID**   **Nhóm**         **Yêu cầu**                         **Mức**
  -------- ---------------- ----------------------------------- --------------
  NFR-01   Hiệu năng        Các thao tác quét và phản hồi line  Must
                            trên scanner phải gần thời gian     
                            thực trong điều kiện mạng nội bộ ổn 
                            định.                               

  NFR-02   Khả dụng         Hệ thống phải hỗ trợ retry an toàn  Must
                            khi thiết bị submit lại hoặc mạng   
                            chập chờn.                          

  NFR-03   Bảo mật          Phân quyền theo vai trò; các thao   Must
                            tác phê duyệt/điều chỉnh phải có    
                            audit trail.                        

  NFR-04   Toàn vẹn dữ liệu Không tạo ledger trùng, không tạo   Must
                            chứng từ push ERP trùng khi retry.  

  NFR-05   Khả năng truy    Mọi giao dịch phải truy được người  Must
           vết              thao tác, thiết bị, thời điểm và    
                            chứng từ nguồn.                     

  NFR-06   Dễ dùng          Scanner UI phải tối ưu cho thao tác Must
                            một tay, font rõ, nút lớn, ít nhập  
                            tay.                                

  NFR-07   Khả năng mở rộng Thiết kế dữ liệu phải sẵn cho       Should
                            lot/serial/status/multi-warehouse   
                            mà không phải đập mô hình.          

  NFR-08   Triển khai nội   Ưu tiên triển khai                  Should
           bộ               on-premise/intranet để tốc độ kết   
                            nối ERP nhanh và dữ liệu nằm trong  
                            doanh nghiệp.                       

  NFR-09   Giám sát         Có log ứng dụng, log tích hợp,      Should
                            correlation id và alert cho sync    
                            fail.                               

  NFR-10   Sao lưu/khôi     Có chính sách backup và phục hồi dữ Should
           phục             liệu theo chuẩn CNTT nội bộ.        
  ----------------------------------------------------------------------------

# 23. Acceptance criteria ở mức hệ thống

-   Người dùng có thể nhận hàng từ PO mở trên scanner mà không cần nhập
    tay lại item và số lượng chuẩn.

-   Tài liệu inbound cho phép xử lý đủ các case tối thiểu: đủ, thiếu,
    dư, lỗi, UoM mismatch và backorder.

-   Sau submit inbound, tồn kho và task putaway được tạo đúng; ERP nhận
    được kết quả push phù hợp.

-   Người dùng có thể tạo và hoàn tất outbound bằng scan-to-pick trên dữ
    liệu SO/lệnh xuất đã đồng bộ.

-   Dashboard hiển thị được tồn kho tức thời, giao dịch chờ xử lý và
    cảnh báo vận hành chính.

-   Kiểm kê scanner-based có thể phát hiện chênh lệch và yêu cầu review
    trước khi adjustment.

-   Audit trail có thể chứng minh ai làm gì, lúc nào, trên chứng từ nào.

# 24. Rủi ro triển khai và khuyến nghị

  --------------------------------------------------------------------------
  **ID**   **Rủi ro**        **Tác động**               **Khuyến nghị**
  -------- ----------------- -------------------------- --------------------
  R-01     Tài liệu ERP/API  Chậm tích hợp, khó mapping Chốt sớm data
           chưa đầy đủ       chứng từ                   dictionary,
                                                        endpoint, response
                                                        code, test data và
                                                        UAT environment.

  R-02     Thiếu rule ngoại  Go-live gặp case thực tế   Đưa exception
           lệ ngay từ đầu    nhưng hệ thống không xử lý scenario vào
                             được                       design/DB từ phase
                                                        phân tích.

  R-03     Scanner/mạng      Quét chậm, submit lặp,     Thiết kế
           không ổn định     user mất niềm tin          retry/idempotency và
                                                        log scan event.

  R-04     Thiếu ownership   BA chốt được luồng nhưng   Tổ chức workshop
           quy trình         vận hành không đồng thuận  theo module và
                                                        sign-off từng quy
                                                        trình.

  R-05     Dữ liệu master    Mismatch item/UoM/barcode  Làm data cleansing
           bẩn                                          trước pilot và có
                                                        quy trình quản trị
                                                        master.

  R-06     Không tách rõ     Dự án bị phình phạm vi     Khóa baseline P1;
           Core MVP và mở                               phần mở rộng để ở
           rộng                                         backlog có ưu tiên
                                                        rõ.
  --------------------------------------------------------------------------

# 25. Giả định và phụ thuộc

26. ERP FAST hoặc đối tác FAST cung cấp được API/spec/view/SP và môi
    trường UAT tối thiểu cho inbound/outbound.

27. Doanh nghiệp thống nhất quy tắc mã hàng, barcode, UoM và location
    naming convention trước khi pilot.

28. Thiết bị scanner/mobile và máy in tem có sẵn hoặc được chốt chuẩn
    phần cứng trước giai đoạn SIT/UAT.

29. Kho có quy trình nghiệp vụ đủ ổn định để chuẩn hóa thành role,
    approval và reason code.

30. Các rule tài chính như cách cấn trừ reject/shortage/backorder với
    ERP được chốt liên phòng ban.

# 26. Đề xuất backlog sau baseline

-   ASN đầy đủ và pre-receiving appointment.

-   Wave planning, packing, loading checklist và dock management.

-   FEFO bắt buộc theo expiry threshold và shelf-life contract.

-   Multi-warehouse / inter-branch transfer / owner inventory.

-   RFID, cân điện tử, IoT middleware, BI analytics nâng cao.

# 27. Kết luận

Bản BRD/SRS này chốt WMS như một hệ thống tác nghiệp kho độc lập, tích
hợp ERP FAST theo nguyên tắc an toàn -- không thay ERP, không can thiệp
sâu DB lõi, nhưng đủ mạnh để xử lý hiện trường kho thật bằng
barcode/mobile. Baseline này ưu tiên triển khai được ngay ở Core MVP,
đồng thời đã mở sẵn đường dữ liệu và nghiệp vụ cho giai đoạn mở rộng để
tránh phải đập lại kiến trúc sau này.

# PHỤ LỤC A -- Danh mục scenario inbound tối thiểu cần test

  ----------------------------------------------------------------------------
  **\#**   **Scenario**         **Kết quả mong đợi**      **Mức ưu tiên**
  -------- -------------------- ------------------------- --------------------
  1        Nhận đủ              Tất cả line tick xanh,    Must
                                submit thành công, tạo    
                                putaway, push GRN.        

  2        Nhận thiếu           Chốt partial receipt,     Must
                                sinh backorder, ERP nhận  
                                shortage.                 

  3        Nhận dư              Hard stop hoặc soft       Must
                                warning + approval.       

  4        Có hàng lỗi          Split line                Must
                                accepted/rejected, tạo    
                                RTV/disposition.          

  5        Unexpected item      Cảnh báo đỏ; chỉ xử lý    Must
                                nếu có exception flow.    

  6        UoM mismatch         Quy đổi đúng giữa đơn vị  Must
                                mua và đơn vị quét.       

  7        Substitute item      Supervisor map mã tương   Should
                                đương và lưu flag đối     
                                soát.                     

  8        Mixed pallet         Quét mù/rã pallet và      Should
                                match được về line phù    
                                hợp.                      

  9        Lot/expiry violation Line vào QA               Should
                                Hold/Quarantine, không    
                                release khả dụng.         

  10       Cross-docking        Nhận xong điều hướng      Could
                                thẳng sang outbound khi   
                                có nhu cầu nóng.          
  ----------------------------------------------------------------------------

# PHỤ LỤC B -- Từ điển thuật ngữ rút gọn

  --------------------------------------------------------------------------
  **Thuật ngữ**   **Tên đầy đủ**         **Diễn giải**
  --------------- ---------------------- -----------------------------------
  ERP FAST        Enterprise Resource    Hệ thống lõi quản lý tài chính, mua
                  Planning               và bán.

  WMS             Warehouse Management   Hệ thống tác nghiệp kho.
                  System                 

  PO              Purchase Order         Đơn đặt hàng mua từ nhà cung cấp.

  SO              Sales Order            Đơn bán/lệnh xuất hàng.

  GRN             Goods Receipt Note     Phiếu nhập kho xác nhận thực nhận.

  Draft           Bản nháp nghiệp vụ     Vùng đệm để đối chiếu trước khi
                                         submit.

  Backorder       Đơn/chặng giao bù      Phần số lượng còn nợ sau nhận
                                         thiếu.

  LP/HU           License Plate /        Mã định danh pallet/carton/đơn vị
                  Handling Unit          chứa.

  FIFO/FEFO       First In First Out /   Chiến lược lấy hàng theo thời gian
                  First Expired First    nhập hoặc hạn dùng.
                  Out                    

  QC/Quarantine   Quality Control /      Kiểm soát chất lượng / khu hoặc
                  Quarantine             trạng thái cách ly.
  --------------------------------------------------------------------------

# PHỤ LỤC C -- Danh mục tài liệu tham chiếu

-   Tài liệu Đặc tả Kỹ thuật & Nghiệp vụ Quy trình Nhận hàng Động
    (Dynamic Inbound) & Tích hợp ERP.

-   PhanTichDuAnWareHouseEPE.pdf -- roadmap và phạm vi triển khai 3
    phase.

-   EPE_Warehouse_Strategic_Upgrade.pdf -- định vị chiến lược, mô hình
    tích hợp và module lõi.

-   DacTaV2.docx -- tổng hợp BA/Solution/Database và các khuyến nghị mở
    rộng cần thiết.

-   Các phần khuyến nghị mở rộng trong bản này đã được chuẩn hóa lại từ
    tài liệu tổng hợp BA/DB để tăng độ phủ nghiệp vụ và độ bền của thiết
    kế.
