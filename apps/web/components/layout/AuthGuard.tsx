"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Fish } from "lucide-react";
import { useAuth } from "@/lib/auth";
import type { ReactNode } from "react";

/**
 * Protege as rotas do app. Sem sessão → manda pro /login.
 * Client-side de propósito (compatível com export estático). Mostra um
 * estado de carregamento enquanto resolve a sessão pra evitar flicker.
 */
export function AuthGuard({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className="flex h-[100dvh] items-center justify-center bg-bg">
        <Fish
          className="h-8 w-8 animate-pulse text-brand"
          aria-label="Carregando"
        />
      </div>
    );
  }

  return <>{children}</>;
}
