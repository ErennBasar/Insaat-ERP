namespace InsaatERP.Domain.Entities.Common;

public class BaseEntity
{
    public Guid Id { get; protected set; }
    public DateTime CreatedDate { get; protected set; } = DateTime.UtcNow;
    public DateTime? UpdatedDate { get; protected set; }
}