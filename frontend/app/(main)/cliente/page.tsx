"use client";
import { useState, useEffect } from "react";
import { Users, Search, Filter, Edit, Trash2 } from "lucide-react";
// Importe de acordo com os nomes que você salvou:
import { ClienteDTO } from "@/types/client";
import { clienteService } from "@/services/api/clientService";
import {CreateClientModal} from "@/components/Modal/CreateClientModal";
import { EditClientModal } from "@/components/Modal/EditClientModal";
import { Pagination } from "@/components/Pagination/Pagination";

export default function PageClient() {
  const [clientes, setClientes] = useState<ClienteDTO[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [termoBusca, setTermoBusca] = useState("");
  //variavel que guarda o primeiro numero da pagina, no caso a pagina 1
  //pois a pagina 1 é a primeira pagina da grid de usuario
  const [paginaAtual, setPaginaAtual] = useState(1);
  //quantos usuarios vao ser mostrados por vez 
  const itensPorPagina = 5;

  async function handleExcluirCliente(id: number) {
    try {
      const confirmacao = window.confirm(
        "Tem certeza que deseja excluir este cliente?",
      );
      console.log("Verificando no page.tsx: " + id);
      if (!confirmacao) {
        return;
      }

      const resposta = await clienteService.excluirCliente(id);

      if (resposta.sucesso) {
        // aqui vamos atualizar a lista de clientes removendo o cliente excluído
        setClientes((clientesAnteriores) =>
          clientesAnteriores.filter((c) => c.id != id),
        );
        alert("Cliente excluído com sucesso!");
      } else {
        alert("Falha ao excluir cliente: " + resposta.mensagem);
      }
    } catch (error) {
      console.error("Erro ao excluir cliente:", error);
      alert("Ocorreu um erro ao tentar excluir o cliente.");
    }
  }
  // Estados para controlar o Modal de Edição
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clienteSelecionado, setClienteSelecionado] =
    useState<ClienteDTO | null>(null);

  // Função para abrir o modal e injetar o cliente clicado
  const abrirModalEdicao = (cliente: ClienteDTO) => {
    setClienteSelecionado(cliente);
    setIsModalOpen(true);
  };

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

  useEffect(() => {
    setTimeout(()=>{
      carregarDados();
    })
  }, []);

  //todos os clientes carregados na variavel clientesFiltrados
  const clientesFiltrados = clientes.filter(cliente => 
    cliente.name.toLowerCase().startsWith(termoBusca.toLowerCase())
  );

  //1 * 5 = 5(cliente 5 é o ultimo), e se tiver na pagina 2: 2 * 5 = 10(cliente 10 é o ultimo)
  const indiceUltimoCliente = paginaAtual * itensPorPagina;
  //pagina 1: 5 (ultimo cliente) - 5 (itens por pagina) = 0; pagina 2: 10 - 5 = 5; pagina 3 : 15 -5 = 10
  const indicePrimeiroCliente = indiceUltimoCliente - itensPorPagina;
  const clientesAtuais = clientesFiltrados.slice(indicePrimeiroCliente,indiceUltimoCliente);
  const totalPaginas = Math.ceil(clientesFiltrados.length / itensPorPagina);
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
        <button
          onClick={() => setIsCreateModalOpen(true)}
         className="cursor-pointer hidden sm:flex bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa7c11] text-black px-6 py-3 rounded-lg font-bold uppercase text-sm shadow-lg hover:brightness-110">
          + Novo Cliente
        </button>
        {
        /** <EditClientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        cliente={clienteSelecionado}
      /> */
      }


      <CreateClientModal
      isOpen={isCreateModalOpen}
      onClose={() => setIsCreateModalOpen(false)}
      onSucess={()=> carregarDados()}
      />

       
      </header>

      {/* 2. Barra de Pesquisa */}
      <div className="bg-[#181818] border border-neutral-800 rounded-2xl p-4 flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            value={termoBusca}
            onChange={(e)=>{
              setTermoBusca(e.target.value);
            }}
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
              <th className="p-4 font-semibold">E-mail</th>
              <th className="p-4 font-semibold">Total Cortes</th>
              <th className="p-4 font-semibold text-right">Editar</th>
              <th className="p-4 font-semibold text-right">Excluir</th>
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
              clientesAtuais.map((cliente, index) => (
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
                        {/* <p className="text-xs text-gray-500">{cliente.email}</p> */}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-gray-300">
                    {cliente.telefone || "Sem telefone"}
                  </td>
                  <td className="p-4 text-gray-300">{cliente.email}</td>
                  <td className="p-4 text-gray-400">0 Cortes</td>

                  <td className="p-4 text-right">
                    <button
                      onClick={() => abrirModalEdicao(cliente)}
                      className="cursor-pointer p-2 text-gray-400 hover:text-white transition-colors"
                      title="Editar"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </td>
                  <td className=" p-4 text-right">
                    <button
                      onClick={() => handleExcluirCliente(cliente.id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      title="Excluir"
                    >
                      <Trash2 className="cursor-pointer w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        
        {/* Usando o nosso novo componente reutilizável */}
        {!carregando && !erro && (
          <Pagination 
            paginaAtual={paginaAtual} 
            totalPaginas={totalPaginas} 
            totalItens={clientesFiltrados.length} 
            itensPorPagina={itensPorPagina} 
            mudarPagina={setPaginaAtual} 
          />
        )}

      </div>

      {/* Renderiza o Modal de Edição sobrepondo a tela inteira */}
      <EditClientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        cliente={clienteSelecionado}
        onSuccess={() => carregarDados()}
      />
    </div>
  );
}
