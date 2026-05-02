Tôi đã gom lại 4 tài liệu và chốt ra một **bản đặc tả tổng hợp WMS**
theo hướng BA/Solution, ưu tiên **bao phủ nghiệp vụ thực tế**, đồng thời
tách rõ phần nào là **đã thể hiện khá rõ trong tài liệu** và phần nào là
**nên đặc tả bổ sung để triển khai không bị hổng**.

# 1. Định vị hệ thống

Hệ thống này nên được chốt là một **WMS tác nghiệp độc lập**, đứng như
một **vệ tinh quanh ERP FAST**. ERP FAST tiếp tục là nơi giữ dữ liệu tài
chính, mua hàng, bán hàng và chứng từ kế toán; còn WMS chịu trách nhiệm
xử lý thực địa tại kho: quét barcode, nhận hàng, putaway, xuất hàng,
kiểm kê và dashboard tồn kho thời gian thực. WMS không nên thay ERP,
cũng không nên ghi trực tiếp vào database lõi của ERP; hướng tích hợp an
toàn nhất là **đọc dữ liệu qua sync/read-only view** và **ghi kết quả
chuẩn hóa ngược về ERP qua API hoặc stored procedure**.

Từ slide chiến lược và kế hoạch dự án, có thể xem bộ giải pháp cốt lõi
hiện tại gồm 6 mảng chính: **đồng bộ ERP, quản lý vị trí kho, nhập kho
bằng barcode, xuất kho theo SO, kiểm kê bằng mobile scanner và dashboard
quản trị**. Đây là khung sản phẩm lõi, sau đó mới mở rộng sang batch,
shelf-life, smart putaway, smart picking, đa kho và tự động hóa ở các
phase sau.

# 2. Mục tiêu nghiệp vụ của phần mềm

Mục tiêu nghiệp vụ thực chất của WMS này không phải chỉ là "ghi nhận
nhập xuất", mà là:

-   chuẩn hóa toàn bộ thao tác kho bằng barcode/scanner;

-   giảm sai sót nhập kho, xuất kho, kiểm kê;

-   quản lý chính xác **vị trí -- lô -- số lượng -- trạng thái hàng**;

-   cho phép kho xử lý thực tế hỗn loạn nhưng ERP vẫn nhận dữ liệu sạch
    để đối soát;

-   hỗ trợ vận hành nhanh tại hiện trường, nơi công nhân gần như không
    có thời gian gõ phím.

Nói ngắn gọn, WMS này phải giải quyết bài toán: **thực tế kho rất linh
hoạt, còn ERP rất cứng**. "Bản nháp Draft" chính là vùng đệm để hòa giải
hai thế giới đó.

# 3. Phạm vi đặc tả tổng hợp theo phân hệ

**3.1. Phân hệ nền tảng và dữ liệu gốc**

Phân hệ nền tảng phải bao gồm ít nhất: quản lý tài khoản, vai trò,
quyền; danh mục hàng hóa; barcode của hàng; đơn vị tính và quy đổi đơn
vị tính; nhà cung cấp; khách hàng; cấu trúc kho, zone, dãy, tầng, ô;
thuộc tính vị trí; trạng thái tồn kho; mã lý do và mã disposition. Trong
kế hoạch Phase 1, nhóm này đã được nêu rõ qua các hạng mục **User & Role
Management, Product Master, Location/Layout Management**.

Đặc tả BA trong DacTaV2.docx còn đi sâu hơn và đề xuất bộ master data
đầy đủ hơn gồm Warehouse, Zone, Location, LocationProfile,
LocationCapacity, Item, ItemBarcode, Uom, UomConversion, Supplier,
Customer, InventoryStatus, ReasonCode, DispositionCode,
ItemWarehousePolicy. Hướng này hợp lý vì kho thực tế sẽ không bền nếu
chỉ có vài bảng "Item -- PO -- Receipt" đơn giản.

Điểm quan trọng phải khóa cứng ngay từ đặc tả là:

-   một item có thể có **nhiều barcode**;

