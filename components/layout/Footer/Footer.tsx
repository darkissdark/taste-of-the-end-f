'use client';

import Link from 'next/link';
import styles from './Footer.module.css';
import type { MouseEvent } from 'react';
import { Logo } from '@/components/ui/Logo/Logo';
import useAuthStore from '@/lib/store/authStore';
import { useAuthDialogStore } from '@/lib/store/authDialogStore';
import { usePathname } from 'next/navigation';

export function Footer() {
  const pathname = usePathname();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const openAuthDialog = useAuthDialogStore((state) => state.open);

  const isAuthPage = pathname === '/auth/login' || pathname === '/auth/register';
  const isRecipesActive = pathname === '/' || pathname.startsWith('/recipes');
  const isProfileActive = pathname.startsWith('/profile');

  const handleProfileClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!isAuthenticated) {
      e.preventDefault();
      openAuthDialog();
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          <Logo />
        </div>

        <span className={styles.copy}>
          © {new Date().getFullYear()} Tasteorama. All rights reserved.
        </span>

        <nav aria-label="Footer">
          <ul className={styles.navList}>
            <li>
              <Link
                href="/"
                className={`${styles.link} ${isRecipesActive ? styles.linkActive : ''}`}
                aria-current={isRecipesActive ? 'page' : undefined}
              >
                Recipes
              </Link>
            </li>
            {!isAuthPage && (
              <li>
                <Link
                  href="/profile/own"
                  className={`${styles.link} ${isProfileActive ? styles.linkActive : ''}`}
                  aria-current={isProfileActive ? 'page' : undefined}
                  onClick={handleProfileClick}
                >
                  Account
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
