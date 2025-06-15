using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Team_Project_Meta.Data; // replace with actual namespace
using Team_Project_Meta.Models;

namespace Team_Project_Meta.Services.Order
{
    public class OrderStatusUpdater : BackgroundService
    {
        private readonly IServiceProvider _services;

        public OrderStatusUpdater(IServiceProvider services)
        {
            _services = services;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                using (var scope = _services.CreateScope())
                {
                    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

                    var now = DateTime.UtcNow;

                    // Fetch orders that still need updates
                    var orders = db.Orders
                                   .Where(o => o.Status != "delivered")
                                   .ToList();

                    foreach (var order in orders)
                    {
                        if (!order.CreatedDate.HasValue)
                            continue;

                        var elapsed = now - order.CreatedDate.Value;

                        if (order.Status == "pending" && elapsed.TotalSeconds >= 30)
                        {
                            order.Status = "delivering";
                        }
                        else if (order.Status == "delivering" && elapsed.TotalSeconds >= 90)
                        {
                            order.Status = "delivered";
                        }
                    }

                    await db.SaveChangesAsync();
                }

                await Task.Delay(TimeSpan.FromSeconds(10), stoppingToken); // Run every 10s
            }
        }
    }
}
