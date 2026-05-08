using Microsoft.AspNetCore.Mvc;
using WmsBackend.Application.Common;
using WmsBackend.Application.DTOs.Inbound;
using WmsBackend.Application.Services.Inbound;

namespace WmsBackend.Controllers
{
    /// <summary>
    /// Quản lý nghiệp vụ Nhập kho (Inbound).
    /// Hỗ trợ luồng: Tạo chứng từ nháp -> Quét hàng (PDA) -> Chốt số liệu -> Sinh nhiệm vụ cất hàng.
    /// </summary>
    [Route("wms/v1/inbound")]
    [ApiController]
    [Produces("application/json")]
    public class InboundController : ControllerBase
    {
        private readonly IInboundService _inboundService;

        public InboundController(IInboundService inboundService)
        {
            _inboundService = inboundService;
        }

        /// <summary>
        /// Khởi tạo một Master Receipt mới.
        /// </summary>
        /// <param name="dto">Thông tin kho và nhà cung cấp.</param>
        /// <returns>Thông tin chứng từ vừa tạo.</returns>
        /// <response code="200">Tạo thành công.</response>
        /// <response code="400">Dữ liệu đầu vào không hợp lệ.</response>
        [HttpPost("master-receipts")]
        [ProducesResponseType(typeof(ApiResponse<MasterReceiptDto>), 200)]
        public async Task<ActionResult<ApiResponse<MasterReceiptDto>>> CreateMasterReceipt(CreateMasterReceiptDto dto)
        {
            var result = await _inboundService.CreateMasterReceiptAsync(dto);
            return result.Success ? Ok(result) : BadRequest(result);
        }

        /// <summary>
        /// Đổ dữ liệu từ đơn mua hàng (Purchase Order) của ERP vào chứng từ nhập kho.
        /// </summary>
        /// <param name="masterReceiptId">ID của Master Receipt.</param>
        /// <param name="poHeaderId">ID của PO từ ERP.</param>
        /// <returns>Trạng thái thực hiện.</returns>
        [HttpPost("master-receipts/{masterReceiptId}/import-po")]
        [ProducesResponseType(typeof(ApiResponse<bool>), 200)]
        public async Task<ActionResult<ApiResponse<bool>>> ImportOpenPo(int masterReceiptId, [FromBody] int poHeaderId)
        {
            var result = await _inboundService.ImportPoToDraftAsync(masterReceiptId, poHeaderId);
            return result.Success ? Ok(result) : BadRequest(result);
        }

        /// <summary>
        /// Ghi nhận một sự kiện quét mã vạch hàng hóa từ thiết bị PDA.
        /// </summary>
        /// <remarks>
        /// PDA sẽ gửi mã vạch quét được lên, hệ thống tự động tìm dòng hàng tương ứng trong Draft để cộng dồn số lượng.
        /// </remarks>
        /// <param name="masterReceiptId">ID của Master Receipt đang thực hiện quét.</param>
        /// <param name="dto">Dữ liệu quét mã vạch.</param>
        [HttpPost("master-receipts/{masterReceiptId}/scan")]
        [ProducesResponseType(typeof(ApiResponse<bool>), 200)]
        public async Task<ActionResult<ApiResponse<bool>>> RecordDraftScanEvent(int masterReceiptId, ScanEventDto dto)
        {
            var result = await _inboundService.RecordScanEventAsync(masterReceiptId, dto);
            return result.Success ? Ok(result) : BadRequest(result);
        }

        /// <summary>
        /// Chốt số liệu nhập kho (Submit Draft).
        /// </summary>
        /// <remarks>
        /// Hành động này sẽ:
        /// 1. Khóa chứng từ nháp.
        /// 2. Ghi tăng tồn kho tại vị trí Staging.
        /// 3. Tự động sinh các nhiệm vụ cất hàng (Putaway Tasks).
        /// </remarks>
        /// <param name="masterReceiptId">ID của Master Receipt.</param>
        [HttpPost("master-receipts/{masterReceiptId}/submit")]
        [ProducesResponseType(typeof(ApiResponse<SubmitDraftResultDto>), 200)]
        public async Task<ActionResult<ApiResponse<SubmitDraftResultDto>>> SubmitDraft(int masterReceiptId)
        {
            var result = await _inboundService.SubmitDraftAsync(masterReceiptId);
            return result.Success ? Ok(result) : BadRequest(result);
        }

        // --- Các API phụ trợ (Stub) ---

        /// <summary>
        /// Lấy danh sách toàn bộ Master Receipts.
        /// </summary>
        [HttpGet("master-receipts")]
        public IActionResult GetMasterReceipts() => Ok(new { success = true });

        /// <summary>
        /// Chi tiết một Master Receipt theo ID.
        /// </summary>
        [HttpGet("master-receipts/{masterReceiptId}")]
        public IActionResult GetMasterReceipt(int masterReceiptId) => Ok(new { success = true });

        /// <summary>
        /// Lấy danh sách các dòng hàng đang quét dở (Draft Lines).
        /// </summary>
        [HttpGet("master-receipts/{masterReceiptId}/draft-lines")]
        public IActionResult GetDraftLines(int masterReceiptId) => Ok(new { success = true });

        /// <summary>
        /// Báo cáo ngoại lệ (Thiếu hàng, hàng hỏng) cho một dòng hàng.
        /// </summary>
        [HttpPatch("draft-lines/{lineId}/exceptions")]
        public IActionResult ReportDraftLineException(int lineId) => Ok(new { success = true });

        /// <summary>
        /// Ghi nhận hàng thay thế (Substitution) khi hàng về không đúng mã trong PO.
        /// </summary>
        [HttpPost("draft-lines/{lineId}/substitutions")]
        public IActionResult RecordSubstitution(int lineId) => Ok(new { success = true });
    }
}
