import { pageMeta } from "@/lib/seo";

export const generateMetadata = () =>
  pageMeta({ title: "Add recipe", path: "/add-recipe" });

export default function AddRecipePage() {
  return <section>Add Recipe page</section>;
}
