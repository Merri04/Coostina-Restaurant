using Microsoft.AspNetCore.Mvc;
using Injera.Models;
using Microsoft.EntityFrameworkCore;

namespace Injera.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MenuItemsController : ControllerBase
    {
        private readonly RestaurantContext _restaurantContext;

        public MenuItemsController(RestaurantContext restaurantContext)
        {
            _restaurantContext = restaurantContext;
        }

        // GET: api/MenuItems
        [HttpGet]
        public async Task<IActionResult> GetMenuItems()
        {
            var menuItems = await _restaurantContext.MenuItems.ToListAsync();
            return Ok(menuItems);
        }

        // GET: api/MenuItems/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMenuItem(int id)
        {
            var menuItem = await _restaurantContext.MenuItems.FindAsync(id);

            if (menuItem == null)
            {
                return NotFound();
            }

            return Ok(menuItem);
        }
        // POST: api/MenuItems
        [HttpPost]
        public async Task<IActionResult> CreateMenuItem([FromForm] MenuItemDto menuItemDto, IFormFile imageFile)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            // Ensure CategoryId is passed and valid
            var category = await _restaurantContext.Categories.FindAsync(menuItemDto.CategoryId);
            if (category == null)
            {
                ModelState.AddModelError("Category", "The CategoryId provided does not exist.");
                return BadRequest(ModelState); // Return error if category is invalid
            }
                        var menuItem = new MenuItem
            {
                Name = menuItemDto.Name ?? "Default Name", // Provide a default name if it's null
                Description = menuItemDto.Description ?? "Default Description", // Provide a default description if it's null
                Price = menuItemDto.Price ?? 0, // Default to 0 if price is not provided
                CategoryId = menuItemDto.CategoryId ?? 1, // Default to a valid CategoryId
            };

            // Handle image file
            if (imageFile != null)
            {
                var imagePath = Path.Combine("wwwroot", "images", imageFile.FileName);
                using (var stream = new FileStream(imagePath, FileMode.Create))
                {
                    await imageFile.CopyToAsync(stream);
                }
                menuItem.ImageUrl = $"/images/{imageFile.FileName}";
            }

            // Add the menu item to the database
            _restaurantContext.MenuItems.Add(menuItem);
            await _restaurantContext.SaveChangesAsync();

            return Ok(menuItem);
        }

        // PUT: api/MenuItems/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMenuItem(int id, [FromForm] MenuItemDto updatedItem, IFormFile imageFile)
        {
           

            // Find the menu item
            var menuItem = await _restaurantContext.MenuItems.FindAsync(id);
            if (menuItem == null)
            {
                return NotFound();
            }
            // Update fields only if they are provided
            if (!string.IsNullOrWhiteSpace(updatedItem.Name))
            {
                menuItem.Name = updatedItem.Name;
            }
            if (!string.IsNullOrWhiteSpace(updatedItem.Description))
            {
                menuItem.Description = updatedItem.Description;
            }
            if (updatedItem.Price.HasValue)
            {
                menuItem.Price = updatedItem.Price.Value;
            }
            if (updatedItem.CategoryId.HasValue)
            {
                menuItem.CategoryId = updatedItem.CategoryId.Value;
            }


            if (imageFile != null)
            {
                var imagePath = Path.Combine("wwwroot", "images", imageFile.FileName);
                using (var stream = new FileStream(imagePath, FileMode.Create))
                {
                    await imageFile.CopyToAsync(stream);
                }
                menuItem.ImageUrl = $"/images/{imageFile.FileName}";
            }

            await _restaurantContext.SaveChangesAsync();

            return Ok(menuItem);

        }

        // DELETE: api/MenuItems/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMenuItem(int id)
        {
            var menuItem = await _restaurantContext.MenuItems.FindAsync(id);
            if (menuItem == null)
            {
                return NotFound();
            }

            _restaurantContext.MenuItems.Remove(menuItem);
            await _restaurantContext.SaveChangesAsync();

            return Ok();
        }
    }
}


