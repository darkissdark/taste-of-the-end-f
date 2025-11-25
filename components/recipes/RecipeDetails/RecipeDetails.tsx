import { Recipe } from '@/types/recipe';
import css from './RecipeDetails.module.css';
import Image from 'next/image';
import FavoriteButton from '../FavoriteButtons/FavoriteButton';
import { getServerMe } from '@/lib/api/serverApi';

interface RecipeDetailsProps {
  data: Recipe;
}

export default async function RecipeDetails({ data }: RecipeDetailsProps) {
  let favorites: string[] = [];
  try {
    const me = await getServerMe();
    favorites = me.favorites ?? [];
  } catch {
    favorites = [];
  }
  const isFavorite = favorites.includes(data._id);

  return (
    <section className={css.recipeDetailsSection}>
      <div className={css.containerRecipe}>
        <div className={css.titleBlok}>
          <h1 className={css.title}>{data.title}</h1>
          <Image
            className={css.thumb}
            src={data.thumb}
            alt={data.title}
            width={1226}
            height={624}
            sizes="(max-width: 768px) 361px, (max-width: 1440px) 704px, 1226px"
            priority
            fetchPriority="high"
          />
        </div>
        <div className={css.describe}>
          <div className={css.infoBlok}>
            <div className={css.textBlok}>
              <h2 className={`${css.subTitle} ${css.generalInfo}`}>General informations</h2>
              <p className={css.text}>
                <span className={css.textSpan}>Category: </span>
                {data.category}
              </p>
              <p className={css.text}>
                <span className={css.textSpan}>Cooking time: </span>
                {data.time} minutes
              </p>
              <p className={css.text}>
                <span className={css.textSpan}>Caloric content: </span>Approximately {data.calories}{' '}
                kcal per serving
              </p>
            </div>
            <FavoriteButton recipeId={data._id} initialIsFavorite={isFavorite} variant="wide" />
          </div>
          <div className={css.recipeBlok}>
            <div>
              <h2 className={css.subTitle}>About recipe</h2>
              <p className={css.text}>{data.description}</p>
            </div>
            <div>
              <h2 className={css.subTitle}>Ingredients:</h2>
              <ul className={css.ingredientsList}>
                {data.ingredients.map((ing, index) => (
                  <li key={index} className={css.recipeIngredient}>
                    <p className={css.text}>
                      {ing.name} — {ing.measure}
                      <br />
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className={`${css.subTitle} ${css.steps}`}>Preparation Steps:</h2>
              {data.instructions.split(/\r?\n/).map((paragraph, index) => (
                <p className={css.text} key={index} style={{ marginBottom: '1em' }}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
