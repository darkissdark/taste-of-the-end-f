import { getServerMe } from '@/lib/api/serverApi';
import { RecipesRes } from '@/lib/api/clientApi';
import RecipesListClient from './RecipeListClient';

interface RecipesListProps {
  data: RecipesRes;
  variant?: 'my-recipes' | 'saved-recipes'; // Add variant prop
  onLoadMore?: () => void;
  hasMore?: boolean;
  isLoading?: boolean;
}

export default async function RecipesList({
  data,
  variant = 'saved-recipes',
  onLoadMore,
  hasMore,
  isLoading,
}: RecipesListProps) {
  let favorites: string[] = [];

  try {
    const me = await getServerMe();
    favorites = me.favorites ?? [];
  } catch {
    favorites = [];
  }

  return (
    <RecipesListClient
      data={data}
      favorites={favorites}
      variant={variant}
      onLoadMore={onLoadMore}
      hasMore={hasMore}
      isLoading={isLoading}
    />
  );
}
