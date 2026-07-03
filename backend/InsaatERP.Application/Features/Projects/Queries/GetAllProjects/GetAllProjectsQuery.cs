using MediatR;

namespace InsaatERP.Application.Features.Projects.Queries.GetAllProjects;

public record GetAllProjectsQuery() : IRequest<List<ProjectListDto>>;