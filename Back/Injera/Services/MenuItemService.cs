// Services/MenuItemService.cs
using Injera.Models;
using Microsoft.EntityFrameworkCore;
using System.IO;

public class MenuItemService : IMenuItemService
{
    private readonly RestaurantContext _restaurantContext;

    public MenuItemService(RestaurantContext restaurantContext)
    {
        _restaurantContext = restaurantContext;
    }

    public async Task<IEnumerable<MenuItem>> GetMenuItemsAsync()
    {
        return await _restaurantContext.MenuItems.ToListAsync();
    }

    public async Task<MenuItem?> GetMenuItemByIdAsync(int id)
    {
        return await _restaurantContext.MenuItems.FindAsync(id);
    }

    public async Task<MenuItem> CreateMenuItemAsync(MenuItemDto menuItemDto, IFormFile imageFile)
    {
        // Ensure CategoryId is passed and valid
        var category = await _restaurantContext.Categories.FindAsync(menuItemDto.CategoryId);
        if (category == null)
        {
            throw new ArgumentException("The CategoryId provided does not exist.");
        }

        var menuItem = new MenuItem
        {
            Name = menuItemDto.Name ?? "Default Name",
            Description = menuItemDto.Description ?? "Default Description",
            Price = menuItemDto.Price ?? 0,
            CategoryId = menuItemDto.CategoryId ?? 1,
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

        _restaurantContext.MenuItems.Add(menuItem);
        await _restaurantContext.SaveChangesAsync();

        return menuItem;
    }

    public async Task<MenuItem?> UpdateMenuItemAsync(int id, MenuItemDto updatedItem, IFormFile imageFile)
    {
        var menuItem = await _restaurantContext.MenuItems.FindAsync(id);
        if (menuItem == null)
        {
            return null;
        }

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

        return menuItem;
    }

    public async Task<bool> DeleteMenuItemAsync(int id)
    {
        var menuItem = await _restaurantContext.MenuItems.FindAsync(id);
        if (menuItem == null)
        {
            return false;
        }

        _restaurantContext.MenuItems.Remove(menuItem);
        await _restaurantContext.SaveChangesAsync();

        return true;
    }
}
