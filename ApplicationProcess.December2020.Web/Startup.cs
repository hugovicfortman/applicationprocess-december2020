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
using ApplicationProcess.December2020.Domain.Models;
using ApplicationProcess.December2020.Infrastructure.Helper;
using ApplicationProcess.December2020.Infrastructure.Interface;
using ApplicationProcess.December2020.Domain.Logic.Validator;
using ApplicationProcess.December2020.Domain.Logic.Component;
using ApplicationProcess.December2020.Data.Entity;
using ApplicationProcess.December2020.Data.Context;
using ApplicationProcess.December2020.Web.Seeding;

namespace ApplicationProcess.December2020.Web
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
            services.AddTransient<IEntityData<Applicant>, ApplicantData>();
            services.AddTransient<IValidator<Applicant>, ApplicantValidator>();
            
            

            services.AddCors(options =>
            {
               options.AddPolicy("CorsPolicy", builder => builder
               .WithOrigins("http://localhost:8080")
               .AllowAnyMethod()
               .AllowAnyHeader()
               .AllowCredentials());
            });


            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "ApplicationProcess.December2020.Web", Version = "v1" });
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
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "ApplicationProcess.December2020.Web v1");
                    c.RoutePrefix = string.Empty;
                });
                // DbInitializer.Initialize(app);
            }

            app.UseHttpsRedirection();

            app.UseCors("CorsPolicy");

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();

                // Render the SPA
                endpoints.MapFallbackToController("GET","home");
            });
        }
    }
}
