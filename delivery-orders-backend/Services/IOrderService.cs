using delivery_orders_backend.DTOs;

namespace delivery_orders_backend.Services
{
    public interface IOrderService
    {
        Task<OrderDto> CreateOrderAsync(CreateOrderDto dto, CancellationToken ct);

        Task<IEnumerable<OrderDto>> GetAllOrdersAsync(CancellationToken ct);

        Task<OrderDto?> GetOrderByIdAsync(Guid id, CancellationToken ct);
    }
}
