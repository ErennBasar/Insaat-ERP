using InsaatERP.Domain.Entities;

namespace InsaatERP.Application.Repositories;

public interface IProjectRepository
{
    Task AddAsync(Project project);
    Task<int> SaveChangesAsync();
    IQueryable<Project> GetAll(bool tracking = false);
}