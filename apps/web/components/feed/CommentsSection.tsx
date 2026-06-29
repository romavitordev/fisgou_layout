"use client";

import { useState, type FormEvent } from "react";
import { Heart, Send } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { tempoRelativo } from "@/lib/format";
import { currentUser } from "@/data/mock";
import type { Comment } from "@fisgou/shared";

/**
 * Lista + composição de comentários (estilo Twitter/Reddit).
 * FASE 1: adiciona em memória (otimista). FASE 2: POST /api/comments.
 */
export function CommentsSection({ iniciais }: { iniciais: Comment[] }) {
  const [comentarios, setComentarios] = useState(iniciais);
  const [texto, setTexto] = useState("");

  function enviar(e: FormEvent) {
    e.preventDefault();
    const t = texto.trim();
    if (!t) return;
    setComentarios((cs) => [
      ...cs,
      {
        id: `tmp-${Date.now()}`,
        postId: iniciais[0]?.postId ?? "",
        autor: currentUser,
        texto: t,
        criadoEm: new Date().toISOString(),
        curtidas: 0,
      },
    ]);
    setTexto("");
  }

  return (
    <section className="px-3 pb-6">
      <h2 className="px-1 py-3 text-sm font-semibold text-text-2">
        {comentarios.length} comentários
      </h2>

      {/* Composer de comentário */}
      <form onSubmit={enviar} className="flex items-center gap-2 pb-4">
        <Avatar iniciais={currentUser.iniciais} cor={currentUser.cor} size="sm" />
        <input
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Escreva um comentário…"
          aria-label="Escreva um comentário"
          className="flex-1 rounded-full border border-border bg-surface px-4 py-2 text-sm placeholder:text-text-2 focus:border-brand focus:outline-none"
        />
        <button
          type="submit"
          aria-label="Enviar comentário"
          disabled={!texto.trim()}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand text-brand-fg transition active:scale-95 disabled:opacity-40"
        >
          <Send className="h-4 w-4" aria-hidden="true" />
        </button>
      </form>

      {/* Lista */}
      <ul className="space-y-4">
        {comentarios.map((c) => (
          <li key={c.id} className="flex gap-3">
            <Avatar iniciais={c.autor.iniciais} cor={c.autor.cor} size="sm" />
            <div className="min-w-0 flex-1">
              <div className="rounded-2xl bg-surface-2 px-3 py-2">
                <p className="text-sm">
                  <span className="font-semibold">{c.autor.nome}</span>{" "}
                  <span className="text-text-2">@{c.autor.handle}</span>
                </p>
                <p className="mt-0.5 text-sm leading-relaxed">{c.texto}</p>
              </div>
              <div className="mt-1 flex items-center gap-3 px-1 text-xs text-text-2">
                <span>{tempoRelativo(c.criadoEm)}</span>
                <button className="inline-flex items-center gap-1 hover:text-text">
                  <Heart className="h-3.5 w-3.5" aria-hidden="true" />
                  {c.curtidas > 0 && c.curtidas}
                </button>
                <button className="hover:text-text">Responder</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
