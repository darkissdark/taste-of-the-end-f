import Link from "next/link";

export function Header() {
  return (
    <header>
      <nav>
        <Link href="/">Рецепти</Link>
        <Link href="/auth/login">Увійти</Link>
        <Link href="/auth/register">Зареєструватися</Link>
      </nav>
    </header>
  );
}
