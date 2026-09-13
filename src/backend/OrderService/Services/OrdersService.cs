using Microsoft.AspNetCore.Http.Features;
using OrderService.Clients;
using OrderService.Data;
using OrderService.DTOs;
using OrderService.Enums;
using OrderService.Models;
using OrderService.Repositories;

namespace OrderService.Services;

public class OrdersService : IOrdersService
{
    private readonly IOrderRepository _repository;
    private readonly IProductApiClient _productApiClient;
    private readonly ICartApiClient _cartApiClient;

    public OrdersService(IOrderRepository repository, IProductApiClient productApiClient, ICartApiClient cartApiClient)
    {
        _repository = repository;
        _productApiClient = productApiClient;
        _cartApiClient = cartApiClient;
    }

    public async Task<List<Order>> GetAllOrdersAsync(Guid userId)
    {
        var orders = await _repository.GetAllAsync(userId);
        return orders;
    }

    public async Task<Order?> GetOrderByIdAsync(Guid orderId)
    {
        var order = await _repository.GetOrderByIdAsync(orderId);

        if (order is null)
        {
            return null;
        }

        return order;
    }

    public async Task<Order?> CreateOrderAsync(Guid userId)
    {
        var cart = await _cartApiClient.GetCartItemsAsync(userId);
        if (cart is null || !cart.CartItems.Any())
        {
            return null;
        }

        var orderId = Guid.NewGuid();

        var order = new Order
        {
            Id = orderId,
            UserId = userId,
            Status = OrderStatus.PendingPayment,
            Subtotal = 0,
            TotalCost = 0,
            ShippingCost = 0,
            CreatedAt = DateTime.UtcNow,
            OrderItems = []
        };

        order.Subtotal = 0;
        var reservedItems = new List<(Guid ProductId, int Quantity)>();

        foreach (var item in cart.CartItems)
        {
            var product = await _productApiClient.GetProductByIdAsync(item.ProductId);
            if (product is null)
            {
                return null;
            }

            var orderItem = new OrderItem
            {
                Id = Guid.NewGuid(),
                OrderId = orderId,
                ProductId = item.ProductId,
                ProductName = product.Name,
                UnitPrice = product.Price,
                Quantity = item.Quantity,
                SubTotal = product.Price * item.Quantity
            };

            order.Subtotal += orderItem.SubTotal;

            order.OrderItems.Add(orderItem);
            var stockReserved = await _productApiClient.ReserveStockAsync(item.ProductId, item.Quantity);

            if (stockReserved is null)
            {
                // Release everything reserved so far
                foreach (var reservedItem in reservedItems)
                {
                    await _productApiClient.ReleaseStockAsync(reservedItem.ProductId, reservedItem.Quantity);
                }
                return null;
            }

            reservedItems.Add((item.ProductId, item.Quantity));
        }
        order.TotalCost = order.Subtotal + order.ShippingCost;

        await _repository.AddOrderAsync(order);
        await _repository.SaveAsync();

        // Clear cart
        await _cartApiClient.ClearCartAsync(userId);

        // Confirm
        order.UpdatedAt = DateTime.UtcNow;
        await _repository.SaveAsync();

        return order;
    }

    public async Task<Order?> CancelOrderAsync(Guid orderId)
    {
        var order = await _repository.GetOrderByIdAsync(orderId);

        if (order is null || order.Status != OrderStatus.PendingPayment)
        {
            return null;
        }

        if (order.Status == OrderStatus.Delivered || 
        order.Status == OrderStatus.Shipped || 
        order.Status == OrderStatus.Cancelled)
        {
            return null;
        }

        order.Status = OrderStatus.Cancelled;

        foreach (var item in order.OrderItems)
        {
            await _productApiClient.ReleaseStockAsync(item.ProductId, item.Quantity);
        }

        order.UpdatedAt = DateTime.UtcNow;
        await _repository.SaveAsync();

        return order;
    }
}