using InsaatERP.Application.Repositories;
using InsaatERP.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace InsaatERP.Application.Features.Projects.Commands.CreateProject;

public class CreateProjectCommandHandler : IRequestHandler<CreateProjectCommand, Guid>
{
    private readonly IProjectRepository _repository;

    public CreateProjectCommandHandler(IProjectRepository repository)
    {
        _repository = repository;
    }

    public async Task<Guid> Handle(CreateProjectCommand request, CancellationToken cancellationToken)
    {
        var currentYear = DateTime.UtcNow.Year;
        
        var countThisYear = await _repository.GetAll(tracking: false)
            .Where(p => p.CreatedDate.Year == currentYear)
            .CountAsync(cancellationToken);
        
        var generatedCode = $"PRJ-{currentYear}-{(countThisYear + 1):D2}";
        
        var project = new Project
        {
            ProjectCode = generatedCode,
            Name = request.Name,
            EmployerName = request.EmployerName,
            ContractValue = request.ContractValue,
            StartDate = request.StartDate.ToUniversalTime(),
            EndDate = request.EndDate?.ToUniversalTime(),
            ExpectedProfitMargin = request.ExpectedProfitMargin,
            Type = request.Type,
            ProjectManager = request.ProjectManager,
            Location = request.Location,
        };

        await _repository.AddAsync(project);
        await _repository.SaveChangesAsync();

        return project.Id;
    }
}