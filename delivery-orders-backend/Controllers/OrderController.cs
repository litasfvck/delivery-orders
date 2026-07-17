using delivery_orders_backend.DTOs;
using delivery_orders_backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace delivery_orders_backend.Controllers
{

    [ApiController]
    [Route("api/orders")]
    public class OrderController(IOrderService orderService) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderDto>>> GetAll(
            CancellationToken ct)
        {
            var orders = await orderService.GetAllOrdersAsync(ct);

            return Ok(orders);
        }


        [HttpGet("{id:guid}")]
        public async Task<ActionResult<OrderDto>> GetById(
            Guid id,
            CancellationToken ct)
        {
            var order = await orderService.GetOrderByIdAsync(id, ct);

            return Ok(order);
        }


        [HttpPost]
        public async Task<ActionResult<OrderDto>> Create(
            [FromBody] CreateOrderDto dto,
            CancellationToken ct)
        {
            var order = await orderService.CreateOrderAsync(dto, ct);

            return CreatedAtAction(
                nameof(GetById),
                new { id = order.Id },
                order);
        }
    }
}