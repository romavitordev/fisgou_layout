"use client";

import { useState } from "react";
import Link from "next/link";
import {
  X,
  Camera,
  Fish,
  MapPin,
  Crosshair,
  Waves,
  Lock,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { cn } from "@/lib/cn";
import { privacyLabel, privacyHint } from "@/lib/rarity";
import type { LocationPrivacy } from "@fisgou/shared";

const opcoesPrivacidade: {
  id: LocationPrivacy;
  icon: typeof Crosshair;
}[] = [
  { id: "exato", icon: Crosshair },
  { id: "aproximado", icon: Waves },
  { id: "oculto", icon: Lock },
];

export default function CriarPage() {
  const [legenda, setLegenda] = useState("");
  const [privacidade, setPrivacidade] =
    useState<LocationPrivacy>("aproximado");

  return (
    <div className="min-h-full">
      {/* Header */}
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-bg/85 px-4 py-3 backdrop-blur">
        <Link
          href="/"
          aria-label="Fechar"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-text-2 transition-colors hover:bg-surface-2 hover:text-text"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </Link>
        <h1 className="text-base font-semibold">Nova publicação</h1>
        {/* Publicar é mock por enquanto (vira POST /posts). */}
        <Button size="sm" className="rounded-full">
          Publicar
        </Button>
      </header>

      <div className="space-y-5 p-4 pb-28">
        {/* Adicionar foto */}
        <button
          type="button"
          className="flex h-44 w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-brand/40 bg-brand-soft/50 text-brand transition-colors hover:bg-brand-soft"
        >
          <Camera className="h-8 w-8" aria-hidden="true" />
          <span className="text-sm font-semibold">Adicionar foto</span>
          <span className="text-xs text-text-2">
            toque para escolher da galeria ou câmera
          </span>
        </button>

        {/* Legenda */}
        <textarea
          value={legenda}
          onChange={(e) => setLegenda(e.target.value)}
          placeholder="Escreva uma legenda…"
          rows={3}
          className="w-full resize-none rounded-2xl border border-border bg-surface px-4 py-3 text-sm placeholder:text-text-2 focus:border-brand focus:outline-none"
        />

        {/* Marcações opcionais */}
        <div className="flex gap-3">
          <Chip tone="neutral" className="flex-1 justify-center py-2.5">
            <Fish className="h-4 w-4 text-brand" aria-hidden="true" />
            Marcar espécie
          </Chip>
          <Chip tone="neutral" className="flex-1 justify-center py-2.5">
            <MapPin className="h-4 w-4 text-brand" aria-hidden="true" />
            Marcar pesqueiro
          </Chip>
        </div>

        {/* Privacidade da localização */}
        <fieldset>
          <legend className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-text-2">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            Privacidade da localização
          </legend>
          <div className="space-y-2">
            {opcoesPrivacidade.map(({ id, icon: Icon }) => {
              const ativo = privacidade === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setPrivacidade(id)}
                  aria-pressed={ativo}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-colors",
                    ativo
                      ? "border-brand bg-brand-soft"
                      : "border-border bg-surface hover:bg-surface-2",
                  )}
                >
                  <Icon
                    className={cn(
                      "h-5 w-5 shrink-0",
                      ativo ? "text-brand" : "text-text-2",
                    )}
                    aria-hidden="true"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium">
                      {privacyLabel[id]}
                    </span>
                    <span className="block text-xs text-text-2">
                      {privacyHint[id]}
                    </span>
                  </span>
                  {ativo && (
                    <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-brand-fg">
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </fieldset>
      </div>

      {/* Publicar fixo embaixo */}
      <div className="sticky bottom-0 border-t border-border bg-surface p-4">
        <Button size="lg" className="w-full">
          Publicar
        </Button>
      </div>
    </div>
  );
}
