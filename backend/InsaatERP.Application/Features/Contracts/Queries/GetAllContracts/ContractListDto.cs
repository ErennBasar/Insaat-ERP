using InsaatERP.Domain.Enums;

namespace InsaatERP.Application.Features.Contracts.Queries.GetAllContracts;

public record ContractListDto(
    Guid Id,
    string ContractCode,
    Guid ProjectId,
    string Title,
    string CounterpartyName,
    ContractType Type,
    decimal ContractValue,
    string Currency,
    DateTime SigningDate,
    string PenaltyRate,
    ContractStatus Status,
    AiAnalysisStatus AiStatus,
    int RevisionNumber
    );