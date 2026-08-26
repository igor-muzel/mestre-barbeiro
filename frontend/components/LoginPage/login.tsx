"use client";
import { FormEvent, useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { LoginRequest } from "@/types/auth";
import { useRouter } from "next/navigation";
import { loginUsuario } from "@/services/api/authService";
import Navbar from "../Navbar/navbar";

export default function LoginForm() {
  const route = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isRequest, setIsRequest] = useState(false);

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsRequest(true);

    if (!email || !password) {
      alert("Email ou senha incorretos");
      return;
    }

    const userLogin: LoginRequest = {
      email: email,
      senha: password,
    };

    const response = await loginUsuario(userLogin);

    try {
      if (!response.sucesso) {
        alert("Erro:" + response.message);
        setIsRequest(false);
        return;
      }

      if (response.token) {
        localStorage.setItem("token", response.token);
        alert(response.message);
        route.push("/dashboard");
      }
    } catch (err) {
      const mensagem =
        err instanceof Error ? err.message : "Erro ao fazer login.";
      alert(mensagem);
    }
  }

  return (
    
    <main className="min-h-screen bg-[#0d0d0d] flex flex-col">
      <Navbar />
      
      {/* Container que ocupa o restante da tela para centralizar a caixa de login */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#181818] border border-neutral-800 rounded-2xl p-8 shadow-2xl text-center">
          {/* Logo */}
          <div className="mb-6 flex justify-center">
          <img
            src="./logo.png"
            alt="Logo"
            className="h-30 w-auto object-contain"
          />
        </div>

        {/* Título */}
        <h1 className="text-3xl font-bold tracking-wider text-white mb-8 uppercase">
          LOGIN
        </h1>

        <form className="space-y-4" onSubmit={handleLogin}>
          {/* Input de Email */}
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#c5a059]" />
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              autoComplete="new-email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#121212] text-white placeholder-gray-400 pl-11 pr-4 py-3 rounded-lg border border-[#c5a059]/50 focus:border-[#c5a059] focus:outline-none transition-all text-sm"
            />
          </div>

          {/* Input de Senha */}
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#c5a059]" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              value={password}
              autoComplete="new-senha"
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#121212] text-white placeholder-gray-400 pl-11 pr-11 py-3 rounded-lg border border-[#c5a059]/50 focus:border-[#c5a059] focus:outline-none transition-all text-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isRequest}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#c5a059] hover:opacity-80 transition-opacity"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Lembre-me & Esqueceu sua senha */}
          <div className="flex items-center justify-between text-sm py-1">
            <label className="flex items-center gap-2 cursor-pointer text-gray-300 hover:text-white">
              <input
                type="checkbox"
                name="remember"
                
                className="w-4 h-4 rounded border-gray-600 bg-[#121212] text-[#c5a059] focus:ring-[#c5a059] focus:ring-offset-0 accent-[#c5a059]"
              />
              <span>Lembre-me</span>
            </label>

            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Esqueceu sua senha?
            </a>
          </div>

          {/* Botão Entrar */}
          <button
            type="submit"
            className="cursor-pointer w-full py-3 px-4 rounded-lg font-bold text-black bg-linear-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa7c11] hover:brightness-110 transition-all uppercase tracking-wider text-base shadow-lg"
          >
            ENTRAR
          </button>

          {/* Criar Conta */}
          <div className="pt-4 text-sm text-gray-300">
            Ainda não tem conta?{" "}
            <a
              href="/cadastro"
              className="text-[#c5a059] hover:underline font-semibold tracking-wide ml-1 uppercase"
            >
              CADASTRE-SE
            </a>
          </div>
        </form>
      </div>
      </div>
    </main>
  );
}
