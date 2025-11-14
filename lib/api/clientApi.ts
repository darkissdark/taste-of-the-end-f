import { api } from "@/lib/api/api";
import type { User } from "@/types/user";

export type RegisterOrLoginRequest = {
  email: string;
  password: string;
};

export const register = async (data: RegisterOrLoginRequest) => {
  const res = await api.post<User>("/auth/register", data);
  return res.data;
};

export const login = async (data: RegisterOrLoginRequest) => {
  const res = await api.post<User>("/auth/login", data);
  return res.data;
};

