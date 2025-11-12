import { pageMeta } from "@/lib/seo";

export const generateMetadata = () =>
  pageMeta({ title: "Sign up", path: "/auth/register" });

export default function RegisterPage() {
  return <section>Сторінка реєстрації</section>;
}
