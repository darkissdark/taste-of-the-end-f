import ProfileNavigation from '@/components/profile/ProfileNavigation/ProfileNavigation';
import css from '@/components/profile/ProfileNavigation/ProfileNavigation.module.css';
import RecipesList from '@/components/recipes/RecipesList/RecipesList';
import { getServerFavoriteRecipes, getServerOwnRecipes } from '@/lib/api/serverApi';
import { pageMeta } from '@/lib/seo';
import { string } from 'yup';

type Props = { params: Promise<{ recipeType: 'own' | 'favorites' }> };

export const generateMetadata = async ({ params }: Props) => {
  const { recipeType } = await params;
  return pageMeta({
    title: recipeType === 'favorites' ? 'My favorites' : 'My recipes',
    path: `/profile/${recipeType}`,
  });
};

export default async function ProfilePage({ params }: Props) {
  const { recipeType } = await params;
  let data;
  if (recipeType === 'favorites') {
    data = await getServerFavoriteRecipes();
  } else {
    data = await getServerOwnRecipes();
  }
  if (!data?.recipes || data.recipes.length === 0) {
    return (
      <section>
        <h1>My Profile</h1>
        <ProfileNavigation />
        <p>No recipes found.</p>
      </section>
    );
  }

  // Якщо рецепти є → рендеримо список
  return (
    <section>
      <h1 className={css.profTitle}>My Profile</h1>
      <ProfileNavigation />
      <RecipesList data={data} />
    </section>
  );
}
