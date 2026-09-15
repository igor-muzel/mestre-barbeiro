"use client";
import { useState } from "react";
import { adicionarCliente } from "@/services/api/authService";
import type { CadastroDados } from "@/types/auth";
import { Eye, EyeOff, X, User, Mail, Phone, Lock } from "lucide-react";

interface CreateClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSucess:() => void;
}

export function CreateClientModal({ isOpen, onClose, onSucess }: CreateClientModalProps) {
  // Se a modal não estiver aberta, não desenha nada na tela
  

  const [showPassword, setShowPassword] = useState(false);
  
  const [name, setName] = useState("");
  
  const [email, setEmail] = useState("");
  
  const [telefone, setTelefone] = useState("");
  
  const [senha, setSenha] = useState("");
  const [isLoading, setIsLoading] = useState(false);

 // Se a modal não estiver aberta, não desenha nada na tela
  if (!isOpen) return null;
  async function adicionarUsuario() {
    setIsLoading(true);

    if(isLoading) return;

    if (
      senha.length < 6 ||                  
      !/[A-Z]/.test(senha) ||              
      !/[a-z]/.test(senha) ||              
      !/[0-9]/.test(senha) ||              
      !/[^A-Za-z0-9]/.test(senha)        
    ) {
      alert("Sua senha é fraca! Ela deve conter acima de 6 caracteres, pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial (@ # ! $ % & *).");
      
      onClose();
      return; // Trava a execução aqui e não envia para o backend!
    }

    const pacoteDeDados: CadastroDados = {
          name ,
          email ,
          telefone,
          senha,
        };

        console.log(pacoteDeDados);

        try{
            setIsLoading(true);
            await adicionarCliente(pacoteDeDados);
            alert(`Cliente ${pacoteDeDados.name} adicionado com sucesso!`);
            onSucess();
            onClose();
        }
        catch(err){
            throw err;
        }finally{
            setIsLoading(false);
        }
    

  }

  return (
    // Fundo escuro desfocado (Backdrop)
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      {/* Caixa principal da Modal */}
      <div className="bg-[#181818] border border-neutral-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative">
        {/* Cabeçalho */}
        <div className="flex justify-between items-center p-6 border-b border-neutral-800">
          <h2 className="text-xl font-bold text-white tracking-wide">
            Novo <span className="text-[#c5a059]">Cliente</span>
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Corpo (Formulário Visual) */}
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5">
              Nome Completo
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Ex: João da Silva"
                className="w-full bg-[#121212] border border-neutral-700 text-white rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#c5a059] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5">
              E-mail
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
                placeholder="joao@email.com"
                className="w-full bg-[#121212] border border-neutral-700 text-white rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#c5a059] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5">
              Telefone (WhatsApp)
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="tel"
                required
                value={telefone}
                autoComplete="off"
                onChange={(e) => setTelefone(e.target.value)}
                placeholder="Ex: (00) 00000-0000"
                className="w-full bg-[#121212] border border-neutral-700 text-white rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#c5a059] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5">
              Senha Inicial
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                autoComplete="new-password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full bg-[#121212] border border-neutral-700 text-white rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#c5a059] transition-colors"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#c5a059] hover:opacity-80 transition-opacity"
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Rodapé (Botões) */}
        <div className="flex justify-end gap-3 p-6 border-t border-neutral-800 bg-[#121212]/50">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg font-medium text-gray-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button
          onClick={adicionarUsuario}
          className="px-5 py-2 rounded-lg font-bold bg-[#c5a059] text-black shadow-lg hover:brightness-110 transition-all cursor-pointer">
            Cadastrar Cliente
          </button>
        </div>
      </div>
    </div>
  );
}
