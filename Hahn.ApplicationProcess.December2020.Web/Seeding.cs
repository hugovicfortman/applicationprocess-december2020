using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Hahn.ApplicationProcess.December2020.Data.Context;
using Hahn.ApplicationProcess.December2020.Domain.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.DependencyInjection;

namespace Hahn.ApplicationProcess.December2020.Web.Seeding
{
    public static class DbInitializer
    {
        public static void Initialize(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<ApplicantContext>();
                context.Database.EnsureCreated();

                var applicant = context.Applicants
                                  .Where(x => x.ID == 1).FirstOrDefault();

                if (applicant == null)
                {
                    Seeder.AddTestData(context);
                }

                context.SaveChanges();
            }
        }
    }

    public static class Seeder
    { 
        private static readonly string[] Names = new[]
        {
            "Bilbo", "Frodo", "Merry", "Pippin", "Samwise", "Gimli", "Smeagol", "Deagol"
        };
        private static readonly string[] FamilyNames = new[]
        {
            "Baggings", "Took", "Gloin", "Grayhame", "Gamji", "Freshwood", "Longbottom", "Sweetpea"
        };

        public static void AddTestData(ApplicantContext context)
        {    

            var rng = new Random();
            var testApplicants = Enumerable.Range(1, 5).Select(index => new Applicant
                {
                    ID = index,
                    Name  = Names[rng.Next(Names.Length)],
                    FamilyName = FamilyNames[rng.Next(Names.Length)],
                    Address = "Somewhere in Middle Earth",
                    CountryOfOrigin = "the shire",
                    EmailAddress = "Email@address.com",
                    Age = rng.Next(-20, 55),
                    Hired = ((rng.Next(1, 10)%2) == 0)
                })
                .ToArray();
        
            context.Applicants.AddRange(testApplicants);
        }
    }
}