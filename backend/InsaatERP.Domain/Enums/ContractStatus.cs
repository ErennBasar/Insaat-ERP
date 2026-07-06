namespace InsaatERP.Domain.Enums;

public enum ContractStatus
{
    Draft = 1,      // Taslak (Sisteme girildi ama henüz onaylanmadı)
    Active = 2,     // Yürürlükte (Aktif olarak işliyor)
    Completed = 3,  // Tamamlandı
    Suspended = 4,  // Askıya Alındı
    Terminated = 5  // Feshedildi (İptal)
}