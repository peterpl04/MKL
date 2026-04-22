import bcrypt from "bcryptjs";
import { prisma } from "config/prisma.js";
import { ApiError } from "utils/api-error.js";
import { signToken } from "utils/jwt.js";

type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

type LoginInput = {
  email: string;
  password: string;
};

export async function register({ name, email, password }: RegisterInput) {
  const existing = await prisma.user.findUnique({ where: { email } });

  if (existing) {
    throw new ApiError(409, "Este e-mail já está em uso.");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash
    }
  });

  const token = signToken({ sub: user.id, email: user.email });

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      plan: user.plan
    },
    token
  };
}

export async function login({ email, password }: LoginInput) {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new ApiError(401, "Credenciais inválidas.");
  }

  const passwordMatch = await bcrypt.compare(password, user.passwordHash);

  if (!passwordMatch) {
    throw new ApiError(401, "Credenciais inválidas.");
  }

  const token = signToken({ sub: user.id, email: user.email });

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      plan: user.plan
    },
    token
  };
}
