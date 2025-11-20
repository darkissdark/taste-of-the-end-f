'use client';

import Link from 'next/link';
import styles from './Footer.module.css';
import type { MouseEvent } from 'react';
import { Logo } from '@/components/ui/Logo/Logo';
import useAuthStore from '@/lib/store/authStore';
import { useAuthDialogStore } from '@/lib/store/authDialogStore';

export function Footer() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const openAuthDialog = useAuthDialogStore((state) => state.open);

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

        <nav className={styles.nav} aria-label="Footer">
          <ul>
            <li>
              <Link href="/" className={styles.link}>
                Recipes
              </Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link href="/profile/own" className={styles.link} onClick={handleProfileClick}>
                Profile
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
