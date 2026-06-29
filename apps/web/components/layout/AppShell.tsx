import type { ReactNode } from "react";
import { BottomNav } from "./BottomNav";
import { Sidebar } from "./Sidebar";
import { RightRail } from "./RightRail";
import { RouteTransition } from "./RouteTransition";

/**
 * Casca responsiva.
 *
 * - Mobile (<md): coluna única; navegação na BottomNav (fixa embaixo).
 * - Desktop (md+): Sidebar de navegação à esquerda + conteúdo centrado
 *   numa coluna confortável (max-w-2xl); a BottomNav some.
 *
 * Altura travada (100dvh): o <main> é a área de rolagem em todos os
 * tamanhos, então TopBars `sticky top-0` e barras de ação
 * `sticky bottom-0` funcionam igual no mobile e no desktop.
 */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-[100dvh] overflow-hidden bg-surface-2">
      <Sidebar />
      <div className="flex h-full min-w-0 flex-1 flex-col overflow-hidden bg-bg">
        <div className="flex min-h-0 flex-1">
          {/* Cada página controla a própria largura via <PageContainer>. */}
          <main className="flex-1 overflow-y-auto overflow-x-hidden">
            <RouteTransition>{children}</RouteTransition>
          </main>
          <RightRail />
        </div>
        <BottomNav />
      </div>
    </div>
  );
}
