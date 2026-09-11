import { ClienteDTO } from "@/types/client";
import { getCookie } from "@/utils/cookies";
import {ExcluirUsuarioRequest, ExcluirUsuarioResponse} from "@/types/client";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const clienteService = {
    async buscarClientes(): Promise<ClienteDTO[]> {
        const token = getCookie("token");
        if (!token) {
            throw new Error("Usuário não autenticado.");
        }

        const resposta = await fetch(`${API_URL}/api/usuarios`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })

        if(!resposta.ok){
            throw new Error("Erro ao buscar clientes: " + resposta.statusText);

        }
        const clientes = await resposta.json();
        return clientes;
    },

     excluirCliente: async(id: number)
         :Promise<ExcluirUsuarioResponse> => 
        {
            try{
                const token = getCookie("token");
                if(!token){
                    throw new Error("Usuário não autenticado.");
                }  
                console.log("Verificando no service 1: " + id);
                const resposta = await fetch(`${API_URL}/api/usuarios/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if(!resposta.ok){
                    throw new Error("Erro ao excluir cliente: " + resposta.statusText);

                }

                const result = await resposta.json();


                return {
                    mensagem: result.mensagem,
                    sucesso: result.sucesso,
                };

            }
            catch (error) {
                return {
                    mensagem: "Erro ao excluir cliente: " + error,
                    sucesso: false
                };
            }
        
        
    }
    
}