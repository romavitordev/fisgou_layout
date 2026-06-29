/**
 * @fisgou/shared — tipos de domínio do Fisgou.
 *
 * TS puro, sem build: o pacote é consumido direto pela web via
 * `transpilePackages` e poderá ser reaproveitado pela futura API
 * (Express + Prisma + PostgreSQL) sem duplicar contratos.
 */

// ── Enums de domínio ────────────────────────────────────────────────
export type Rarity = "comum" | "incomum" | "raro" | "lendario";

export type CatchStatus = "nao_verificado" | "em_analise" | "verificado";

export type LocationPrivacy = "exato" | "aproximado" | "oculto";

export type WaterType = "doce" | "salgada";

export type PesqueiroTipo =
  | "pesque-pague"
  | "represa"
  | "rio"
  | "lago"
  | "praia";

export type BadgeTier = "normal" | "lendario";

// ── Entidades ───────────────────────────────────────────────────────

/** Estatísticas resumidas exibidas no perfil. */
export interface UserStats {
  peixes: number;
  especies: number;
  amigos: number;
}

export interface User {
  id: string;
  nome: string;
  handle: string;
  cidade?: string;
  /** Cor do avatar placeholder (até existir upload de foto). */
  cor: string;
  iniciais: string;
  /** Selo "Criador" (âmbar). */
  criador?: boolean;
  stats: UserStats;
}

export interface Species {
  id: string;
  nome: string;
  nomeCientifico: string;
  raridade: Rarity;
  agua: WaterType;
  /** Cor do bloco placeholder do peixe. */
  cor: string;
}

/** Uma entrada da coleção "Fisgados" do usuário. */
export interface CollectionEntry {
  species: Species;
  status: CatchStatus;
  /** ISO date — quando foi capturado/registrado. */
  capturadoEm?: string;
}

export interface Post {
  id: string;
  autor: User;
  /** ISO date. */
  criadoEm: string;
  /** Cor do bloco da imagem (placeholder até existir upload). */
  imagemCor: string;
  legenda: string;
  especie?: Species;
  status?: CatchStatus;
  curtidas: number;
  comentarios: number;
  localPrivacidade?: LocationPrivacy;
}

export interface Badge {
  id: string;
  nome: string;
  /** Nome do ícone lucide-react. */
  icon: string;
  tier: BadgeTier;
}

export interface Pesqueiro {
  id: string;
  nome: string;
  tipo: PesqueiroTipo;
  /** Nota do Google (0–5). */
  nota: number;
  avaliacoes: number;
  distanciaKm: number;
  endereco?: string;
  /** Cor do thumb/capa placeholder. */
  cor: string;
}
