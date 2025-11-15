import { nextServer } from "./api";

export async function fetchCategories(): Promise<string[]> {
  const { data } = await nextServer.get<string[]>("/categories");
  return data;
}
export async function fetchIngredients(): Promise<
  { _id: string; name: string; desc: string; img: string }[]
> {
  const { data } = await nextServer.get<
    { _id: string; name: string; desc: string; img: string }[]
  >("/ingredients");
  return data;
}
