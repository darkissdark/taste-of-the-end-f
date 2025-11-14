import { cookies } from "next/headers";
import styles from "./Header.module.css";
import Link from "next/link";
import { SvgIcon } from "@/components/ui/icons/SvgIcon";
import { Logo } from "@/components/ui/Logo/Logo";

export async function Header() {
  const cookieStore = await cookies();
  const authed = cookieStore.has("token");
  const userName = "John";

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          <Logo />
        </div>

        <nav className={styles.nav} aria-label="Primary">
          <Link className={styles.link} href="/">
            Recipes
          </Link>
          {!authed && (
            <>
              <Link className={styles.link} href="/auth/login">
                Sign in
              </Link>
              <Link className={styles.link} href="/auth/register">
                Sign up
              </Link>
            </>
          )}
          {authed && (
            <>
              <Link className={styles.link} href="/profile/own">
                My profile
              </Link>
              <Link className={styles.link} href="/add-recipe">
                Add recipe
              </Link>
            </>
          )}
        </nav>

        <div className={styles.right}>
          {authed && (
            <>
              <span className={styles.userBadge}>{userName}</span>
              <form action="/api/auth/logout" method="POST">
                <button className={styles.link} type="submit">
                  Sign out
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
