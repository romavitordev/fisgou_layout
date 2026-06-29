"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, MapPin } from "lucide-react";
import { TopBar } from "@/components/layout/TopBar";
import { PageContainer } from "@/components/layout/PageContainer";
import { Avatar } from "@/components/ui/Avatar";
import { RarityDot } from "@/components/ui/RarityDot";
import { formatNota } from "@/lib/format";
import { rarityLabel } from "@/lib/rarity";
import { users, species, pesqueiros } from "@/data/mock";

// Remove acentos para busca tolerante (NFD + corta diacríticos U+0300–036F).
const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

export default function BuscarPage() {
  const [q, setQ] = useState("");
  const termo = norm(q.trim());

  const r = useMemo(() => {
    if (!termo) return { users: [], species: [], pesqueiros: [] };
    const match = (s: string) => norm(s).includes(termo);
    return {
      users: users.filter((u) => match(u.nome) || match(u.handle)),
      species: species.filter((s) => match(s.nome) || match(s.nomeCientifico)),
      pesqueiros: pesqueiros.filter((p) => match(p.nome) || match(p.tipo)),
    };
  }, [termo]);

  const vazio =
    termo && !r.users.length && !r.species.length && !r.pesqueiros.length;

  return (
    <PageContainer>
      <TopBar>
        <div className="relative w-full">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-2"
            aria-hidden="true"
          />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar pescadores, espécies, pesqueiros…"
            aria-label="Buscar"
            className="w-full rounded-full border border-border bg-surface-2 py-2.5 pl-9 pr-4 text-sm placeholder:text-text-2 focus:border-brand focus:bg-surface focus:outline-none"
          />
        </div>
      </TopBar>

      <div className="space-y-6 p-4">
        {!termo && (
          <p className="text-sm text-text-2">
            Comece a digitar para encontrar pessoas, espécies e pesqueiros.
          </p>
        )}

        {vazio && (
          <p className="py-8 text-center text-sm text-text-2">
            Nada encontrado para “{q}”.
          </p>
        )}

        {r.users.length > 0 && (
          <Secao titulo="Pescadores">
            {r.users.map((u) => (
              <Link
                key={u.id}
                href={`/u/${u.handle}`}
                className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-surface-2"
              >
                <Avatar iniciais={u.iniciais} cor={u.cor} size="md" />
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold">
                    {u.nome}
                  </span>
                  <span className="block truncate text-xs text-text-2">
                    @{u.handle}
                  </span>
                </span>
              </Link>
            ))}
          </Secao>
        )}

        {r.species.length > 0 && (
          <Secao titulo="Espécies">
            {r.species.map((s) => (
              <div
                key={s.id}
                className="flex items-center gap-3 rounded-xl p-2"
              >
                <span
                  className="h-10 w-10 shrink-0 rounded-lg"
                  style={{ backgroundColor: s.cor }}
                  aria-hidden="true"
                />
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium">
                    {s.nome}
                  </span>
                  <RarityDot rarity={s.raridade} withLabel />
                </span>
              </div>
            ))}
          </Secao>
        )}

        {r.pesqueiros.length > 0 && (
          <Secao titulo="Pesqueiros">
            {r.pesqueiros.map((p) => (
              <Link
                key={p.id}
                href={`/pesqueiros/${p.id}`}
                className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-surface-2"
              >
                <span
                  className="h-10 w-10 shrink-0 rounded-lg"
                  style={{ backgroundColor: p.cor }}
                  aria-hidden="true"
                />
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium">
                    {p.nome}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-text-2">
                    <MapPin className="h-3 w-3" aria-hidden="true" />
                    {p.distanciaKm} km · ★ {formatNota(p.nota)}
                  </span>
                </span>
              </Link>
            ))}
          </Secao>
        )}
      </div>
    </PageContainer>
  );
}

function Secao({
  titulo,
  children,
}: {
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-1 px-2 text-xs font-semibold uppercase tracking-wide text-text-2">
        {titulo}
      </h2>
      <div className="space-y-1">{children}</div>
    </section>
  );
}
