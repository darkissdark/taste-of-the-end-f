import { Recipe } from '@/types/recipe';
import { api } from './api';
import type { User } from '@/types/user';

export type RegisterRequest = {
  email: string;
  name: string;
  password: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export const register = async (data: RegisterRequest) => {
  const res = await api.post<User>('/auth/register', data);
  return res.data;
};

export const login = async (data: LoginRequest) => {
  const res = await api.post<User>('/auth/login', data);
  return res.data;
};

export const getMe = async () => {
  const { data } = await api.get<User>('/users/me');
  return data;
};

type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  try {
    const res = await api.post('/auth/refresh');
    return res.data.authorized === true;
  } catch (error) {
    console.error('Session check error:', error);
    return false;
  }
};

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout');
};

export const fetchCategories = async () => {
  const { data } = await api.get<string[]>('/categories');
  return data;
};

export type IngredientDto = {
  _id: string;
  name: string;
  desc: string;
  img: string;
};

export const fetchIngredients = async () => {
  const { data } = await api.get<IngredientDto[]>('/ingredients');
  return data;
};

export interface FetchRecipesParams {
  page?: number;
  perPage?: number;
  category?: string;
  ingredient?: string;
  search?: string;
}

export interface RecipesRes {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  recipes: Recipe[];
}

export const fetchRecipes = async (params: FetchRecipesParams = {}) => {
  const { data } = await api.get<RecipesRes>('/recipes', {
    params,
  });

  return data;
};

export const addToFavorites = async (id: string) => {
  const { data } = await api.post(`/recipes/favorites/${id}`);
  return data;
};

export const removeFromFavorites = async (id: string) => {
  const { data } = await api.delete(`/recipes/favorites/${id}`);
  return data;
};

export const getRecipeById = async (recipeId: string): Promise<Recipe> => {
  const { data } = await api.get<Recipe>(`/recipes/${recipeId}`);

  return data;
};
