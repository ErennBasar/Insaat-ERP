using MediatR;

namespace InsaatERP.Application.Features.Contracts.Queries.GetAllContracts;

public record GetAllContractsQuery() : IRequest<List<ContractListDto>>;