import { Heart, MessageCircle, Share2, Bell, Plus } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Card } from "@/components/ui/Card";
import { RarityDot } from "@/components/ui/RarityDot";
import { VerificationSeal } from "@/components/ui/VerificationSeal";
import { rarityLabel } from "@/lib/rarity";
import { tempoRelativo } from "@/lib/format";
import type { Post } from "@fisgou/shared";

export function PostCard({ post }: { post: Post }) {
  const { autor, especie, status } = post;

  return (
    <Card className="overflow-hidden">
      {/* Cabeçalho */}
      <div className="flex items-center gap-3 p-3">
        <Avatar iniciais={autor.iniciais} cor={autor.cor} size="md" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold leading-tight">
            {autor.nome}
          </p>
          <p className="truncate text-xs text-text-2">
            @{autor.handle} · {tempoRelativo(post.criadoEm)}
          </p>
        </div>
      </div>

      {/* Imagem (placeholder colorido até existir upload) */}
      <div
        className="aspect-[4/3] w-full"
        style={{ backgroundColor: post.imagemCor }}
        role="img"
        aria-label={
          especie
            ? `Foto de ${especie.nome}`
            : `Foto da publicação de ${autor.nome}`
        }
      />

      {/* Faixa de espécie (só quando há espécie marcada) */}
      {especie && (
        <div className="flex items-center gap-2 px-3 pt-3">
          <RarityDot rarity={especie.raridade} />
          <span className="text-sm font-medium">
            {especie.nome}
            <span className="text-text-2">
              {" · "}
              {rarityLabel[especie.raridade]}
            </span>
          </span>
          {status && status !== "nao_verificado" && (
            <VerificationSeal status={status} className="h-5 w-5" />
          )}
          <button
            type="button"
            className="ml-auto inline-flex items-center gap-1 rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand transition-colors hover:bg-brand hover:text-brand-fg"
          >
            <Plus className="h-3.5 w-3.5" aria-hidden="true" />
            Fisgados
          </button>
        </div>
      )}

      {/* Legenda */}
      <p className="px-3 py-3 text-sm leading-relaxed">{post.legenda}</p>

      {/* Rodapé de ações */}
      <div className="flex items-center gap-5 border-t border-border px-3 py-2.5 text-text-2">
        <Acao icon={Heart} label="Curtir" valor={post.curtidas} />
        <Acao icon={MessageCircle} label="Comentar" valor={post.comentarios} />
        <Acao icon={Share2} label="Compartilhar" />
        <button
          type="button"
          aria-label="Ativar notificações desta publicação"
          className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-surface-2 hover:text-text"
        >
          <Bell className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </Card>
  );
}

function Acao({
  icon: Icon,
  label,
  valor,
}: {
  icon: typeof Heart;
  label: string;
  valor?: number;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="inline-flex items-center gap-1.5 text-sm transition-colors hover:text-text"
    >
      <Icon className="h-5 w-5" aria-hidden="true" />
      {valor !== undefined && <span>{valor}</span>}
    </button>
  );
}
