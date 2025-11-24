'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SvgIcon } from '@/components/ui/icons/SvgIcon';
import FavoriteButton from '../FavoriteButtons/FavoriteButton';
import css from './RecipeCard.module.css';
import { RecipesRes } from '@/lib/api/clientApi';

interface RecipeCardProps {
  recipe: RecipesRes['recipes'][number];
  isFavorite: boolean;
  variant?: 'my-recipes' | 'saved-recipes' | 'home';
  onUnlike?: (id: string) => void;
}

export function RecipeCard({ recipe, isFavorite, variant, onUnlike }: RecipeCardProps) {
  const isMyRecipes = variant === 'my-recipes';

  return (
    <li className={css.card}>
      <Image
        src={recipe.thumb}
        alt={recipe.description || 'recipe image'}
        width={264}
        height={178}
        className={css.image}
      />

      <div className={css.titleWrapper}>
        <h3 className={css.title}>{recipe.title}</h3>
        <div className={css.timeWrapper}>
          <SvgIcon name="clock" aria-hidden className={css.icon} />
          <p>{recipe.time}</p>
        </div>
      </div>

      <p className={css.description}>{recipe.description}</p>
      <p className={css.calories}>{recipe.calories ? `~${recipe.calories} cals` : '\u00A0'}</p>

      <div className={css.buttonsWrapper}>
        <Link href={`/recipes/${recipe._id}`} className={css.learnMoreBtn}>
          {/* button styled as link container */}
          <span>Learn more</span>
        </Link>
        {!isMyRecipes && (
          <FavoriteButton
            recipeId={recipe._id}
            initialIsFavorite={isFavorite}
            variant="icon"
            onUnlike={onUnlike}
          />
        )}
      </div>
    </li>
  );
}

export default RecipeCard;
