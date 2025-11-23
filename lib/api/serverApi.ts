import { cookies } from 'next/headers';
import axios from 'axios';
import type { User } from '@/types/user';
import type { Ingredient, Recipe } from '@/types/recipe';
import type { RecipesRes } from './clientApi';

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || 'https://taste-of-the-end-b.onrender.com';

const serverApi = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
});

export const checkServerSession = async () => {
  const cookieStore = await cookies();

  return serverApi.post('/auth/refresh', null, {
    headers: { Cookie: cookieStore.toString() },
  });
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();

  const { data } = await serverApi.get('/users/me', {
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

  const { data } = await serverApi.get<RecipesRes>('/recipes', {
    params,
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
};

export const getServerFavoriteRecipes = async (): Promise<RecipesRes> => {
  const cookieStore = await cookies();
  const { data } = await serverApi.get(`/recipes/favorites`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const getServerOwnRecipes = async (): Promise<RecipesRes> => {
  const cookieStore = await cookies();
  const { data } = await serverApi.get(`/recipes/personal`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const getRecipeById = async (recipeId: string): Promise<Recipe | null> => {
  const cookieStore = await cookies();
  try {
    const { data } = await serverApi.get<Recipe>(`/recipes/${recipeId}`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return data;
  } catch (error: any) {
    if (error.response?.status === 400 || error.response?.status === 404) {
      return null;
    }
    throw error;
  }
};

export const getServerCategories = async () => {
  const cookieStore = await cookies();
  const { data } = await serverApi.get<string[]>(`/categories`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
};
export const getServerIngredients = async () => {
  const cookieStore = await cookies();
  const { data } = await serverApi.get<Ingredient[]>(`/ingredients`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
};
