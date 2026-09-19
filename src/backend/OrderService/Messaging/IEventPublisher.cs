namespace OrderService.Messaging;

public interface IEventPublisher
{
    Task PublishAsync<T>(T message);
}