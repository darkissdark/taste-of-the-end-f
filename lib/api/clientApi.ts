import { api } from "@/lib/api/api";
import type { User } from "@/types/user";

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export const register = async (data: RegisterRequest) => {
  const res = await api.post<User>("/auth/register", data);
  return res.data;
};

export const login = async (data: LoginRequest) => {
  const res = await api.post<User>("/auth/login", data);
  return res.data;
};

