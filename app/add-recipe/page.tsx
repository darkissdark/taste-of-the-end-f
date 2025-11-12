import { pageMeta } from "@/lib/seo";
import { AuthGuard } from "@/components/security/AuthGuard";

export const generateMetadata = () =>
  pageMeta({ title: "Add recipe", path: "/add-recipe" });

export default function AddRecipePage() {
  return (
    <AuthGuard redirectTo="/auth/login">
      <section>Add Recipe page</section>
    </AuthGuard>
  );
}
