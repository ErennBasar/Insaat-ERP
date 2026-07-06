using InsaatERP.Domain.Entities.Common;
using InsaatERP.Domain.Enums;

namespace InsaatERP.Domain.Entities;

public class Contract : BaseEntity
{
    public Guid ProjectId { get; set; }
    
    public string ContractCode { get; set; } = string.Empty; // SZ-2026-01 formatı (Vitrin ID)
    public required string Title { get; set; } // Sözleşmenin Adı (Örn: Elektrik Altyapı İşleri)
    public required string CounterpartyName { get; set; } // Karşı Taraf (EÜAŞ, Bosch veya Taşeron Adı)
    
    // --- 2. KATEGORİ VE DURUM ---
    public ContractType Type { get; set; } // Ana Sözleşme mi, Taşeron Sözleşmesi mi
    public ContractStatus Status { get; set; } = ContractStatus.Draft;
    
    public decimal ContractValue { get; set; } // Sözleşme Bedeli
    public string Currency { get; set; } = "TRY"; 
    public int PaymentTermDays { get; set; } // Ödeme Vadesi (Örn: 30 gün, 45 gün)
    public decimal AdvancePaymentPercentage { get; set; } // Avans Yüzdesi (Örn: %10)
    public decimal GuaranteePercentage { get; set; } // Kesin Teminat Yüzdesi (Örn: %6)
    
    public DateTime SigningDate { get; set; } 
    public DateTime StartDate { get; set; } 
    public DateTime? EndDate { get; set; } 
    public int WarrantyPeriodMonths { get; set; } 
    
    public string PenaltyRate { get; set; } = string.Empty; 
    public string? Description { get; set; } 
    
    public int RevisionNumber { get; set; } = 0; // Revizyon oldukca 1, 2, 3 diye artacak
    public string? DocumentFilePath { get; set; } 
    public AiAnalysisStatus AiStatus { get; set; } = AiAnalysisStatus.NotStarted; 
    
    public Project Project { get; set; } = null!;
}
