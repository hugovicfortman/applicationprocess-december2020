using System;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.EntityFrameworkCore;
// Peer Dependencies...
using Hahn.ApplicationProcess.December2020.Domain.Models;
using Hahn.ApplicationProcess.December2020.Infrastructure.Helper;
using Hahn.ApplicationProcess.December2020.Infrastructure.Interface;
using Hahn.ApplicationProcess.December2020.Domain.Logic.Validator;
using Hahn.ApplicationProcess.December2020.Domain.Logic.Component;
using Hahn.ApplicationProcess.December2020.Data.Entity;
using Hahn.ApplicationProcess.December2020.Data.Context;
using Hahn.ApplicationProcess.December2020.Web.Seeding;

namespace Hahn.ApplicationProcess.December2020.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers();
            services.AddMvc(setup => {
                //...mvc setup...
            }).AddFluentValidation();

            // // In memory db is advised against in Microsoft Documentation..
            // // Preferrably, use SQLITE.
            // services.AddDbContext<ApplicantContext>(options =>
            //         options.UseInMemoryDatabase(o => {

            //         }));


            services.AddDbContext<ApplicantContext>(options =>
                    options.UseSqlite(Configuration.GetConnectionString("DefaultConnection")));

            services.AddSingleton(new HttpClient());
            
            services.AddTransient<CountryHelper>();
            services.AddTransient<ApplicantComponent>();
            services.AddTransient<IEnityData, ApplicantData>();
            services.AddTransient<IValidator<Applicant>, ApplicantValidator>();
            

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Hahn.ApplicationProcess.December2020.Web", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Hahn.ApplicationProcess.December2020.Web v1");
                    c.RoutePrefix = string.Empty;
                });
                DbInitializer.Initialize(app);
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
