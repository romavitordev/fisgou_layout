import type {
  User,
  Species,
  CollectionEntry,
  Post,
  Badge,
  Pesqueiro,
} from "@fisgou/shared";

/**
 * Mock data do Fisgou.
 *
 * Tudo aqui é estático e roda no front. Quando a API existir
 * (apps/api), estas funções viram fetchs para NEXT_PUBLIC_API_URL,
 * mantendo os mesmos tipos de @fisgou/shared.
 */

// ── Usuário atual (criador) ─────────────────────────────────────────
export const currentUser: User = {
  id: "u1",
  nome: "Marina Tavares",
  handle: "marina.pesca",
  cidade: "São Carlos, SP",
  cor: "#14916B",
  iniciais: "MT",
  criador: true,
  stats: { peixes: 142, especies: 37, amigos: 89 },
};

const rafael: User = {
  id: "u2",
  nome: "Rafael Lima",
  handle: "rafa.fisgou",
  cidade: "Ribeirão Preto, SP",
  cor: "#2D7DD2",
  iniciais: "RL",
  stats: { peixes: 98, especies: 24, amigos: 51 },
};

const bia: User = {
  id: "u3",
  nome: "Bia Nogueira",
  handle: "bia.iscaviva",
  cidade: "Ubatuba, SP",
  cor: "#7C5CD6",
  iniciais: "BN",
  stats: { peixes: 211, especies: 44, amigos: 130 },
};

const caio: User = {
  id: "u4",
  nome: "Caio Mendes",
  handle: "caio.varadura",
  cidade: "Avaré, SP",
  cor: "#E0A11A",
  iniciais: "CM",
  stats: { peixes: 63, especies: 19, amigos: 38 },
};

export const friends: User[] = [rafael, bia, caio];

// ── Espécies (12, cobrindo 4 raridades e água doce/salgada) ─────────
export const species: Species[] = [
  {
    id: "s1",
    nome: "Tilápia",
    nomeCientifico: "Oreochromis niloticus",
    raridade: "comum",
    agua: "doce",
    cor: "#BFD8C6",
  },
  {
    id: "s2",
    nome: "Lambari",
    nomeCientifico: "Astyanax lacustris",
    raridade: "comum",
    agua: "doce",
    cor: "#CFE0D2",
  },
  {
    id: "s3",
    nome: "Tucunaré-açu",
    nomeCientifico: "Cichla temensis",
    raridade: "raro",
    agua: "doce",
    cor: "#A9C7D6",
  },
  {
    id: "s4",
    nome: "Pacu",
    nomeCientifico: "Piaractus mesopotamicus",
    raridade: "incomum",
    agua: "doce",
    cor: "#C3CFB6",
  },
  {
    id: "s5",
    nome: "Traíra",
    nomeCientifico: "Hoplias malabaricus",
    raridade: "incomum",
    agua: "doce",
    cor: "#B7C4D2",
  },
  {
    id: "s6",
    nome: "Dourado",
    nomeCientifico: "Salminus brasiliensis",
    raridade: "lendario",
    agua: "doce",
    cor: "#E7D2A0",
  },
  {
    id: "s7",
    nome: "Tambaqui",
    nomeCientifico: "Colossoma macropomum",
    raridade: "incomum",
    agua: "doce",
    cor: "#BDD3C7",
  },
  {
    id: "s8",
    nome: "Pintado",
    nomeCientifico: "Pseudoplatystoma corruscans",
    raridade: "raro",
    agua: "doce",
    cor: "#C9C3E0",
  },
  {
    id: "s9",
    nome: "Robalo",
    nomeCientifico: "Centropomus undecimalis",
    raridade: "incomum",
    agua: "salgada",
    cor: "#AFC8D6",
  },
  {
    id: "s10",
    nome: "Garoupa",
    nomeCientifico: "Epinephelus marginatus",
    raridade: "raro",
    agua: "salgada",
    cor: "#D6C7A6",
  },
  {
    id: "s11",
    nome: "Sardinha",
    nomeCientifico: "Sardinella brasiliensis",
    raridade: "comum",
    agua: "salgada",
    cor: "#C2D4CC",
  },
  {
    id: "s12",
    nome: "Marlim-azul",
    nomeCientifico: "Makaira nigricans",
    raridade: "lendario",
    agua: "salgada",
    cor: "#A7BBD0",
  },
];

const byId = (id: string) => species.find((s) => s.id === id)!;

