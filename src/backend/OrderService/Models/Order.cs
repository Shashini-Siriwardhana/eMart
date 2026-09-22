using OrderService.Enums;

namespace OrderService.Models;

public class Order
{
    public Guid Id {get; set;}
    public Guid UserId {get; set;}
    public OrderStatus Status {get; set;} = OrderStatus.PendingPayment;
    public decimal TotalCost {get; set;}
    public decimal ShippingCost {get; set;}
    public decimal Subtotal {get; set;}
    public DateTime CreatedAt {get; set;}
    public DateTime? UpdatedAt {get; set;}
    public List<OrderItem> OrderItems {get; set;} = new();
}