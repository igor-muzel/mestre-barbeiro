# Fluxo completo de cadastro de usuário em camadas

Este documento mostra o caminho completo dos dados, desde o clique no botão de cadastro no frontend até a inserção do registro no banco de dados, seguindo uma arquitetura em camadas.

Importante: este é o fluxo recomendado para o projeto. A ideia é separar responsabilidades da seguinte forma:

- Frontend: capturar os dados do formulário, enviar para a API e tratar a resposta.
- Backend: receber a requisição, validar, orquestrar regras de negócio e persistir no banco.
- Banco de dados: guardar a entidade final.

---

## 1. Visão geral da arquitetura

Frontend
- app/cadastro/page.tsx
- components/RegisterPage/register.tsx
- services/userService.ts
- lib/api.ts

Backend
- Controllers/UserController.cs
- Application/Services/UserService.cs
- Application/DTOs/CreateUserRequestDto.cs
- Domain/Entities/User.cs
- Infrastructure/Repositories/UserRepository.cs
- Data/AppDbContext.cs

Banco
- SQL Server (ou outro banco configurado em EF Core)

---

## 2. O que acontece no frontend

### 2.1. Página de cadastro

Arquivo sugerido: `app/cadastro/page.tsx`

```tsx
import RegisterForm from "@/components/RegisterPage/register";

export default function CadastroPage() {
  return <RegisterForm />;
}
```

Responsabilidade:
- apenas renderiza o formulário.
- não deve ter regra de negócio complexa.
- não deve falar diretamente com o banco.

### 2.2. Componente de formulário

Arquivo sugerido: `components/RegisterPage/register.tsx`

```tsx
"use client";

import { useState } from "react";
import { userService } from "@/services/userService";

export default function RegisterForm() {
  const [form, setForm] = useState({
    nomeCompleto: "",
    email: "",
    telefone: "",
    senha: "",
    repetirSenha: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (form.senha !== form.repetirSenha) {
      setError("As senhas não conferem.");
      return;
    }

    try {
      setLoading(true);

      await userService.register({
        nomeCompleto: form.nomeCompleto,
        email: form.email,
        telefone: form.telefone,
        senha: form.senha,
      });

      alert("Usuário cadastrado com sucesso!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao cadastrar.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="nomeCompleto"
        value={form.nomeCompleto}
        onChange={handleChange}
        placeholder="Nome completo"
      />

      <input
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
      />

      <input
        name="telefone"
        value={form.telefone}
        onChange={handleChange}
        placeholder="Telefone"
      />

      <input
        name="senha"
        type="password"
        value={form.senha}
        onChange={handleChange}
        placeholder="Senha"
      />

      <input
        name="repetirSenha"
        type="password"
        value={form.repetirSenha}
        onChange={handleChange}
        placeholder="Repetir senha"
      />

      {error && <p>{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? "Cadastrando..." : "Cadastrar"}
      </button>
    </form>
  );
}
```

Responsabilidade:
- capturar entradas do usuário;
- validar no front (ex.: senha igual, e-mail formato);
- chamar a camada de serviço do frontend.

### 2.3. Camada de serviço do frontend

Arquivo sugerido: `services/userService.ts`

```ts
import { api } from "@/lib/api";

export type RegisterRequest = {
  nomeCompleto: string;
  email: string;
  telefone: string;
  senha: string;
};

export const userService = {
  async register(data: RegisterRequest) {
    const response = await api.post("/usuarios", data);
    return response.data;
  },
};
```

Responsabilidade:
- centralizar a chamada HTTP;
- esconder a URL da API e os detalhes da requisição.
- mantem a tela limpa e reutilizável.

### 2.4. Cliente HTTP do frontend

Arquivo sugerido: `lib/api.ts`

```ts
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export const api = {
  async post<T>(path: string, body: unknown): Promise<T> {
    const response = await fetch(`${API_URL}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => null);
      throw new Error(errorBody?.message ?? "Erro ao comunicar com a API.");
    }

    return response.json() as Promise<T>;
  },
};
```

Responsabilidade:
- montar a URL;
- configurar headers;
- serializar JSON;
- interpretar erro HTTP.

### 2.5. Fluxo do frontend resumido

```text
input do usuário
   ↓
RegisterForm
   ↓
handleSubmit()
   ↓
userService.register()
   ↓
api.post('/usuarios', payload)
   ↓
