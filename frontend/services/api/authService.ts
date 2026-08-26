import { CadastroDados, LoginRequest, LoginResponse } from "@/types/auth";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function loginUsuario(
  dados: LoginRequest,
): Promise<LoginResponse> {
  try {
    const resposta = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(dados),
    });

    const result = await resposta.json();

    if (!result.sucesso) {
      return {
        sucesso: result.sucesso,
        message: result.message,
        token: result.token,
        role: result.role,
      };
    }

    return {
      sucesso: true,
      message: result.message,
      token: result.token,
      role: result.role,
    };
  } catch (err) {
    return {
      sucesso: false,
      message: "Erro com o servidor: "+err,
      
    };
  }
}

export async function cadastrarUsuario(dados: CadastroDados) {
  try {
    const resposta = await fetch(`${API_URL}/api/auth/cadastrar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    });

    if (!resposta.ok) {
      const erroResposta = await resposta.json();

      throw new Error(
        erroResposta.message ||
          "Ocorreu um erro desconhecido ao cadastrar usuário",
      );
    }

    return await resposta.json();
  } catch (err) {
    console.error("Erro na authService:", err);
    throw err;
  }
}
