import { pageMeta } from "@/lib/seo";
import AddRecipeForm from "@/components/recipes/AddRecipeForm/AddRecipeForm";

export const generateMetadata = () =>
  pageMeta({ title: "Add recipe", path: "/add-recipe" });

export default function AddRecipePage() {
  return (
    <section>
      <AddRecipeForm />
    </section>
  );
}
