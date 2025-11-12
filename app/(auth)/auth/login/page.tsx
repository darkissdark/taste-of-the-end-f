import { pageMeta } from "@/lib/seo";

export const generateMetadata = () =>
  pageMeta({ title: "Sign in", path: "/auth/login" });

export default function LoginPage() {
  return <section>Сторінка входу</section>;
}
