using Microsoft.AspNetCore.Mvc;


namespace Injera.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MenuItemsController : ControllerBase
    {
        private readonly IMenuItemService _menuItemService;

        public MenuItemsController(IMenuItemService menuItemService)
        {
            _menuItemService = menuItemService;
        }

        [HttpGet]
        public async Task<IActionResult> GetMenuItems()
        {
            var menuItems = await _menuItemService.GetMenuItemsAsync();
            return Ok(menuItems);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetMenuItem(int id)
        {
            var menuItem = await _menuItemService.GetMenuItemByIdAsync(id);

            if (menuItem == null)
            {
                return NotFound();
            }

            return Ok(menuItem);
        }

        [HttpPost]
        public async Task<IActionResult> CreateMenuItem([FromForm] MenuItemDto menuItemDto, IFormFile imageFile)
        {
            try
            {
                var menuItem = await _menuItemService.CreateMenuItemAsync(menuItemDto, imageFile);
                return Ok(menuItem);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error creating menu item: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMenuItem(int id, [FromForm] MenuItemDto updatedItem, IFormFile imageFile)
        {
            var menuItem = await _menuItemService.UpdateMenuItemAsync(id, updatedItem, imageFile);
            if (menuItem == null)
            {
                return NotFound();
            }

            return Ok(menuItem);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMenuItem(int id)
        {
            var result = await _menuItemService.DeleteMenuItemAsync(id);
            if (!result)
            {
                return NotFound();
            }

            return Ok();
        }
    }
}