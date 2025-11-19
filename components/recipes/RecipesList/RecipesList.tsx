import Button from '@/components/buttons/Buttons';
import { SvgIcon } from '@/components/ui/icons/SvgIcon';

import Image from 'next/image';
import Link from 'next/link';
import css from './RecipesList.module.css';
import { getServerMe } from '@/lib/api/serverApi';
import FavoriteButton from '../FavoriteButton/FavoriteButton';
import { RecipesRes } from '@/lib/api/clientApi';

interface RecipesListProps {
  data: RecipesRes;
}
const RecipesList = async ({ data }: RecipesListProps) => {
  let favorites: string[] = [];

  try {
    const me = await getServerMe();
    favorites = me.favorites ?? [];
  } catch (err) {
    favorites = [];
  }

  return (
    <ul className={css.list}>
      {data.recipes.map((recipe, idx) => {
        const isFavorite = favorites.includes(recipe._id);
        return (
          <li key={`${recipe._id}${idx}`} className={css.listItem}>
            <Image
              src={`${recipe.thumb}`}
              alt={`${recipe.description}`}
              width={264}
              height={178}
              className={css.image}
            ></Image>
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
              <Link href={`recipes/${recipe._id}`} className={css.link}>
                <Button className={css.button} variant="white" size="md">
                  Learn more
                </Button>
              </Link>
              <FavoriteButton initialIsFavorite={isFavorite} recipeId={recipe._id} />
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default RecipesList;
