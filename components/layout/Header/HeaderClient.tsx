'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';
import { Logo } from '@/components/ui/Logo/Logo';
import { SvgIcon } from '@/components/ui/icons/SvgIcon';
import useAuthStore from '@/lib/store/authStore';
import { LogoutDialog } from '@/components/layout/LogoutDialog/LogoutDialog';
import { useAuthDialogStore } from '@/lib/store/authDialogStore';

type HeaderClientProps = {
  isAuthenticated: boolean;
  userName: string | null;
};

export function HeaderClient({ isAuthenticated, userName }: HeaderClientProps) {
  const [open, setOpen] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const pathname = usePathname();
  const logoutButtonRef = useRef<HTMLButtonElement | null>(null);

  const isAuthDialogOpen = useAuthDialogStore((state) => state.isOpen);
  const hasOpenDialog = isAuthDialogOpen || isLogoutDialogOpen;

  const storeUser = useAuthStore((state) => state.user);
  const storeIsAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const effectiveIsAuthenticated = !!storeUser || storeIsAuthenticated || isAuthenticated;
  const effectiveUserName = storeUser?.name ?? userName ?? '';

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  const isRecipesActive = pathname === '/';
  const isProfileActive = pathname.startsWith('/profile');
  const isLoginActive = pathname === '/auth/login';

  const userInitial = effectiveUserName.trim().charAt(0).toUpperCase() ?? '';

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

      {!effectiveIsAuthenticated && (
        <>
          <li>
            <Link
              href="/auth/login"
              className={`${styles.link} ${isLoginActive ? styles.linkActive : ''}`}
              aria-current={isLoginActive ? 'page' : undefined}
              onClick={onNavigate}
            >
              Log in
            </Link>
          </li>
          <li>
            <Link
              href="/auth/register"
              className={`${styles.link} ${styles.linkOutlined}`}
              onClick={onNavigate}
            >
              Register
            </Link>
          </li>
        </>
      )}

      {effectiveIsAuthenticated && (
        <>
          <li>
            <Link
              href="/profile/own"
              className={`${styles.link} ${isProfileActive ? styles.linkActive : ''}`}
              aria-current={isProfileActive ? 'page' : undefined}
              onClick={onNavigate}
            >
              My profile
            </Link>
          </li>

          {showAddRecipe && (
            <li>
              <Link
                href="/add-recipe"
                className={`${styles.link} ${styles.linkOutlined}`}
                onClick={onNavigate}
              >
                Add recipe
              </Link>
            </li>
          )}
        </>
      )}
    </>
  );

  const UserBlock = () =>
    effectiveIsAuthenticated ? (
      <div className={styles.userBlockMobile}>
        <div className={styles.userInfo}>
          <span className={styles.userAvatar} aria-hidden="true">
            {userInitial}
          </span>
          <span className={styles.userName}>{effectiveUserName}</span>
        </div>

        <div className={styles.buttonWrapper}>
          <button
            ref={logoutButtonRef}
            className={`${styles.link} ${styles.logoutButton}`}
            type="button"
            aria-label="Log out"
            onClick={() => {
              setOpen(false);
              setIsLogoutDialogOpen(true);
            }}
          >
            <SvgIcon name="logout" aria-hidden />
            <span className="visually-hidden">Log out</span>
          </button>
        </div>
      </div>
    ) : null;

  return (
    <>
      <header className={`${styles.header} ${hasOpenDialog ? styles.headerDialogOpen : ''}`}>
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
            <div className={styles.rightDesktop}>
              <nav className={styles.nav} aria-label="Primary">
                <ul
                  className={`${styles.navWrap} ${
                    effectiveIsAuthenticated ? styles.navWrapAuth : ''
                  }`}
                >
                  <NavItems />
                </ul>
              </nav>
              <div className={styles.user}>
                <UserBlock />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
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

            <nav
              className={`${styles.mobileNavWrapper} ${
                effectiveIsAuthenticated ? styles.mobileNavWrapperAuth : ''
              }`}
              aria-label="Mobile primary"
            >
              <ul className={styles.mobileNav}>
                <NavItems showAddRecipe={false} onNavigate={() => setOpen(false)} />
              </ul>
            </nav>

            <div className={styles.mobileUser}>
              <UserBlock />
              {effectiveIsAuthenticated && (
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
      <LogoutDialog
        open={isLogoutDialogOpen}
        onClose={() => {
          setIsLogoutDialogOpen(false);
          logoutButtonRef.current?.focus();
        }}
      />
    </>
  );
}