fetch HTTP
```

---

## 3. O que acontece no backend

A API ASP.NET recebe a requisição e vai processando camada por camada.

### 3.1. Configuração do CORS e da API

Arquivo: `backend/Program.cs`

```csharp
using Backend.Data;
using Backend.Infrastructure.Repositories;
using Backend.Application.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUserService, UserService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("FrontendPolicy", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("FrontendPolicy");
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
```

Responsabilidade:
- registrar a API;
- registrar o banco;
- registrar serviços e repositórios;
- permitir que o frontend acesse a API.

### 3.2. Controller

Arquivo sugerido: `backend/Controllers/UsersController.cs`

```csharp
using Backend.Application.DTOs;
using Backend.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly IUserService _userService;

    public UsersController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateUserRequestDto request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var result = await _userService.RegisterAsync(request);

        return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        return Ok();
    }
}
```

Responsabilidade:
- receber a requisição HTTP;
- chamar a aplicação;
- transformar a resposta em JSON;
- devolver status HTTP correto.

### 3.3. DTO de entrada

Arquivo sugerido: `backend/Application/DTOs/CreateUserRequestDto.cs`

```csharp
namespace Backend.Application.DTOs;

public class CreateUserRequestDto
{
    public string NomeCompleto { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Telefone { get; set; } = string.Empty;
    public string Senha { get; set; } = string.Empty;
}
```

Responsabilidade:
- representar os dados que chegam do frontend.
- não é a entidade do banco.
- ajuda a separar o contrato HTTP da entidade de domínio.

### 3.4. Entidade de domínio

Arquivo sugerido: `backend/Domain/Entities/User.cs`

```csharp
namespace Backend.Domain.Entities;

public class User
{
    public int Id { get; set; }
    public string NomeCompleto { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Telefone { get; set; } = string.Empty;
    public string SenhaHash { get; set; } = string.Empty;
    public DateTime CriadoEm { get; set; } = DateTime.UtcNow;
}
```

Responsabilidade:
- regra de negócio de domínio;
- contém o que realmente representa um usuário do sistema.
- NÃO deve ser confundida com DTO da API.

### 3.5. Serviço de aplicação

Arquivo sugerido: `backend/Application/Services/IUserService.cs`

```csharp
using Backend.Application.DTOs;

namespace Backend.Application.Services;

public interface IUserService
{
    Task<UserResponseDto> RegisterAsync(CreateUserRequestDto request);
}
```

Arquivo sugerido: `backend/Application/Services/UserService.cs`

```csharp
using Backend.Application.DTOs;
using Backend.Domain.Entities;

namespace Backend.Application.Services;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;

    public UserService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<UserResponseDto> RegisterAsync(CreateUserRequestDto request)
    {
        if (string.IsNullOrWhiteSpace(request.NomeCompleto))
            throw new ArgumentException("Nome completo é obrigatório.");

        if (string.IsNullOrWhiteSpace(request.Email))
            throw new ArgumentException("Email é obrigatório.");

        if (await _userRepository.ExistsByEmailAsync(request.Email))
            throw new InvalidOperationException("Email já cadastrado.");

        var senhaHash = BCrypt.Net.BCrypt.HashPassword(request.Senha);

        var user = new User
        {
            NomeCompleto = request.NomeCompleto,
            Email = request.Email,
            Telefone = request.Telefone,
            SenhaHash = senhaHash,
            CriadoEm = DateTime.UtcNow,
        };

        var createdUser = await _userRepository.AddAsync(user);

        return new UserResponseDto
        {
            Id = createdUser.Id,
            NomeCompleto = createdUser.NomeCompleto,
            Email = createdUser.Email,
            Telefone = createdUser.Telefone,
        };
    }
}
```

Responsabilidade:
- validar as regras de negócio;
- verificar duplicidade;
- criptografar a senha;
- montar a entidade do domínio;
- delegar persistência ao repositório.

### 3.6. Repositório

Arquivo sugerido: `backend/Infrastructure/Repositories/IUserRepository.cs`

```csharp
using Backend.Domain.Entities;

namespace Backend.Infrastructure.Repositories;

public interface IUserRepository
{
    Task<bool> ExistsByEmailAsync(string email);
    Task<User> AddAsync(User user);
}
```

Arquivo sugerido: `backend/Infrastructure/Repositories/UserRepository.cs`

```csharp
using Backend.Data;
using Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.Infrastructure.Repositories;

public class UserRepository : IUserRepository
{
    private readonly AppDbContext _context;

    public UserRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<bool> ExistsByEmailAsync(string email)
    {
        return await _context.Users
            .AnyAsync(x => x.Email == email);
    }

    public async Task<User> AddAsync(User user)
    {
        await _context.Users.AddAsync(user);
        await _context.SaveChangesAsync();
        return user;
    }
}
```

Responsabilidade:
- falar com o banco;
- encapsular queries e persistência;
- manter o serviço de aplicação limpo.

### 3.7. DbContext

Arquivo sugerido: `backend/Data/AppDbContext.cs`

```csharp
using Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(u => u.Id);
            entity.Property(u => u.NomeCompleto).IsRequired().HasMaxLength(200);
            entity.Property(u => u.Email).IsRequired().HasMaxLength(200);
            entity.Property(u => u.Telefone).IsRequired().HasMaxLength(20);
            entity.Property(u => u.SenhaHash).IsRequired();
            entity.Property(u => u.CriadoEm).IsRequired();

