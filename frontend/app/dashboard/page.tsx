"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LogOut, Scissors, Calendar, User } from "lucide-react";
import Navbar from "@/components/Navbar/navbar"; // Ajuste o caminho se necessário
import { usePathname } from "next/navigation";
import {useUsuario} from "@/hooks/useUsuario";
import {handleLogout} from "@/app/actions/auth";


export default function PageDashboard(){
    
    const nomeUsuario = useUsuario();

    
    return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex flex-col">
      
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Lateral */}
        <aside className="w-64 bg-[#181818] border-r border-neutral-800 hidden md:flex flex-col">
          <nav className="flex-1 p-4 space-y-2 mt-4">
            <button className="flex w-full items-center gap-3 bg-[#c5a059]/10 text-[#c5a059] px-4 py-3 rounded-lg font-medium border border-[#c5a059]/20">
              <Calendar className="w-5 h-5" />
              Agendamentos
            </button>
            <button className="flex w-full items-center gap-3 text-gray-400 hover:text-white hover:bg-neutral-800/50 px-4 py-3 rounded-lg font-medium">
              <User className="w-5 h-5" />
              Meu Perfil
            </button>
             
          </nav>
          <div className="p-4 border-t border-neutral-800 mb-4">
            <button
              onClick={handleLogout}
              className="cursor-pointer flex items-center gap-3 text-gray-400 hover:text-red-500 w-full px-4 py-3 rounded-lg font-medium transition-all"
            >
              <LogOut className="w-5 h-5" />
              Sair da Conta
            </button>
          </div>
        </aside>
        {/* Conteúdo Principal */}
        <main className="flex-1 p-6 md:p-10 overflow-y-auto">
          <header className="mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-wider">
                Olá, <span className="text-[#c5a059]" suppressHydrationWarning>{nomeUsuario}</span>
              </h1>
              <p className="text-gray-400 mt-1">Pronto para renovar o visual hoje?</p>
            </div>
            
            <button className="flex bg-linear-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa7c11] text-black px-6 py-3 rounded-lg font-bold uppercase tracking-wider shadow-lg hover:brightness-110 transition-all items-center gap-2">
              <Scissors className="w-5 h-5" />
              Novo Agendamento
            </button>
          </header>
          
          <div className="bg-[#181818] border border-neutral-800 rounded-2xl p-6 text-center text-gray-400 h-64 flex items-center justify-center">
            Aqui nós colocaremos a lista de agendamentos no futuro...
          </div>
        </main>
      </div>
    </div>
  );
}