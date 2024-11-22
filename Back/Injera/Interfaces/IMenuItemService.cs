// Interfaces/IMenuItemService.cs
public interface IMenuItemService
{
    Task<IEnumerable<MenuItem>> GetMenuItemsAsync();
    Task<MenuItem?> GetMenuItemByIdAsync(int id);
    Task<MenuItem> CreateMenuItemAsync(MenuItemDto menuItemDto, IFormFile imageFile);
    Task<MenuItem?> UpdateMenuItemAsync(int id, MenuItemDto updatedItem, IFormFile imageFile);
    Task<bool> DeleteMenuItemAsync(int id);
}
