namespace InsaatERP.Application.Features.Projects.Queries.GetAllProjects;

public record ProjectListDto(
    Guid Id,
    string ProjectCode,
    string Name,
    string Type,
    string Client,
    string Manager,
    string Location,
    decimal ContractValue,
    decimal RemainingValue,
    int Progress,
    DateTime? EndDate,
    decimal Profit,
    string Status
);