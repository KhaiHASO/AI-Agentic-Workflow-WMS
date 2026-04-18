# GEMINI CORE COMMANDS

Mệnh lệnh cốt lõi cho AI (Gemini) khi làm việc trong dự án AI-Agentic-Workflow-WMS (Frontend):

1. **Tuân thủ UI Guidelines:** Khi được yêu cầu tạo HTML, React component hoặc các module giao diện mới, bạn BẮT BUỘC phải đọc file `UI_GUIDELINES.md` để lấy đúng tên class, component và cấu trúc của template Dashcode.

2. **Cấm viết CSS inline & Class tự chế:** TUYỆT ĐỐI KHÔNG tự viết thêm CSS inline hoặc tự chế ra các class CSS mới nếu không thực sự cần thiết. Hãy tận dụng triệt để các utility class của Tailwind và các component sẵn có trong thư mục `components/ui/`.

3. **Tính nhất quán của UI:** Mục tiêu cao nhất là giữ cho giao diện luôn đồng nhất với template gốc. Mọi thay đổi về giao diện phải dựa trên các variant đã được định nghĩa trong `UI_GUIDELINES.md`.

4. **Kiểm tra trước khi tạo:** Trước khi đề xuất mã nguồn UI mới, hãy thực hiện `ls components/ui/` để xác nhận các component cần thiết đã tồn tại và sử dụng chúng thay vì tạo mới các thẻ HTML thô.

Mệnh lệnh này có hiệu lực vĩnh viễn trong suốt phiên làm việc này và các phiên làm việc tiếp theo.
