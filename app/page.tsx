import RecipesList from '@/components/recipes/RecipesList/RecipesList';
import { fetchRecipes } from '@/lib/api/clientApi';
import { pageMeta } from '@/lib/seo';

export const generateMetadata = () =>
  pageMeta({ title: 'Home', description: 'Browse all recipes' });
export default function Page() {
  return <section>Головна сторінка</section>;
}
