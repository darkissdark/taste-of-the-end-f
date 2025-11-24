import ProfileNavigation from '@/components/profile/ProfileNavigation/ProfileNavigation';
import css from '@/components/profile/ProfileNavigation/ProfileNavigation.module.css';
import RecipesList from '@/components/recipes/RecipesList/RecipesList';
import { getServerFavoriteRecipes, getServerOwnRecipes } from '@/lib/api/serverApi';
import { pageMeta } from '@/lib/seo';
import Container from '@/components/layout/Container/Container';
import NextPagination from '@/components/NextPagination/NextPagination';

type Props = {
  params: Promise<{ recipeType: 'own' | 'favorites' }>;
  searchParams: Promise<{ page?: string }>;
};

export const generateMetadata = async ({ params, searchParams }: Props) => {
  const { recipeType } = await params;

  return pageMeta({
    title: recipeType === 'favorites' ? 'My favorites' : 'My recipes',
    path: `/profile/${recipeType}`,
  });
};

export default async function ProfilePage({ params, searchParams }: Props) {
  const { recipeType } = await params;
  const { page = '1' } = await searchParams;
  let data;

  if (recipeType === 'favorites') {
    data = await getServerFavoriteRecipes(page);
  } else {
    data = await getServerOwnRecipes(page);
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
          <>
            <RecipesList data={data} variant={variant} />

            {data.totalPages > 1 && (
              <NextPagination
                page={data.page}
                totalPages={data.totalPages}
                basePath={`/profile/${recipeType}`}
              />
            )}
          </>
        )}
      </section>
    </Container>
  );
}
