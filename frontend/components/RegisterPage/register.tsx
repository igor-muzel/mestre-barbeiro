"use client";

import { useState } from "react";
import {useRouter} from "next/navigation";
import { cadastrarUsuario } from "@/services/api/authService";
import type { CadastroDados } from "@/types/auth";
import { Eye, EyeOff, Lock, Mail, Phone, UserRound } from "lucide-react";
import Navbar from "../Navbar/navbar";

export default function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [repetirSenha, setRepetirSenha] = useState("");

  async function fazerCadastro(e: React.FormEvent) {
    e.preventDefault();

    if(isLoading) return;

    if (senha !== repetirSenha) {
      alert("As senhas não coincidem, tente novamente!");
      return;
    }

    if (
      senha.length < 6 ||                  
      !/[A-Z]/.test(senha) ||              
      !/[a-z]/.test(senha) ||              
      !/[0-9]/.test(senha) ||              
      !/[^A-Za-z0-9]/.test(senha)        
    ) {
      alert("Sua senha é fraca! Ela deve conter acima de 6 caracteres, pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial (@ # ! $ % & *).");
      return; // Trava a execução aqui e não envia para o backend!
    }

    const pacoteDeDados: CadastroDados = {
      name,
      email,
      telefone,
      senha,
    };

    console.log(pacoteDeDados);

    try {
      setIsLoading(true);
      await cadastrarUsuario(pacoteDeDados);
      
      alert("Usuário cadastrado com sucesso!!");
      
      router.push("/login");
      //aqui vamos redirecionar para o login
    } catch (err) {
      const mensagem =
        err instanceof Error ? err.message : "Erro ao cadastrar.";
      alert(mensagem);
    }
  }

  return (
    <main className="min-h-screen bg-[#0d0d0d] flex flex-col">
      <Navbar />
      
      {/* Container que ocupa o restante da tela para centralizar a caixa de cadastro */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#181818] border border-neutral-800 rounded-2xl p-8 shadow-2xl text-center">
          <div className="mb-6 flex justify-center">
            <img
              src="./logo.png"
              alt="Logo"
              className="h-30 w-auto object-contain"
            />
          </div>

        <h1 className="text-3xl font-bold tracking-wider text-white mb-8 uppercase">
          CADASTRO
        </h1>

        <form className="space-y-4" onSubmit={fazerCadastro}>
          <div className="relative">
            <UserRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#c5a059]" />
            <input
              type="text"
              placeholder="Nome completo"
              autoComplete="new-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-[#121212] text-white placeholder-gray-400 pl-11 pr-4 py-3 rounded-lg border border-[#c5a059]/50 focus:border-[#c5a059] focus:outline-none transition-all text-sm"
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#c5a059]" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              autoComplete="new-email"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-[#121212] text-white placeholder-gray-400 pl-11 pr-4 py-3 rounded-lg border border-[#c5a059]/50 focus:border-[#c5a059] focus:outline-none transition-all text-sm"
            />
          </div>

          <div className="relative">
            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#c5a059]" />
            <input
              type="tel"
              placeholder="Telefone"
              required
              value={telefone}
              autoComplete="off"
              onChange={(e) => setTelefone(e.target.value)}
              className="w-full bg-[#121212] text-white placeholder-gray-400 pl-11 pr-4 py-3 rounded-lg border border-[#c5a059]/50 focus:border-[#c5a059] focus:outline-none transition-all text-sm"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#c5a059]" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              autoComplete="new-password"
              required
              className="w-full bg-[#121212] text-white placeholder-gray-400 pl-11 pr-11 py-3 rounded-lg border border-[#c5a059]/50 focus:border-[#c5a059] focus:outline-none transition-all text-sm"
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

          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#c5a059]" />
            <input
              type={showRepeatPassword ? "text" : "password"}
              placeholder="Repetir senha"
              required
              value={repetirSenha}
              autoComplete="off"
              onChange={(e) => setRepetirSenha(e.target.value)}
              className="w-full bg-[#121212] text-white placeholder-gray-400 pl-11 pr-11 py-3 rounded-lg border border-[#c5a059]/50 focus:border-[#c5a059] focus:outline-none transition-all text-sm"
            />

            <button
              type="button"
              onClick={() => setShowRepeatPassword((prev) => !prev)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#c5a059] hover:opacity-80 transition-opacity"
              aria-label={
                showRepeatPassword ? "Ocultar senha" : "Mostrar senha"
              }
            >
              {showRepeatPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          <label className="flex items-center gap-2 cursor-pointer text-left text-sm text-gray-300 hover:text-white">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-gray-600 bg-[#121212] text-[#c5a059] focus:ring-[#c5a059] focus:ring-offset-0 accent-[#c5a059]"
            />
            <span>Aceito os termos e política de privacidade</span>
          </label>

          <button
            type="submit"
            className="cursor-pointer w-full py-3 px-4 rounded-lg font-bold text-black bg-linear-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa7c11] hover:brightness-110 transition-all uppercase tracking-wider text-base shadow-lg"
          >
            CADASTRAR
          </button>

          <div className="pt-4 text-sm text-gray-300">
            Já tem conta?{" "}
            <a
              href="/login"
              className="text-[#c5a059] hover:underline font-semibold tracking-wide ml-1 uppercase"
            >
              FAÇA LOGIN
            </a>
          </div>
        </form>
      </div>
      </div>
    </main>
  );
}
