using Microsoft.AspNetCore.Mvc;

namespace WmsBackend.Controllers
{
    [Route("wms/v1")]
    [ApiController]
    public class UsersDevicesController : ControllerBase
    {
        [HttpGet("users/me/warehouses")]
        public IActionResult GetMyWarehouses() => Ok(new { success = true });

        [HttpPost("devices/register")]
        public IActionResult RegisterDevice() => Ok(new { success = true });

        [HttpPost("devices/heartbeat")]
        public IActionResult DeviceHeartbeat() => Ok(new { success = true });

        [HttpGet("devices/{deviceId}")]
        public IActionResult GetDevice(int deviceId) => Ok(new { success = true });
    }
}
