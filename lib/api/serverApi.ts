import { cookies } from "next/headers";
import { api } from "./api";
import type { User } from "@/types/user";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  return await api.post(`${baseUrl}/api/auth/refresh`, {
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
