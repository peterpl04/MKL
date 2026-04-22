import type { AuthResponse, User } from "../types";
import { api } from "./api";

type RegisterData = {
  name: string;
  email: string;
  password: string;
};

type LoginData = {
  email: string;
  password: string;
};

export async function registerUser(payload: RegisterData) {
  const { data } = await api.post<AuthResponse>("/auth/register", payload);
  return data;
}

export async function loginUser(payload: LoginData) {
  const { data } = await api.post<AuthResponse>("/auth/login", payload);
  return data;
}

export async function getCurrentUser() {
  const { data } = await api.get<{ user: User }>("/auth/me");
  return data.user;
}
