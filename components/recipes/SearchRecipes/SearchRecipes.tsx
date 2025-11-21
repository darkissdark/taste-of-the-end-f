'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { fetchRecipes } from '@/lib/api/clientApi';
import { SearchBox } from '@/components/recipes/SearchBox/SearchBox';
import RecipesListClient from '@/components/recipes/RecipesList/RecipeListClient';
import Filters from '@/components/recipes/Filters/Filters';
import { Ingredient } from '@/types/recipe';

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
    <div>
      {/* Пошук */}
      <SearchBox
        onSearch={(search) => setFilters((prev) => ({ ...prev, search }))}
        value={filters.search}
      />

      {/* Фільтри */}
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

      {/* Список рецептів */}
      {isLoading && <p>Loading...</p>}
      {data && <RecipesListClient data={data} favorites={favorites} />}
    </div>
  );
}
