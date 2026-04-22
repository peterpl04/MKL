import type { Analytics, Company } from "../types";
import { api } from "./api";

export type CompanyPayload = {
  name: string;
  description?: string;
  category?: string;
  address?: string;
  phone?: string;
  whatsapp?: string;
  instagram?: string;
  logoUrl?: string;
  bannerUrl?: string;
  primaryColor: string;
  theme: "LIGHT" | "DARK";
  sectionOrder: string[];
  mapsQuery?: string;
};

export async function fetchMyCompany() {
  const { data } = await api.get<Company | null>("/companies/me");
  return data;
}

export async function upsertMyCompany(payload: CompanyPayload) {
  const { data } = await api.post<Company>("/companies/me", payload);
  return data;
}

export async function fetchPublicCompany(slug: string) {
  const { data } = await api.get<Company>(`/companies/public/${slug}`);
  return data;
}

export async function fetchAnalytics() {
  const { data } = await api.get<Analytics>("/companies/me/analytics");
  return data;
}
