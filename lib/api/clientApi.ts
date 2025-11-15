import { api } from "./api";
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

export const getMe = async () => {
  const { data } = await api.get<User>("/users/me");
  return data;
};

type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  try {
    const res = await api.post("/auth/refresh");
    return res.data.authorized === true;
  } catch (error) {
    console.error("Session check error:", error);
    return false;
  }
};

export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
};
