import { useEffect, useState } from "react";
import { getCookie } from "@/utils/cookies";



export function useUsuario() {
  const [nomeUsuario, setNomeUsuario] = useState("Carregando...");
  const [role, setRole] = useState("Comum");

  useEffect(() => {
    const token = getCookie("token");
    const roleCookie = getCookie("role");

    if (token) {
      try {
        const tokenInfo = JSON.parse(atob(token.split(".")[1]));
        const nome = tokenInfo.unique_name || tokenInfo.name || "Cliente";
        
        setTimeout(() => {
          if (roleCookie) {
            setRole(roleCookie);
          }
          if (tokenInfo.role) {
            setRole(tokenInfo.role);
          }
          setNomeUsuario(nome.charAt(0).toUpperCase() + nome.slice(1).toLowerCase());
        }, 0);
      } catch (err) {}
    } else {
      setTimeout(() => {
        if (roleCookie) {
          setRole(roleCookie);
        }
      }, 0);
    }
  }, []); 

 
  return { nomeUsuario, role };
}



