import { User } from "@/types/user";
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const api = axios.create({
  baseURL,
  withCredentials: true,
});

export const getMe = async () => {
  const { data } = await api.get<User>("/users/me");
  return data;
};

type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const res = await api.post<CheckSessionRequest>("/auth/refresh");
  return res.data.success;
};

export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
};
