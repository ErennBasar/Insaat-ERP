using MediatR;
using Microsoft.EntityFrameworkCore;
using InsaatERP.Application.Repositories;

namespace InsaatERP.Application.Features.Projects.Queries.GetAllProjects;

public class GetAllProjectsQueryHandler : IRequestHandler<GetAllProjectsQuery, List<ProjectListDto>>
{
    private readonly IProjectRepository _repository;

    public GetAllProjectsQueryHandler(IProjectRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<ProjectListDto>> Handle(GetAllProjectsQuery request, CancellationToken cancellationToken)
    {
        // Repository'den IQueryable olarak alıyoruz ki Select (Mapping) işlemi veritabanı seviyesinde yapılsın
        var projects = await _repository.GetAll(tracking: false)
            .Select(p => new ProjectListDto(
                p.Id,
                p.Name,
                p.Type,
                p.EmployerName,
                p.ProjectManager,
                p.Location,
                p.ContractValue,
                p.ContractValue, // Kalan tutar şimdilik toplam sözleşme bedeli
                p.Progress,
                p.EndDate,
                p.ExpectedProfitMargin,
                p.Status.ToString() 
            ))
            .ToListAsync(cancellationToken);

        return projects;
    }
}