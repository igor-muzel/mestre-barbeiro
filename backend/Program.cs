using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models; // <-- VOLTAMOS COM O .MODELS! Agora vai funcionar pois o Swashbuckle está instalado.
using System.Text;

using backend.Data;
using backend.Interfaces; 
using backend.Services;

var builder = WebApplication.CreateBuilder(args);

// Configuração do Banco de Dados MySQL
var connectionString = builder.Configuration.GetConnectionString("ConexaoMySQL");
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

// Injeção de Dependências
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IServicoService, ServicoService>();

// Configuração do CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirFrontend", politica =>
    {
        politica.WithOrigins("http://localhost:3000") // Porta do teu Next.js
                .AllowAnyHeader()
                .AllowAnyMethod();
    });
});

builder.Services.AddControllers();

// Configuração Autenticação JWT
// ADICIONAMOS '?? ""' -> Isto diz ao C#: "Se não encontrares a chave, usa um texto vazio", removendo o aviso amarelo!
var jwtKey = builder.Configuration["Jwt:Key"] ?? ""; 
var keyBytes = Encoding.ASCII.GetBytes(jwtKey);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false; 
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(keyBytes), 
        ValidateIssuer = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"], 
        ValidateAudience = true,
        ValidAudience = builder.Configuration["Jwt:Audience"], 
        ValidateLifetime = true, 
        ClockSkew = TimeSpan.Zero 
    };
});

// Configuração do Swagger para aceitar JWT
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "MestreBarbeiro API", Version = "v1" });

    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "Insere o token JWT desta forma: Bearer {o_teu_token}",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});

var app = builder.Build();

app.UseCors("PermitirFrontend");

// Pipeline de requisições HTTP
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication(); 
app.UseAuthorization();

app.MapControllers();

app.Run();