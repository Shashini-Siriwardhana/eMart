using System;

namespace IdentityService.DTOs;

public class UserResponseDto
{
    public Guid Id {get; set;}
    public string UserName { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty; 
}