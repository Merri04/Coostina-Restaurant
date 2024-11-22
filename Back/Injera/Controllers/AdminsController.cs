using Microsoft.AspNetCore.Mvc;

namespace Injera.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AdminsController : ControllerBase
{
    private readonly IAdminService _adminService;
    private readonly ITokenService  _tokenService;

    public AdminsController(IAdminService adminService, ITokenService tokenService)
    {
        _adminService = adminService;
        _tokenService = tokenService;
    }
    // what is the api for the admin to register
    

 [HttpPost("Register")]
    public async Task<IActionResult> Register(AdminRegisterDto adminRegisterDto)
    {
        try
        {
            var admin = await _adminService.RegisterAdmin(adminRegisterDto);
            var token = _tokenService.GenerateJwtToken(admin);
            return Ok(new { token, message = "Admin registered successfully" });
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (Exception ex)
        {
            Console.WriteLine("Error during registration: " + ex.Message);
            return StatusCode(500, "Internal error");
        }
    }

    [HttpPost("Login")]
    public async Task<IActionResult> Login(AdminLoginDto adminLoginDto)
    {
        try
        {
            var admin = await _adminService.LoginAdmin(adminLoginDto);
            if (admin == null)
            {
                return BadRequest("Invalid credentials");
            }
            var token = _tokenService.GenerateJwtToken(admin);
            return Ok(new { token, message = "Login successful" });
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error during login: {ex.Message}");
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
    }



   
