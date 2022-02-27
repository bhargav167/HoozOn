using AutoMapper;
using HoozOn.Data;
using HoozOn.Data.AuthenticationRepo;
using HoozOn.Data.JobRepo;
using HoozOn.Data.MessagesRepo;
using HoozOn.Data.PhaseRepo1;
using HoozOn.Data.TaggingRepo;
using HoozOn.Data.UserReview;
using HoozOn.Helpers;
using HoozOn.Hubs;
using HoozOn.Middleware;
using HoozOn.Services.Report;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json.Serialization;

namespace HoozOn {
    public class Startup {
        private readonly IConfiguration _config;
        public Startup (IConfiguration config) {
            _config = config;
        }
        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices (IServiceCollection services) {
            services.AddDbContext<DataContext> (s => s.UseSqlServer (_config.GetConnectionString ("DefaultConnection")));
            services.AddScoped<ICrudRepo, CrudRepo> ();
            services.AddScoped<IJobRepo, JobRepo> ();
            services.AddScoped<IAuthRepo, AuthRepo> ();
            services.AddScoped<ITaggingRepo, TaggingRepo> ();
            services.AddScoped<IMessageRepo, MessageRepo> ();
            services.AddScoped<IUserReview, UserReview> ();
            services.AddScoped<IReport, Report> ();
            services.AddControllers ();
            services.Configure<CloudinarySettings> (_config.GetSection ("CloudinarySettings"));
            // Auto Mapper Configurations
            var mappingConfig = new MapperConfiguration (mc => {
                mc.AddProfile (new Automapperprofiling ());
            });
            IMapper mapper = mappingConfig.CreateMapper ();
            services.AddSingleton (mapper);
            
             services.AddSignalR().AddMessagePackProtocol();

            services.AddCors(options =>
            {
                options.AddDefaultPolicy(builder =>
                {
                    builder
                        .WithOrigins(
                        "https://localhost")
                        .AllowCredentials()
                        .AllowAnyHeader()
                        .SetIsOriginAllowed(_ => true)
                        .AllowAnyMethod();
                });
            });

            services.AddControllers (option => { option.EnableEndpointRouting = false; })
                .SetCompatibilityVersion (CompatibilityVersion.Version_3_0)
                .AddNewtonsoftJson (options => {
                    options.SerializerSettings.ContractResolver = new DefaultContractResolver ();
                    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
                });

            services.AddControllersWithViews ()
                .AddNewtonsoftJson (options =>
                    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
                );
            services.AddAuthentication ().AddGoogle (options => {
                options.ClientId = "547202752586-q5lou7tho2mp7ej1g7cfci3hq5offm46.apps.googleusercontent.com";
                options.ClientSecret = "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";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure (IApplicationBuilder app, IWebHostEnvironment env) {
            // app.UseMiddleware<ExceptionMiddleware> ();

            app.UseHttpsRedirection ();

            app.UseRouting ();

            app.UseCors (x => x.AllowAnyOrigin ().AllowAnyMethod ()
                .AllowAnyHeader ()
            );

            app.UseAuthentication ();
            app.UseAuthorization ();

            //    app.UseDefaultFiles ();
            app.UseStaticFiles ();

            app.UseEndpoints (endpoints => {
                endpoints.MapControllers ();
                endpoints.MapHub<ChatHub> ("/signalr");
                endpoints.MapFallbackToController ("Index", "Fallback");
            });
        }
    }
}