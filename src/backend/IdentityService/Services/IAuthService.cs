using IdentityService.DTOs;
using IdentityService.Models;

namespace IdentityService.Services;

public interface IAuthService
{
    Task<UserResponseDto?> RegisterAsync(UserDto request, string role="Customer");
    Task<TokenResponseDto?> LoginAsync(UserDto request);
    Task<bool> LogoutAsync(Guid userId);
    Task<TokenResponseDto?> RefreshTokensAsync(RefreshTokenRequestDto request);
}