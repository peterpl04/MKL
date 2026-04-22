export type PlanType = "FREE" | "PREMIUM";

export type ThemeType = "LIGHT" | "DARK";

export type User = {
  id: string;
  name: string;
  email: string;
  plan: PlanType;
};

export type AuthResponse = {
  user: User;
  token: string;
};

export type Product = {
  id: string;
  name: string;
  description?: string;
  price?: string;
  imageUrl?: string;
  category?: string;
  createdAt: string;
  updatedAt: string;
};

export type Company = {
  id: string;
  userId: string;
  name: string;
  slug: string;
  description?: string;
  category?: string;
  address?: string;
  phone?: string;
  whatsapp?: string;
  instagram?: string;
  logoUrl?: string;
  bannerUrl?: string;
  primaryColor: string;
  theme: ThemeType;
  sectionOrder: string[];
  mapsQuery?: string;
  createdAt: string;
  updatedAt: string;
  products?: Product[];
};

export type Analytics = {
  visits: number;
};
