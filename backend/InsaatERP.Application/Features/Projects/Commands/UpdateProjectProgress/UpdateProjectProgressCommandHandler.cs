using InsaatERP.Application.Repositories;
using InsaatERP.Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace InsaatERP.Application.Features.Projects.Commands.UpdateProjectProgress;

public class UpdateProjectProgressCommandHandler : IRequestHandler<UpdateProjectProgressCommand, bool>
{
    private readonly IProjectRepository _repository;

    public UpdateProjectProgressCommandHandler(IProjectRepository repository)
    {
        _repository = repository;
    }

    public async Task<bool> Handle(UpdateProjectProgressCommand request, CancellationToken cancellationToken)
    {
        var project = await _repository.GetAll(tracking: true)
            .FirstOrDefaultAsync(p => p.Id == request.Id, cancellationToken);

        if (project == null) return false;

        if (Enum.TryParse(typeof(ProjectStatus), request.NewStatus, out var parsedStatus))
        {
            project.UpdateProgress(request.NewProgress, (ProjectStatus)parsedStatus);
        }
        else
        {
            return false;
        }

        await _repository.SaveChangesAsync();
        return true;

    }
}