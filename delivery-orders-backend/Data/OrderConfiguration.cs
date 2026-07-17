using delivery_orders_backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace delivery_orders_backend.Data
{
    public class OrderConfiguration : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.ToTable("orders").HasKey(o => o.Id);

            builder.Property(o => o.OrderNumber)
                .HasColumnName("order_number")
                .IsRequired();

            builder.Property(o => o.SenderCity)
                .HasColumnName("sender_city")
                .IsRequired();

            builder.Property(o => o.SenderAddress)
                .HasColumnName("sender_address")
                .IsRequired();

            builder.Property(o => o.ReceiverCity)
                .HasColumnName("receiver_city")
                .IsRequired();

            builder.Property(o => o.ReceiverAddress)
                .HasColumnName("receiver_address")
                .IsRequired();

            builder.Property(o => o.Weight)
                .HasColumnName("weight")
                .HasColumnType("numeric(18,2)")
                .IsRequired();

            builder.Property(o => o.PickupDate)
                .HasColumnName("pickup_date")
                .IsRequired();

            builder.Property(o => o.CreatedAt)
                .HasColumnName("created_at")
                .IsRequired();

            builder.HasIndex(o => o.OrderNumber)
                .IsUnique();
        }
    }
}
