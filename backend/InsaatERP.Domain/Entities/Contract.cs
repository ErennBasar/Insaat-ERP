using InsaatERP.Domain.Entities.Common;

namespace InsaatERP.Domain.Entities;

public class Contract : BaseEntity
{
    public Guid ProjectId { get; set; }
    public required string Description { get; set; }
    public DateTime SigningDate { get; set; }
    public DateTime? ExpiryDate { get; set; }
    public decimal PenaltyAmount { get; set; }
    
    public Project Project { get; set; } = null!;
}