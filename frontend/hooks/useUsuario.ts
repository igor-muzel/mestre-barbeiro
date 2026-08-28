import { useEffect, useState } from "react";

const getCookie = (nomeCookie: string) => {
  if (typeof window === "undefined") {
    return null;
  }

  const match = document.cookie.match(
    new RegExp("(^|)" + nomeCookie + "=([^;]+)"),
  );

  return match ? match[2] : null;
};

export function useUsuario() {
  const [nomeUsuario, setNomeUsuario] = useState("Cliente");
  try {
    useEffect(() => {
      const token = getCookie("token");

      if (token) {
        const tokenInfo = JSON.parse(atob(token.split(".")[1]));
        const nome = tokenInfo.unique_name || tokenInfo.name || "Cliente";

        setTimeout(() => {
          setNomeUsuario(
            nome.charAt(0).toUpperCase() + nome.slice(1).toLowerCase(),
          );
        }, 0);
      }
    }, [nomeUsuario]);

    return nomeUsuario;
  } catch (err) {}
}
