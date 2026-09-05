"use client";
import { useState, useEffect } from "react";
import { Users, Search, Filter } from "lucide-react";
// Importe de acordo com os nomes que você salvou:
import { ClienteDTO } from "@/types/client";
import { clienteService } from "@/services/api/clientService";

export default function PageClient() {
  const [clientes, setClientes] = useState<ClienteDTO[]>([]); 
  const [carregando, setCarregando] = useState(true); 
  const [erro, setErro] = useState<string | null>(null); 

  useEffect(() => {
    async function carregarDados() {
      try {
        setCarregando(true);
        const dados = await clienteService.buscarClientes();
        setClientes(dados);
      } catch (error) {
        console.error("Erro ao puxar dados:", error);
        setErro("Não foi possível carregar os clientes.");
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();
  }, []);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-wider flex items-center gap-3">
            <Users className="w-8 h-8 text-[#c5a059]" />
            Clientes
          </h1>
          <p className="text-gray-400 mt-1">
            Gerencie todos os clientes da barbearia.
          </p>
        </div>
        <button className="hidden sm:flex bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa7c11] text-black px-6 py-3 rounded-lg font-bold uppercase text-sm shadow-lg hover:brightness-110">
          + Novo Cliente
        </button>
      </header>

      {/* 2. Barra de Pesquisa */}
      <div className="bg-[#181818] border border-neutral-800 rounded-2xl p-4 flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar cliente..."
            className="w-full bg-[#121212] border border-neutral-800 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none"
          />
        </div>
        <button className="flex items-center gap-2 bg-[#121212] border border-neutral-800 text-gray-300 px-6 py-3 rounded-xl hover:bg-neutral-800/50">
          <Filter className="w-5 h-5" /> Filtros
        </button>
      </div>

     
      <div className="bg-[#181818] border border-neutral-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#121212] border-b border-neutral-800 text-gray-400 text-sm uppercase tracking-wider">
              <th className="p-4 font-semibold">Nome</th>
              <th className="p-4 font-semibold">Contato</th>
              <th className="p-4 font-semibold">Total Cortes</th>
              <th className="p-4 font-semibold text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800">
            {/* Regra A: Se estiver carregando */}
            {carregando && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-500">
                  Buscando clientes no banco de dados...
                </td>
              </tr>
            )}

            {/* Regra B: Se ocorreu um Erro */}
            {!carregando && erro && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-red-500">
                  {erro}
                </td>
              </tr>
            )}

            {/* Regra C: Se o banco estiver vazio */}
            {!carregando && !erro && clientes.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-500">
                  Nenhum cliente cadastrado ainda.
                </td>
              </tr>
            )}

            {/* Regra D: Renderização dos Clientes reais! */}
            {!carregando &&
              !erro &&
              clientes.map((cliente, index) => (
                <tr
                  key={index}
                  className="hover:bg-[#121212]/50 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#c5a059]/20 flex items-center justify-center text-[#c5a059] font-bold uppercase">
                        {cliente.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-white">{cliente.name}</h4>
                        <p className="text-xs text-gray-500">{cliente.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-gray-300">
                    {cliente.telefone || "Sem telefone"}
                  </td>
                  <td className="p-4 text-gray-400">0 Cortes</td>
                  <td className="p-4 text-right">
                    <button className="text-[#c5a059] hover:underline text-sm font-medium">
                      Ver Detalhes
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
