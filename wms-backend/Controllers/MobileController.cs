using Microsoft.AspNetCore.Mvc;

namespace WmsBackend.Controllers
{
    [Route("mobile/v1")]
    [ApiController]
    public class MobileController : ControllerBase
    {
        [HttpPost("scan-events")]
        public IActionResult RecordScanEvent() => Ok(new { success = true });

        [HttpPost("scan-events/batch")]
        public IActionResult RecordScanEventBatch() => Ok(new { success = true });

        [HttpGet("tasks/next")]
        public IActionResult GetNextTask() => Ok(new { success = true });

        [HttpGet("barcodes/{barcode}/resolve")]
        public IActionResult ResolveBarcode(string barcode) => Ok(new { success = true });

        [HttpGet("lookup/item-by-barcode/{barcode}")]
        public IActionResult LookupItemByBarcode(string barcode) => Ok(new { success = true });
    }
}
