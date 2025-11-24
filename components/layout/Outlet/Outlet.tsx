'use client';

import { PropsWithChildren } from 'react';
import { usePathname } from 'next/navigation';

import styles from './Outlet.module.css';

export function Outlet({ children }: PropsWithChildren) {
  const pathname = usePathname();

  return (
    <main key={pathname} className={styles.main}>
      {children}
    </main>
  );
}