-   vị trí có thể có quy tắc **cho/không cho trộn item, trộn lot, trộn
    status**;

-   item có thể có **lot control, serial control, shelf-life, chiến lược
    pick FIFO/FEFO, yêu cầu QC khi inbound**.

**3.2. Phân hệ tích hợp ERP**

Luồng tích hợp chuẩn được mô tả rất rõ: ERP xử lý PR/PO/SO và phê duyệt;
WMS **kéo** các chứng từ mở về để tác nghiệp; sau khi kho xác nhận xong
thì WMS **đẩy** kết quả thực nhận/thực xuất ngược lại ERP. Đây là thiết
kế hai chiều theo mô hình Pull/Push.

Ở mức đặc tả phần mềm, phân hệ này nên gồm:

-   đồng bộ master data từ ERP;

-   đồng bộ PO mở cho inbound;

-   đồng bộ SO/lệnh xuất cho outbound;

-   lưu snapshot cục bộ để scanner không phải gọi ERP realtime;

-   push GRN/phiếu xuất/điều chỉnh về ERP;

-   log đồng bộ, retry, chống gửi trùng, audit.

Trong bản đề xuất BA, nhóm erp_stage và integration_audit là hai lớp rất
nên có: một lớp để giữ snapshot chứng từ ERP, một lớp để ghi lại
IntegrationInbox, IntegrationOutbox, IntegrationRetry, ApiCallLog,
IdempotencyKey, AuditLog. Đây là phần tài liệu gốc chưa đặc tả sâu,
nhưng nếu không có thì triển khai thực tế rất dễ vỡ khi scanner mất
mạng, submit lặp hoặc ERP phản hồi chậm.

**3.3. Phân hệ quản lý vị trí kho**

Đây là một phân hệ lõi chứ không phải phụ. Slide giải pháp và roadmap
đều coi **Location Management** là một trong những module nền tảng.

Đặc tả nên bao gồm:

-   sơ đồ kho theo cấp: kho → zone → dãy → tầng → ô;

-   loại vị trí: nhận hàng, lưu trữ, picking, staging, quarantine;

-   sức chứa theo pallet/khối lượng/thể tích;

-   cờ cho phép nhận, cho phép pick, cho phép quarantine;

-   quy tắc trộn hàng, trộn lot, trộn trạng thái;

-   gợi ý putaway theo năng lực chứa và chính sách item.

# 4. Đặc tả luồng nhập kho

Đây là phần tài liệu mạnh nhất và rõ nhất.

**4.1. Luồng nhập kho chuẩn**

Luồng nhập kho tổng quát là:

1.  WMS đồng bộ PO mở từ ERP.

2.  Khi xe tới kho, thủ kho chọn nhà cung cấp hoặc định danh chuyến.

3.  Hệ thống gom toàn bộ PO liên quan thành một **Master Receipt**.

4.  Thủ kho quét hàng vào **Draft Screen**.

5.  Hệ thống tự đối chiếu mã, số lượng, UoM, lot.

6.  Thủ kho xử lý ngoại lệ trực tiếp trên Draft.

7.  Bấm Submit.

8.  Hệ thống tạo tồn kho, sinh task putaway, push GRN về ERP, đồng thời
    tạo backorder cho phần còn nợ.

**4.2. Cơ chế nhận hàng động qua Draft**

Điểm khác biệt lớn nhất của giải pháp này là **Dynamic Receiving via
Draft**. Bản Draft đóng vai trò vùng đệm, nơi dữ liệu quét được lưu tạm,
đối chiếu, chỉnh sửa và chuẩn hóa trước khi "chốt sổ". Nhờ vậy, hiện
trường kho được phép linh hoạt, còn dữ liệu gửi ERP vẫn sạch.

Luồng này gồm 3 giai đoạn:

**Giai đoạn 1 -- Gom chuyến vận chuyển**: khi một xe có thể chở hàng của
nhiều PO, WMS sẽ gom các PO mở của cùng nhà cung cấp, kể cả phần
backorder từ chuyến trước, thành một phiếu tổng để xử lý cùng lúc.

