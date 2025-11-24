import ProfileNavigation from '@/components/profile/ProfileNavigation/ProfileNavigation';
import css from '@/components/profile/ProfileNavigation/ProfileNavigation.module.css';
import RecipesList from '@/components/recipes/RecipesList/RecipesList';
import { getServerFavoriteRecipes, getServerOwnRecipes } from '@/lib/api/serverApi';
import { pageMeta } from '@/lib/seo';
import Container from '@/components/layout/Container/Container';

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

  // Determine variant based on recipeType
  const variant = recipeType === 'own' ? 'my-recipes' : 'saved-recipes';

  return (
    <Container>
    <section className={css.profileSection}>
      <h1 className={css.profTitle}>My Profile</h1>
      <ProfileNavigation />

      {!data?.recipes || data.recipes.length === 0 ? (
        <p className={css.noRecipes}>No recipes found.</p>
      ) : (
        <RecipesList data={data} variant={variant} />
      )}
      </section>
    </Container>
  );
}
