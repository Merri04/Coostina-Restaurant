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

        [HttpPost]
        public async Task<IActionResult> CreateMenuItem([FromForm] MenuItem menuItem, IFormFile imageFile)
        {
            if (imageFile != null)
            {
                var imagePath = Path.Combine("wwwroot", "images", imageFile.FileName);
                using (var stream = new FileStream(imagePath, FileMode.Create))
                {
                    await imageFile.CopyToAsync(stream);
                }
                menuItem.ImageUrl = $"/images/{imageFile.FileName}";
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);  // Log and return validation errors
            }

            _restaurantContext.MenuItems.Add(menuItem);
            await _restaurantContext.SaveChangesAsync();
            return Ok(menuItem);
        }


        // PUT: api/MenuItems/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMenuItem(int id, [FromForm] MenuItem updatedItem, IFormFile imageFile)
        {
            var menuItem = await _restaurantContext.MenuItems.FindAsync(id);
            if (menuItem == null)
            {
                return NotFound();
            }

            // Update fields
            menuItem.Name = updatedItem.Name;
            menuItem.Description = updatedItem.Description;
            menuItem.Price = updatedItem.Price;
            menuItem.CategoryId = updatedItem.CategoryId;

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
