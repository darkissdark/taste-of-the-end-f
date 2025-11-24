'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { fetchRecipes, RecipesRes } from '@/lib/api/clientApi';
import { SearchBox } from '@/components/recipes/SearchBox/SearchBox';
import RecipesListClient from '@/components/recipes/RecipesList/RecipeListClient';
import Filters from '@/components/recipes/Filters/Filters';
import Pagination from '@/components/recipes/Pagination/Pagination';
import { Ingredient } from '@/types/recipe';
// import Image from 'next/image';
import styles from './SearchRecipes.module.css';
import Container from '@/components/layout/Container/Container';

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
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState<FiltersState>({
    search: initialFilters?.search || '',
    category: initialFilters?.category || '',
    ingredient: initialFilters?.ingredient || '',
  });
  const [currentPage, setCurrentPage] = useState(initialPage);

  const { data, isLoading, isError } = useQuery<RecipesRes>({
    queryKey: ['recipes', filters.search, filters.category, filters.ingredient, currentPage],
    queryFn: async () =>
      await fetchRecipes({
        search: filters.search,
        category: filters.category,
        ingredient: filters.ingredient,
        page: currentPage,
      }),
  });

  return (
    <>
      {/* Hero */}

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
            <img
              src="/banner/banner-mob.jpg"
              alt="Fallback image for the banner"
              className={styles.heroImage}
            />
          </picture>

          {/* <Image
            src="/banner/banner-mob.jpg"
            alt="Girl cooking delicious food"
            fill
            priority
            className={styles.heroImage}
          /> */}
          <Container>
            <h1 className={styles.heroTitle}>Plan, Cook, and Share Your Flavors</h1>
            <SearchBox
              onSearch={(search) => {
                setFilters((prev) => ({ ...prev, search }));
                setCurrentPage(1);
              }}
              value={filters.search}
            />
          </Container>
        </div>
      </section>

      <Container>
        {/* Filters */}
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

        {/* Recipes */}
        {isLoading && <p>Loading...</p>}
        {isError && <p role="alert">Error loading recipes</p>}
        {data && data.recipes.length === 0 && !isLoading && !isError && <p>No recipes found.</p>}
        {data && data.recipes.length > 0 && <RecipesListClient data={data} favorites={favorites} />}

        {/* Pagination */}
        {data && data.totalPages > 1 && (
          <Pagination
            pageCount={data.totalPages}
            currentPage={currentPage}
            onPageChange={(e) => setCurrentPage(e.selected + 1)}
          />
        )}
      </Container>
    </>
  );
}
