using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using CartsService.DTOs;
using CartsService.Models;
using CartsService.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CartsService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CartController : ControllerBase
{
    private readonly ICartService _cartService;
    public CartController(ICartService cartService)
    {
        _cartService = cartService;
    }

    [Authorize]
    [HttpGet]
    public async Task<IActionResult> GetCartItems()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (!Guid.TryParse(userIdClaim, out var userId))
        {
            return Unauthorized();
        }

        var cart = await _cartService.GetCartAsync(userId);

        if (cart is null)
        {
            return NotFound();
        }

        return Ok(cart);
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> CreateCartItem([FromBody] AddCartItemDto addCartItemDto)
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (!Guid.TryParse(userIdClaim, out var userId))
        {
            return Unauthorized();
        }

        var cart = await _cartService.AddItemToCartAsync(userId, addCartItemDto);

        if (cart is null)
        {
            return NotFound();
        }

        return Ok(cart);
    }

    [Authorize]
    [HttpPatch("items/{productId:guid}")]
    public async Task<IActionResult> UpdateCart(Guid productId, [FromBody] UpdateCartDto updateCartDto)
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (!Guid.TryParse(userIdClaim, out var userId))
        {
            return Unauthorized();
        }

        var cart = await _cartService.UpdateItemQuantityAsync(userId, productId, updateCartDto.Quantity);

        if (cart is null)
        {
            return NotFound();
        }

        return Ok(cart);
    }

    [Authorize]
    [HttpDelete("items/{productId:guid}")]
    public async Task<IActionResult> DeleteItemFromCart(Guid productId)
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (!Guid.TryParse(userIdClaim, out var userId))
        {
            return Unauthorized();
        }

        var cart = await _cartService.DeleteItemFromCartAsync(userId, productId);

        if (cart is null)
        {
            return NotFound();
        }

        return Ok(cart);
    }

    [Authorize]
    [HttpDelete("items")]
    public async Task<IActionResult> ClearCart()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (!Guid.TryParse(userIdClaim, out var userId))
        {
            return Unauthorized();
        }

        var success = await _cartService.DeleteCartAsync(userId);

        if(!success)
        {
            return NotFound();
        }

        return NoContent();
    }
    
}