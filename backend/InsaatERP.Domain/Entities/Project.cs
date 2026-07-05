using System.Diagnostics.Contracts;
using InsaatERP.Domain.Entities.Common;
using InsaatERP.Domain.Enums;

namespace InsaatERP.Domain.Entities;

public class Project : BaseEntity
{
    public string ProjectCode { get; set; } = string.Empty; // PRJ-2026-01 formatında 
    public required string Name { get; set; }
    public required string EmployerName { get; set; }
    public decimal ContractValue { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public ProjectStatus Status { get; set; } = ProjectStatus.DevamEdiyor;
    public Decimal ExpectedProfitMargin { get; set; }
    public string Type { get; set; } = string.Empty; 
    public string ProjectManager { get; set; } = string.Empty; 
    public string Location { get; set; } = string.Empty; 
    public int Progress { get; set; } = 0; 

    public ICollection<Contract> Contracts { get; protected set; } = new List<Contract>();
    public ICollection<ProgressPayment> ProgressPayments { get; protected set; } = new List<ProgressPayment>();
    public ICollection<GuaranteeLetter> GuaranteeLetters { get; protected set; } = new List<GuaranteeLetter>();

    public void UpdateProgress(int newProgress, ProjectStatus newStatus)
    {
        if (newProgress < 0 || newProgress > 100)
            throw new ArgumentException("İlerleme değeri 0 ile 100 arasında olmalıdır usta!");

        Progress = newProgress;
        Status = newStatus;
        
        // protected alanı burada doğrudan set ediyoruz
        UpdatedDate = DateTime.UtcNow; 
    }
}