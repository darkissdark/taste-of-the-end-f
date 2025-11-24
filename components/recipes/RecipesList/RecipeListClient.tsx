'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import css from './RecipesList.module.css';
import FavoriteButton from '../FavoriteButtons/FavoriteButton';
import { SvgIcon } from '@/components/ui/icons/SvgIcon';
// import { Recipe } from '@/types/recipe';
import { RecipesRes } from '@/lib/api/clientApi';

interface recipesListClientProps {
  data: RecipesRes;
  favorites: string[];
  variant?: 'my-recipes' | 'saved-recipes' | 'home'; // Add this prop
}

export default function RecipesListClient({ data, favorites, variant }: recipesListClientProps) {
  const [recipes, setRecipes] = useState(data.recipes);

  useEffect(() => {
    setRecipes(data.recipes);
  }, [data]);

  const handleUnlike = (recipeId: string) => {
    // Remove recipe from the list when unliked (for saved recipes page only!!)
    if (variant === 'saved-recipes') {
      setRecipes((prev) => prev.filter((r) => r._id !== recipeId));
    }
  };

  const isMyRecipes = variant === 'my-recipes';

  return (
    <div className={css.container}>
      {/* Recipe Count - only show for profile pages */}
      {(variant === 'my-recipes' || variant === 'saved-recipes') && (
        <p className={css.recTotal}>{data.total} recipes</p>
      )}
      <ul className={css.list}>
        {recipes.map((recipe) => {
          const isFavorite = favorites.includes(recipe._id);

          return (
            <li key={recipe._id} className={css.listItem}>
              <Image
                src={recipe.thumb}
                alt={recipe.description || 'recipe image'}
                width={264}
                height={178}
                className={css.image}
                quality={65}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              <div className={css.titleWrapper}>
                <h3 className={css.recipeHeader}>{recipe.title}</h3>

                <div className={css.timeWrapper}>
                  <SvgIcon name="clock" aria-hidden className={css.icon} />
                  <p>{recipe.time}</p>
                </div>
              </div>

              <p className={css.description}>{recipe.description}</p>
              <p className={css.calories}>
                {recipe.calories ? `~${recipe.calories} cals` : '\u00A0'}
              </p>

              <div className={css.buttonsWrapper}>
                <Link href={`/recipes/${recipe._id}`} className={css.link}>
                  <button className={css.button} aria-label={`Learn more about ${recipe.title}`}>
                    Learn more
                  </button>
                </Link>

                {/* Only show FavoriteButton for saved recipes */}
                {!isMyRecipes && (
                  <FavoriteButton
                    recipeId={recipe._id}
                    initialIsFavorite={isFavorite}
                    variant="icon"
                    onUnlike={handleUnlike}
                  />
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
