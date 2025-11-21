import { pageMeta } from '@/lib/seo';
import {
  getServerCategories,
  getServerIngredients,
  getServerMe,
} from '@/lib/api/serverApi';
import type { Metadata } from 'next';
import SearchRecipes from '@/components/recipes/SearchRecipes/SearchRecipes';

export const generateMetadata = (): Metadata =>
  pageMeta({ title: 'Home', description: 'Browse all recipes' });

export default async function Page({ searchParams }: { searchParams?: { page?: string } }) {
  const [categories, ingredients] = await Promise.all([
    getServerCategories(),
    getServerIngredients(),
  ]);

  let favorites: string[] = [];
  try {
    const me = await getServerMe();
    favorites = me.favorites ?? [];
  } catch {}

  const initialPage = Number(searchParams?.page) || 1;

  return (
    <div>
      <SearchRecipes
        favorites={favorites}
        categories={categories}
        ingredients={ingredients}
        initialPage={initialPage}
      />
    </div>
  );
}
