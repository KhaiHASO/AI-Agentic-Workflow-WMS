# Gemini Core Mandates for WmsBackend

Tài liệu này chứa các quy tắc bắt buộc mà AI (Gemini) phải tuân thủ trong mọi phiên làm việc trên dự án này.

## Mệnh lệnh cốt lõi cho Backend .NET Core:

1.  **QUY CHUẨN TRƯỚC KHI LÀM VIỆC:**
    - LUÔN LUÔN đọc `BACKEND_GUIDELINES.md` trước khi viết code hoặc thực hiện bất kỳ thay đổi cấu trúc nào.
    - TUÂN THỦ chặt chẽ các quy chuẩn về đặt tên (Naming Conventions) và kiến trúc (Architecture) đã được xác lập.

2.  **KHI TẠO ENTITY MỚI:**
    - Bắt buộc dùng kiểu dữ liệu chuẩn của C# cho SQL Server (Ví dụ: `decimal(18,4)` cho số lượng/tiền tệ).
    - Phải kế thừa `AuditEntity` để đảm bảo tính nhất quán về kiểm toán dữ liệu.
    - KHÔNG SỬ DỤNG Cascade Delete (Luôn đặt `DeleteBehavior.Restrict` trong Fluent API).

3.  **KHI TRUY VẤN DỮ LIỆU:**
    - Bắt buộc dùng `.AsNoTracking()` cho các tác vụ chỉ đọc (Read-only) để tối ưu hóa hiệu năng.
    - Luôn ưu tiên dùng `async/await` cho mọi thao tác I/O (Database, File, API call).

4.  **TÁCH BIỆT DỮ LIỆU & API:**
    - KHÔNG BAO GIỜ trả trực tiếp Entity ra ngoài API.
    - LUÔN LUÔN tạo DTO (Data Transfer Object) và thực hiện ánh xạ (Mapping) thông qua AutoMapper hoặc gán thủ công để kiểm soát dữ liệu đầu ra.
    - Đảm bảo API trả về đúng format Wrapper đã quy định trong guidelines (Success, StatusCode, Message, Data).

5.  **BẢO MẬT & INTEGRITY:**
    - Tuyệt đối không lưu secret, API key vào code (Sử dụng `appsettings.json` hoặc Environment Variables).
    - Mọi Transaction quan trọng phải hỗ trợ `IdempotencyKey` để tránh trùng lặp dữ liệu khi retry.
