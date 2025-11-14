import { cookies } from "next/headers";
import { api } from "./api";
import type { User } from "@/types/user";

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  return await api.get(`/auth/refresh`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await api.get("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};
