import { PropsWithChildren, Suspense } from "react";
import PanLoader from "@/components/ui/loaders/PanLoader";
import styles from "./Outlet.module.css";

export function Outlet({ children }: PropsWithChildren) {
  return (
    <main className={styles.main}>
      <Suspense
        fallback={
          <div className={styles.loading}>
            <PanLoader size="large" />
          </div>
        }
      >
        {children}
      </Suspense>
    </main>
  );
}
