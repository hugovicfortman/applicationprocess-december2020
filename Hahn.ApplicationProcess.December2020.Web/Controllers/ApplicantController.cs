using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
// Peer dependencies...
using Hahn.ApplicationProcess.December2020.Domain.Models;
using Hahn.ApplicationProcess.December2020.Domain.Logic.Component;

namespace Hahn.ApplicationProcess.December2020.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ApplicantController : ControllerBase
    {

        private readonly ApplicantComponent _applicantComponent;
        private readonly ILogger<ApplicantController> _logger;

        public ApplicantController(ILogger<ApplicantController> logger, ApplicantComponent applicantComponent)
        {
            _logger = logger;
            _applicantComponent = applicantComponent;
        }


        [HttpGet]
        public async Task<IEnumerable<Applicant>> GetList()
        {
            return await _applicantComponent.GetApplicants();
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<Applicant> Get(int id)
        {
            return await _applicantComponent.GetApplicant(id);
        }

        // [HttpPost]
        // public async Task<string> Create(Applicant applicant)
        // {
        //     try
        //     {
        //         if(! ModelState.IsValid)
        //         {
        //             // Return 400 error citing invalid model components
        //         }


        //         var newApplicant = await _applicantComponent.SaveApplicant(applicant);
        //         return $"/{newApplicant.ID}";
        //     }catch(Exception ex)
        //     {
        //         // Return an error indicating what fatal error went wrong
        //         return $"/";
        //     }
        // }

        // [HttpPut]
        // public async Task<Applicant> Modify(int id, Applicant applicant)
        // {
        //     try
        //     {
        //         return await _applicantComponent.UpdateApplicant(id, applicant);
        //     }
        //     catch (Exception ex)
        //     {
        //         // Return an error indicating what fatal error went wrong
        //         return applicant;
        //     }
        // }

        // [HttpDelete]
        // public async Task<Applicant> Delete(int id)
        // {
        //     try
        //     {
        //         return await _applicantComponent.DeleteApplicant(id);
        //     }
        //     catch (Exception ex)
        //     {
        //         // Return an error indicating what fatal error went wrong
        //         return null;
        //     }
        // }
    }
}
