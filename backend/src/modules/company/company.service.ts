import { prisma } from "config/prisma.js";
import { ApiError } from "utils/api-error.js";
import { generateUniqueSlug } from "utils/slug.js";

type UpsertCompanyInput = {
  userId: string;
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

export async function upsertCompany(input: UpsertCompanyInput) {
  const existing = await prisma.company.findUnique({
    where: { userId: input.userId }
  });

  const slug = await generateUniqueSlug(input.name, existing?.id);

  if (!existing) {
    return prisma.company.create({
      data: {
        ...input,
        slug
      }
    });
  }

  return prisma.company.update({
    where: { id: existing.id },
    data: {
      ...input,
      slug
    }
  });
}

export async function getMyCompany(userId: string) {
  return prisma.company.findUnique({
    where: { userId },
    include: { products: true }
  });
}

export async function getPublicCompanyBySlug(slug: string, visitor?: { ip?: string; userAgent?: string }) {
  const company = await prisma.company.findUnique({
    where: { slug },
    include: {
      products: {
        orderBy: { createdAt: "desc" }
      }
    }
  });

  if (!company) {
    throw new ApiError(404, "Empresa não encontrada.");
  }

  await prisma.publicPageVisit.create({
    data: {
      companyId: company.id,
      ipAddress: visitor?.ip,
      userAgent: visitor?.userAgent
    }
  });

  return company;
}

export async function getCompanyAnalytics(userId: string) {
  const company = await prisma.company.findUnique({
    where: { userId },
    select: { id: true }
  });

  if (!company) {
    throw new ApiError(404, "Empresa não cadastrada.");
  }

  const visits = await prisma.publicPageVisit.count({
    where: { companyId: company.id }
  });

  return { visits };
}