**Giai đoạn 2 -- Scan to Draft**: thủ kho quét liên tục trên
scanner/tablet; dữ liệu scan đổ vào Draft; hệ thống tự match vào line
tương ứng; line nào đủ thì tick xanh; line nào lệch thì chờ xử lý ngoại
lệ.

**Giai đoạn 3 -- Submit & Backorder**: khi Submit, hệ thống vừa ghi tăng
tồn kho và tạo putaway, vừa đẩy GRN về ERP, vừa bóc tách phần còn thiếu
sang trạng thái backorder để chuyến sau gom tiếp.

**4.3. 10 kịch bản inbound phải đặc tả**

Tài liệu nhận hàng động đã đi rất sát thực tế và nên được đưa nguyên
tinh thần này vào đặc tả nghiệp vụ chính thức.

**Nhóm số lượng**

1 Nhận đủ.

2 Nhận thiếu/nhận nhiều đợt và sinh backorder.

3 Nhận dư, với hai cơ chế cấu hình: hard stop hoặc soft warning có PIN
quản lý.

**Nhóm chất lượng và định danh**\
4 Có hàng lỗi, phải tách dòng giữa hàng đạt và hàng reject/RTV.\
5 Hàng không có trong PO.\
6 Lệch đơn vị tính, cần bảng quy đổi UoM.\
7 Hàng thay thế, cần cơ chế "mã tương đương" có supervisor duyệt.

**Nhóm tối ưu vận hành**\
8 Mixed pallet/deconsolidation: một pallet chứa nhiều item, nhiều PO.\
9 Vi phạm lot/shelf-life: đủ số lượng nhưng phải giữ ở QA Hold.\
10 Cross-docking: nhận xong chuyển thẳng ra outbound mà không putaway.

# 5. Đặc tả UI/UX hiện trường kho

UI/UX phải được đặc tả như một yêu cầu nghiệp vụ, không chỉ là yêu cầu
giao diện. Tài liệu nêu rất rõ rằng công nhân kho không có thời gian gõ
phím, nên màn hình scanner/tablet phải đặt **hành vi quét mã** làm trung
tâm. Draft Area là vùng hiển thị chính; mỗi lần "bíp" thì dữ liệu tự vào
Draft; 80% tình huống được auto-fill, 20% ngoại lệ xử lý bằng nút nhanh,
context menu và thao tác chạm trực tiếp trên từng line.

Những thao tác UI cần đặc tả thành chức năng rõ ràng gồm:

-   tick hoàn tất line;

-   split line;

-   đổi trạng thái xanh/đỏ/vàng;

-   chọn reason/disposition;

-   chuyển đổi mã tương đương;

-   xác nhận partial receipt;

-   xác nhận over-receipt bằng PIN quản lý;

-   popup cross-docking.

Song song đó, kế hoạch dự án cũng đã tách rõ **Web Admin cho quản lý/kế
toán** và **Mobile/Scanner Web App cho thủ kho/công nhân**, nên khi viết
đặc tả phải tách 2 lớp trải nghiệm này ra riêng.

# 6. Đặc tả luồng xuất kho

Tài liệu chiến lược và roadmap cho thấy outbound của hệ thống đi theo
logic: ERP gửi SO/lệnh xuất, WMS xử lý scan-to-pick, gợi ý vị trí lấy
theo quy tắc, xác nhận bằng quét mã, rồi trả kết quả về ERP. Ở mức nâng
cao, hệ thống sẽ có thêm smart picking và FIFO/FEFO.

Đặc tả outbound nên gồm:

-   nhận SO/lệnh xuất từ ERP;

-   reservation và allocation tồn;

-   tạo wave hoặc pick task;

-   gợi ý vị trí lấy, lô lấy;

-   quét xác nhận pick;

-   xử lý thiếu hàng;

-   cho phép đổi lot/vị trí khi thực tế khác đề xuất;

-   gom shipment và đẩy phiếu xuất về ERP.

