import RecipeDetails from '@/components/recipes/RecipeDetails/RecipeDetails';
import RecipeNotFound from '@/components/recipes/RecipeNotFound/RecipeNotFound';
import { getRecipeById } from '@/lib/api/serverApi';
import { pageMeta } from '@/lib/seo';

type Props = { params: Promise<{ recipeId: string }> };

export const generateMetadata = async ({ params }: Props) => {
  const { recipeId } = await params;
  const recipe = await getRecipeById(recipeId);

  if (!recipe) {
    return pageMeta({
      title: `Recipe Not Found`,
      path: `/recipes/${recipeId}`,
    });
  }

  return {
    title: recipe.title,
    description: recipe.description,
    other: [
      {
        rel: 'preload',
        as: 'image',
        href: recipe.thumb,
      },
    ],
  };
};

export default async function RecipePage({ params }: Props) {
  const { recipeId } = await params;

  try {
    const data = await getRecipeById(recipeId);

    if (!data) {
      return <RecipeNotFound />;
    }

    return <RecipeDetails data={data} />;
  } catch (err) {
    return <RecipeNotFound />;
  }
}
