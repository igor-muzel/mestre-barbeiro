
export const getCookie = (nomeCookie: string): string | null => {
  if (typeof window === "undefined") {
    return null;
  }
  const match = document.cookie.match(new RegExp("(^| )" + nomeCookie + "=([^;]+)"));
  return match ? match[2] : null;
};