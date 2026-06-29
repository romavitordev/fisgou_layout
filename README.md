# Fisgou 🎣

Comunidade de pescadores: rede social + coleção gamificada de espécies
("**Fisgados**") + mapa de pesqueiros. Este repositório é **só o
front-end**, com **mock data** — sem back-end aqui.

> 💡 Existe também o repositório **full-stack** (front + back + banco) em
> [`romavitordev/fisgou`](https://github.com/romavitordev/fisgou), que
> inclui o `apps/api` (Express + Prisma + PostgreSQL). Use aquele se for
> mexer no back-end; use **este** para evoluir só a interface.

A interface é **mobile-first** (cara de app dentro de uma coluna de até
480px), mas responsiva como site. Toda a UI é em **pt-BR**.

## Stack

- **pnpm workspaces** (monorepo)
- **Next.js 14** (App Router) + **TypeScript** estrito
- **Tailwind CSS 3.4** com tokens via CSS vars + `darkMode: "class"`
- **next-themes** (tema claro/escuro), **lucide-react**, **clsx**,
  **tailwind-merge**

## Estrutura

```
fisgou/
├─ pnpm-workspace.yaml
├─ package.json                 # scripts dev/build via --filter @fisgou/web
├─ packages/
│  └─ shared/                   # @fisgou/shared — tipos de domínio (TS puro)
│     └─ src/index.ts
└─ apps/
   ├─ web/                      # @fisgou/web — Next.js (este é o app)
   │  ├─ app/
   │  │  ├─ layout.tsx          # html + ThemeProvider + fonte
   │  │  └─ (app)/              # grupo com AppShell + navegação inferior
   │  │     ├─ page.tsx                 # Feed
   │  │     ├─ criar/page.tsx           # Nova publicação
   │  │     ├─ pesqueiros/page.tsx      # Lista de pesqueiros
   │  │     ├─ pesqueiros/[id]/page.tsx # Detalhe (generateStaticParams)
   │  │     ├─ fisgados/page.tsx        # Coleção de espécies
   │  │     └─ perfil/page.tsx          # Perfil
   │  ├─ components/            # ui / layout / feed / fisgados / pesqueiros / perfil
   │  ├─ lib/                   # cn, theme-provider, rarity, format
   │  ├─ data/mock.ts           # mock data (vira fetch p/ a API depois)
   │  └─ .env.example
   └─ (sem apps/api — back-end vive no repo full-stack)
```

## Como rodar

Pré-requisitos: **Node 18+** e **pnpm 9+**.

```bash
pnpm install
pnpm dev          # sobe a web em http://localhost:3000
```

Outros scripts (na raiz):

```bash
pnpm build        # build de produção da web
pnpm start        # serve o build
pnpm lint
```

Variáveis de ambiente (opcional por enquanto): copie
`apps/web/.env.example` para `apps/web/.env.local`.

## Identidade visual

- Estilo **flat** (sem degradê/sombra pesada), cantos 12–18px, ícones
  outline (lucide), tipografia sans, _sentence case_, bastante respiro,
  vibe "água".
- Paleta por tema em `apps/web/app/globals.css` (CSS vars) e mapeada no
  `tailwind.config.ts`.
- **Cores de raridade** são fixas (não mudam por tema): comum, incomum,
  raro e lendário (= âmbar).

### Regra crítica do âmbar

Âmbar é **reservado** para: raridade **lendário**, selo **Criador** e
insígnia **Recordista**. Não usar em mais nada. _Exceção:_ a estrela de
**nota do Google** (pesqueiros) é dourada por convenção universal —
qualquer indicador de **status especial** é chip/badge âmbar preenchido,
nunca uma estrela, pra os dois nunca se confundirem.

## Telas

1. **Feed** (`/`) — topbar com logo, busca, mensagens e toggle de tema;
   composer enxuto; lista de posts (espécie + raridade + verificação +
   "+ Fisgados" quando houver).
2. **Criar** (`/criar`) — adicionar foto, legenda, marcar
   espécie/pesqueiro e privacidade da localização (exato/aproximado/oculto).
3. **Pesqueiros** (`/pesqueiros`) — mapa placeholder com pinos + nota,
   filtros por tipo e lista.
4. **Detalhe do pesqueiro** (`/pesqueiros/[id]`) — capa, nota do Google,
   ações, espécies comuns, amigos e nota de privacidade.
5. **Fisgados** (`/fisgados`) — coleção em grade 3 colunas (desbloqueado
   vs. bloqueado), legenda de raridade e barra fixa "Provar um peixe".
6. **Perfil** (`/perfil`) — banner + avatar, stats, insígnias e progresso
   da coleção.

## Roadmap de back-end

O back-end ainda **não existe**. O terreno já está pronto:

- `packages/shared` guarda os contratos de domínio que **front e API**
  vão compartilhar (sem duplicação).
- `apps/api/README.md` descreve a stack planejada (Express + Prisma +
  PostgreSQL) e os endpoints iniciais.
- `data/mock.ts` centraliza os dados; quando a API subir, troca-se o
  import por fetch para `NEXT_PUBLIC_API_URL`.
- A tela de pesqueiros já tem o placeholder e a atribuição "Locais via
  Google Maps" para entrar a **Google Places API**
  (`NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`).
