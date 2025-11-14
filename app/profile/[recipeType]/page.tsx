import { pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ recipeType: "own" | "favorites" }> };

export const generateMetadata = async ({ params }: Props) => {
  const { recipeType } = await params;
  return pageMeta({
    title: recipeType === "favorites" ? "My favorites" : "My recipes",
    path: `/profile/${recipeType}`,
  });
};

export default async function ProfilePage({ params }: Props) {
  const { recipeType } = await params;
  return <section>Profile: {recipeType}</section>;
}
