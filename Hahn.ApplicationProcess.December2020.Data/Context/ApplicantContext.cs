using System;
using Microsoft.EntityFrameworkCore;
using Hahn.ApplicationProcess.December2020.Domain.Models;

namespace Hahn.ApplicationProcess.December2020.Data.Context
{
    public class ApplicantContext : DbContext
    {
        public ApplicantContext(DbContextOptions<ApplicantContext> options)
               : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        }

        public DbSet<Applicant> Applicants { get; set; }

    }
}
