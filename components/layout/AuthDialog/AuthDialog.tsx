"use client";

import Link from "next/link";
import styles from "./AuthDialog.module.css";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function AuthDialog({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div className={styles.panel} onClick={(e) => e.stopPropagation()}>
        <h3 className={styles.title}>Sign in to continue</h3>
        <p className={styles.text}>Choose an option:</p>
        <div className={styles.actions}>
          <Link className={styles.btnPrimary} href="/auth/login">
            Sign in
          </Link>
          <Link className={styles.btnSecondary} href="/auth/register">
            Sign up
          </Link>
        </div>
        <button className={styles.close} onClick={onClose} aria-label="Close">
          ✕
        </button>
      </div>
    </div>
  );
}
