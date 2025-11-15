"use client";

import styles from "./Header.module.css";
import Link from "next/link";
import { SvgIcon } from "@/components/ui/icons/SvgIcon";
import { Logo } from "@/components/ui/Logo/Logo";
import useAuthStore from "@/lib/store/authStore";

export function Header() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);

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
          {!isAuthenticated && (
            <>
              <Link className={styles.link} href="/auth/login">
                Sign in
              </Link>
              <Link className={styles.link} href="/auth/register">
                Sign up
              </Link>
            </>
          )}
          {isAuthenticated && (
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
          {isAuthenticated && (
            <>
              <span className={styles.userBadge}>{user?.name}</span>
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
