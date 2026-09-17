import { ClienteDTO } from "@/types/client";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { clienteService } from "@/services/api/clientService";

interface EditClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  cliente: ClienteDTO | null;
}

export function EditClientModal({
  isOpen,
  onClose,
  onSuccess,
  cliente,
}: EditClientModalProps) {
  // Estados para os inputs (você vai usar isso depois para fazer o PUT no backend)
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  

  // Quando o modal abrir e tiver um cliente selecionado, preenchemos os inputs
  useEffect(() => {
    if (cliente && isOpen) {
      setTimeout(() => {
        setNome(cliente.name);
        setTelefone(cliente.telefone || "");
      }, 0);
    }
  }, [cliente, isOpen]);

  // Se o modal estiver fechado, não renderiza nada
  if (!isOpen || !cliente) {
    return null;
  }

  async function handleAtualizaCliente() {
    if (!cliente) {
      alert("Cliente null");
      return;
    }
    setIsLoading(true);
    const atualizaDados: ClienteDTO = {
      id: cliente.id,
      name: nome,
      telefone,
      email: cliente.email,
    };

    try {
      if (!nome.trim()) {
        alert("Preencha o campo Nome Completo");
        setIsLoading(false);
        return;
      }

      const resposta = await clienteService.atualizarCliente(atualizaDados);

      if (resposta.sucesso) {
        alert("Usuário atualizado");
        //recarrega a lista de clientes com a nova atualização
        onSuccess(); 
        //fecha a modal assim que atualizada
        onClose();
      } else {
        alert("Falha ao atualizar o(a) cliente " + resposta.mensagem);
      }
    } catch (error) {
      console.error("Erro ao editar cliente:", error);
      alert("Ocorreu um erro ao tentar editar o cliente.");
    }finally{
      setIsLoading(false);
    }
  }


   

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[#181818] border border-neutral-800 rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
        {/* Botão de Fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Cabeçalho do Modal */}
        <h2 className="text-2xl font-bold text-white mb-6">Editar Cliente</h2>

        {/* Formulário (UI apenas, sem a lógica de salvar) */}
        <div className="space-y-4">
          {/* Campo: Email (Desabilitado, pois geralmente não mudamos o e-mail de login) */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              E-mail
            </label>
            <input
              type="text"
              value={cliente.email}
              disabled
              className="w-full bg-[#121212]/50 border border-neutral-800 rounded-xl py-3 px-4 text-gray-500 cursor-not-allowed"
            />
          </div>

          {/* Campo: Nome */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Nome Completo
            </label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full bg-[#121212] border border-neutral-800 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#c5a059] transition-colors"
              placeholder="Digite o nome..."
            />
          </div>

          {/* Campo: Telefone */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Telefone
            </label>
            <input
              type="text"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              className="w-full bg-[#121212] border border-neutral-800 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#c5a059] transition-colors"
              placeholder="(00) 00000-0000"
            />
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="mt-8 flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl font-medium text-gray-300 hover:bg-neutral-800 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleAtualizaCliente}
            disabled={isLoading}
            // onClick={suaFuncaoDeSalvarAqui} -> Você vai implementar isso depois!
            className="cursor-pointer px-5 py-2.5 rounded-xl font-bold bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa7c11] text-black shadow-lg hover:brightness-110 transition-all"
          >
            {isLoading? "Salvando..." : "Salvar Alterações"}
          </button>
        </div>
      </div>
    </div>
  );
}
