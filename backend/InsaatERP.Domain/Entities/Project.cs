using System.Diagnostics.Contracts;
using InsaatERP.Domain.Entities.Common;
using InsaatERP.Domain.Enums;

namespace InsaatERP.Domain.Entities;

public class Project : BaseEntity
{
    public required string Name { get; set; }
    public required string EmployerName { get; set; }
    public decimal ContractValue { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public ProjectStatus Status { get; set; } = ProjectStatus.DevamEdiyor;
    public Decimal ExpectedProfitMargin { get; set; }

    public ICollection<Contract> Contracts { get; protected set; } = new List<Contract>();
    public ICollection<ProgressPayment> ProgressPayments { get; protected set; } = new List<ProgressPayment>();
    public ICollection<GuaranteeLetter> GuaranteeLetters { get; protected set; } = new List<GuaranteeLetter>();

}