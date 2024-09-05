using Microsoft.AspNetCore.Mvc;
using Injera.Models;
using Microsoft.EntityFrameworkCore;

namespace Injera.Controllers;
[Route("api/[controller]")]
[ApiController]  // Important for API Controllers
public class MenuItemsController : ControllerBase
{
    private readonly RestaurantContext _restaurantContext;

    public MenuItemsController(RestaurantContext restaurantContext)
    {
        _restaurantContext = restaurantContext;
    }

    // GET: api/MenueItems
    [HttpGet] // This method returns all the menu items in the database 
    public async Task<ActionResult<IEnumerable<MenuItem>>> GetMenuItems() // The method returns a list of menu items 
    {
        return await _restaurantContext.MenuItems.ToListAsync(); // ToListAsync() is a method that asynchronously enumerates the query results and returns a list that contains the results of the query. 
    }
    // GET: api/MenueItems/5 
    [HttpGet("{id}")] // This method returns a menuItem object with the given id 
    public async Task<ActionResult<MenuItem>> GetMenuItem(int id) // This method returns a menuItem object with the given id 
    {
        var menuItem = await _restaurantContext.MenuItems.FindAsync(id); // FindAsync is a method that finds an entity with the given primary key values. If an entity with the given primary key values is being tracked by the context, then it is returned immediately without making a request to the database. Otherwise, a query is made to the database for an entity with the given primary key values and this entity, if found, is attached to the context and returned. If no entity is found, then null is returned. 
        if (menuItem == null)
        {
            return NotFound();
        }

        return menuItem; // Returns the menuItem object if it exists in the database 
       
    }

    // POST: api/MenuItems
    [HttpPost] // This method adds a new menuItem object to the database
    public async Task<ActionResult<MenuItem>> PostMenuItem(MenuItem menuItem) // This method adds a new menuItem object to the database 
    {
        _restaurantContext.MenuItems.Add(menuItem); // Add() is a method that adds the given entity to the context in the Added state such that it will be inserted into the database when SaveChanges() is called.
        await _restaurantContext.SaveChangesAsync(); // SaveChangesAsync() is a method that saves all changes made in this context to the database asynchronously.

        return CreatedAtAction(nameof(GetMenuItem), new { id = menuItem.Id }, menuItem); // CreatedAtAction() is a method that returns an ActionResult with a Location header. The Location header specifies the URI of the newly created resource. 
    }

}