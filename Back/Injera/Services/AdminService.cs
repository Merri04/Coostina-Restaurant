using Injera.Models;
using Injera.Helpers;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;

public class AdminService : IAdminService
{
    private readonly RestaurantContext _restaurantContext;

    public AdminService(RestaurantContext restaurantContext)
    {
        _restaurantContext = restaurantContext;
    }

    public async Task<Admin?> RegisterAdmin(AdminRegisterDto adminRegisterDto)
    {
        // Validate the email format
        var emailRegex = @"\S+@\S+\.\S+";
        if (!Regex.IsMatch(adminRegisterDto.Email, emailRegex)) 
        {
            throw new ArgumentException("Invalid email format.");
        }

        // Validate the password strength
        var passwordRegex = @"^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{7,}$";
        if (!Regex.IsMatch(adminRegisterDto.Password, passwordRegex))
        {
            throw new ArgumentException("Password must be at least 7 characters long, contain one capital letter, and one number.");
        }

        // Check if the number of admins already registered is 50 or more
        var adminCount = await _restaurantContext.Admins.CountAsync();
        if (adminCount >= 2)
        {
            throw new InvalidOperationException("Registration limit reached. Only 50 admins can register.");
        }

        // Check if the user already exists
        if (await _restaurantContext.Admins.AnyAsync(a => a.Email == adminRegisterDto.Email))
        {
            throw new InvalidOperationException("Admin already exists.");
        }

        // Hash the password
        var hashedPassword = PasswordHelper.HashPassword(adminRegisterDto.Password);
        
        // Create the Admin object
        var admin = new Admin
        {
            FirstName = adminRegisterDto.FirstName,
            LastName = adminRegisterDto.LastName,
            Email = adminRegisterDto.Email,
            Password = hashedPassword
        };

        // Save the new admin to the database
        _restaurantContext.Admins.Add(admin);
        await _restaurantContext.SaveChangesAsync();
        
        return admin;
    }

    public async Task<Admin?> LoginAdmin(AdminLoginDto adminLoginDto)
    {
        var admin = await _restaurantContext.Admins.FirstOrDefaultAsync(a => a.Email == adminLoginDto.Email);
        if (admin == null || !PasswordHelper.VerifyPassword(adminLoginDto.Password, admin.Password))
        {
            return null;
        }
        return admin;
    }
}
