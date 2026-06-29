import type { ReactNode } from "react";
import { AppShell } from "@/components/layout/AppShell";

/** Layout do grupo (app): envolve as telas com a casca + nav inferior. */
export default function AppGroupLayout({ children }: { children: ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
