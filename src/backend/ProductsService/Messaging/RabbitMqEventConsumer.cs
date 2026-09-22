using System.Text;
using System.Text.Json;
using Microsoft.AspNetCore.Server.HttpSys;
using ProductsService.Services;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using Shared.Messaging.Events;

namespace ProductsService.Messaging;

public class RabbitMqEventConsumer : BackgroundService
{
    private readonly IConfiguration _configuration;
    private readonly IServiceScopeFactory _scopeFactory;

    public RabbitMqEventConsumer(IConfiguration configuration, IServiceScopeFactory scopeFactory)
    {
        _configuration = configuration;
        _scopeFactory = scopeFactory;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
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

        // Create a queue
        await channel.QueueDeclareAsync(
            queue: "product-stock-queue",
            durable: true,
            exclusive: false,
            autoDelete: false
        );

        // Bind the queue - connects emart.events to product-stock-queue
        // Because fanout exchange is used, every message published to emart.events will be routed to this queue.
        await channel.QueueBindAsync(
            queue: "product-stock-queue",
            exchange: "emart.events",
            routingKey: ""
        );

        // Create RabbitMQ consumer
        var consumer = new AsyncEventingBasicConsumer(channel);
        consumer.ReceivedAsync += async (sender, eventArgs) =>
        {
            try
            {
                var body = eventArgs.Body.ToArray();
                var message = Encoding.UTF8.GetString(body);

                var orderCancelledEvent = JsonSerializer.Deserialize<OrderCancelledEvent>(message);

                if (orderCancelledEvent is null)
                {
                    // Negative Acknowledgement
                    await channel.BasicNackAsync(
                        eventArgs.DeliveryTag,
                        multiple: false,
                        requeue: false // Don't put this message straight back into the same queue.
                    );

                    return;
                }

                // Create DI scope
                using var scope = _scopeFactory.CreateScope();
                var productService = scope.ServiceProvider.GetRequiredService<IProductService>();

                foreach (var item in orderCancelledEvent.Items)
                {
                    await productService.ReleaseStockAsync(item.ProductId, item.Quantity);
                }

                // Acknowledgement - Remove it from the queue
                await channel.BasicAckAsync(
                    eventArgs.DeliveryTag, // identifies the particular delivery we're acknowledging.
                    multiple: false // Acknowledge only this message.
                );
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                await channel.BasicNackAsync(
                    eventArgs.DeliveryTag,
                    multiple: false,
                    requeue: false
                );
            }
        };

        // Tell RabbitMQ to start delivering messages
        await channel.BasicConsumeAsync(
            queue: "product-stock-queue",
            autoAck: false,
            consumer: consumer
        );

        await Task.Delay(Timeout.Infinite, stoppingToken);
    }
}