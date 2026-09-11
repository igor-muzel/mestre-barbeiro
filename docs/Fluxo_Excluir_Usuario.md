# Como Funciona a Exclusão de um Cliente 🗑️

Se o sistema de Cadastro e Login é como entrar em um Clube VIP, a exclusão de um cliente é o momento em que o **Gerente (Admin)** decide retirar alguém do clube de forma permanente.

Vamos ver como o React (Frontend) e o C# (Backend) trabalham juntos para que isso aconteça com segurança!

---

## 🛑 Parte 1: O Botão da Lixeira (Frontend)

Tudo começa na tela do usuário. O administrador está olhando a tabela de clientes e decide clicar no botão da lixeira.

### 1. A Tela (`app/(main)/cliente/page.tsx`)
Quando o clique acontece, o React não apaga o cliente na hora. Primeiro, ele faz uma "pergunta de segurança" (para evitar acidentes) e, depois, pede para o "Carteiro" ir lá no Backend fazer o trabalho sujo.

```tsx
// O que acontece quando você clica na Lixeira:
const deletarCliente = async (id: number) => {
  // 1. A trava de segurança!
  const confirmacao = window.confirm("Tem certeza que deseja excluir?");
  if (!confirmacao) return; // Se disser não, paramos tudo por aqui.

  try {
    // 2. Pedimos ao Carteiro (Serviço) para avisar o C#
    await clienteService.excluirCliente(id);
    
    // 3. Mágica do React: Tiramos a pessoa da tabela instantaneamente!
    // Sem precisar apertar F5 para recarregar a página.
    setClientes((listaAntiga) => listaAntiga.filter(cliente => cliente.id !== id));
    
  } catch (error) {
    alert("Ops, deu erro!");
  }
};
```

---

## 🎟️ Parte 2: Mostrando o Crachá (O Carteiro Frontend)

O C# não obedece qualquer um. Ele só apaga um cliente se quem pediu for o "Admin". Por isso, o nosso Carteiro do React precisa levar a **Pulseira VIP (Token JWT)** junto com a requisição.

### 2. O Carteiro (`services/api/clientService.ts`)
```typescript
export const clienteService = {

  excluirCliente: async (id: number) => {
    // 1. Pegamos a Pulseira VIP que estava escondida no bolso (Cookies)
    const token = getCookie("token");

    // 2. Fazemos a viagem até o C# usando o método DELETE
    const response = await fetch(`http://localhost:5174/api/Usuarios/ExcluirUsuario/${id}`, {
      method: "DELETE",
      headers: {
        // 3. Colamos a Pulseira na testa da requisição para o C# ver!
        "Authorization": `Bearer ${token}` 
      }
    });

    if (!response.ok) {
      throw new Error("O C# não deixou excluir!");
    }
  }
};
```

---

## 💂‍♂️ Parte 3: O Segurança da Porta (Backend)

A requisição chegou na porta do servidor C#. Antes mesmo de executar qualquer código, o ASP.NET coloca um segurança de 2 metros de altura na porta. 

### 3. O Garçom e o Segurança (`Controllers/UsuariosController.cs`)
Lembra que o Controller é a porta de entrada? Nós colocamos uma placa lá: **"Apenas Admins"**.
```csharp
[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Admin")] // <--- O SEGURANÇA! Ele barra qualquer um sem Token ou com Token de "Comum".
public class UsuariosController : ControllerBase
{
    [HttpDelete("ExcluirUsuario/{id}")]
    public async Task<IActionResult> ExcluirUsuario(int id)
    {
        // Se chegou até aqui, é porque o Segurança deixou passar!
        // O Garçom entrega a ordem para o Chefe de Cozinha (Serviço).
        var resultado = await _usuarioService.ExcluirUsuarioAsync(id);

        if (!resultado.Sucesso) return NotFound(new { mensagem = resultado.Mensagem });
        
        return Ok(new { sucesso = resultado.Sucesso, mensagem = resultado.Mensagem });
    }
}
```

---

## 📖 Parte 4: Arrancando a folha do caderno (Backend)

O garçom entregou o ID do cliente que deve ser apagado para o Chefe de Cozinha (O Serviço). O Chefe vai pegar o grande caderno azul (Banco de Dados MySQL) e arrancar a página fora.

### 4. O Cérebro (`Services/UsuarioService.cs`)
```csharp
public async Task<(bool Sucesso, string Mensagem)> ExcluirUsuarioAsync(int id)
{
    // 1. O Chefe procura o usuário no caderno. 
    var usuarioParaExcluir = await _context.Usuarios.FindAsync(id);

    // 2. Se a página estiver em branco (usuário não existe), ele avisa o Garçom.
    if (usuarioParaExcluir == null)
    {
        return (false, "Usuário não encontrado");
    }

    // 3. O Chefe arranca a página fora do caderno!
    _context.Usuarios.Remove(usuarioParaExcluir);
    
    // 4. E passa a cola para garantir que não volta mais (Salva no banco).
    await _context.SaveChangesAsync();

    return (true, "Usuário excluído com sucesso");
}
```

---

## 🎯 Resumo da Ópera
1. O administrador clica na lixeira.
2. O React pega o **Token JWT** nos Cookies e envia para o C# (`method: "DELETE"`).
3. O C# lê o Token e valida: *"Sim, a assinatura é real e essa pessoa é Admin"*.
4. O C# busca o cliente pelo ID no Banco de Dados.
5. O C# usa o comando `.Remove()` para apagar.
6. O C# responde pro React: *"Deu certo! Pode apagar da tela"*.
7. O React filtra a tabela e remove o cliente visualmente sem precisar recarregar a página!

