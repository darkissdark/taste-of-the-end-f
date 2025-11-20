import { cookies } from 'next/headers';
import { api } from './api';
import type { User } from '@/types/user';
import type { RecipesRes } from './clientApi';

export const checkServerSession = async () => {
  const cookieStore = await cookies();

  return api.post('/auth/refresh', null, {
    headers: { Cookie: cookieStore.toString() },
  });
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();

  const { data } = await api.get('/users/me', {
    headers: { Cookie: cookieStore.toString() },
  });

  return data;
};

type GetRecipesParams = {
  page?: number;
  perPage?: number;
  category?: string;
  ingredient?: string;
  search?: string;
};

export const getServerRecipes = async (params: GetRecipesParams = {}): Promise<RecipesRes> => {
  const cookieStore = await cookies();

  const { data } = await api.get<RecipesRes>('/recipes', {
    params,
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
};
