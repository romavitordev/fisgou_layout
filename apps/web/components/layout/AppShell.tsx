import type { ReactNode } from "react";
import { BottomNav } from "./BottomNav";

/**
 * Casca do app: coluna central de no máx. 480px, centralizada no
 * desktop com bordas laterais, e a navegação inferior fixa DENTRO
 * dessa coluna.
 *
 * Altura travada (100dvh): <main> é a área de rolagem e a BottomNav
 * fica sempre colada embaixo. Telas comuns (feed) rolam dentro do
 * <main>; telas com barra de ação fixa (Fisgados) podem ocupar
 * `h-full` e ter a própria região de rolagem interna.
 */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-[100dvh] justify-center bg-surface-2">
      <div className="flex h-[100dvh] w-full max-w-app flex-col overflow-hidden border-border bg-bg sm:border-x">
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          {children}
        </main>
        <BottomNav />
      </div>
    </div>
  );
}
