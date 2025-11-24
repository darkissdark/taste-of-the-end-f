'use client';

import { useState, useEffect } from 'react';
import css from './RecipesList.module.css';
import RecipeCard from '@/components/recipes/RecipeCard/RecipeCard';
import { RecipesRes } from '@/lib/api/clientApi';

interface recipesListClientProps {
  data: RecipesRes;
  favorites: string[];
  variant?: 'my-recipes' | 'saved-recipes' | 'home';
}

export default function RecipesListClient({ data, favorites, variant }: recipesListClientProps) {
  const [recipes, setRecipes] = useState(data.recipes);

  useEffect(() => {
    setRecipes(data.recipes);
  }, [data]);

  const handleUnlike = (recipeId: string) => {
    if (variant === 'saved-recipes') {
      setRecipes((prev) => prev.filter((r) => r._id !== recipeId));
    }
  };

  const isMyRecipes = variant === 'my-recipes';

  return (
    <div className={css.container}>
      {(variant === 'my-recipes' || variant === 'saved-recipes') && (
        <p className={css.recTotal}>{data.total} recipes</p>
      )}
      <ul className={css.list}>
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            recipe={recipe}
            isFavorite={favorites.includes(recipe._id)}
            variant={variant}
            onUnlike={handleUnlike}
          />
        ))}
      </ul>
    </div>
  );
}
