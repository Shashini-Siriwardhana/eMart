using System.Text;
using System.Text.Json;
using RabbitMQ.Client;

namespace OrderService.Messaging;

public class RabbitMqEventPublisher : IEventPublisher
{
    private readonly IConfiguration _configuration;

    public RabbitMqEventPublisher(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task PublishAsync<T>(T message)
    {
        // Connect to RabbitMQ
        var factory = new ConnectionFactory
        {
            HostName = _configuration["RabbitMQ:HostName"] ?? "localhost",
            UserName = _configuration["RabbitMQ:UserName"] ?? "guest",
            Password = _configuration["RabbitMQ:Password"] ?? "guest"
        };

        // Create a connection
        await using var connection = await factory.CreateConnectionAsync();
        // Create a channel - a lightweight communication path over the RabbitMQ connection
        await using var channel = await connection.CreateChannelAsync();

        // Create an exchange (Where the application publishes events)
        await channel.ExchangeDeclareAsync(
            exchange: "emart.events",
            type: ExchangeType.Fanout, // Send event to all queues that are subscribed to this
            durable: true
        );

        // Serialize the event - event needs to become something RabbitMQ can transport
        var json = JsonSerializer.Serialize(message); // Turns into json
        var body = Encoding.UTF8.GetBytes(json); // Turns into bytes

        // Publish the message
        await channel.BasicPublishAsync(
            exchange: "emart.events",
            routingKey: "",
            body: body
        );
    }
}