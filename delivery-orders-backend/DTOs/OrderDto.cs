namespace delivery_orders_backend.DTOs
{
    public record OrderDto(
        Guid Id,
        string OrderNumber,
        string SenderCity,
        string SenderAddress,
        string ReceiverCity,
        string ReceiverAddress,
        decimal Weight,
        DateTime PickupDate,
        DateTime CreatedAt);
}
