'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import css from './RecipesList.module.css';
import FavoriteButton from '../FavoriteButton/FavoriteButton';
import { SvgIcon } from '@/components/ui/icons/SvgIcon';
import { Recipe } from '@/types/recipe';
import { RecipesRes } from '@/lib/api/clientApi';

interface recipesListClientProps {
  data: RecipesRes;
  favorites: string[];
}

export default function RecipesListClient({ data, favorites }: recipesListClientProps) {
  const [recipes, setRecipes] = useState(data.recipes);

  const handleUnlike = (recipeId: string) => {
    // це тимчасове рішення треба інвалідувати апі щоб перезатягнути дані
    // потрібло лише для сторінки улюблених рецептів
    // закоментував бо при видаленні рецепта з обраного на головній
    // він теж зникає з видачі
    // якщо по іншому не вийде то треба пропс який буде це запускати
    //лише у обраному
    // setRecipes((prev) => prev.filter((r) => r._id !== recipeId));
  };

  return (
    <>
      <p className={css.recTotal}>{recipes.length} recipes</p>
      <ul className={css.list}>
        {recipes.map((recipe) => {
          const isFavorite = favorites.includes(recipe._id);

          return (
            <li key={recipe._id} className={css.listItem}>
              <Image
                src={recipe.thumb}
                alt={recipe.description}
                width={264}
                height={178}
                className={css.image}
              />

              <div className={css.titleWrapper}>
                <h3 className={css.recipeHeader}>{recipe.title}</h3>

                <div className={css.timeWrapper}>
                  <SvgIcon name="clock" aria-hidden className={css.icon} />
                  <p>{recipe.time}</p>
                </div>
              </div>

              <p className={css.describtion}>{recipe.description}</p>
              <p className={css.calories}>{`~${recipe.calories} cals`}</p>

              <div className={css.buttonsWrapper}>
                <Link href={`/recipes/${recipe._id}`} className={css.link}>
                  <button className={css.button}>Learn more</button>
                </Link>

                <FavoriteButton
                  recipeId={recipe._id}
                  initialIsFavorite={isFavorite}
                  onUnlike={handleUnlike}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
