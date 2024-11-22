using Injera.Models;
using Microsoft.EntityFrameworkCore;

public class CategoryService : ICategoryService
{
    private readonly RestaurantContext _restaurantContext;

    public CategoryService(RestaurantContext restaurantContext)
    {
        _restaurantContext = restaurantContext;
    }

    public async Task<IEnumerable<Category>> GetCategoriesAsync()
    {
        return await _restaurantContext.Categories.ToListAsync();
    }
}
