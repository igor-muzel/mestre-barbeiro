"use client";

import {
  Home,
  Calendar,
  Award,
  User,
  LogOut,
  Clock,
  Scissors,
  ChevronRight,
  Star,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar/navbar";

// Função simples para buscar um cookie pelo nome
const getCookie = (nomeCookie: string) => {
  if (typeof window === "undefined") return null;
  const match = document.cookie.match(
    new RegExp("(^| )" + nomeCookie + "=([^;]+)"),
  );
  return match ? match[2] : null;
};

export default function DashboardPage() {
  const router = useRouter();
  
  function handleLogout() {
    // Para apagar um cookie, nós o reescrevemos com uma data de validade no passado (ano 1970)
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/login");
  }

  const [nomeUsuario, setNomeUsuario] = useState("Cliente");

  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      try {
        const tokenInfo = JSON.parse(atob(token.split(".")[1]));
        const nomeReal = tokenInfo.unique_name || tokenInfo.name || "Cliente";
        const primeiroNome = nomeReal.split(" ")[0];
        
        // setTimeout resolve aquele erro chato do ESLint sobre cascata de renderização
        setTimeout(() => setNomeUsuario(primeiroNome.charAt(0).toUpperCase() + primeiroNome.slice(1).toLowerCase()), 0);
      } catch (e) {}
    }
  }, []);
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
      {/* Sidebar Lateral */}
      <aside className="w-64 bg-[#181818] border-r border-neutral-800 flex flex-col hidden md:flex">
        {/* Logo */}
        <div className="p-6 flex items-center justify-center border-b border-neutral-800 min-h-[100px]">
          <img
            src="/logo.png"
            alt="Mestre Barbeiro"
            className="h-16 object-contain"
          />
        </div>

        {/* Menu de Navegação */}
        <nav className="flex-1 p-4 space-y-2 mt-4">
          <a
            href="#"
            className="flex items-center gap-3 bg-[#c5a059]/10 text-[#c5a059] px-4 py-3 rounded-lg font-medium border border-[#c5a059]/20 transition-all"
          >
            <Home className="w-5 h-5" />
            Início
          </a>
          <a
            href="#"
            className="flex items-center gap-3 text-gray-400 hover:text-white hover:bg-neutral-800/50 px-4 py-3 rounded-lg font-medium transition-all"
          >
            <Calendar className="w-5 h-5" />
            Agendamentos
          </a>
          <a
            href="#"
            className="flex items-center gap-3 text-gray-400 hover:text-white hover:bg-neutral-800/50 px-4 py-3 rounded-lg font-medium transition-all"
          >
            <Award className="w-5 h-5" />
            Fidelidade
          </a>
          <a
            href="#"
            className="flex items-center gap-3 text-gray-400 hover:text-white hover:bg-neutral-800/50 px-4 py-3 rounded-lg font-medium transition-all"
          >
            <User className="w-5 h-5" />
            Meu Perfil
          </a>
        </nav>

        {/* Botão Sair */}
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

      {/* Conteúdo Principal (Main) */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Cabeçalho */}
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-wider">
                Bem-vindo,{" "}
                <span className="text-[#c5a059]" suppressHydrationWarning>
                  {nomeUsuario.charAt(0).toUpperCase()+nomeUsuario.slice(1).toLowerCase()}
                </span>
              </h1>
              <p className="text-gray-400 mt-1">
                Pronto para renovar o visual hoje?
              </p>
            </div>
            <button className="hidden sm:flex bg-linear-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa7c11] text-black px-6 py-3 rounded-lg font-bold uppercase tracking-wider text-sm shadow-lg hover:brightness-110 transition-all items-center gap-2">
              <Scissors className="w-5 h-5" />
              Novo Agendamento
            </button>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Card: Próximo Agendamento (Ocupa 2 colunas no desktop) */}
            <div className="lg:col-span-2 bg-[#181818] border border-neutral-800 rounded-2xl p-6 relative overflow-hidden">
              {/* Efeito visual de fundo */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#c5a059] opacity-5 rounded-bl-full"></div>

              <h2 className="text-xl font-bold mb-4 uppercase tracking-wider text-gray-200">
                Seu Próximo Horário
              </h2>

              <div className="bg-[#121212] border border-[#c5a059]/30 rounded-xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="bg-[#c5a059]/20 p-4 rounded-lg border border-[#c5a059]/30 text-[#c5a059] shadow-inner">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Corte Fade + Barba Lenhador
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-gray-400 mt-2">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-[#c5a059]" /> Amanhã,
                        15:00
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
                  <h2 className="text-xl font-bold uppercase tracking-wider text-gray-200">
                    Fidelidade
                  </h2>
                  <Award className="text-[#c5a059] w-6 h-6" />
                </div>
                <p className="text-gray-400 text-sm mb-6">
                  Você está quase lá! Complete 10 cortes para ganhar um
                  gratuito.
                </p>

                {/* Barra de Progresso */}
                <div className="w-full bg-[#121212] rounded-full h-3 mb-2 border border-neutral-800 shadow-inner">
                  <div
                    className="bg-linear-to-r from-[#d4af37] to-[#aa7c11] h-3 rounded-full"
                    style={{ width: "70%" }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs font-bold text-[#c5a059]">
                  <span>7 Cortes</span>
                  <span>10 Cortes</span>
                </div>
              </div>
            </div>
          </div>

          {/* Seção: Histórico Recente */}
          <div className="pt-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold uppercase tracking-wider text-gray-200">
                Últimos Serviços
              </h2>
              <a
                href="#"
                className="text-[#c5a059] text-sm hover:underline flex items-center gap-1 font-medium"
              >
                Ver todos <ChevronRight className="w-4 h-4" />
              </a>
            </div>

            <div className="bg-[#181818] border border-neutral-800 rounded-2xl overflow-hidden">
              {/* Item 1 */}
              <div className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-800 hover:bg-[#121212] transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-neutral-800/80 border border-neutral-700 flex items-center justify-center text-[#c5a059]">
                    <Scissors className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg">
                      Corte Clássico
                    </h4>
                    <p className="text-sm text-gray-400 mt-1">
                      12 de Agosto, 2026 • Barb. Marcos
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="flex text-[#c5a059]">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                  <span className="font-bold text-white tracking-wide">
                    R$ 45,00
                  </span>
                </div>
              </div>

              {/* Item 2 */}
              <div className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-[#121212] transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-neutral-800/80 border border-neutral-700 flex items-center justify-center text-[#c5a059]">
                    <Scissors className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg">
                      Barba e Sobrancelha
                    </h4>
                    <p className="text-sm text-gray-400 mt-1">
                      20 de Julho, 2026 • Barb. João
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="flex text-[#c5a059]">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-neutral-700" />
                  </div>
                  <span className="font-bold text-white tracking-wide">
                    R$ 30,00
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Botão Flutuante (Apenas Mobile) para Agendamento */}
          <button className="sm:hidden fixed bottom-6 right-6 bg-linear-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa7c11] text-black p-4 rounded-full shadow-lg shadow-black/50 z-50 hover:brightness-110">
            <Scissors className="w-6 h-6" />
          </button>
        </div>
      </main>
      </div>
    </div>
  );
}
