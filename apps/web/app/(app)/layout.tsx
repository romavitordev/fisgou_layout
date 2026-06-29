import type { ReactNode } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { AuthGuard } from "@/components/layout/AuthGuard";

/**
 * Layout do grupo (app): exige sessão (AuthGuard) e envolve as telas com
 * a casca responsiva (Sidebar / conteúdo / RightRail / BottomNav).
 */
export default function AppGroupLayout({ children }: { children: ReactNode }) {
  return (
    <AuthGuard>
      <AppShell>{children}</AppShell>
    </AuthGuard>
  );
}
