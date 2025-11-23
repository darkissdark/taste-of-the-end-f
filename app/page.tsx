import { pageMeta } from '@/lib/seo';
import { getServerCategories, getServerIngredients, getServerMe } from '@/lib/api/serverApi';
import type { Metadata } from 'next';
import SearchRecipes from '@/components/recipes/SearchRecipes/SearchRecipes';

export const generateMetadata = (): Metadata =>
  pageMeta({ title: 'Home', description: 'Browse all recipes' });

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const [categories, ingredients] = await Promise.all([
    getServerCategories(),
    getServerIngredients(),
  ]);

  let favorites: string[] = [];
  try {
    const me = await getServerMe();
    favorites = me.favorites ?? [];
  } catch {}

  const pageRaw = Array.isArray(searchParams.page) ? searchParams.page[0] : searchParams.page;
  const searchRaw = Array.isArray(searchParams.search)
    ? searchParams.search[0]
    : searchParams.search;
  const categoryRaw = Array.isArray(searchParams.category)
    ? searchParams.category[0]
    : searchParams.category;
  const ingredientRaw = Array.isArray(searchParams.ingredient)
    ? searchParams.ingredient[0]
    : searchParams.ingredient;

  const initialPage = Number(pageRaw) || 1;
  const initialFilters = {
    search: searchRaw || '',
    category: categoryRaw || '',
    ingredient: ingredientRaw || '',
  };

  return (
    <div>
      <SearchRecipes
        favorites={favorites}
        categories={categories}
        ingredients={ingredients}
        initialPage={initialPage}
        initialFilters={initialFilters}
      />
    </div>
  );
}
