# Como Funciona o Nosso Sistema: A História do Cadastro e Login 📖

Imagine que o nosso sistema **MestreBarbeiro** é um Clube muito exclusivo. 
Para entrar nesse clube, você não pode simplesmente abrir a porta. Primeiro você precisa **se registrar na portaria (Cadastro)**. Depois, você precisa **provar quem você é (Login)** para receber uma **Pulseira VIP (Token)**. 

Vamos ver como o nosso código faz essa mágica acontecer, passo a passo, separando o que acontece na **Vitrine da Loja (Frontend)** e na **Cozinha (Backend)**.

---

## 🛑 Parte 1: O Cadastro (Anotando o nome no caderno)

Quando um cliente novo chega, ele precisa dar seus dados.

### 1. A Vitrine (O Frontend em React/Next.js)
O cliente vê uma tela bonita no navegador e preenche: Nome, Email e Senha. Quando ele clica em "Cadastrar", o Frontend funciona como um **carteiro** que pega esses dados e leva até o servidor.

**Arquivo: `frontend/services/api/authService.ts`**
```typescript
// O Carteiro do Frontend que faz a entrega da carta (dados)
export const authService = {
  
  cadastrar: async (dadosDoFormulario) => {
    // Pegamos os dados e mandamos (POST) para o endereço da Cozinha (Backend)
    const resposta = await fetch("http://localhost:5174/api/Auth/Cadastrar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dadosDoFormulario) // Transformando os dados em formato de texto
    });
  }
};
```

### 2. A Cozinha (O Backend em C#)
A nossa API no C# é como a cozinha de um restaurante. O "Garçom" (Controller) recebe o pedido e entrega para o "Chefe de Cozinha" (Service).

**O Garçom: `Controllers/AuthController.cs`**
Ele só pega o papel do pedido e diz: "Chefe, faz esse cadastro pra mim!".
```csharp
[HttpPost("Cadastrar")]
public async Task<IActionResult> Cadastrar(UsuarioCadastroDTO dados)
{
    // O Garçom pede para o Chefe (AuthService) processar o cadastro
    var resultado = await _authService.CadastrarAsync(dados);
    return Ok(resultado);
}
```

**O Chefe de Cozinha: `Services/AuthService.cs`**
Aqui é onde o trabalho duro acontece! O Chefe verifica se a senha é forte e, o mais importante, ele **esconde a senha**. Nós não salvamos senhas como `123456` no caderno (banco de dados). Nós usamos um triturador chamado **BCrypt** que transforma a senha em algo como `$2a$11$w1hO...`. Assim, nem os donos do sistema conseguem saber a sua senha real!
```csharp
public async Task<(bool Sucesso, string Message)> CadastrarAsync(UsuarioCadastroDTO dados)
{
    // 1. O Chefe tritura a senha para ninguém conseguir ler!
    string senhaEscondida = BCrypt.Net.BCrypt.HashPassword(dados.Senha);

    // 2. Preparamos a ficha do cliente
    var novoUsuario = new Usuario
    {
        Name = dados.Name,
        Email = dados.Email,
        Senha = senhaEscondida // Salvamos a senha triturada!
    };

    // 3. Anotamos no grande caderno azul (Banco de Dados)
    await _context.Usuarios.AddAsync(novoUsuario);
    await _context.SaveChangesAsync();

    return (true, "Bem-vindo ao clube!");
}
```

---

## 🔑 Parte 2: O Login (Ganhando a Pulseira VIP)

O cliente foi embora e voltou no dia seguinte. Ele quer entrar no Clube. Ele não vai fazer um cadastro de novo. Ele vai fazer o **Login**.

### 1. O Chefe confere o caderno (Backend)
O cliente diz: "Meu email é igor@gmail.com e minha senha é 123456".

**Arquivo: `Services/AuthService.cs` (Método de Login)**
```csharp
public async Task<...> LoginAsync(UsuarioLoginDTO dados)
{
    // 1. Chefe procura o email no caderno (Banco de Dados)
    var usuarioEncontrado = await _context.Usuarios.FirstOrDefaultAsync(u => u.Email == dados.Email);

    // 2. Ele usa a máquina do BCrypt para ver se a senha digitada (123456) 
    // bate com aquela gororoba ($2a$11$w1hO...) que está salva no caderno.
    bool senhaCorreta = BCrypt.Net.BCrypt.Verify(dados.Senha, usuarioEncontrado.Senha);

    // 3. Se a senha está correta, entregamos a Pulseira VIP (Token JWT)
    var pulseiraVIP = GenerateTokenJwt(usuarioEncontrado);

    return (true, "Pode entrar!", pulseiraVIP);
}
```

### O que diabos é o Token JWT (A Pulseira VIP)?
Pense no Token JWT como uma **Pulseira de Festa** que tem o seu nome escrito com uma caneta mágica.
Em vez de você ter que gritar a sua senha toda vez que for pedir uma bebida no bar, você só mostra a pulseira.
O C# gera um texto enorme (ex: `eyJhGciOiJIUz...`) que contém o seu ID e diz se você é "Admin" ou "Comum". O C# assina essa pulseira com um "carimbo secreto" que só ele tem. Ninguém consegue falsificar essa pulseira!

---

## 👖 Parte 3: Guardando a Pulseira no Bolso (Frontend)

O C# te entregou a Pulseira VIP (Token). O que o React (Frontend) faz com ela? Ele guarda no seu "bolso", que no navegador chamamos de **Cookies**.

**Arquivo: `utils/cookies.ts`**
```typescript
// Função para colocar a pulseira no bolso
export function setCookie(nome: string, valor: string) {
    document.cookie = `${nome}=${valor}; path=/`;
}
```

Agora, mesmo que você feche a aba do Chrome e abra de novo, a pulseira continua no seu bolso.

---

## 🕵️‍♂️ Parte 4: O Segurança da Porta (Lendo a Pulseira)

Toda vez que o usuário tenta acessar uma página, nós olhamos para a pulseira dele para descobrir quem ele é, sem precisar perguntar nada para o Backend!

**Arquivo: `hooks/useUsuario.ts`**
Nós usamos uma lupa mágica chamada `jwt-decode` para ler o que está escrito na pulseira.
```typescript
import { jwtDecode } from "jwt-decode";
import { getCookie } from "@/utils/cookies";

export function useUsuario() {
    // 1. Pegamos a pulseira do bolso
    const token = getCookie("token");

    // 2. Usamos a Lupa para ler o que está escrito nela
    const dadosDaPulseira = jwtDecode(token);

    // 3. Descobrimos o nome e o cargo da pessoa!
    console.log("Olá " + dadosDaPulseira.name);
    
    // Se a pulseira diz que ele é Admin, nós mostramos botões secretos para ele!
    const isAdmin = dadosDaPulseira.role === "Admin";

    return { usuario: dadosDaPulseira, isAdmin };
}
```

### Conclusão:
1. O Usuário se cadastra e o C# esconde a senha para ninguém ler.
2. O Usuário faz login, o C# confere a senha e entrega uma **Pulseira Mágica e Infalsificável (Token JWT)**.
3. O Frontend guarda a pulseira no **Bolso (Cookies)**.
4. Toda vez que o Frontend precisa saber quem é o cara, ele **lê a pulseira (`jwtDecode`)**.
5. Toda vez que o Frontend vai pedir algo para o C# (tipo excluir um cliente), ele **mostra a pulseira (`Authorization: Bearer <token>`)** para provar que tem permissão!
