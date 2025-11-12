import { pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ recipeId: string }> };

export const generateMetadata = async ({ params }: Props) => {
  const { recipeId } = await params;
  return pageMeta({
    title: `Recipe #${recipeId}`,
    path: `/recipes/${recipeId}`,
  });
};

export default async function RecipePage({ params }: Props) {
  const { recipeId } = await params;
  return <section>Recipe: {recipeId}</section>;
}
