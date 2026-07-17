namespace delivery_orders_backend.DTOs
{
    public record CreateOrderDto(
        string SenderCity,
        string SenderAddress,
        string ReceiverCity,
        string ReceiverAddress,
        decimal Weight,
        DateTime PickupDate);
}
