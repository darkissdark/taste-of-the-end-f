import { PropsWithChildren } from "react";

export function Outlet({ children }: PropsWithChildren) {
  return <main>{children}</main>;
}
