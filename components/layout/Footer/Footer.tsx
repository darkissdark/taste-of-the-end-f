import Link from "next/link";

export function Footer() {
  return (
    <footer>
      <span>Logo</span>
      <nav>
        <Link href="/">Рецепти</Link>
        <Link href="/profile/own">Профіль</Link>
      </nav>
    </footer>
  );
}
