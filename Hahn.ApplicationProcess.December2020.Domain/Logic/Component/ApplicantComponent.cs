using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Hahn.ApplicationProcess.December2020.Domain.Models;
using Hahn.ApplicationProcess.December2020.Infrastructure.Interface;

namespace Hahn.ApplicationProcess.December2020.Domain.Logic.Component
{
    public class ApplicantComponent
    {
        private readonly IEntityData<Applicant> _applicantData;

        public ApplicantComponent(IEntityData<Applicant> applicantData)
        {
            _applicantData = applicantData;
        }

        public async Task<IEnumerable<Applicant>> GetApplicants()
        {
            return await _applicantData.GetEntityList();
        }

        public async Task<Applicant> GetApplicant(int id)
        {
            return await _applicantData.GetEntity(id);
        }

        public async Task<Applicant> SaveApplicant(Applicant applicant)
        {
            // Maybe see if this applicant doesn't already exist?
            var newApplicant = await _applicantData.AddEntity(applicant);
            SaveChanges();
            return newApplicant;
        }

        public async Task<Applicant> UpdateApplicant(int id, Applicant applicant)
        {
            var newApplicant = await _applicantData.UpdateEntity(id, applicant);
            SaveChanges();
            return newApplicant;
        }

        public async Task<Applicant> DeleteApplicant(int id)
        {
            var applicant = await _applicantData.DeleteEntity(id);
            SaveChanges();
            return applicant;
        }

        private void SaveChanges()
        {
            _applicantData.SaveChanges();
        }
    }
}
