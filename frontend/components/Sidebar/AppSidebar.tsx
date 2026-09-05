"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Scissors, Calendar, Clock, User, Users, BarChart3, Settings, Home, Award } from "lucide-react";
import { useUsuario } from "@/hooks/useUsuario";
import { handleLogout } from "@/app/actions/auth";

export function AppSidebar() {
  const { role } = useUsuario();
  const pathname = usePathname();
  const isAdmin = role === "Admin";

  // Função auxiliar para pintar o botão selecionado de dourado
  const getLinkClass = (path: string) => {
    const isActive = pathname === path;
    return isActive
      ? "flex items-center gap-3 w-full bg-[#c5a059]/10 text-[#c5a059] px-4 py-3 rounded-lg font-medium border border-[#c5a059]/20 transition-all"
      : "flex items-center gap-3 w-full text-gray-400 hover:text-white hover:bg-neutral-800/50 px-4 py-3 rounded-lg font-medium transition-all";
  };

  return (
    <aside className="w-64 bg-[#181818] border-r border-neutral-800 hidden md:flex flex-col rounded-tr-xl">
      <nav className="flex-1 p-4 space-y-2 mt-4">
        <Link href="/dashboard" className={getLinkClass("/dashboard")}>
          <Home className="w-5 h-5" />
          Início
        </Link>
        
        {isAdmin ? (
          <>
            <Link href="/agenda" className={getLinkClass("/agenda")}>
              <Calendar className="w-5 h-5" />
              Agenda do Dia
            </Link>
            <Link href="/cliente" className={getLinkClass("/cliente")}>
              <Users className="w-5 h-5" />
              Clientes
            </Link>
            <Link href="/servicos" className={getLinkClass("/servicos")}>
              <Settings className="w-5 h-5" />
              Serviços & Preços
            </Link>
            <Link href="/relatorios" className={getLinkClass("/relatorios")}>
              <BarChart3 className="w-5 h-5" />
              Relatórios
            </Link>
          </>
        ) : (
          <>
            <Link href="/meus-agendamentos" className={getLinkClass("/meus-agendamentos")}>
              <Calendar className="w-5 h-5" />
              Meus Agendamentos
            </Link>
            <Link href="/fidelidade" className={getLinkClass("/fidelidade")}>
              <Award className="w-5 h-5" />
              Fidelidade
            </Link>
            <Link href="/perfil" className={getLinkClass("/perfil")}>
              <User className="w-5 h-5" />
              Meu Perfil
            </Link>
          </>
        )}
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
  );
}

