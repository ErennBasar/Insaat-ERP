using InsaatERP.Application.Repositories;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace InsaatERP.Application.Features.Contracts.Queries.GetAllContracts;

public class GetAllContractsQueryHandler : IRequestHandler<GetAllContractsQuery, List<ContractListDto>>
{
    private readonly IContractRepository _repository;

    public GetAllContractsQueryHandler(IContractRepository repository)
    {
        _repository = repository;
    }
    
    public async Task<List<ContractListDto>> Handle(GetAllContractsQuery request, CancellationToken cancellationToken)
    {
        var contracts = await _repository.GetAll(tracking:false)
            .Select(c => new ContractListDto(
                c.Id,
                c.ContractCode,
                c.ProjectId,
                c.Title,
                c.CounterpartyName,
                c.Type,
                c.ContractValue,
                c.Currency,
                c.SigningDate,
                c.PenaltyRate,
                c.Status,
                c.AiStatus,
                c.RevisionNumber
            )).ToListAsync(cancellationToken);

        return contracts;
    }
}