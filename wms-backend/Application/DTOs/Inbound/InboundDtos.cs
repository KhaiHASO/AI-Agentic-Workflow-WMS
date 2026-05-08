using System.ComponentModel.DataAnnotations;

namespace WmsBackend.Application.DTOs.Inbound
{
    /// <summary>
    /// Thông tin để khởi tạo một bản nháp chứng từ nhập kho (Master Receipt).
    /// </summary>
    public class CreateMasterReceiptDto
    {
        /// <summary>
        /// ID của kho thực hiện nhập hàng. Ví dụ: 1 (Kho chính)
        /// </summary>
        /// <example>1</example>
        [Required] public int WarehouseId { get; set; }

        /// <summary>
        /// ID nhà cung cấp (tùy chọn).
        /// </summary>
        /// <example>5</example>
        public int? SupplierId { get; set; }

        /// <summary>
        /// Số chứng từ nhập (nếu để trống hệ thống sẽ tự sinh định dạng RECV-yyyyMMdd-XXXX).
        /// </summary>
        /// <example>RECV-20260418-001</example>
        public string? ReceiptNo { get; set; }

        /// <summary>
        /// Số tham chiếu từ hệ thống ERP hoặc Bill of Lading.
        /// </summary>
        /// <example>BL-998877</example>
        public string? ExternalRefNo { get; set; }
    }

    /// <summary>
    /// Thông tin chi tiết của Master Receipt hiển thị trên giao diện.
    /// </summary>
    public class MasterReceiptDto
    {
        public int Id { get; set; }
        public string ReceiptNo { get; set; } = string.Empty;
        /// <summary>
        /// Trạng thái: Draft, Submitted, PutawayPending, Closed
        /// </summary>
        public string Status { get; set; } = string.Empty;
        public int WarehouseId { get; set; }
        public int? SupplierId { get; set; }
        public string? SupplierName { get; set; }
        public DateTime CreatedAt { get; set; }
        public List<DraftLineDto> Lines { get; set; } = new();
    }

    /// <summary>
    /// Chi tiết từng dòng hàng trong bản nháp nhập kho.
    /// </summary>
    public class DraftLineDto
    {
        public int Id { get; set; }
        public int ItemId { get; set; }
        public string ItemCode { get; set; } = string.Empty;
        public string ItemName { get; set; } = string.Empty;
        /// <summary>
        /// Số lượng dự kiến nhập theo PO.
        /// </summary>
        public decimal ExpectedQty { get; set; }
        /// <summary>
        /// Số lượng thực tế đã quét được.
        /// </summary>
        public decimal ReceivedQty { get; set; }
        public string Status { get; set; } = string.Empty;
        public int? PoLineId { get; set; }
        public int? UomId { get; set; }
        public string? UomName { get; set; }
    }

    /// <summary>
    /// Dữ liệu gửi lên khi PDA quét một mã vạch.
    /// </summary>
    public class ScanEventDto
    {
        /// <summary>
        /// Mã vạch đã quét (Item Barcode hoặc Handling Unit Barcode).
        /// </summary>
        /// <example>DELLXPS001</example>
        [Required] public string Barcode { get; set; } = string.Empty;

        /// <summary>
        /// Số lượng quét. Mặc định là 1.
        /// </summary>
        /// <example>10.5</example>
        public decimal Qty { get; set; } = 1;

        /// <summary>
        /// ID vị trí quét (nếu cần chỉ định vị trí staging cụ thể).
        /// </summary>
        public int? LocationId { get; set; }

        /// <summary>
        /// ID người thực hiện quét.
        /// </summary>
        public int? UserId { get; set; }

        /// <summary>
        /// Mã giao dịch duy nhất từ Client để tránh trùng lặp khi retry mạng yếu.
        /// </summary>
        /// <example>UUID-123-456-789</example>
        public string? ClientTxnId { get; set; }
    }

    /// <summary>
    /// Kết quả sau khi chốt (Submit) bản nháp nhập kho.
    /// </summary>
    public class SubmitDraftResultDto
    {
        public bool Success { get; set; }
        public int ReceiptId { get; set; }
        public string ReceiptNo { get; set; } = string.Empty;
        /// <summary>
        /// Số lượng nhiệm vụ cất hàng đã được tự động khởi tạo.
        /// </summary>
        public int PutawayTaskCount { get; set; }
    }
}
