// components/layout/Footer/Footer.tsx
"use client";

import Link from "next/link";
import styles from "./Footer.module.css";
import { useState } from "react";
import { AuthDialog } from "../AuthDialog/AuthDialog";
import { Logo } from "@/components/ui/Logo/Logo";

export function Footer() {
  const [authOpen, setAuthOpen] = useState(false);

  const isAuthed = () =>
    typeof document !== "undefined" && document.cookie.includes("token=");

  const handleProfileClick = (e: React.MouseEvent) => {
    if (!isAuthed()) {
      e.preventDefault();
      setAuthOpen(true);
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
          <Link href="/" className={styles.link}>
            Recipes
          </Link>
          <Link
            href="/profile/own"
            className={styles.link}
            onClick={handleProfileClick}
          >
            Profile
          </Link>
        </nav>
      </div>

      <AuthDialog open={authOpen} onClose={() => setAuthOpen(false)} />
    </footer>
  );
}
