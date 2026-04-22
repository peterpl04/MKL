import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string().min(12),
  JWT_EXPIRES_IN: z.string().default("7d"),
  API_BASE_URL: z.string().url().default("http://localhost:3333"),
  CORS_ORIGINS: z.string().optional()
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Erro ao validar variáveis de ambiente", parsed.error.format());
  process.exit(1);
}

export const env = parsed.data;
