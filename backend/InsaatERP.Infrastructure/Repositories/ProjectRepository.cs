using InsaatERP.Application.Repositories;
using InsaatERP.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace InsaatERP.Infrastructure.Repositories;

public class ProjectRepository : IProjectRepository
{
    private readonly AppDbContext _context;

    public ProjectRepository(AppDbContext context)
    {
        _context = context;
    }
    
    public async Task AddAsync(Project project)
    {
        await _context.Projects.AddAsync(project);
    }

    public async Task<int> SaveChangesAsync()
    {
        return await _context.SaveChangesAsync();
    }

    public IQueryable<Project> GetAll(bool tracking = false)
    {
        var query = _context.Projects.AsQueryable();
        
        if (!tracking)
            query = query.AsNoTracking(); 
            
        return query;
    }
}