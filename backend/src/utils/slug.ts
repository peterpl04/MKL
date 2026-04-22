import slugify from "slugify";
import { prisma } from "config/prisma.js";

export async function generateUniqueSlug(name: string, excludeCompanyId?: string) {
  const base = slugify(name, {
    lower: true,
    strict: true,
    trim: true
  });

  let slug = base;
  let counter = 1;

  while (true) {
    const existing = await prisma.company.findUnique({
      where: { slug }
    });

    if (!existing || existing.id === excludeCompanyId) {
      return slug;
    }

    slug = `${base}-${counter}`;
    counter += 1;
  }
}
