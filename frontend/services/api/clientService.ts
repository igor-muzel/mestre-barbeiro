import { ClienteDTO } from "@/types/client";
import { getCookie } from "@/utils/cookies";
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
    }

    
}