Phần BA đề xuất thêm các ngoại lệ bắt buộc phải nghĩ trước: pick thiếu,
vị trí gợi ý hết hàng nhưng vị trí khác còn, thay lot, giao nhiều đợt,
SO bị ERP sửa/hủy khi đang pick, và FEFO cho hàng có hạn dùng. Phần này
là **bổ sung hợp lý** để đặc tả hoàn chỉnh hơn tài liệu gốc.

# 7. Đặc tả tồn kho và sổ giao dịch

Một điểm rất đúng trong DacTaV2.docx là **tồn kho không nên chỉ lưu một
bảng số dư**, mà phải có **inventory ledger bất biến**. Mọi nhập, xuất,
chuyển vị trí, kiểm kê, hold, quarantine đều phải sinh transaction; bảng
tồn hiện tại chỉ là snapshot tổng hợp để truy vấn nhanh.

Tồn kho nên được quản lý theo tổ hợp chiều: **Warehouse + Location +
Item + Lot + Serial + Handling Unit + Inventory Status + Owner**. Đây là
mức chi tiết giúp hệ thống đủ sức chịu ngoại lệ thực tế, nhất là khi có
mixed pallet, QC hold, quarantine, FEFO hoặc multi-warehouse về sau.

Về mặt chức năng, phân hệ tồn kho nên bao gồm:

-   tồn tức thời;

-   thẻ kho/ledger;

-   hold/block/unavailable;

-   điều chuyển nội bộ;

-   replenishment;

-   reservation/allocation cho outbound;

-   cảnh báo thiếu tồn, tồn bất thường, tồn bị khóa.

# 8. Đặc tả batch, shelf-life, quality, quarantine

Trong roadmap, Phase 2 đã đưa rõ **Batch & Shelf-life Management**, quản
lý trạng thái chất lượng của lô hàng, smart putaway, smart picking,
cycle counting và integration API. Nghĩa là đây không phải ý tưởng ngoài
lề, mà là hướng mở rộng chính thức.

Tài liệu inbound đã mô tả rất cụ thể trường hợp hàng đúng mã, đủ số
lượng nhưng vi phạm hạn sử dụng thì phải chuyển sang **QA Hold**, không
cho putaway lên khu khả dụng. Đây là bằng chứng rất rõ rằng hệ thống cần
có **inventory status**, **quality decision** và **quarantine flow**.

Bản BA đề xuất thêm các nhóm bảng QualityOrder, QualityCheckResult,
QuarantineOrder, ReturnReceipt, ReturnDisposition. Tôi xem đây là phần
nên đưa vào đặc tả mở rộng ngay từ đầu, dù triển khai phase đầu có thể
dùng một phần. Làm vậy sẽ tránh chuyện phase 1 xong rồi phase 2 phải đập
lại model dữ liệu.

# 9. Đặc tả kiểm kê

Kiểm kê đã xuất hiện ở cả slide giải pháp, roadmap phase 1 và phase 2.
Phase 1 có kiểm kê/tồn kho cơ bản; phase 2 đi sâu vào cycle counting,
quét QR và inventory adjustment.

Đặc tả nên chia ít nhất thành:

-   full stocktake;

-   cycle count;

-   blind count;

-   guided count;

-   spot count;

-   review chênh lệch;

-   approval điều chỉnh tồn;

-   khóa vị trí khi đang kiểm kê;

-   ghi ledger adjustment sau khi duyệt.

# 10. Dashboard và báo cáo quản trị

Dashboard không chỉ là phần hiển thị đẹp mà là lớp kiểm soát vận hành.
Tài liệu chiến lược nhấn mạnh dashboard thời gian thực, tồn kho
realtime, biểu đồ hiệu suất thao tác kho và cảnh báo tỷ lệ sai lệch
nhập/xuất.

Ở mức đặc tả, dashboard nên có:

-   tồn hiện tại theo vị trí, item, lot, status;

-   đơn hàng chờ xử lý;

-   tỷ lệ hoàn thành nhập/xuất;

-   tỷ lệ lệch nhập, lệch xuất;

-   hiệu suất theo ca, theo nhân sự, theo khu kho;

-   số lượng hàng hold/quarantine;

