using Microsoft.AspNetCore.Mvc;
using WmsBackend.Application.Common;
using WmsBackend.Application.Services.Quality;

namespace WmsBackend.Controllers
{
    [Route("wms/v1")]
    [ApiController]
    public class CycleCountController : ControllerBase
    {
        private readonly IQualityService _qualityService;
        public CycleCountController(IQualityService qualityService) => _qualityService = qualityService;

        [HttpPost("cycle-count-sessions/{sessionId}/submit")]
        public async Task<ActionResult<ApiResponse<bool>>> SubmitSession(int sessionId, [FromQuery] int? userId)
        {
            var result = await _qualityService.SubmitCycleCountAsync(sessionId, userId);
            return result.Success ? Ok(result) : BadRequest(result);
        }

        // Keep stub for others
        [HttpPost("cycle-count-sessions")]
        public IActionResult CreateSession() => Ok(new { success = true });

        [HttpGet("cycle-count-sessions")]
        public IActionResult GetSessions() => Ok(new { success = true });

        [HttpGet("cycle-count-sessions/{sessionId}")]
        public IActionResult GetSession(int sessionId) => Ok(new { success = true });

        [HttpGet("cycle-count-sessions/{sessionId}/lines")]
        public IActionResult GetSessionLines(int sessionId) => Ok(new { success = true });

        [HttpGet("cycle-count-sessions/{sessionId}/variances")]
        public IActionResult GetSessionVariances(int sessionId) => Ok(new { success = true });

        [HttpPost("cycle-count-sessions/{sessionId}/review")]
        public IActionResult ReviewSession(int sessionId) => Ok(new { success = true });

        [HttpPost("cycle-count-sessions/{sessionId}/approve-adjustment")]
        public IActionResult ApproveSessionAdjustment(int sessionId) => Ok(new { success = true });
    }
}
