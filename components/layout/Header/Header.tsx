'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './Header.module.css';
import { Logo } from '@/components/ui/Logo/Logo';
import useAuthStore from '@/lib/store/authStore';
import { SvgIcon } from '@/components/ui/icons/SvgIcon';

export function Header() {
  const [open, setOpen] = useState(false);

  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);
  const userInitial = user?.name?.trim()?.charAt(0).toUpperCase() ?? '';

  const pathname = usePathname();
  const isRecipesActive = pathname === '/' || pathname.startsWith('/recipes');
  const isProfileActive = pathname.startsWith('/profile');

  const Nav = () => (
    <ul>
      <li>
        <Link
          href="/"
          className={`${styles.link} ${isRecipesActive ? styles.linkActive : ''}`}
          aria-current={isRecipesActive ? 'page' : undefined}
        >
          Recipes
        </Link>
      </li>

      {!isAuthenticated && (
        <li>
          <Link className={styles.link} href="/auth/login">
            Sign in
          </Link>
          <Link href="/auth/register" className={`${styles.link} ${styles.linkOutlined}`}>
            Register
          </Link>
        </li>
      )}

      {isAuthenticated && (
        <li>
          <Link
            href="/profile/own"
            className={`${styles.link} ${isProfileActive ? styles.linkActive : ''}`}
            aria-current={isProfileActive ? 'page' : undefined}
          >
            My profile
          </Link>
          <Link href="/add-recipe" className={`${styles.link} ${styles.linkOutlined}`}>
            Add recipe
          </Link>
        </li>
      )}
    </ul>
  );

  const UserBlock = () =>
    isAuthenticated ? (
      <>
        <div className={styles.userInfo}>
          <span className={styles.userAvatar} aria-hidden="true">
            {userInitial}
          </span>
          <span className={styles.userName}>{user?.name}</span>
        </div>
        <form className={styles.buttonWrapper} action="/api/auth/logout" method="POST">
          <button
            className={`${styles.link} ${styles.logoutButton}`}
            type="submit"
            aria-label="Sign out"
          >
            <SvgIcon name="logout" aria-hidden />
            <span className="visually-hidden">Sign out</span>
          </button>
        </form>
      </>
    ) : null;

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          <Logo />
        </div>

        <div className={styles.right}>
          <button
            type="button"
            className={styles.burger}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <SvgIcon name={open ? 'close' : 'burger'} />
          </button>

          {/* Desktop */}
          <div className={styles.navWrap}>
            <nav className={styles.nav} aria-label="Primary">
              <Nav />
            </nav>
            <div className={styles.user}>
              <UserBlock />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div
        id="mobile-menu"
        className={`${styles.mobileMenu} ${open ? styles.mobileMenuOpen : ''}`}
        onClick={() => setOpen(false)}
      >
        <div
          className={`${styles.mobileInner} ${open ? styles.mobileInnerOpen : ''}`}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label="Primary navigation"
        >
          <div className={styles.mobileTop}>
            <div className={styles.mobileBrand}>
              <Logo />
            </div>
            <button
              type="button"
              className={styles.mobileClose}
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <SvgIcon name="close_in_circle" />
            </button>
          </div>

          <nav aria-label="Mobile primary" className={styles.mobileNav}>
            <Nav />
          </nav>

          <div className={styles.mobileUser}>
            <UserBlock />
          </div>
        </div>
      </div>
    </header>
  );
}
