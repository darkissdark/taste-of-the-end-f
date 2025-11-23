'use client';

import { useQuery } from '@tanstack/react-query';
import { useState, useEffect, useRef } from 'react';
import { fetchRecipes, RecipesRes } from '@/lib/api/clientApi';
import { SearchBox } from '@/components/recipes/SearchBox/SearchBox';
import RecipesListClient from '@/components/recipes/RecipesList/RecipeListClient';
import Filters from '@/components/recipes/Filters/Filters';
import Pagination from '@/components/recipes/Pagination/Pagination';
import { Ingredient } from '@/types/recipe';
import Image from 'next/image';
import styles from './SearchRecipes.module.css';

interface FiltersState {
  search: string;
  category: string;
  ingredient: string;
}

interface InitialFilters {
  search?: string;
  category?: string;
  ingredient?: string;
}

interface SearchRecipesProps {
  favorites: string[];
  categories: string[];
  ingredients: Ingredient[];
  initialPage?: number;
  initialFilters?: InitialFilters;
}

export default function SearchRecipes({
  favorites,
  categories,
  ingredients,
  initialPage = 1,
  initialFilters,
}: SearchRecipesProps) {
  const [filters, setFilters] = useState<FiltersState>({
    search: initialFilters?.search || '',
    category: initialFilters?.category || '',
    ingredient: initialFilters?.ingredient || '',
  });
  const [currentPage, setCurrentPage] = useState(initialPage);

  const { data, isLoading, isError } = useQuery<RecipesRes>({
    queryKey: ['recipes', filters.search, filters.category, filters.ingredient, currentPage],
    queryFn: async () =>
      fetchRecipes({
        search: filters.search,
        category: filters.category,
        ingredient: filters.ingredient,
        page: currentPage,
      }),
  });

  const router = require('next/navigation').useRouter();
  const mountedRef = useRef(false);
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }
    const params = new URLSearchParams();
    if (filters.search) params.set('search', filters.search);
    if (filters.category) params.set('category', filters.category);
    if (filters.ingredient) params.set('ingredient', filters.ingredient);
    if (currentPage > 1) params.set('page', String(currentPage));
    const qs = params.toString();
    router.replace(qs ? `?${qs}` : '?', { scroll: false });
  }, [filters.search, filters.category, filters.ingredient, currentPage, router]);

  const handleReset = () => {
    setFilters({ search: '', category: '', ingredient: '' });
    setCurrentPage(1);
  };

  return (
    <>
      <div className={styles.mainPage}>
        <section className={styles.hero}>
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
              <Image
                src="/banner/banner-mob.jpg"
                alt="Girl cooking delicious food"
                fill
                priority
                className={styles.heroImage}
              />
            </picture>

            <h1 className={styles.heroTitle}>Plan, Cook, and Share Your Flavors</h1>
            <SearchBox
              onSearch={(search) => {
                setFilters((prev) => ({ ...prev, search }));
                setCurrentPage(1);
              }}
              value={filters.search}
            />
          </div>
        </section>
      </div>

      <section>
        <h2 className={styles.sectionTitle}>Recipes</h2>
        <Filters
          categories={categories}
          ingredients={ingredients}
          onChange={(partial) => {
            setFilters((prev) => ({ ...prev, ...partial }));
            setCurrentPage(1);
          }}
          selectedCategory={filters.category}
          selectedIngredient={filters.ingredient}
          total={data?.total || 0}
        />
      </section>

      {isLoading && <p>Loading...</p>}
      {isError && <p role="alert">Error loading recipes</p>}
      {data && data.recipes.length === 0 && !isLoading && !isError && <p>No recipes found.</p>}
      {data && data.recipes.length > 0 && <RecipesListClient data={data} favorites={favorites} />}

      {data && data.totalPages > 1 && (
        <Pagination
          totalPages={data.totalPages}
          currentPage={currentPage}
          onPageChange={(selected) => setCurrentPage(selected.selected + 1)}
        />
      )}
    </>
  );
}
