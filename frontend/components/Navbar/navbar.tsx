"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdMenu } from "react-icons/md";
import { User } from "lucide-react";
import {useUsuario} from "@/hooks/useUsuario";


export default function Navbar() {
  const pathname = usePathname();

  const { nomeUsuario } = useUsuario();

  const isPublicRoute = 
    pathname === "/" || 
    pathname.startsWith("/login") || 
    pathname.startsWith("/cadastro");

    const showProfile = !isPublicRoute;
  

  return (
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
              <Link
                className="data-[active=true]:underline"
                data-active={pathname === "/servicos"}
                href="/dashboard"
              >
                DASHBOARD
              </Link>
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
              <Link href="/agende">AGENDE</Link>
            </li>
            <li className="hidden md:block">
              <Link href="/#sobre">SOBRE</Link>
            </li>
          </ul>
        </nav>

        <nav className="flex-1 flex justify-end">
          <ul className="flex items-center gap-20 text-lg menu-font">
            <li className="hidden md:block">
              {showProfile ? (
                // Se estiver nas rotas da (main), mostra o Perfil
                <div className="flex items-center gap-3">
                  <span className="text-white">
                    Bem-vindo,{" "}
                    <span
                      className="text-[#c5a059] font-bold"
                      suppressHydrationWarning
                    >
                      {nomeUsuario}
                    </span>
                  </span>
                  <div className="w-10 h-10 bg-[#c5a059]/20 border border-[#c5a059]/30 rounded-full flex items-center justify-center text-[#c5a059]">
                    <User className="w-5 h-5" />
                  </div>
                </div>
              ) : (
                // Se estiver na Home ("/"), Login ou Cadastro, mostra o botão
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
