using Microsoft.AspNetCore.Mvc;
using Injera.Models;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly RestaurantContext _restaurantContext;

    public CategoriesController(RestaurantContext restaurantContext)
    {
        _restaurantContext = restaurantContext;
    }

    [HttpGet]
    public async Task<IActionResult> GetCategories()
    {
        var categories = await _restaurantContext.Categories.ToListAsync();
        return Ok(categories);
    }


}
