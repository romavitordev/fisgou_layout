"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { TopBar, TopBarTitle } from "@/components/layout/TopBar";
import { PageContainer } from "@/components/layout/PageContainer";
import { Chip } from "@/components/ui/Chip";
import { MapPlaceholder } from "@/components/pesqueiros/MapPlaceholder";
import { PesqueiroCard } from "@/components/pesqueiros/PesqueiroCard";
import { pesqueiros } from "@/data/mock";
import type { PesqueiroTipo } from "@fisgou/shared";

type Filtro = "todos" | PesqueiroTipo;

const filtros: { id: Filtro; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "pesque-pague", label: "pesque-pague" },
  { id: "represa", label: "represa" },
  { id: "rio", label: "rio" },
  { id: "lago", label: "lago" },
];

export default function PesqueirosPage() {
  const [filtro, setFiltro] = useState<Filtro>("todos");

  const lista = useMemo(
    () =>
      filtro === "todos"
        ? pesqueiros
        : pesqueiros.filter((p) => p.tipo === filtro),
    [filtro],
  );

  const pins = useMemo(
    () =>
      lista.map((p, i) => ({
        x: 18 + ((i * 27) % 64),
        y: 22 + ((i * 19) % 48),
        nota: p.nota,
      })),
    [lista],
  );

  return (
    <PageContainer width="wide">
      <TopBar
        actions={
          <button
            type="button"
            aria-label="Buscar pesqueiros"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-text-2 transition-colors hover:bg-surface-2 hover:text-text"
          >
            <Search className="h-5 w-5" aria-hidden="true" />
          </button>
        }
      >
        <TopBarTitle title="Pesqueiros" />
      </TopBar>

      <div className="space-y-4 p-3">
        {/* Mapa placeholder — vira Google Places API depois. */}
        <MapPlaceholder pins={pins} />

        {/* Filtros por tipo */}
        <div className="no-scrollbar -mx-3 flex gap-2 overflow-x-auto px-3">
          {filtros.map((f) => (
            <Chip
              key={f.id}
              tone="brand"
              active={filtro === f.id}
              onClick={() => setFiltro(f.id)}
            >
              {f.label}
            </Chip>
          ))}
        </div>

        {/* Lista */}
        <div className="space-y-3">
          {lista.map((p) => (
            <PesqueiroCard key={p.id} pesqueiro={p} />
          ))}
          {lista.length === 0 && (
            <p className="py-8 text-center text-sm text-text-2">
              Nenhum pesqueiro deste tipo por perto.
            </p>
          )}
        </div>
      </div>
    </PageContainer>
  );
}
