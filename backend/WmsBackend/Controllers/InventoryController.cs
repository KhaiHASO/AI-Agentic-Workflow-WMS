using Microsoft.AspNetCore.Mvc;
using WmsBackend.Application.Common;
using WmsBackend.Application.Services.Inventory;
using WmsBackend.Models.WmsCore;

namespace WmsBackend.Controllers
{
    [Route("wms/v1")]
    [ApiController]
    public class InventoryController : ControllerBase
    {
        private readonly IInventoryService _inventoryService;

        public InventoryController(IInventoryService inventoryService)
        {
            _inventoryService = inventoryService;
        }

        [HttpGet("inventory/on-hand")]
        public async Task<ActionResult<ApiResponse<IEnumerable<InventoryOnHand>>>> GetOnHandInventory([FromQuery] int warehouseId, [FromQuery] int? itemId, [FromQuery] int? locationId)
        {
            var result = await _inventoryService.GetOnHandAsync(warehouseId, itemId, locationId);
            return Ok(result);
        }

        // Keep stub for others
        [HttpGet("inventory/on-hand/by-location")]
        public IActionResult GetInventoryByLocation() => Ok(new { success = true });

        [HttpGet("inventory/on-hand/by-item")]
        public IActionResult GetInventoryByItem() => Ok(new { success = true });

        [HttpGet("inventory/ledger")]
        public IActionResult GetInventoryLedger() => Ok(new { success = true });

        [HttpPost("inventory/adjustments")]
        public IActionResult CreateAdjustment() => Ok(new { success = true });

        [HttpGet("inventory/adjustments")]
        public IActionResult GetAdjustments() => Ok(new { success = true });

        [HttpPost("internal-transfers")]
        public IActionResult CreateTransfer() => Ok(new { success = true });

        [HttpGet("internal-transfers")]
        public IActionResult GetTransfers() => Ok(new { success = true });

        [HttpPost("internal-transfers/{transferId}/confirm")]
        public IActionResult ConfirmTransfer(int transferId) => Ok(new { success = true });
    }
}
