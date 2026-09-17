import { ClienteDTO } from "@/types/client";
import { getCookie } from "@/utils/cookies";
import { ExcluirUsuarioResponse } from "@/types/client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const clienteService = {
  async buscarClientes(): Promise<ClienteDTO[]> {
    const token = getCookie("token");
    if (!token) {
      throw new Error("Usuário não autenticado.");
    }

    const resposta = await fetch(`${API_URL}/api/usuarios`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!resposta.ok) {
      throw new Error("Erro ao buscar clientes: " + resposta.statusText);
    }
    const clientes = await resposta.json();
    return clientes;
  },

  atualizarCliente: async (dados: ClienteDTO) => {
    try {
      const token = getCookie("token");
      if (!token) {
        throw new Error("Usuário não autenticado.");
      }

      const resposta = await fetch(`${API_URL}/api/usuarios/AtualizarCliente`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dados),
      });

      if (!resposta.ok) {
        const erroResposta = await resposta.json();

        throw new Error(
          erroResposta.message ||
            "Ocorreu um erro desconhecido ao atualizar usuário",
        );
      }

      return await resposta.json();
    } catch (error) {
      return {
        mensagem: "Erro ao editar cliente: " + error,
        sucesso: false,
      };
    }
  },

  excluirCliente: async (id: number): Promise<ExcluirUsuarioResponse> => {
    try {
      const token = getCookie("token");
      if (!token) {
        throw new Error("Usuário não autenticado.");
      }
      console.log("Verificando no service 1: " + id);
      const resposta = await fetch(`${API_URL}/api/usuarios/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!resposta.ok) {
        throw new Error("Erro ao excluir cliente: " + resposta.statusText);
      }

      const result = await resposta.json();

      return {
        mensagem: result.mensagem,
        sucesso: result.sucesso,
      };
    } catch (error) {
      return {
        mensagem: "Erro ao excluir cliente: " + error,
        sucesso: false,
      };
    }
  },
};
