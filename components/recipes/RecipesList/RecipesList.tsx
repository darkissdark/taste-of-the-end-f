import { getServerMe } from '@/lib/api/serverApi';
import { RecipesRes } from '@/lib/api/clientApi';
import RecipesListClient from './RecipeListClient';

interface RecipesListProps {
  data: RecipesRes;
}

export default async function RecipesList({ data }: RecipesListProps) {
  let favorites: string[] = [];

  try {
    const me = await getServerMe();
    favorites = me.favorites ?? [];
  } catch {
    favorites = [];
  }

  return <RecipesListClient data={data} favorites={favorites} />;
}