            entity.HasIndex(u => u.Email).IsUnique();
        });
    }
}
```

Responsabilidade:
- mapear entidade para tabela do banco;
- definir constraints e índices;
- facilitar a persistência via EF Core.

---

## 4. Onde os dados passam até chegar no banco

Fluxo completo:

```text
Frontend: RegisterForm
   ↓
Frontend: userService.register()
   ↓
Frontend: api.post('/usuarios', payload)
   ↓
HTTP POST para backend
   ↓
Backend: UsersController.Create()
   ↓
Backend: IUserService.RegisterAsync(dto)
   ↓
Validação + duplicidade + hash da senha
   ↓
Domain: User
   ↓
Repository: AddAsync(user)
   ↓
AppDbContext.SaveChanges()
   ↓
Banco SQL: tabela Users
   ↓
Retorno HTTP 201 Created
   ↓
Frontend recebe resposta
   ↓
Mensagem de sucesso / toast / redirecionamento
```

---

## 5. Exemplo real de payload enviado pelo frontend

O frontend envia um JSON parecido com:

```json
{
  "nomeCompleto": "João da Silva",
  "email": "joao@email.com",
  "telefone": "11999999999",
  "senha": "123456"
}
```

No backend, esse payload entra em `CreateUserRequestDto`:

```csharp
public class CreateUserRequestDto
{
    public string NomeCompleto { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Telefone { get; set; } = string.Empty;
    public string Senha { get; set; } = string.Empty;
}
```

Antes de salvar no banco, a senha não é armazenada em texto puro. Ela vira hash:

```csharp
var senhaHash = BCrypt.Net.BCrypt.HashPassword(request.Senha);
```

Se o valor original fosse:

```text
123456
```

O valor salvo no banco fica algo como:

```text
$2a$11$Q3mV...hashgerado...
```

Isso é importante por segurança.

---

## 6. Exemplo de resposta do backend

Depois de salvar, o backend retorna ao frontend uma resposta de sucesso, por exemplo:

```json
{
  "id": 1,
  "nomeCompleto": "João da Silva",
  "email": "joao@email.com",
  "telefone": "11999999999"
}
```

DTO de resposta:

```csharp
namespace Backend.Application.DTOs;

public class UserResponseDto
{
    public int Id { get; set; }
    public string NomeCompleto { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Telefone { get; set; } = string.Empty;
}
```

E o frontend trata assim:

```tsx
const result = await userService.register(payload);
console.log(result);
alert("Usuário cadastrado com sucesso!");
```

---

## 7. Separe as responsabilidades corretamente

### Frontend
- `components/RegisterPage/register.tsx`: formulário e interação do usuário;
- `services/userService.ts`: regra de chamada da API;
- `lib/api.ts`: detalhes de HTTP (fetch, headers, JSON);
- `app/cadastro/page.tsx`: página de navegação;

### Backend
- `Controllers`: entrada HTTP;
- `Application/Services`: regra de negócio;
- `Application/DTOs`: contrato entrada/saída;
- `Domain/Entities`: entidade do sistema;
- `Infrastructure/Repositories`: acesso ao banco;
- `Data/AppDbContext`: mapeamento EF Core;

---

## 8. Em uma frase: o que o cadastro faz

O cadastro de usuário funciona assim:

1. o usuário preenche o formulário;
2. o frontend valida o formulário;
3. o frontend envia JSON para a API;
4. o backend recebe a requisição;
5. o serviço valida regras e hash da senha;
6. o repositório salva a entidade no banco;
7. a API responde com o usuário criado;
8. o frontend mostra a mensagem de sucesso.

---

## 9. Observações importantes para o projeto real

- Sempre use `Hash` para senha, nunca armazene texto puro.
- Use `DTO` para separar dados de entrada e saída.
- Nunca deixe o controller acessar o banco diretamente, isso quebraria a camada de aplicação.
- Use `AppDbContext` para centralizar o acesso ao banco com EF Core.
- Configure o CORS do backend para aceitar requisições do frontend em `http://localhost:3000`.
- Use `CreatedAtAction` para devolver `201 Created` quando o registro foi criado.

---

## 10. Resumo prático do fluxo

```text
Usuário preenche formulário
        ↓
Frontend monta payload JSON
        ↓
POST /api/usuarios
        ↓
Controller recebe request
        ↓
IUserService.RegisterAsync(dto)
        ↓
Validação + hash + criação da entidade
        ↓
IUserRepository.AddAsync(user)
        ↓
EF Core salva no banco
        ↓
201 Created + retorno do usuário
        ↓
Frontend mostra sucesso
```

Este é o fluxo correto em arquitetura em camadas e é o padrão que você deve seguir no projeto.
