import { Search, TrendingUp, UserPlus } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { RarityDot } from "@/components/ui/RarityDot";
import { rarityLabel } from "@/lib/rarity";
import { species, friends } from "@/data/mock";

/**
 * Coluna lateral direita — só em telas largas (xl+). Aproveita o espaço
 * do desktop com busca, espécies em alta e sugestões de pescadores.
 * Conteúdo é mock; vira dados reais da API depois.
 */
export function RightRail() {
  // "Em alta": destaca espécies mais raras (raro/lendário) como exemplo.
  const emAlta = species
    .filter((s) => s.raridade === "raro" || s.raridade === "lendario")
    .slice(0, 4);

  return (
    <aside className="hidden w-80 shrink-0 overflow-y-auto border-l border-border px-4 py-4 xl:block">
      {/* Busca */}
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-2"
          aria-hidden="true"
        />
        <input
          type="search"
          placeholder="Buscar espécies, pesqueiros…"
          aria-label="Buscar"
          className="w-full rounded-full border border-border bg-surface-2 py-2.5 pl-9 pr-4 text-sm placeholder:text-text-2 focus:border-brand focus:bg-surface focus:outline-none"
        />
      </div>

      {/* Espécies em alta */}
      <Card className="mt-4 p-4">
        <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold">
          <TrendingUp className="h-4 w-4 text-brand" aria-hidden="true" />
          Espécies em alta
        </h2>
        <ul className="space-y-3">
          {emAlta.map((s) => (
            <li key={s.id} className="flex items-center gap-3">
              <span
                className="h-9 w-9 shrink-0 rounded-lg"
                style={{ backgroundColor: s.cor }}
                aria-hidden="true"
              />
              <span className="min-w-0">
                <span className="block truncate text-sm font-medium">
                  {s.nome}
                </span>
                <RarityDot
                  rarity={s.raridade}
                  withLabel
                  className="text-xs"
                />
              </span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Pescadores para seguir */}
      <Card className="mt-4 p-4">
        <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold">
          <UserPlus className="h-4 w-4 text-brand" aria-hidden="true" />
          Pescadores para seguir
        </h2>
        <ul className="space-y-3">
          {friends.map((u) => (
            <li key={u.id} className="flex items-center gap-3">
              <Avatar iniciais={u.iniciais} cor={u.cor} size="sm" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium leading-tight">
                  {u.nome}
                </span>
                <span className="block truncate text-xs text-text-2">
                  @{u.handle}
                </span>
              </span>
              <button
                type="button"
                className="rounded-full border border-border px-3 py-1 text-xs font-semibold text-brand transition-colors hover:bg-brand-soft"
              >
                Seguir
              </button>
            </li>
          ))}
        </ul>
      </Card>

      <p className="mt-4 px-1 text-xs leading-relaxed text-text-2">
        Conteúdo de demonstração · dados reais entram com a API.
      </p>
    </aside>
  );
}
