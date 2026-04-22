import { ThemeMode } from "@prisma/client";
import { z } from "zod";

export const upsertCompanySchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  category: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  whatsapp: z.string().optional(),
  instagram: z.string().optional(),
  logoUrl: z.string().url().optional(),
  bannerUrl: z.string().url().optional(),
  primaryColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
  theme: z.nativeEnum(ThemeMode),
  sectionOrder: z.array(z.string()).min(1),
  mapsQuery: z.string().optional()
});
