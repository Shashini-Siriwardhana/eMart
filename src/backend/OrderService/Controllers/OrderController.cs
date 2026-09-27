using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using OrderService.DTOs;
using OrderService.Messaging;
using OrderService.Services;
using Shared.Messaging.Events;

namespace OrderService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrderController : ControllerBase
{
    private readonly IOrdersService _ordersService;
    private readonly IEventPublisher _eventPublisher;

    public OrderController(IOrdersService ordersService, IEventPublisher eventPublisher)
    {
        _ordersService = ordersService;
        _eventPublisher = eventPublisher;
    }

    [Authorize]
    [HttpGet]
    public async Task<IActionResult> GetAllOrders()
    {
        var userIdClaim = User.FindFirst(JwtRegisteredClaimNames.Sub);

        if (userIdClaim == null)
        {
            return Unauthorized();
        }

        var userId = Guid.Parse(userIdClaim.Value);
        var orders = await _ordersService.GetAllOrdersAsync(userId);
        return Ok(orders);
    }

    [HttpGet("{orderId:guid}")]
    public async Task<IActionResult> GetOrderById(Guid orderId)
    {
        var order = await _ordersService.GetOrderByIdAsync(orderId);

        if (order is null)
        {
            return NotFound();
        }

        return Ok(order);
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> CreateOrder()
    {
        var userIdClaim = User.FindFirst(JwtRegisteredClaimNames.Sub);

        if (userIdClaim == null)
        {
            return Unauthorized();
        }

        var userId = Guid.Parse(userIdClaim.Value);
        var order = await _ordersService.CreateOrderAsync(userId);

        if (order is null)
        {
            return NotFound();
        }

        return CreatedAtAction(nameof(GetOrderById), new {orderId = order.Id}, order);
    }

    [HttpPatch("{orderId:guid}")]
    public async Task<IActionResult> CancelOrder(Guid orderId)
    {
        var order = await _ordersService.CancelOrderAsync(orderId);

        if (order is null)
        {
            return NotFound();
        }

        return Ok(order);
    }

    [HttpPost("test")]
    public async Task<IActionResult> Test()
    {
        var testEvent = new OrderCancelledEvent
        {
            OrderId = Guid.NewGuid(),
            UserId = Guid.NewGuid(),
            Items = [
                new OrderCancelledItem {
                    ProductId =Guid.Parse("ac99a69c-92fc-4c38-828d-6fa0cf41961c"),
                    Quantity = 2
                },
                new OrderCancelledItem {
                    ProductId = Guid.Parse("249266a1-9240-4a29-96fb-38e0cee57901"),
                    Quantity = 10
                },
            ]
        };

        await _eventPublisher.PublishAsync(testEvent);

        return Ok(new
        {
            message = "Test event published successfully",
            testEvent
        });
    }
}