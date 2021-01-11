using System;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace Hahn.ApplicationProcess.December2020.Infrastructure.Interface
{
    public interface IEntityData<T>
    {
        Task<IEnumerable<T>> GetEntityList();

        Task<T> GetEntity(int id);

        Task<T> AddEntity(T applicant);

        Task<T> UpdateEntity(int id, T applicant);

        Task<T> DeleteEntity(int id);
        
        Task SaveChanges();
    }
}
