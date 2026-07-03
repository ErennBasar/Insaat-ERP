using MediatR;

namespace InsaatERP.Application.Features.Projects.Commands.CreateProject;

public record CreateProjectCommand(
    string Name,
    string EmployerName,
    decimal ContractValue,
    DateTime StartDate,
    DateTime? EndDate,
    decimal ExpectedProfitMargin,
    string Type,
    string ProjectManager,
    string Location
    ) : IRequest<Guid>; // Geriye oluşturulan projenin Id'si ni (Guid) dönecek
    
    