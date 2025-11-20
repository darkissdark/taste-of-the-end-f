import { pageMeta } from '@/lib/seo';
import { getServerRecipes } from '@/lib/api/serverApi';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import type { Metadata } from 'next';
import styles from './MainPage.module.css';

import RecipesList from '@/components/recipes/RecipesList/RecipesList';
import { SearchBox } from '@/components/recipes/SearchBox/SearchBox';

export const generateMetadata = (): Metadata =>
  pageMeta({ title: 'Home', description: 'Browse all recipes' });

interface PageProps {
  searchParams?: Promise<{
    search?: string | string[];
    category?: string | string[];
    page?: string | string[];
  }>;
}

export default async function Page({ searchParams }: PageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};

  const { search: rawSearch, category: rawCategory, page: rawPage } = resolvedSearchParams || {};

  const search = typeof rawSearch === 'string' && rawSearch.trim() ? rawSearch.trim() : undefined;
  const category =
    typeof rawCategory === 'string' && rawCategory.trim() ? rawCategory.trim() : undefined;

  const page = rawPage && typeof rawPage === 'string' ? parseInt(rawPage) : 1;

  const safePage = isNaN(page) || page < 1 ? 1 : page;

  const queryClient = new QueryClient();

  const params: Parameters<typeof getServerRecipes>[0] = {
    page: safePage,
    perPage: 12,
  };
  if (search) params.search = search;
  if (category) params.category = category;

  const data = await queryClient.fetchQuery({
    queryKey: ['recipes', { search, category, page: safePage }],
    queryFn: () => getServerRecipes(params),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section className={styles.MainPage}>
        <div className={styles.heroContainer}>
          <picture>
            <source
              media="(min-width: 1440px)"
              type="image/webp"
              srcSet="/banner/banner-desk.webp 1x, /banner/banner-desk@2x.webp 2x"
            />
            <source
              media="(min-width: 1440px)"
              srcSet="/banner/banner-desk.jpg 1x, /banner/banner-desk@2x.jpg 2x"
            />
            <source
              media="(min-width: 768px)"
              type="image/webp"
              srcSet="/banner/banner-tab.webp 1x, /banner/banner-tab@2x.webp 2x"
            />
            <source
              media="(min-width: 768px)"
              srcSet="/banner/banner-tab.jpg 1x, /banner/banner-tab@2x.jpg 2x"
            />
            <img
              src="/banner/banner-mob.jpg"
              alt="Girl cooking delicious food"
              className={styles.heroImage}
            />
          </picture>

          <h1 className={styles.heroTitle}>Plan, Cook, and Share Your Flavors</h1>

          <div className={styles.search}>
            <SearchBox />
          </div>
        </div>
        <RecipesList data={data} />
      </section>
    </HydrationBoundary>
  );
}
