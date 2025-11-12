import { pageMeta } from "@/lib/seo";
import { AuthGuard } from "@/components/security/AuthGuard";

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
  return (
    <AuthGuard redirectTo="/auth/login">
      <section>Profile: {recipeType}</section>
    </AuthGuard>
  );
}
