# Backend .NET Core Guidelines - WmsBackend

Tài liệu này quy định các tiêu chuẩn kiến trúc và lập trình cho phần Backend của hệ thống WMS.

## 1. Mẫu Kiến Trúc (Architectural Pattern)
- **Hiện tại:** Controller-DbContext (Sử dụng DbContext trực tiếp trong Controller).
- **Hướng tới:** Clean Architecture / Repository Pattern (Tách biệt logic xử lý qua Service Layer và truy cập dữ liệu qua Repository Layer).
- **Controllers:** Chỉ đóng vai trò tiếp nhận request, gọi Service và trả về kết quả. Không chứa logic nghiệp vụ phức tạp.

## 2. Cấu hình DbContext & Entities
- **DbContext:** Sử dụng EF Core với SQL Server. Mọi cấu hình quan trọng (Unique Indexes, Foreign Keys, Precision) phải được đặt trong `OnModelCreating` (Fluent API) của `WmsDbContext`.
- **Entities:**
    - Phải kế thừa `AuditEntity` để tự động quản lý thông tin audit và `RowVersion` (Concurrency).
    - Sử dụng Data Annotations cho các ràng buộc cơ bản (`[Required]`, `[StringLength]`).
    - Dùng kiểu `decimal(18,4)` cho số lượng và các trường định lượng khác (trừ khi có yêu cầu khác).
    - Tuyệt đối không sử dụng Cascade Delete (luôn đặt `DeleteBehavior.Restrict`).

## 3. API Response Format
- **Quy tắc:** Mọi API nên trả về một cấu trúc đồng nhất để Frontend dễ xử lý.
- **Cấu trúc đề xuất (Wrapper):**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Thành công",
  "data": { ... }
}
```
- **Xử lý lỗi:** Sử dụng Global Exception Handling để bắt lỗi và trả về StatusCode phù hợp kèm thông báo lỗi chi tiết (trong môi trường Dev).

## 4. Quản lý Dependency Injection (DI)
- **DbContext:** Scoped (Mặc định).
- **Services:** Scoped (Dành cho logic nghiệp vụ).
- **Repositories:** Scoped (Dành cho truy cập dữ liệu).
- **Utils/Helpers:** Singleton hoặc Transient tùy mục đích.

## 5. Tiêu chuẩn Truy vấn & Thao tác Dữ liệu
- **Read-only:** Luôn sử dụng `.AsNoTracking()` để tối ưu bộ nhớ.
- **Async/Await:** Bắt buộc sử dụng cho mọi thao tác I/O (Database, File, External API).
- **DTOs:** Không trả Entity trực tiếp ra API. Sử dụng DTO để giới hạn dữ liệu trả về và bảo mật thông tin nội bộ hệ thống.
