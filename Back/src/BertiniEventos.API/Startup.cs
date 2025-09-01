using BertiniEventos.Application;
using BertiniEventos.Application.Contratos;
using BertiniEventos.Persistence.Contratos;
using BertiniEventos.Persistence;
using BertiniEventos.Persistence.Contexto;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Microsoft.Extensions.FileProviders;
using System.Text.Json.Serialization;
using BertiniEventos.Domain.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace BertiniEventos.API
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
            services.AddDbContext<BertiniEventosContext>(context => context.UseSqlite(Configuration.GetConnectionString("DefaultConnection")));

            services.AddIdentityCore<User>(option =>
            {
                option.Password.RequireDigit = false;
                option.Password.RequireLowercase = false;
                option.Password.RequireUppercase = false;
                option.Password.RequireNonAlphanumeric = false;
                option.Password.RequiredLength = 4;
            })
                .AddRoles<Role>()
                .AddRoleManager<RoleManager<Role>>()
                .AddSignInManager<SignInManager<User>>()
                .AddRoleValidator<RoleValidator<Role>>()
                .AddEntityFrameworkStores<BertiniEventosContext>()
                .AddDefaultTokenProviders();

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["TokenKey"])),
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        ValidateLifetime = false,
                        ValidIssuer = Configuration["Jwt:Issuer"],
                        ValidAudience = Configuration["Jwt:Audience"],
                        ClockSkew = TimeSpan.Zero
                    };
                });

            services.AddControllers()
             .AddJsonOptions(option => option.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()))                
             .AddNewtonsoftJson(option => option.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
        // A linha acima pode ser substituida por esta .AddJsonOptions(option => option.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);


             services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

             services.AddScoped<IEventosService, EventoService>();
             services.AddScoped<ILoteService, LoteService>();
             services.AddScoped<ITokenService, TokenService>();
             services.AddScoped<IAccountService, AccountService>();

             services.AddScoped<IGeralPersist, GeralPersist>();
             services.AddScoped<IEventoPersist, EventosPersist>();
             services.AddScoped<ILotePersist, LotePersist>();
             services.AddScoped<IUserPersist, UserPersist>();
            
             services.AddCors();
             services.AddSwaggerGen(options =>
             {
                 options.SwaggerDoc("v1", new OpenApiInfo { Title = "BertiniEventos.API", Version = "v1" });
                 options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                 {
                     Description = @"JWT Authorization header using the Bearer scheme. Enter 'Bearer' [space] and then your token in the text input below.Example: Bearer 12345abcdef",
                     Name = "Authorization",
                     In = ParameterLocation.Header,
                     Type = SecuritySchemeType.ApiKey,
                     Scheme = "Bearer"
                 });
                 options.AddSecurityRequirement(new OpenApiSecurityRequirement()
                 {
                    {
                            new OpenApiSecurityScheme
                            {
                                Reference = new OpenApiReference
                                {
                                    Type = ReferenceType.SecurityScheme,
                                    Id = "Bearer"
                                },
                                Scheme = "oauth2",
                                Name = "Bearer",
                                In = ParameterLocation.Header,
                            },
                            new List<string>(){
                            }
                    }
                  });
             });
         }
 
         // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
         public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
         {
             if (env.IsDevelopment())
             {
                 app.UseDeveloperExceptionPage();
                 app.UseSwagger();
                 app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "BertiniEventos.API v1"));
             }
 
             app.UseHttpsRedirection();
 
             app.UseRouting();
 
             app.UseAuthentication();
             app.UseAuthorization();

             app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

            app.UseStaticFiles(new StaticFileOptions{
                FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "Resources")),
                RequestPath = new PathString("/Resources")  
            });
 
             app.UseEndpoints(endpoints =>
             {
                 endpoints.MapControllers();
             });
         }
     }

   
}