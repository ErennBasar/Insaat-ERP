using InsaatERP.Application.Repositories;
using InsaatERP.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace InsaatERP.Application.Features.Contracts.Commands.CreateContract;

public class CreateContractCommandHandler : IRequestHandler<CreateContractCommand, Guid>
{
    private readonly IContractRepository _repository;

    public CreateContractCommandHandler(IContractRepository repository)
    {
        _repository = repository;
    }

    public async Task<Guid> Handle(CreateContractCommand request, CancellationToken cancellationToken)
    {
        var currentYear = DateTime.UtcNow.Year;

        var countThisYear = await _repository.GetAll(tracking: false)
            .Where(c => c.CreatedDate.Year == currentYear)
            .CountAsync(cancellationToken);
        
        var generatedCode = $"SZ-{currentYear}-{(countThisYear + 1):D2}";

        var contract = new Contract
        {
            ContractCode = generatedCode,
            ProjectId = request.ProjectId,
            Title = request.Title,
            CounterpartyName = request.CounterpartyName,
            Type = request.Type,
            ContractValue = request.ContractValue,
            Currency = request.Currency,
            SigningDate = request.SigningDate.ToUniversalTime(),
            PenaltyRate = request.PenaltyRate
        };

        await _repository.AddAsync(contract);
        await _repository.SaveChangesAsync();

        return contract.Id;
    }
}