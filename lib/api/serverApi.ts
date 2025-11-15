import { cookies } from "next/headers";
import { api } from "./api";
import type { User } from "@/types/user";

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  return await api.post(`/auth/refresh`, {
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

export async function fetchCategories(): Promise<string[]> {
  const { data } = await api.get<string[]>("/categories");
  return data;
}
export async function fetchIngredients(): Promise<
  { _id: string; name: string; desc: string; img: string }[]
> {
  const { data } = await api.get<
    { _id: string; name: string; desc: string; img: string }[]
  >("/ingredients");
  return data;
}
