"use client";
import { LogOut, Scissors, Calendar, Clock, User, Users, BarChart3, Settings, Home } from "lucide-react";
import { handleLogout } from "@/app/actions/auth";
import Link from "next/link";
// Recebe o nomeUsuario como "prop" (parâmetro) para exibir no cabeçalho
export function AdminDashboard({ nomeUsuario }: { nomeUsuario: string }) {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
            {/* Cabeçalho */}
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-wider">
                  Olá, Mestre <span className="text-[#c5a059]" suppressHydrationWarning>{nomeUsuario}</span>
                </h1>
                <p className="text-gray-400 mt-1">
                  Vamos para mais um dia de muito trabalho!
                </p>
              </div>
              <button className="hidden sm:flex bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa7c11] text-black px-6 py-3 rounded-lg font-bold uppercase tracking-wider text-sm shadow-lg hover:brightness-110 transition-all items-center gap-2">
                <Scissors className="w-5 h-5" />
                Registrar Corte Manual
              </button>
            </header>

            {/* Painéis do Admin */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Visão Geral */}
                <div className="bg-[#181818] border border-neutral-800 rounded-2xl p-6">
                  <h2 className="text-xl font-bold uppercase tracking-wider text-gray-200 mb-4">Visão do Dia</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center bg-[#121212] p-4 rounded-xl border border-neutral-800">
                      <span className="text-gray-400">Cortes Agendados</span>
                      <span className="text-2xl font-bold text-[#c5a059]">12</span>
                    </div>
                    <div className="flex justify-between items-center bg-[#121212] p-4 rounded-xl border border-neutral-800">
                      <span className="text-gray-400">Faturamento Prev.</span>
                      <span className="text-2xl font-bold text-[#c5a059]">R$ 450</span>
                    </div>
                  </div>
                </div>

                {/* Próximo Cliente */}
                <div className="lg:col-span-2 bg-[#181818] border border-neutral-800 rounded-2xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#c5a059] opacity-5 rounded-bl-full"></div>
                  <h2 className="text-xl font-bold mb-4 uppercase tracking-wider text-gray-200">
                    Cliente na Cadeira
                  </h2>
                  <div className="bg-[#121212] border border-[#c5a059]/30 rounded-xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
                    <div className="flex items-center gap-4">
                      <div className="bg-[#c5a059]/20 p-4 rounded-lg border border-[#c5a059]/30 text-[#c5a059]">
                        <User className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">Marcos Silva</h3>
                        <div className="flex items-center gap-3 text-sm text-gray-400 mt-2">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4 text-[#c5a059]" /> 15:00 (Agora)
                          </span>
                          <span className="flex items-center gap-1">
                            <Scissors className="w-4 h-4 text-[#c5a059]" /> Degradê + Barba
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className="bg-[#c5a059] text-black hover:brightness-110 font-bold px-6 py-2 rounded-lg transition-colors w-full sm:w-auto">
                      Finalizar Corte
                    </button>
                  </div>
                </div>
              </div>

              {/* Agenda Resumida */}
              <div className="bg-[#181818] border border-neutral-800 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-neutral-800">
                  <h2 className="text-xl font-bold uppercase tracking-wider text-gray-200">Próximos Horários</h2>
                </div>
                <div className="p-4 sm:p-6 flex justify-between items-center hover:bg-[#121212] transition-colors border-b border-neutral-800">
                  <div className="flex items-center gap-4">
                    <span className="text-[#c5a059] font-bold w-12">16:00</span>
                    <div>
                      <h4 className="font-bold text-white">Pedro Henrique</h4>
                      <p className="text-sm text-gray-400">Corte Clássico</p>
                    </div>
                  </div>
                  <span className="text-gray-400">Aguardando</span>
                </div>
                <div className="p-4 sm:p-6 flex justify-between items-center hover:bg-[#121212] transition-colors">
                  <div className="flex items-center gap-4">
                    <span className="text-[#c5a059] font-bold w-12">17:00</span>
                    <div>
                      <h4 className="font-bold text-white">Livre</h4>
                      <p className="text-sm text-gray-500">Nenhum agendamento</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

    </div>
  );
}

