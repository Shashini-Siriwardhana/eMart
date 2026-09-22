namespace OrderService.Enums;

public enum OrderStatus
{
    PendingPayment,
    Confirmed,
    Processing,
    Shipped,
    Delivered,
    Cancelled
}