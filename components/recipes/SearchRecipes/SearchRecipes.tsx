'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { fetchRecipes } from '@/lib/api/clientApi';
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

interface SearchRecipesProps {
  favorites: string[];
  categories: string[];
  ingredients: Ingredient[];
  initialPage?: number;
}

export default function SearchRecipes({
  favorites,
  categories,
  ingredients,
  initialPage = 1,
}: SearchRecipesProps) {
  const [filters, setFilters] = useState<FiltersState>({
    search: '',
    category: '',
    ingredient: '',
  });
  const [currentPage, setCurrentPage] = useState(initialPage);

  const { data, isLoading } = useQuery({
    queryKey: ['recipes', filters.search, filters.category, filters.ingredient, currentPage],
    queryFn: async () =>
      await fetchRecipes({
        search: filters.search,
        category: filters.category,
        ingredient: filters.ingredient,
        page: currentPage,
      }),
    // keepPreviousData: true,
  });

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
        <Filters
          categories={categories}
          ingredients={ingredients}
          onChange={(partial) => {
            setFilters((prev) => ({ ...prev, ...partial }));
            setCurrentPage(1);
          }}
          selectedCategory={filters.category}
          selectedIngredient={filters.ingredient}
        />

        <button onClick={handleReset} style={{ margin: '10px 0' }}>
          Reset
        </button>
      </section>

      {isLoading && <p>Loading...</p>}
      {data && <RecipesListClient data={data} favorites={favorites} />}

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
