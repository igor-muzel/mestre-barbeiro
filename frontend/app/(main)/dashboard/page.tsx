"use client";
import { useState, useEffect } from "react";
import { useUsuario } from "@/hooks/useUsuario";
import { AdminDashboard } from "@/components/Dashboard/AdminDashboard";
import { ClientDashboard } from "@/components/Dashboard/ClientDashboard";

export default function PageDashboard() {
  const { nomeUsuario, role } = useUsuario();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsMounted(true);
    }, 0);
  }, []);

  if (!isMounted) {
    return <div className="min-h-screen bg-[#0d0d0d]"></div>;
  }

  return role === "Admin" ? (
    <AdminDashboard nomeUsuario={nomeUsuario} />
  ) : (
    <ClientDashboard nomeUsuario={nomeUsuario} />
  );
}