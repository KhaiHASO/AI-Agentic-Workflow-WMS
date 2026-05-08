using Microsoft.AspNetCore.Mvc;
using WmsBackend.Application.Common;
using WmsBackend.Application.Services.Outbound;
using WmsBackend.Models.WmsCore;

namespace WmsBackend.Controllers
{
    [Route("wms/v1")]
    [ApiController]
    public class OutboundController : ControllerBase
    {
        private readonly IOutboundService _outboundService;

        public OutboundController(IOutboundService outboundService)
        {
            _outboundService = outboundService;
        }

        [HttpPost("waves")]
        public async Task<ActionResult<ApiResponse<int>>> CreateWave([FromBody] List<int> soLineIds, [FromQuery] int warehouseId)
        {
            var result = await _outboundService.CreateWaveAsync(soLineIds, warehouseId);
            return result.Success ? Ok(result) : BadRequest(result);
        }

        [HttpPost("waves/{waveId}/release")]
        public async Task<ActionResult<ApiResponse<bool>>> ReleaseWave(int waveId)
        {
            var result = await _outboundService.ReleaseWaveAsync(waveId);
            return result.Success ? Ok(result) : BadRequest(result);
        }

        [HttpPost("pick-tasks/{taskId}/confirm")]
        public async Task<ActionResult<ApiResponse<bool>>> ConfirmPickTask(long taskId, [FromQuery] int? userId)
        {
            var result = await _outboundService.ConfirmPickAsync(taskId, userId);
            return result.Success ? Ok(result) : BadRequest(result);
        }

        [HttpPost("shipments/{shipmentId}/confirm")]
        public async Task<ActionResult<ApiResponse<bool>>> ConfirmShipment(int shipmentId, [FromQuery] int? userId)
        {
            var result = await _outboundService.ConfirmShipmentAsync(shipmentId, userId);
            return result.Success ? Ok(result) : BadRequest(result);
        }

        // Keep stub for others
        [HttpGet("sales-orders")]
        public IActionResult GetSalesOrders() => Ok(new { success = true });

        [HttpGet("waves")]
        public IActionResult GetWaves() => Ok(new { success = true });

        [HttpGet("waves/{waveId}")]
        public IActionResult GetWave(int waveId) => Ok(new { success = true });

        [HttpGet("pick-tasks")]
        public IActionResult GetPickTasks() => Ok(new { success = true });

        [HttpGet("pick-tasks/{taskId}")]
        public IActionResult GetPickTask(int taskId) => Ok(new { success = true });

        [HttpPost("pick-tasks/{taskId}/scan-events")]
        public IActionResult RecordPickScan(int taskId) => Ok(new { success = true });

        [HttpPost("shipments")]
        public IActionResult CreateShipment() => Ok(new { success = true });

        [HttpGet("shipments")]
        public IActionResult GetShipments() => Ok(new { success = true });

        [HttpGet("shipments/{shipmentId}")]
        public IActionResult GetShipment(int shipmentId) => Ok(new { success = true });

        [HttpPost("shipments/{shipmentId}/pack")]
        public IActionResult PackShipment(int shipmentId) => Ok(new { success = true });

        [HttpGet("backorders")]
        public IActionResult GetBackorders() => Ok(new { success = true });

        [HttpPost("backorders/{backorderId}/resolve")]
        public IActionResult ResolveBackorder(int backorderId) => Ok(new { success = true });
    }
}
