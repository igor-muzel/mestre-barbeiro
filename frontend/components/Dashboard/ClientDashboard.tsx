"use client";
import { LogOut, Scissors, Calendar, User, Clock, Award, ChevronRight, Star, Home } from "lucide-react";
import { handleLogout } from "@/app/actions/auth";

export function ClientDashboard({ nomeUsuario }: { nomeUsuario: string }) {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
            {/* Cabeçalho */}
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-wider">
                  Bem-vindo, <span className="text-[#c5a059]" suppressHydrationWarning>{nomeUsuario}</span>
                </h1>
                <p className="text-gray-400 mt-1">
                  Pronto para renovar o visual hoje?
                </p>
              </div>
              <button className="hidden sm:flex bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa7c11] text-black px-6 py-3 rounded-lg font-bold uppercase tracking-wider text-sm shadow-lg hover:brightness-110 transition-all items-center gap-2">
                <Scissors className="w-5 h-5" />
                Novo Agendamento
              </button>
            </header>

            {/* Painéis do Cliente */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Card: Próximo Agendamento */}
              <div className="lg:col-span-2 bg-[#181818] border border-neutral-800 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#c5a059] opacity-5 rounded-bl-full"></div>
                <h2 className="text-xl font-bold mb-4 uppercase tracking-wider text-gray-200">
                  Seu Próximo Horário
                </h2>
                <div className="bg-[#121212] border border-[#c5a059]/30 rounded-xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="bg-[#c5a059]/20 p-4 rounded-lg border border-[#c5a059]/30 text-[#c5a059]">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">Corte Fade + Barba Lenhador</h3>
                      <div className="flex items-center gap-3 text-sm text-gray-400 mt-2">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-[#c5a059]" /> Amanhã, 15:00
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4 text-[#c5a059]" /> Barb. João
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="text-sm border border-neutral-700 hover:border-[#c5a059] hover:text-[#c5a059] px-4 py-2 rounded-lg transition-colors w-full sm:w-auto font-medium">
                    Ver Detalhes
                  </button>
                </div>
              </div>

              {/* Card: Fidelidade */}
              <div className="bg-[#181818] border border-neutral-800 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold uppercase tracking-wider text-gray-200">Fidelidade</h2>
                    <Award className="text-[#c5a059] w-6 h-6" />
                  </div>
                  <p className="text-gray-400 text-sm mb-6">Você está quase lá! Complete 10 cortes para ganhar um gratuito.</p>
                  <div className="w-full bg-[#121212] rounded-full h-3 mb-2 border border-neutral-800 shadow-inner">
                    <div className="bg-gradient-to-r from-[#d4af37] to-[#aa7c11] h-3 rounded-full" style={{ width: "70%" }}></div>
                  </div>
                  <div className="flex justify-between text-xs font-bold text-[#c5a059]">
                    <span>7 Cortes</span>
                    <span>10 Cortes</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Histórico Recente */}
            <div className="pt-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold uppercase tracking-wider text-gray-200">Últimos Serviços</h2>
                <button className="text-[#c5a059] text-sm hover:underline flex items-center gap-1 font-medium">
                  Ver todos <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="bg-[#181818] border border-neutral-800 rounded-2xl overflow-hidden">
                <div className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-[#121212] transition-colors border-b border-neutral-800">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-neutral-800/80 border border-neutral-700 flex items-center justify-center text-[#c5a059]">
                      <Scissors className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg">Corte Clássico</h4>
                      <p className="text-sm text-gray-400 mt-1">12 de Agosto, 2026 • Barb. Marcos</p>
                    </div>
                  </div>
                  <span className="font-bold text-white tracking-wide">R$ 45,00</span>
                </div>
              </div>
            </div>

            {/* Botão Flutuante Mobile */}
            <button className="sm:hidden fixed bottom-6 right-6 bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa7c11] text-black p-4 rounded-full shadow-lg shadow-black/50 z-50 hover:brightness-110">
              <Scissors className="w-6 h-6" />
            </button>
    </div>
  );
}

