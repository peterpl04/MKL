const DEPRECATED_BACKEND_HOST = "https://vitrine-digital-backend.up.railway.app";
const CURRENT_BACKEND_HOST = "https://mkl-production.up.railway.app";

function resolveApiBaseUrl() {
  const envApiUrl = import.meta.env.VITE_API_URL?.trim();

  if (envApiUrl) {
    return envApiUrl.replace(DEPRECATED_BACKEND_HOST, CURRENT_BACKEND_HOST);
  }

  if (import.meta.env.PROD) {
    return `${CURRENT_BACKEND_HOST}/api`;
  }

  return "http://localhost:3333/api";
}

export const API_BASE_URL = resolveApiBaseUrl();
export const PUBLIC_BASE_URL = import.meta.env.VITE_PUBLIC_APP_URL || "http://localhost:5173";

export const SECTION_LABELS: Record<string, string> = {
  about: "Sobre",
  products: "Produtos e serviços",
  contact: "Contato"
};
