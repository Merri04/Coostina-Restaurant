using Microsoft.AspNetCore.Mvc;
using Injera.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;  // Add this for authorization

namespace Injera.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MenuItemsController : ControllerBase
{
    private readonly RestaurantContext _restaurantContext;

    public MenuItemsController(RestaurantContext restaurantContext)
    {
        _restaurantContext = restaurantContext;
    }
    // Add this to your AdminsController (or create a separate MenuItemsController)

    // Create new menu item with an image
    [HttpPost("MenuItems")]
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

        _restaurantContext.MenuItems.Add(menuItem);
        await _restaurantContext.SaveChangesAsync();

        return Ok(menuItem);
    }

    // Update menu item with an image
    [HttpPut("MenuItems/{id}")]
    public async Task<IActionResult> UpdateMenuItem(int id, [FromForm] MenuItem updatedItem, IFormFile imageFile)
    {
        var menuItem = await _restaurantContext.MenuItems.FindAsync(id);
        if (menuItem == null)
            return NotFound();

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



    [HttpDelete("MenuItems/{id}")]
    public async Task<IActionResult> DeleteMenuItem(int id)
    {
        var menuItem = await _restaurantContext.MenuItems.FindAsync(id);
        if (menuItem == null)
            return NotFound();

        _restaurantContext.MenuItems.Remove(menuItem);
        await _restaurantContext.SaveChangesAsync();
        return Ok();
    }

    [HttpGet("MenuItems")]
    public async Task<IActionResult> GetMenuItems()
    {
        var menuItems = await _restaurantContext.MenuItems.ToListAsync();
        return Ok(menuItems);
    }

    [HttpGet("Categories")]
    public async Task<IActionResult> GetCategories()
    {
        var categories = await _restaurantContext.Categories.ToListAsync();
        return Ok(categories);
    }



}