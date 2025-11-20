'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './Header.module.css';
import { Logo } from '@/components/ui/Logo/Logo';
import { SvgIcon } from '@/components/ui/icons/SvgIcon';

type HeaderClientProps = {
  isAuthenticated: boolean;
  userName: string | null;
};

export function HeaderClient({ isAuthenticated, userName }: HeaderClientProps) {
  const [open, setOpen] = useState(false);
  const userInitial = userName?.trim()?.charAt(0).toUpperCase() ?? '';

  const pathname = usePathname();
  const isRecipesActive = pathname === '/' || pathname.startsWith('/recipes');
  const isProfileActive = pathname.startsWith('/profile');
  const isLoginActive = pathname === '/auth/login';

  type NavItemsProps = {
    showAddRecipe?: boolean;
    onNavigate?: () => void;
  };

  const NavItems = ({ showAddRecipe = true, onNavigate }: NavItemsProps) => (
    <>
      <li>
        <Link
          href="/"
          className={`${styles.link} ${isRecipesActive ? styles.linkActive : ''}`}
          aria-current={isRecipesActive ? 'page' : undefined}
          onClick={onNavigate}
        >
          Recipes
        </Link>
      </li>

      {!isAuthenticated && (
        <li className={styles.navWrapNotAuth}>
          <Link
            href="/auth/login"
            className={`${styles.link} ${isLoginActive ? styles.linkActive : ''}`}
            aria-current={isLoginActive ? 'page' : undefined}
            onClick={onNavigate}
          >
            Log in
          </Link>
          <Link
            href="/auth/register"
            className={`${styles.link} ${styles.linkOutlined}`}
            onClick={onNavigate}
          >
            Register
          </Link>
        </li>
      )}

      {isAuthenticated && (
        <li className={styles.navWrapAuth}>
          <Link
            href="/profile/own"
            className={`${styles.link} ${isProfileActive ? styles.linkActive : ''}`}
            aria-current={isProfileActive ? 'page' : undefined}
            onClick={onNavigate}
          >
            My profile
          </Link>

          {showAddRecipe && (
            <Link
              href="/add-recipe"
              className={`${styles.link} ${styles.linkOutlined}`}
              onClick={onNavigate}
            >
              Add recipe
            </Link>
          )}
        </li>
      )}
    </>
  );

  const Nav = () => (
    <ul className={styles.navWrap}>
      <NavItems />
    </ul>
  );

  const UserBlock = () =>
    isAuthenticated ? (
      <div className={styles.userBlockMobile}>
        <div className={styles.userInfo}>
          <span className={styles.userAvatar} aria-hidden="true">
            {userInitial}
          </span>
          <span className={styles.userName}>{userName}</span>
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
      </div>
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
            <SvgIcon name={open ? 'close_in_circle' : 'burger'} />
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

      {/* Mobile modal */}
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

          <nav aria-label="Mobile primary">
            <ul className={styles.mobileNav}>
              <NavItems showAddRecipe={false} onNavigate={() => setOpen(false)} />
            </ul>
          </nav>

          <div className={styles.mobileUser}>
            <UserBlock />
            {isAuthenticated && (
              <Link
                href="/add-recipe"
                className={`${styles.link} ${styles.linkOutlined} ${styles.linkAddRecipe}`}
                onClick={() => setOpen(false)}
              >
                Add recipe
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
