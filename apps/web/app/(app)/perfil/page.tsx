import { SlidersHorizontal, Pencil, Crown, ChevronRight, Fish } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { StatRow } from "@/components/perfil/StatRow";
import { BadgeRow } from "@/components/perfil/BadgeRow";
import { currentUser, badges, collectionProgress } from "@/data/mock";

export default function PerfilPage() {
  const { capturadas, total } = collectionProgress;
  const pct = Math.round((capturadas / total) * 100);
  const faltam = total - capturadas;

  return (
    <div className="pb-6">
      {/* Banner (placeholder de foto de capa, sem degradê) + avatar */}
      <div className="relative">
        <div className="h-32 w-full bg-brand" aria-hidden="true" />
        <button
          type="button"
          aria-label="Personalizar perfil"
          className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur transition-colors hover:bg-black/30"
        >
          <SlidersHorizontal className="h-5 w-5" aria-hidden="true" />
        </button>
        <div className="absolute -bottom-10 left-4">
          <Avatar
            iniciais={currentUser.iniciais}
            cor={currentUser.cor}
            size="xl"
            className="ring-4 ring-bg"
          />
        </div>
      </div>

      {/* Identificação */}
      <div className="px-4 pt-12">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-xl font-bold">{currentUser.nome}</h1>
          {currentUser.criador && (
            // Selo "Criador" — âmbar PREENCHIDO (regra do âmbar).
            <span className="inline-flex items-center gap-1 rounded-full bg-amber px-2 py-0.5 text-xs font-semibold text-white">
              <Crown className="h-3 w-3" aria-hidden="true" />
              Criador
            </span>
          )}
        </div>
        <p className="mt-0.5 text-sm text-text-2">
          @{currentUser.handle}
          {currentUser.cidade && <> · {currentUser.cidade}</>}
        </p>
      </div>

      {/* Stats */}
      <div className="px-4 pt-4">
        <StatRow stats={currentUser.stats} />
      </div>

      {/* Ações */}
      <div className="flex gap-3 px-4 pt-4">
        <Button className="flex-1">
          <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
          Personalizar perfil
        </Button>
        <Button variant="secondary" className="flex-1">
          <Pencil className="h-4 w-4" aria-hidden="true" />
          Editar
        </Button>
      </div>

      {/* Insígnias */}
      <section className="px-4 pt-6">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-text-2">
          Insígnias
        </h2>
        <BadgeRow badges={badges} />
      </section>

      {/* Progresso da coleção */}
      <section className="px-4 pt-6">
        <Card className="p-4">
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-2 text-sm font-semibold">
              <Fish className="h-4 w-4 text-brand" aria-hidden="true" />
              Coleção Fisgados
            </span>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand">
              {capturadas}/{total}
              <ChevronRight className="h-4 w-4 text-text-2" aria-hidden="true" />
            </span>
          </div>
          <div
            className="mt-3 h-2 w-full overflow-hidden rounded-full bg-surface-2"
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Progresso da coleção Fisgados"
          >
            <div
              className="h-full rounded-full bg-brand"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-text-2">
            {pct}% da coleção completa · faltam {faltam} espécies
          </p>
        </Card>
      </section>
    </div>
  );
}