// ── Coleção "Fisgados" do usuário (estados mistos) ──────────────────
export const collection: CollectionEntry[] = [
  { species: byId("s1"), status: "verificado", capturadoEm: "2026-05-02" },
  { species: byId("s3"), status: "verificado", capturadoEm: "2026-05-21" },
  { species: byId("s2"), status: "nao_verificado", capturadoEm: "2026-04-18" },
  { species: byId("s5"), status: "verificado", capturadoEm: "2026-03-30" },
  { species: byId("s4"), status: "nao_verificado", capturadoEm: "2026-06-01" },
  { species: byId("s6"), status: "em_analise", capturadoEm: "2026-06-20" },
  { species: byId("s7"), status: "verificado", capturadoEm: "2026-02-11" },
  { species: byId("s8"), status: "verificado", capturadoEm: "2026-01-09" },
  { species: byId("s9"), status: "nao_verificado", capturadoEm: "2026-05-15" },
  // s10, s11, s12 ainda bloqueadas (não capturadas) — viram LockedSpeciesCard.
];

/** Espécies ainda não capturadas (cards bloqueados na grade). */
export const lockedSpeciesIds = ["s10", "s11", "s12"];

/** Progresso da coleção. */
export const collectionProgress = {
  total: 100,
  capturadas: currentUser.stats.especies, // 37
};

// ── Posts (feed) ────────────────────────────────────────────────────
export const posts: Post[] = [
  {
    id: "p1",
    autor: rafael,
    criadoEm: "2026-06-28T07:10:00-03:00",
    imagemCor: "#9DBFAE",
    legenda:
      "Acordei 5h e valeu cada minuto. Represa espelhada, sem vento, só o barulho da linha.",
    especie: byId("s3"),
    status: "verificado",
    curtidas: 128,
    comentarios: 14,
    localPrivacidade: "aproximado",
  },
  {
    id: "p2",
    autor: bia,
    criadoEm: "2026-06-27T19:40:00-03:00",
    imagemCor: "#D8C7A0",
    // Receita: post SEM espécie marcada.
    legenda:
      "Robalo na crosta de ervas com limão-siciliano. Receita da vó, atualizada. Fica pra próxima fisgada 🐟🍋",
    curtidas: 64,
    comentarios: 9,
  },
  {
    id: "p3",
    autor: caio,
    criadoEm: "2026-06-27T06:05:00-03:00",
    imagemCor: "#C9C3E0",
    legenda:
      "Acho que finalmente fisguei um pintado de verdade. Mandei pra verificação, cruzem os dedos!",
    especie: byId("s8"),
    status: "em_analise",
    curtidas: 47,
    comentarios: 22,
    localPrivacidade: "oculto",
  },
];

// ── Insígnias ───────────────────────────────────────────────────────
export const badges: Badge[] = [
  { id: "b1", nome: "Primeira fisgada", icon: "Fish", tier: "normal" },
  { id: "b2", nome: "Recordista", icon: "Award", tier: "lendario" },
  { id: "b3", nome: "50 espécies", icon: "Star", tier: "normal" },
  { id: "b4", nome: "10 pesqueiros", icon: "MapPin", tier: "normal" },
  { id: "b5", nome: "Água salgada", icon: "Waves", tier: "normal" },
];

// ── Pesqueiros ──────────────────────────────────────────────────────
export const pesqueiros: Pesqueiro[] = [
  {
    id: "pq1",
    nome: "Represa do Jacaré",
    tipo: "represa",
    nota: 4.7,
    avaliacoes: 312,
    distanciaKm: 3.2,
    endereco: "Rod. SP-318, km 248 — São Carlos, SP",
    cor: "#9DBFAE",
  },
  {
    id: "pq2",
    nome: "Pesque-pague Bom Retiro",
    tipo: "pesque-pague",
    nota: 4.5,
    avaliacoes: 189,
    distanciaKm: 5.8,
    endereco: "Estr. do Broa, s/n — Itirapina, SP",
    cor: "#BBC79A",
  },
  {
    id: "pq3",
    nome: "Rio Sapucaí – Norte",
    tipo: "rio",
    nota: 4.8,
    avaliacoes: 76,
    distanciaKm: 12,
    endereco: "Margem norte — Luís Antônio, SP",
    cor: "#A9BBD0",
  },
  {
    id: "pq4",
    nome: "Lagoa Azul",
    tipo: "lago",
    nota: 4.3,
    avaliacoes: 240,
    distanciaKm: 8.1,
    endereco: "Cond. Lagoa Azul — Analândia, SP",
    cor: "#AFC4D2",
  },
];

export const pesqueiroById = (id: string) =>
  pesqueiros.find((p) => p.id === id);

/** Espécies comuns por pesqueiro (ids) — usado no detalhe. */
export const especiesPorPesqueiro: Record<string, string[]> = {
  pq1: ["s3", "s5", "s1", "s8"],
  pq2: ["s1", "s2", "s4", "s7"],
  pq3: ["s3", "s8", "s6"],
  pq4: ["s4", "s5", "s1"],
};

/** Amigos que pescaram em cada pesqueiro (subset, p/ avatares). */
export const amigosPorPesqueiro: Record<string, User[]> = {
  pq1: [rafael, bia, caio],
  pq2: [bia, caio],
  pq3: [rafael, bia],
  pq4: [caio, rafael, bia],
};
