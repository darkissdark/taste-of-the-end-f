'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLayoutEffect, useState } from 'react';
import css from './ProfileNavigation.module.css';

const ProfileNavigation = () => {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<string | null>(null);

  useLayoutEffect(() => {
    const tab = pathname.includes('/favorites') ? 'favorites' : 'own';
    setActiveTab(tab);
  }, [pathname]);

  return (
    <nav className={css.nav}>
      <Link href="/profile/own" className={`${css.tab} ${activeTab === 'own' ? css.active : ''}`}>
        My Recipes
      </Link>
      <Link
        href="/profile/favorites"
        className={`${css.tab} ${activeTab === 'favorites' ? css.active : ''}`}
      >
        Saved Recipes
      </Link>
    </nav>
  );
};

export default ProfileNavigation;
