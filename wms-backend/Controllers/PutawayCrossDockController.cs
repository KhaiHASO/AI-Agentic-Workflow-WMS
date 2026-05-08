using Microsoft.AspNetCore.Mvc;
using WmsBackend.Application.Common;
using WmsBackend.Application.Services.Putaway;
using WmsBackend.Models.WmsCore;

namespace WmsBackend.Controllers
{
    [Route("wms/v1")]
    [ApiController]
    public class PutawayCrossDockController : ControllerBase
    {
        private readonly IPutawayService _putawayService;

        public PutawayCrossDockController(IPutawayService putawayService)
        {
            _putawayService = putawayService;
        }

        [HttpGet("putaway-tasks")]
        public async Task<ActionResult<ApiResponse<IEnumerable<PutawayTask>>>> GetPutawayTasks([FromQuery] int? warehouseId)
        {
            var result = await _putawayService.GetTasksAsync(warehouseId);
            return Ok(result);
        }

        [HttpPost("putaway-tasks/{taskId}/confirm")]
        public async Task<ActionResult<ApiResponse<bool>>> ConfirmPutawayTask(int taskId, [FromBody] int actualLocationId, [FromQuery] int? userId)
        {
            var result = await _putawayService.ConfirmPutawayAsync(taskId, actualLocationId, userId);
            return result.Success ? Ok(result) : BadRequest(result);
        }

        // Keep stub for others
        [HttpPost("putaway-tasks/generate")]
        public IActionResult GeneratePutawayTasks() => Ok(new { success = true });

        [HttpGet("putaway-tasks/{taskId}")]
        public IActionResult GetPutawayTask(int taskId) => Ok(new { success = true });

        [HttpPost("cross-dock-orders")]
        public IActionResult CreateCrossDockOrder() => Ok(new { success = true });

        [HttpGet("cross-dock-orders")]
        public IActionResult GetCrossDockOrders() => Ok(new { success = true });

        [HttpPost("cross-dock-orders/{orderId}/confirm")]
        public IActionResult ConfirmCrossDockOrder(int orderId) => Ok(new { success = true });

        [HttpPost("handling-units")]
        public IActionResult CreateHandlingUnit() => Ok(new { success = true });

        [HttpGet("handling-units/{huId}")]
        public IActionResult GetHandlingUnit(int huId) => Ok(new { success = true });

        [HttpPost("handling-units/{huId}/move")]
        public IActionResult MoveHandlingUnit(int huId) => Ok(new { success = true });
    }
}
