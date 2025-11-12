export const metadata = {
  title: "Рецепт",
  description: "Рецепт",
};

type PageProps = {
  params: Promise<{ recipeId: string }>;
};

export default async function RecipePage({ params }: PageProps) {
  const { recipeId } = await params;
  return <section>Рецепт: {recipeId}</section>;
}
