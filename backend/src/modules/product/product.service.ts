import { prisma } from "config/prisma.js";
import { ApiError } from "utils/api-error.js";

type ProductInput = {
  name: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  category?: string;
};

async function getCompanyIdByUser(userId: string) {
  const company = await prisma.company.findUnique({
    where: { userId },
    select: { id: true }
  });

  if (!company) {
    throw new ApiError(404, "Cadastre sua empresa antes de adicionar produtos.");
  }

  return company.id;
}

export async function createProduct(userId: string, data: ProductInput) {
  const companyId = await getCompanyIdByUser(userId);

  return prisma.product.create({
    data: {
      ...data,
      price: data.price,
      companyId
    }
  });
}

export async function listMyProducts(userId: string) {
  const companyId = await getCompanyIdByUser(userId);

  return prisma.product.findMany({
    where: { companyId },
    orderBy: { createdAt: "desc" }
  });
}

export async function updateProduct(userId: string, productId: string, data: ProductInput) {
  const companyId = await getCompanyIdByUser(userId);
  const product = await prisma.product.findUnique({ where: { id: productId } });

  if (!product || product.companyId !== companyId) {
    throw new ApiError(404, "Produto não encontrado.");
  }

  return prisma.product.update({
    where: { id: productId },
    data
  });
}

export async function deleteProduct(userId: string, productId: string) {
  const companyId = await getCompanyIdByUser(userId);
  const product = await prisma.product.findUnique({ where: { id: productId } });

  if (!product || product.companyId !== companyId) {
    throw new ApiError(404, "Produto não encontrado.");
  }

  await prisma.product.delete({ where: { id: productId } });
}
