import Image from "next/image";
import Link from "next/link";
import styles from "./Logo.module.css";

export function Logo({
  withText = true,
  size = 24,
}: {
  withText?: boolean;
  size?: number;
}) {
  return (
    <Link href="/" className={styles.logo} aria-label="Home">
      <Image src="/favicon.svg" alt="" width={size} height={size} priority />
      {withText && <span className={styles.wordmark}>Tasteorama</span>}
    </Link>
  );
}