-   backorder đang treo;

-   thời gian xử lý trung bình của inbound/outbound.

# 11. Ràng buộc dữ liệu và nguyên tắc kỹ thuật

Đây là phần tôi đánh giá rất quan trọng để bản đặc tả đủ "thi công
được".

Các nguyên tắc nên chốt:

-   ERP là source of truth cho tài chính, WMS không gánh kế toán.

-   WMS làm việc trên snapshot cục bộ của chứng từ ERP.

-   Tích hợp phải idempotent.

-   Mobile scan phải truy vết được sự kiện thô để chống double submit.

-   Dữ liệu tồn phải có ledger và snapshot.

Các ràng buộc nên khóa cứng:

-   Location(Code, WarehouseId) unique;

-   HandlingUnit.Barcode unique toàn hệ thống;

-   ItemBarcode không được trùng theo quy tắc đã chọn;

-   InventoryOnHand unique theo full dimension;

-   không cho AcceptedQty + RejectedQty \> ReceivedQty;

-   không cho PickedQty \> ReservedQty;

-   không cho xuất từ status hold/QC/blocked;

-   lot chạy FEFO thì expiry date là bắt buộc.

# 12. Lộ trình triển khai nên hiểu như thế nào

**Phase 1 -- Core MVP**

Bao gồm: quản trị tài khoản và phân quyền, product master, sơ đồ kho,
nhập kho, sinh barcode/QR, xuất kho, scan to pick, inventory ledger, tồn
kho realtime, cảnh báo tồn, thiết kế kiến trúc, database, UI/UX, API
spec, testing và UAT. Đây là phần tối thiểu để hệ thống chạy được ở kho
thật.

**Phase 2 -- Tối ưu vận hành và kiểm soát nâng cao**

Bổ sung batch/shelf-life, chất lượng lô, smart putaway, quản lý
capacity, smart picking, FIFO/FEFO, cycle counting, inventory adjustment
và integration API chuẩn hóa. Đây là phase giúp WMS chuyển từ "đã chạy
được" sang "chạy tốt và bền".

**Phase 3 -- Mở rộng và tự động hóa**

Bao gồm đa kho, điều chuyển nội bộ, IoT/hardware integration, reverse
logistics/rework, BI analytics, edge middleware, cân điện tử, RFID,
pilot, training, deployment. Đây là phase mở rộng quy mô và tự động hóa
vận hành.

# 13. Bản đặc tả tổng hợp nên chốt lại như sau

Nếu viết lại thành một tài liệu đặc tả hoàn chỉnh, tôi sẽ chốt **phần
mềm WMS này** là:

**Một hệ thống quản trị kho độc lập, tích hợp ERP FAST theo mô hình
đọc-sync và ghi-kết-quả chuẩn hóa, vận hành hiện trường bằng
barcode/mobile/scanner, quản lý tồn kho theo vị trí và trạng thái chi
tiết, hỗ trợ dynamic inbound qua Draft, scan-to-pick cho outbound, kiểm
kê scanner-based, dashboard realtime, đồng thời có nền dữ liệu đủ mạnh
để mở rộng sang batch, shelf-life, quality/quarantine, smart putaway,
FEFO, multi-warehouse và IoT trong các giai đoạn tiếp theo.**

Phần tài liệu hiện có **đã rất mạnh ở inbound, tích hợp ERP và lộ trình
module**. Phần còn thiếu để thành một bộ đặc tả "đi làm dự án thật" là
cần viết đầy đủ hơn cho:

-   use case theo vai trò;

-   danh sách trạng thái chứng từ;

-   rule chuyển trạng thái;

-   chi tiết outbound;

-   quality/quarantine/returns;

-   API contract request/response;

-   ERD và data dictionary chính thức;

-   danh sách test scenario/UAT.

Bước tiếp theo phù hợp nhất là tôi viết luôn cho bạn **bộ SRS/BRD hoàn
chỉnh theo chương mục chuẩn**, để bạn có thể dùng trực tiếp cho phân
tích, thiết kế, giao dev và test.
