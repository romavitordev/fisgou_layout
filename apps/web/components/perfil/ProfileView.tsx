"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  SlidersHorizontal,
  Crown,
  ChevronRight,
  Fish,
  LogOut,
  MoreHorizontal,
  UserPlus,
  UserCheck,
  MessageCircle,
} from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { StatRow } from "@/components/perfil/StatRow";
import { BadgeRow } from "@/components/perfil/BadgeRow";
import { SpeciesCard } from "@/components/fisgados/SpeciesCard";
import { LockedSpeciesCard } from "@/components/fisgados/LockedSpeciesCard";
import { PostCard } from "@/components/feed/PostCard";
import { cn } from "@/lib/cn";
import { useAuth } from "@/lib/auth";
import {
  postsByUser,
  collection,
  lockedSpeciesIds,
  collectionProgress,
  badges,
  followingHandles,
} from "@/data/mock";
import type { User } from "@fisgou/shared";

type Tab = "publicacoes" | "fisgados" | "insignias";

const tabs: { id: Tab; label: string }[] = [
  { id: "publicacoes", label: "Publicações" },
  { id: "fisgados", label: "Fisgados" },
  { id: "insignias", label: "Insígnias" },
];

export function ProfileView({ user, isMe }: { user: User; isMe: boolean }) {
  const router = useRouter();
  const { logout } = useAuth();
  const [tab, setTab] = useState<Tab>("publicacoes");
  const [menuAberto, setMenuAberto] = useState(false);
  const [seguindo, setSeguindo] = useState(followingHandles.has(user.handle));

  const meusPosts = postsByUser(user.id);

  function sair() {
    logout();
    router.replace("/");
  }

  return (
    <div className="pb-6">
      {/* Banner full-bleed (ocupa toda a largura da área de conteúdo) */}
      <div className="relative">
        <div className="h-36 w-full bg-brand sm:h-44" aria-hidden="true" />

        {/* Menu de ajustes (somente no próprio perfil) */}
        {isMe && (
          <div className="absolute right-3 top-3">
            <button
              type="button"
              aria-label="Ajustes"
              aria-expanded={menuAberto}
              onClick={() => setMenuAberto((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur transition-colors hover:bg-black/30"
            >
              <MoreHorizontal className="h-5 w-5" aria-hidden="true" />
            </button>
            {menuAberto && (
              <div className="absolute right-0 mt-2 w-44 overflow-hidden rounded-xl border border-border bg-surface py-1 shadow-lg">
                <button
                  type="button"
                  onClick={sair}
                  className="flex w-full items-center gap-2 px-3 py-2 text-sm text-text transition-colors hover:bg-surface-2"
                >
                  <LogOut className="h-4 w-4" aria-hidden="true" />
                  Sair
                </button>
              </div>
            )}
          </div>
        )}

        <div className="absolute -bottom-10 left-4">
          <Avatar
            iniciais={user.iniciais}
            cor={user.cor}
            size="xl"
            className="ring-4 ring-bg"
          />
        </div>
      </div>

      {/* Conteúdo (largura confortável de leitura mesmo no desktop) */}
      <div className="mx-auto max-w-3xl">
        <div className="px-4 pt-12">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl font-bold">{user.nome}</h1>
            {user.criador && (
              // Selo "Criador" — âmbar PREENCHIDO (regra do âmbar).
              <span className="inline-flex items-center gap-1 rounded-full bg-amber px-2 py-0.5 text-xs font-semibold text-white">
                <Crown className="h-3 w-3" aria-hidden="true" />
                Criador
              </span>
            )}
          </div>
          <p className="mt-0.5 text-sm text-text-2">
            @{user.handle}
            {user.cidade && <> · {user.cidade}</>}
          </p>
          {user.bio && (
            <p className="mt-2 text-sm leading-relaxed">{user.bio}</p>
          )}
        </div>

        {/* Stats */}
        <div className="px-4 pt-4">
          <StatRow stats={user.stats} />
        </div>

        {/* Ações: 1 primária (declutter). Próprio = Editar; outro = Seguir. */}
        <div className="flex gap-3 px-4 pt-4">
          {isMe ? (
            <Button className="flex-1">
              <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
              Editar perfil
            </Button>
          ) : (
            <>
              <Button
                variant={seguindo ? "secondary" : "primary"}
                className="flex-1"
                onClick={() => setSeguindo((v) => !v)}
              >
                {seguindo ? (
                  <>
                    <UserCheck className="h-4 w-4" aria-hidden="true" />
                    Seguindo
                  </>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4" aria-hidden="true" />
                    Seguir
                  </>
                )}
              </Button>
              <Button variant="secondary" aria-label="Mensagem">
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
              </Button>
            </>
          )}
        </div>

        {/* Tabs */}
        <div
          role="tablist"
          aria-label="Conteúdo do perfil"
          className="mt-5 flex border-b border-border px-2"
        >
          {tabs.map((t) => {
            const ativo = tab === t.id;
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={ativo}
                onClick={() => setTab(t.id)}
                className={cn(
                  "relative flex-1 px-3 py-3 text-sm font-medium transition-colors",
                  ativo ? "text-brand" : "text-text-2 hover:text-text",
                )}
              >
                {t.label}
                {ativo && (
                  <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-brand" />
                )}
              </button>
            );
          })}
        </div>

        {/* Conteúdo da tab */}
        <div className="p-3">
          {tab === "publicacoes" && (
            <div className="space-y-3">
              {meusPosts.length > 0 ? (
                meusPosts.map((p) => <PostCard key={p.id} post={p} />)
              ) : (
                <EmptyState texto="Nenhuma publicação ainda." />
              )}
            </div>
          )}

          {tab === "fisgados" && (
            <>
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                {collection.map((entry) => (
                  <SpeciesCard key={entry.species.id} entry={entry} />
                ))}
                {isMe &&
                  lockedSpeciesIds.map((id) => <LockedSpeciesCard key={id} />)}
              </div>
              {isMe && <ProgressoColecao />}
            </>
          )}

          {tab === "insignias" && (
            <div className="space-y-4">
              <BadgeRow badges={badges} />
              {isMe && <ProgressoColecao />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function EmptyState({ texto }: { texto: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-border py-10 text-center text-sm text-text-2">
      {texto}
    </div>
  );
}

function ProgressoColecao() {
  const { capturadas, total } = collectionProgress;
  const pct = Math.round((capturadas / total) * 100);
  const faltam = total - capturadas;
  return (
    <Card className="mt-4 p-4">
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
        <div className="h-full rounded-full bg-brand" style={{ width: `${pct}%` }} />
      </div>
      <p className="mt-2 text-xs text-text-2">
        {pct}% da coleção completa · faltam {faltam} espécies
      </p>
    </Card>
  );
}
