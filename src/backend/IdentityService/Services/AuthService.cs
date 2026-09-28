using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using IdentityService.Data;
using IdentityService.DTOs;
using IdentityService.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace IdentityService.Services;

public class AuthService(UserDbContext context, IConfiguration configuration) : IAuthService
{
    public async Task<UserResponseDto?> RegisterAsync(UserDto request)
    {
         if (await context.Users.AnyAsync(u => u.UserName == request.UserName))
        {
            return null; // User already exists
        }

        var user = new User();
        var hashedPassword = new PasswordHasher<User>().HashPassword(user, request.Password);
        user.UserName = request.UserName;
        user.PasswordHash = hashedPassword;
        user.Id = Guid.NewGuid();
        user.Role = "Customer";

        context.Users.Add(user);
        await context.SaveChangesAsync();
        var response = new UserResponseDto();
        response.Id = user.Id;
        response.UserName = user.UserName;
        response.Role = user.Role;
        return response;
    }

    public async Task<TokenResponseDto?> LoginAsync(UserDto request)
    {
        var user = await context.Users.FirstOrDefaultAsync(u => u.UserName == request.UserName);
        if (user is null)
        {
            return null; // User not found
        }
        var passwordVerificationResult = new PasswordHasher<User>().VerifyHashedPassword(user, user.PasswordHash, request.Password);

        if (passwordVerificationResult == PasswordVerificationResult.Failed || user.UserName != request.UserName)
        {
            return null; // Invalid username or password
        }

        return await CreateTokenResponse(user);
    }

    public async Task<bool> LogoutAsync(Guid userId)
    {
        var user = await context.Users.FindAsync(userId);
        if (user is null)
        {
            return false; // User not found
        }
        user.RefreshToken = null;
        user.RefreshTokenExpiryTime = null;
        await context.SaveChangesAsync();

        return true;
    }

    public async Task<TokenResponseDto?> RefreshTokensAsync(RefreshTokenRequestDto request)
    {
        var user = await ValidateRefreshTokenAsync(request.UserId, request.RefreshToken);
        if (user is null)
        {
            return null; // Invalid refresh token or user not found
        }

        return await CreateTokenResponse(user);
    }

        private async Task<TokenResponseDto> CreateTokenResponse(User? user)
    {
        return new TokenResponseDto
        {
            AccessToken = CreateToken(user),
            RefreshToken = await GenerateAndSetRefreshToken(user)
        };
    }

    private async Task<User?> ValidateRefreshTokenAsync(Guid userId, string refreshToken)
    {
        var user = await context.Users.FindAsync(userId);
        if (user is null || user.RefreshToken != refreshToken || user.RefreshTokenExpiryTime <= DateTime.UtcNow)
        {
            return null; // Invalid refresh token or user not found
        }

        return user;
    }

    // Method to generate a new refresh token
    private string GenerateRefreshToken()
    {
        var randomNumber = new byte[32];
        using var rng = RandomNumberGenerator.Create();
        rng.GetBytes(randomNumber);
        return Convert.ToBase64String(randomNumber);

    }

    // Method to generate and set a new refresh token for the user
    private async Task<string> GenerateAndSetRefreshToken(User user)
    {
        var refreshToken = GenerateRefreshToken();
        user.RefreshToken = refreshToken;
        user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7); // Set refresh token expiry time to 7 days
        await context.SaveChangesAsync();
        return refreshToken;
    }

    // Method to create JWT token
    private string CreateToken(User user)
    {
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, user.UserName),
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(ClaimTypes.Role, user.Role)
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration.GetValue<string>("AppSettings:Token")!));

        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);

        var tokenDescriptor = new JwtSecurityToken(
            issuer: configuration.GetValue<string>("AppSettings:Issuer"),
            audience: configuration.GetValue<string>("AppSettings:Audience"),
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(10), // JWT token expiry time set to 10 minutes
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
    }
}