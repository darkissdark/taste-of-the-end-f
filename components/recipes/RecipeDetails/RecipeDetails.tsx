import { Recipe } from '@/types/recipe';
import css from './RecipeDetails.module.css';
import Image from 'next/image';
import { SvgIcon } from '@/components/ui/icons/SvgIcon';

interface RecipeDetailsProps {
  data: Recipe;
}

export default async function RecipeDetails({ data }: RecipeDetailsProps) {
  console.log(data);

  return (
    <section className={css.recipeDetailsSection}>
      <div className={`${css.container} ${css.containerRecipe}`}>
        <div className={css.titleBlok}>
          <h1 className={css.title}>{data.title}</h1>
          <Image
            className={css.thumb}
            src={data.thumb}
            alt={data.title}
            width={1226}
            height={624}
            sizes="(max-width: 768px) 361px, (max-width: 1440px) 704px, 1226px"
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
                <span className={css.textSpan}>Caloric content: </span>Approximately 200 kcal per
                serving
              </p>
            </div>

            <button className={css.saveButton}>
              {/* Save */}
              Unsave
              <SvgIcon name="save_tooth" className={css.icon} />
            </button>
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
