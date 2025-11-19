import RecipesList from '@/components/recipes/RecipesList/RecipesList';
import { fetchRecipes } from '@/lib/api/clientApi';
import { pageMeta } from '@/lib/seo';

export const generateMetadata = () =>
  pageMeta({ title: 'Home', description: 'Browse all recipes' });
export default async function Page() {
  const data = await fetchRecipes();
  return (
    <section>
      Головна сторінка
      <RecipesList data={data} />
    </section>
  );
}
