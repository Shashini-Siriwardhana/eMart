using System;
using System.Collections.Generic;

namespace Shared.Messaging.Events;

public class OrderCancelledEvent
{
    public Guid OrderId {get; set;}
    public Guid UserId {get; set;}
    public List<OrderCancelledItem> Items {get; set;} = [];
}

public class OrderCancelledItem
{
    public Guid ProductId {get; set;}
    public int Quantity {get; set;}
}