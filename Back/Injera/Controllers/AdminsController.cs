using Microsoft.AspNetCore.Mvc;
using Injera.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;

namespace Injera.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AdminsController : ControllerBase
{
    private readonly RestaurantContext _restaurantContext;
    private readonly IConfiguration _configuration;

    public AdminsController(RestaurantContext restaurantContext, IConfiguration configuration)
    {
        _restaurantContext = restaurantContext;
        _configuration = configuration;
    }
    // POST: api/Admins/Register

    [HttpPost("Register")]
    public async Task<IActionResult> Register(AdminRegisterDto adminRegisterDto)
    {
        // Check if the user exists
        if (await _restaurantContext.Admins.AnyAsync(a => a.Email == adminRegisterDto.Email))
        {
            return BadRequest("Admin already exists.");
        }


        try
        {// Create the Admin object
            var admin = new Admin
            {
                FirstName = adminRegisterDto.FirstName,
                LastName = adminRegisterDto.LastName,
                Email = adminRegisterDto.Email,
                Password = adminRegisterDto.Password // Hash this later for security
            };

            _restaurantContext.Admins.Add(admin);
            await _restaurantContext.SaveChangesAsync();

            return Ok(new { message = "Admin registered successfully" });
        }
        catch (Exception ex)
        {
            Console.WriteLine("Error during registration: " + ex.Message); // Log the exact exception message
            return StatusCode(500, "Internal server error");
        }
    }


    // login method with out token or jwt or hash
    [HttpPost("Login")]
    public async Task<IActionResult> Login(AdminLoginDto adminLoginDto)
    {
        try
        {
            var admin = await _restaurantContext.Admins.FirstOrDefaultAsync(a => a.Email == adminLoginDto.Email && a.Password == adminLoginDto.Password);

            if (admin == null)
            {
                return BadRequest("Invalid credentials");
            }

            return Ok(new { message = "Login successful" });
        }
        catch (Exception ex)
        {
            Console.WriteLine("Error during login: " + ex.Message); // Log the exception
            return StatusCode(500, "Internal server error");
        }
    }
}