import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  price: z.coerce.number().nonnegative().optional(),
  imageUrl: z.string().url().optional(),
  category: z.string().optional()
});

export const updateProductSchema = createProductSchema.partial();
