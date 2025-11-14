import { cookies } from "next/headers";
import { api } from "./api";
import type { User } from "@/types/user";

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");
  const res = await api.post("/auth/refresh", {
    headers: {
      Cookie: cookieHeader,
    },
  });
  return res;
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
