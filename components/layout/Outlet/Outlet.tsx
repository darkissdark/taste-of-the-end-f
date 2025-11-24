import { PropsWithChildren } from 'react';
import styles from './Outlet.module.css';

export function Outlet({ children }: PropsWithChildren) {
  return <main className={styles.main}>{children}</main>;
}
