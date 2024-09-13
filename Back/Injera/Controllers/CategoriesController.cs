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
public ActionResult<IEnumerable<Category>> GetCategories()
{
    // Include the MenuItems in the response
    var categories = _restaurantContext.Categories
                                       .Include(c => c.MenuItems)
                                       .ToList();
    return Ok(categories);
}

}
