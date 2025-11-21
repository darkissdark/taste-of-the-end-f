import { pageMeta } from '@/lib/seo';
import { getServerCategories, getServerIngredients, getServerMe } from '@/lib/api/serverApi';
import type { Metadata } from 'next';
import styles from './MainPage.module.css';
import SearchRecipes from './SearchRecipes';

export const generateMetadata = (): Metadata =>
  pageMeta({ title: 'Home', description: 'Browse all recipes' });

export default async function Page() {
  const [categories, ingredients] = await Promise.all([
    getServerCategories(),
    getServerIngredients(),
  ]);

  let favorites: string[] = [];
  try {
    const me = await getServerMe();
    favorites = me.favorites ?? [];
  } catch {}

  return (
    <section className={styles.MainPage}>
      <div className={styles.heroContainer}>{/* Banner / Header */}</div>

      <SearchRecipes favorites={favorites} categories={categories} ingredients={ingredients} />
    </section>
  );
}
