using InsaatERP.Domain.Entities.Common;

namespace InsaatERP.Domain.Entities;

public class GuaranteeLetter : BaseEntity
{
    public Guid ProjectId { get; set; }
    public required string BankName { get; set; }
    public required string LetterType { get; set; } 
    public decimal Amount { get; set; }
    public decimal CommissionRate { get; set; }
    public DateTime ExpiryDate { get; set; }
    
    public Project Project { get; set; } = null!;
}