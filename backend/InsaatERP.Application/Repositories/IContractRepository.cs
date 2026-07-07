using InsaatERP.Domain.Entities;

namespace InsaatERP.Application.Repositories;

public interface IContractRepository
{
    Task AddAsync(Contract contract);
    Task<int> SaveChangesAsync();
    IQueryable<Contract> GetAll(bool tracking = false);
}