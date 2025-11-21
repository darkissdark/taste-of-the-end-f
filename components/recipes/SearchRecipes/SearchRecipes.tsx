'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { fetchRecipes } from '@/lib/api/clientApi';
import { SearchBox } from '@/components/recipes/SearchBox/SearchBox';
import RecipesListClient from '@/components/recipes/RecipesList/RecipeListClient';
import Filters from '@/components/recipes/Filters/Filters';
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
}

export default function SearchRecipes({ favorites, categories, ingredients }: SearchRecipesProps) {
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState<FiltersState>({
    search: '',
    category: '',
    ingredient: '',
  });

  const { data, isLoading } = useQuery({
    queryKey: ['recipes', filters.search, filters.category, filters.ingredient],
    queryFn: async () => {
      const res = await fetchRecipes(filters);

      return { ...res, recipes: [...res.recipes] };
    },
  });

  const handleReset = () => {
    setFilters({ search: '', category: '', ingredient: '' });
    queryClient.invalidateQueries({ queryKey: ['recipes'] });
  };

  return (
    <>
      <div className={styles.mainPage}>
        <section className={styles.hero}>
          <div className={styles.heroContainer}>
            <picture>
              {/* Desktop WebP */}
              <source
                media="(min-width: 1440px)"
                type="image/webp"
                srcSet="/banner/banner-desk.webp 1x, /banner/banner-desk@2x.webp 2x"
              />
              {/* Desktop JPEG */}
              <source
                media="(min-width: 1440px)"
                srcSet="/banner/banner-desk.jpg 1x, /banner/banner-desk@2x.jpg 2x"
              />
              {/* Tablet WebP */}
              <source
                media="(min-width: 768px)"
                type="image/webp"
                srcSet="/banner/banner-tab.webp 1x, /banner/banner-tab@2x.webp 2x"
              />
              {/* Tablet JPEG */}
              <source
                media="(min-width: 768px)"
                srcSet="/banner/banner-tab.jpg 1x, /banner/banner-tab@2x.jpg 2x"
              />
              {/* Mobile */}
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
              onSearch={(search) => setFilters((prev) => ({ ...prev, search }))}
              value={filters.search}
            />
          </div>
        </section>
      </div>

      <section>
        <Filters
          categories={categories}
          ingredients={ingredients}
          onChange={(partial) => setFilters((prev) => ({ ...prev, ...partial }))}
          selectedCategory={filters.category}
          selectedIngredient={filters.ingredient}
        />

        {/* Reset */}
        <button onClick={handleReset} style={{ margin: '10px 0' }}>
          Reset
        </button>
      </section>
      {/* Список рецептів */}
      {isLoading && <p>Loading...</p>}
      {data && <RecipesListClient data={data} favorites={favorites} />}
    </>
  );
}
