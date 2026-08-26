"use client"; // src/components/Navbar/navbar.tsx
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdMenu, MdOutlineOpenInNew } from "react-icons/md";

// 1. Criamos a lista com os itens do menu para facilitar a manutenção

import { User } from "lucide-react";

const getCookie = (nomeCookie: string) => {
  if (typeof window === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )" + nomeCookie + "=([^;]+)"));
  return match ? match[2] : null;
};

export default function Navbar() {
  const pathname = usePathname();

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

  const isDashboard = pathname.startsWith("/dashboard");

  return (
    // Container principal do Header: fixo no topo, fundo preto com transparência e borda inferior
    <header className="relative top-0 left-0 w-full shadow-sm z-50 px-6 dark:bg-black bg-white">
      <div className="relative md:flex justify-between items-center my-2 w-full">
        <div className="flex-1 flex justify-start">
          <Link href="/">
            <img className="h-17 cursor-pointer" src="/logo.png" alt="Logo" />
          </Link>
        </div>
        <nav>
          <div>
            <button
              type="button"
              className="ml-4 sm:hidden"
              aria-label="Abrir menu"
            >
              <MdMenu size={25} />
            </button>
          </div>
            <ul className="flex items-center gap-25 text-lg menu-font">
              <li className="hidden md:block">
                <Link href="/dashboard">DASHBOARD</Link>
              </li>
              <li className="hidden md:block">
                <Link
                  className="data-[active=true]:underline"
                  data-active={pathname === "/servicos"}
                  href="/servicos"
                >
                  SERVIÇOS
                </Link>
              </li>
              <li className="hidden md:block">
                <Link href="/#agende">AGENDE</Link>
              </li>
              <li className="hidden md:block">
                <Link href="/#sobre">SOBRE</Link>
              </li>
            </ul>
          
        </nav>

        <nav className="flex-1 flex justify-end">
          <ul className="flex items-center gap-20 text-lg menu-font">
            <li className="hidden md:block">
              {isDashboard ? (
                // Visão do Dashboard: Nome do Usuário + Ícone
                <div className="flex items-center gap-3">
                 
                  <span className="text-white">
                    Bem-vindo,{" "}
                    <span
                      className="text-[#c5a059] font-bold"
                      suppressHydrationWarning
                    >
                      {nomeUsuario.charAt(0).toUpperCase()+nomeUsuario.slice(1).toLowerCase()}
                    </span>
                  </span>
                  <div className="w-10 h-10 bg-[#c5a059]/20 border border-[#c5a059]/30 rounded-full flex items-center justify-center text-[#c5a059]">
                    <User className="w-5 h-5" />
                  </div>
                </div>
              ) : (
                // Visão Normal (Login/Cadastro/Home): Botão de Login
                <Link
                  className="bg-[#2c2a21] px-8 py-3 rounded-sm font-bold text-white hover:brightness-110 transition-all"
                  href="/login"
                >
                  LOGIN/CADASTRO
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
