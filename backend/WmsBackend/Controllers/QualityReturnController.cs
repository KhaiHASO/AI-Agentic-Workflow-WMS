using Microsoft.AspNetCore.Mvc;
using WmsBackend.Application.Common;
using WmsBackend.Application.Services.Quality;

namespace WmsBackend.Controllers
{
    [Route("wms/v1")]
    [ApiController]
    public class QualityReturnController : ControllerBase
    {
        private readonly IQualityService _qualityService;
        public QualityReturnController(IQualityService qualityService) => _qualityService = qualityService;

        [HttpPost("quality-orders/{qualityOrderId}/result")]
        public async Task<ActionResult<ApiResponse<bool>>> RecordQualityResult(int qualityOrderId, [FromBody] string result, [FromQuery] int? userId)
        {
            var apiResult = await _qualityService.RecordQualityResultAsync(qualityOrderId, result, userId);
            return apiResult.Success ? Ok(apiResult) : BadRequest(apiResult);
        }

        // Keep stub for others
        [HttpPost("quality-orders")]
        public IActionResult CreateQualityOrder() => Ok(new { success = true });

        [HttpGet("quality-orders")]
        public IActionResult GetQualityOrders() => Ok(new { success = true });

        [HttpGet("quality-orders/{qualityOrderId}")]
        public IActionResult GetQualityOrder(int qualityOrderId) => Ok(new { success = true });

        [HttpPost("quarantine-orders")]
        public IActionResult CreateQuarantineOrder() => Ok(new { success = true });

        [HttpGet("quarantine-orders")]
        public IActionResult GetQuarantineOrders() => Ok(new { success = true });

        [HttpPost("quarantine-orders/{quarantineOrderId}/release")]
        public IActionResult ReleaseQuarantineOrder(int quarantineOrderId) => Ok(new { success = true });

        [HttpPost("returns")]
        public IActionResult CreateReturn() => Ok(new { success = true });

        [HttpGet("returns")]
        public IActionResult GetReturns() => Ok(new { success = true });

        [HttpPost("returns/{returnId}/receive")]
        public IActionResult ReceiveReturn(int returnId) => Ok(new { success = true });

        [HttpPost("returns/{returnId}/decision")]
        public IActionResult RecordReturnDecision(int returnId) => Ok(new { success = true });
    }
}
