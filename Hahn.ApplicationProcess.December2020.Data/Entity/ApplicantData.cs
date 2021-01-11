using System;
using System.Text;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using Hahn.ApplicationProcess.December2020.Data.Context;
using Hahn.ApplicationProcess.December2020.Domain.Models;
using Hahn.ApplicationProcess.December2020.Infrastructure.Helper;
using Hahn.ApplicationProcess.December2020.Infrastructure.Interface;
using Microsoft.EntityFrameworkCore;

namespace Hahn.ApplicationProcess.December2020.Data.Entity
{
    public class ApplicantData : IEntityData<Applicant>
    {
        private readonly ApplicantContext _context;

        public ApplicantData(ApplicantContext context)
        {
            _context = context;
        }
        
        public async Task<IEnumerable<Applicant>> GetEntityList()
        {
            return await _context.Applicants.ToListAsync();
        }

        public async Task<Applicant> GetEntity(int id)
        {
            return await _context.Applicants.FirstOrDefaultAsync(a => a.ID == id);
        }

        public async Task<Applicant> AddEntity(Applicant applicant)
        {
            // No request to check for uniqueness, so we simply save
            var c = await _context.Applicants.AddAsync(applicant);
            return c.Entity;
        }

        public async Task<Applicant> UpdateEntity(int id, Applicant applicant)
        {
            var oldStateApplicant = await _context.Applicants.FirstAsync(a => a.ID == id);
            oldStateApplicant.CopyEntityFrom(applicant);
            return oldStateApplicant;
        }

        public async Task<Applicant> DeleteEntity(int id)
        {
            var oldStateApplicant = await _context.Applicants.FirstAsync(a => a.ID == id);
            var c = _context.Applicants.Remove(oldStateApplicant);
            return c.Entity;
        }
        public async Task SaveChanges()
        {
            await _context.SaveChangesAsync();
        }
    }
}
