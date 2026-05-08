using Microsoft.AspNetCore.Mvc;

namespace WmsBackend.Controllers
{
    [Route("erp/v1")]
    [ApiController]
    public class ErpController : ControllerBase
    {
        [HttpGet("items")]
        public IActionResult GetItems() => Ok(new { success = true });

        [HttpGet("suppliers")]
        public IActionResult GetSuppliers() => Ok(new { success = true });

        [HttpGet("purchase-orders/open")]
        public IActionResult GetOpenPo() => Ok(new { success = true });

        [HttpGet("purchase-orders/{poNumber}")]
        public IActionResult GetPo(string poNumber) => Ok(new { success = true });

        [HttpGet("sales-orders/open")]
        public IActionResult GetOpenSo() => Ok(new { success = true });

        [HttpGet("sales-orders/{soNumber}")]
        public IActionResult GetSo(string soNumber) => Ok(new { success = true });
    }
}
