using Microsoft.AspNetCore.Mvc;
using Injera.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text.RegularExpressions;

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
    // what is the api for the admin to register
    



[HttpPost("Register")]
public async Task<IActionResult> Register(AdminRegisterDto adminRegisterDto)
{
    // Check if the number of admins already registered is seven or more
    var adminCount = await _restaurantContext.Admins.CountAsync();
    if (adminCount >= 50)
    {
        Console.WriteLine("Registration limit reached.");
        return BadRequest("Registration limit reached. Only seven admins can register.");
    }

    // Check if the email format is valid
    var emailRegex = @"\S+@\S+\.\S+";
    if (!Regex.IsMatch(adminRegisterDto.Email, emailRegex))
    {
        Console.WriteLine("Invalid email format.");
        return BadRequest("Invalid email format.");
    }

    // Check if the password meets the required criteria
    var passwordRegex = @"^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{7,}$";
    if (!Regex.IsMatch(adminRegisterDto.Password, passwordRegex))
    {
        return BadRequest("Password must be at least 7 characters long, contain one capital letter, and one number.");
    }

    // Check if the user already exists
    if (await _restaurantContext.Admins.AnyAsync(a => a.Email == adminRegisterDto.Email))
    {
        Console.WriteLine("Admin with the given email already exists.");
        return BadRequest("Admin already exists.");
    }

    try
    {
        // Create the Admin object
        var admin = new Admin
        {
            FirstName = adminRegisterDto.FirstName,
            LastName = adminRegisterDto.LastName,
            Email = adminRegisterDto.Email,
            Password = adminRegisterDto.Password
        };

        _restaurantContext.Admins.Add(admin);
        await _restaurantContext.SaveChangesAsync();

        // Generate token after successful registration
        var token = GenerateJwtToken(admin);
        return Ok(new { token, message = "Admin registered successfully" });
    }
    catch (Exception ex)
    {
        Console.WriteLine("Error during registration: " + ex.Message);
        return StatusCode(500, "Internal error");
    }
}


// Method to generate JWT token
private string GenerateJwtToken(Admin admin)
{
    var tokenHandler = new JwtSecurityTokenHandler();
    var jwtKey = _configuration["Jwt:Key"];
    if (string.IsNullOrEmpty(jwtKey))
    {
        throw new InvalidOperationException("JWT key is not configured.");
    }
    var key = Encoding.ASCII.GetBytes(jwtKey);

    var tokenDescriptor = new SecurityTokenDescriptor
    {
        Subject = new ClaimsIdentity(new[]
        {
            new Claim(ClaimTypes.Name, admin.Email),
            new Claim(ClaimTypes.Role, "Admin")
        }),
        Expires = DateTime.UtcNow.AddHours(2),
        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
    };

    var token = tokenHandler.CreateToken(tokenDescriptor);
    return tokenHandler.WriteToken(token);
}




   
[HttpPost("Login")]
public async Task<IActionResult> Login(AdminLoginDto adminLoginDto)
{
    try
    {
        var admin = await _restaurantContext.Admins.FirstOrDefaultAsync(a =>
            a.Email == adminLoginDto.Email && a.Password == adminLoginDto.Password);

        if (admin == null)
        {
            Console.WriteLine("Admin not found with given email and password.");
            return BadRequest("Invalid credentials");
        }

        var token = GenerateJwtToken(admin);
        return Ok(new { token, message = "Login successful" });
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error during login: {ex.Message}");
        return StatusCode(500, $"Internal server error: {ex.Message}");
    }
}

}