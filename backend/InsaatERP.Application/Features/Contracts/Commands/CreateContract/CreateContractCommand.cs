using InsaatERP.Domain.Enums;
using MediatR;

namespace InsaatERP.Application.Features.Contracts.Commands.CreateContract;

public record CreateContractCommand(
    Guid ProjectId,
    string Title,
    string CounterpartyName,
    ContractType Type,
    decimal ContractValue,
    string Currency,
    DateTime SigningDate,
    string PenaltyRate
    ): IRequest<Guid>;