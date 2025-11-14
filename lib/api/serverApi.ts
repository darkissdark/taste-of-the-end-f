import { cookies } from "next/headers";
import { api } from "./api";
import type { User } from "@/types/user";

export const checkServerSession = async () => {
  const cookieStore = cookies();

  const cookieHeader = (await cookieStore)
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(`${process.env.BACKEND_URL}/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,
    },
    credentials: "include",
  });

  const setCookie = res.headers.get("set-cookie");
  const data = await res.json();

  return {
    status: res.status,
    data,
    setCookie,
  };
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
