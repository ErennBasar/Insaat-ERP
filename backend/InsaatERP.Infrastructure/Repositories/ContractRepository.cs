using InsaatERP.Application.Repositories;
using InsaatERP.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace InsaatERP.Infrastructure.Repositories;

public class ContractRepository : IContractRepository
{
    private readonly AppDbContext _context;

    public ContractRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task AddAsync(Contract contract)
    {
        await _context.Contracts.AddAsync(contract);
    }

    public async Task<int> SaveChangesAsync()
    {
        return await _context.SaveChangesAsync();
    }

    public IQueryable<Contract> GetAll(bool tracking = false)
    {
        var query = _context.Contracts.AsQueryable();

        if (!tracking)
        {
            query = query.AsNoTracking();
        }

        return query;
    }
}