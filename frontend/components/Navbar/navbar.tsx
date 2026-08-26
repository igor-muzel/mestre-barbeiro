"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdMenu } from "react-icons/md";

export default function Navbar() {
  const pathname = usePathname();

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
              <Link
                className="bg-[#2c2a21] px-8 py-3 rounded-sm font-bold text-white hover:brightness-110 transition-all"
                href="/login"
              >
                LOGIN/CADASTRO
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
