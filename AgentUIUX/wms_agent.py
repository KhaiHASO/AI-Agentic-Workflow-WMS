import asyncio
from browser_use import Agent, ChatOpenAI

async def main():
    # 1. Cấu hình trỏ về Local Server của Ollama (OpenAI compatible)
    llm = ChatOpenAI(
        base_url="http://localhost:11434/v1",
        api_key="ollama", 
        model="gemma4:26b", 
        temperature=0.0
    )

    # 2. Định nghĩa nhiệm vụ cụ thể cho dự án WMS
    task = """
    Bạn là một kỹ sư kiểm thử tự động cao cấp. Hãy thực hiện khám phá toàn diện ứng dụng tại http://localhost:3000:
    1. Tự động tìm kiếm và click vào TẤT CẢ các menu, nút bấm, và liên kết có thể tương tác được.
    2. Đi sâu vào từng phân hệ (Inbound, Outbound, Inventory, Settings, v.v.).
    3. Với mỗi trang, hãy ghi nhận:
       - Luồng đi (User Flow).
       - Cấu trúc giao diện (UI Components).
       - Các trường dữ liệu (Form fields) và kiểu dữ liệu mẫu.
       - Các chức năng/nút bấm khả dụng.
    4. Thử thực hiện các thao tác cơ bản như xem chi tiết, đóng/mở modal.
    5. ĐẶC BIỆT: Tổng hợp một báo cáo chi tiết 'wms_comprehensive_report.md' bao gồm:
       - Sơ đồ luồng ứng dụng.
       - Danh sách các màn hình và chức năng chi tiết của từng màn hình.
       - Đánh giá về trải nghiệm người dùng (UX) và độ hoàn thiện của UI.
       - Đề xuất cải thiện (nếu có).
    """

    # 3. Khởi tạo và chạy Agent
    agent = Agent(
        task=task,
        llm=llm,
        use_vision=False, # Tắt vision để giảm tải cho GPU local nếu không cần thiết
        llm_timeout=300, # Tăng timeout lên 5 phút cho local LLM
        step_timeout=600,
        enable_planning=False # Tắt planning để output của LLM ngắn gọn hơn
    )

    print("🚀 Bắt đầu chạy Agent tự mò luồng...")
    result = await agent.run()
    
    print("\n✅ Hoàn tất! Kết quả tổng hợp từ Agent:")
    print(result)

if __name__ == "__main__":
    asyncio.run(main())
