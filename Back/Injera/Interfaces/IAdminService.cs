// Interfaces/IAdminService.cs
public interface IAdminService
{
    Task<Admin?> RegisterAdmin(AdminRegisterDto adminRegisterDto);
    Task<Admin?> LoginAdmin(AdminLoginDto adminLoginDto);
}
