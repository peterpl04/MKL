export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3333/api";
export const PUBLIC_BASE_URL = import.meta.env.VITE_PUBLIC_APP_URL || "http://localhost:5173";

export const SECTION_LABELS: Record<string, string> = {
  about: "Sobre",
  products: "Produtos e serviços",
  contact: "Contato"
};
