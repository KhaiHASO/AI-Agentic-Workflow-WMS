# WMS Dashboard & Mobile Scanner

Hệ thống quản lý kho (WMS) tích hợp ERP FAST. Giải pháp bao gồm Web Admin dành cho quản lý và Mobile App dành cho nhân viên vận hành kho.

## Tính năng đã triển khai

### 1. Web Admin (Quản trị & Giám sát)
- **Dashboard tổng quan**: Theo dõi KPI, hiệu suất và robot theo thời gian thực.
- **Bản đồ kho SVG**: Sơ đồ trực quan các vị trí kệ hàng, robot và cảnh báo.
- **Bảng điều khiển đồng bộ ERP**: Theo dõi và thực hiện đồng bộ Master Data, PO, SO từ ERP FAST.
- **Báo cáo vận hành**: Danh sách và trạng thái hoạt động của đội ngũ Robot.

### 2. Mobile Scanner (Vận hành thực địa)
- **Giao diện tối ưu Mobile-first**: Thiết kế chuyên biệt cho màn hình 360px - 430px.
- **Quét hàng vào Draft (Scan-to-Draft)**: Tự động đối chiếu mã vạch với line PO.
- **Xử lý ngoại lệ**: Giao diện hiển thị trạng thái màu sắc rõ ràng (Xanh = Xong, Vàng = Một phần, Đỏ = Lỗi).
- **Luồng nghiệp vụ**: Hỗ trợ Nhập hàng, Cất hàng, Lấy hàng và Kiểm kê (Mock).

## Cài đặt & Chạy dự án

### Yêu cầu hệ thống
- Node.js v18+
- npm hoặc yarn

### Khởi tạo dự án
```bash
npm install
```

### Chạy chế độ phát triển
```bash
npm run dev
```
- Web Admin: `http://localhost:5173/`
- Mobile App: `http://localhost:5173/mobile` (Sử dụng Device Mode trong DevTools để giả lập điện thoại)

### Xây dựng bản sản xuất
```bash
npm run build
```

## Cấu trúc thư mục
- `src/components/mobile/`: Các màn hình và layout cho ứng dụng scanner.
- `src/data/`: Chứa `mockData.js` và `mockApi.js` giả lập dữ liệu và logic backend.
- `src/styles/`: Quản lý CSS cho cả Web (`app.css`) và Mobile (`mobile.css`).

## Ghi chú bàn giao
- Hệ thống sử dụng dữ liệu giả lập (Mock Data) hoàn toàn, không yêu cầu API backend thật.
- Giao diện được thiết kế theo phong cách SaaS cao cấp, sử dụng Bootstrap 5 và Lucide Icons.
- Đã việt hóa 100% các thành phần giao diện.
