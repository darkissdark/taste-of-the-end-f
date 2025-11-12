"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function AuthGuard({
  children,
  redirectTo = "/auth/login",
}: {
  children: React.ReactNode;
  redirectTo?: string;
}) {
  const router = useRouter();
  useEffect(() => {
    const authed =
      typeof document !== "undefined" && document.cookie.includes("token=");
    if (!authed) router.replace(redirectTo);
  }, [router, redirectTo]);

  return <>{children}</>;
}
