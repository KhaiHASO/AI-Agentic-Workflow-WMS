using Microsoft.AspNetCore.Mvc;

namespace WmsBackend.Controllers
{
    [Route("auth/v1")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        [HttpPost("login")]
        public IActionResult Login() => Ok(new { success = true });

        [HttpPost("refresh")]
        public IActionResult Refresh() => Ok(new { success = true });

        [HttpPost("logout")]
        public IActionResult Logout() => Ok(new { success = true });

        [HttpGet("me")]
        public IActionResult GetMe() => Ok(new { success = true });
    }
}
