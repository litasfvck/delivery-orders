using delivery_orders_backend.Data;
using delivery_orders_backend.DTOs;
using delivery_orders_backend.Models;
using Microsoft.EntityFrameworkCore;

namespace delivery_orders_backend.Services
{
    public class OrderService(AppDbContext context) : IOrderService
    {
        public async Task<OrderDto> CreateOrderAsync(
            CreateOrderDto dto,
            CancellationToken ct)
        {
            var order = new Order
            {
                OrderNumber = GenerateOrderNumber(),
                SenderCity = dto.SenderCity,
                SenderAddress = dto.SenderAddress,
                ReceiverCity = dto.ReceiverCity,
                ReceiverAddress = dto.ReceiverAddress,
                Weight = dto.Weight,
                PickupDate = dto.PickupDate,
                CreatedAt = DateTime.UtcNow
            };

            context.Orders.Add(order);
            await context.SaveChangesAsync(ct);

            return MapToDto(order);
        }

        public async Task<IEnumerable<OrderDto>> GetAllOrdersAsync(CancellationToken ct)
            => await context.Orders
                .AsNoTracking()
                .Select(order => MapToDto(order))
                .ToArrayAsync(ct);

        public async Task<OrderDto?> GetOrderByIdAsync(
            Guid id,
            CancellationToken ct
        ) => await context.Orders
            .AsNoTracking()
            .Where(order => order.Id == id)
            .Select(order => MapToDto(order))
            .FirstOrDefaultAsync(ct);

        private static OrderDto MapToDto(Order order) 
            => new(
                order.Id,
                order.OrderNumber,
                order.SenderCity,
                order.SenderAddress,
                order.ReceiverCity,
                order.ReceiverAddress,
                order.Weight,
                order.PickupDate,
                order.CreatedAt
            );

        private static string GenerateOrderNumber() => $"ORD-{DateTime.UtcNow:yyyyMMddHHmmss}";
    }
}