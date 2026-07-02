using InsaatERP.Domain.Entities.Common;
using InsaatERP.Domain.Enums;

namespace InsaatERP.Domain.Entities;

public class ProgressPayment : BaseEntity
{
    public Guid ProjectId { get; set; }
    public required string DocumentNo { get; set; } 
    public decimal Amount { get; set; }
    public ProgressPaymentStatus ApprovalStatus { get; set; } = ProgressPaymentStatus.Beklemede;
    public DateTime ApplicationDate { get; set; }
    
    public Project Project { get; set; } = null!;
}