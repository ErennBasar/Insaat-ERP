using MediatR;

namespace InsaatERP.Application.Features.Projects.Commands.UpdateProjectProgress;

public record UpdateProjectProgressCommand(
    Guid Id,
    int NewProgress,
    string NewStatus
    ) : IRequest<bool>;