using InsaatERP.Application.Features.Projects.Commands.CreateProject;
using InsaatERP.Application.Features.Projects.Commands.UpdateProjectProgress;
using InsaatERP.Application.Features.Projects.Queries.GetAllProjects;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace InsaatERP.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProjectsController : ControllerBase
{
    private readonly IMediator _mediator;

    public ProjectsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateProjectCommand command)
    {
        var projectId = await _mediator.Send(command);

        return Ok(new
        {
            Id = projectId,
            Message = "Project created successfully"
        });
    }
    
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var query = new GetAllProjectsQuery();
        var projects = await _mediator.Send(query);
        return Ok(projects);
    }
    
    [HttpPut("update-progress")]
    public async Task<IActionResult> UpdateProgress(UpdateProjectProgressCommand command)
    {
        var result = await _mediator.Send(command);
        if (!result) return NotFound(new { Message = "Proje bulunamadı." });
    
        return Ok(new { Message = "Proje ilerleme durumu güncellendi." });
    }
}