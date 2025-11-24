import { pageMeta } from '@/lib/seo';
import { getServerCategories, getServerIngredients, getServerMe } from '@/lib/api/serverApi';
import type { Metadata } from 'next';
import SearchRecipes from '@/components/recipes/SearchRecipes/SearchRecipes';

export const generateMetadata = () => ({
  ...pageMeta({ title: 'Home', description: 'Browse all recipes' }),
  other: [
    {
      rel: 'preload',
      as: 'image',
      href: '/banner/banner-mob@2x.webp',
      imagesrcset: '/banner/banner-mob.webp 1x, /banner/banner-mob@2x.webp 2x',
    },
  ],
});

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
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

  const params = await searchParams;
  const pageRaw = Array.isArray(params.page) ? params.page[0] : params.page;
  const searchRaw = Array.isArray(params.search) ? params.search[0] : params.search;
  const categoryRaw = Array.isArray(params.category) ? params.category[0] : params.category;
  const ingredientRaw = Array.isArray(params.ingredient) ? params.ingredient[0] : params.ingredient;

  const initialPage = Number(pageRaw) || 1;
  const initialFilters = {
    search: searchRaw || '',
    category: categoryRaw || '',
    ingredient: ingredientRaw || '',
  };

  return (
    <SearchRecipes
      favorites={favorites}
      categories={categories}
      ingredients={ingredients}
      initialPage={initialPage}
      initialFilters={initialFilters}
    />
  );
}
