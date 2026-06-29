import Link from "next/link";
import {
  Fish,
  MapPin,
  Trophy,
  BadgeCheck,
  ArrowRight,
  Camera,
  Search,
  Users,
} from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Button } from "@/components/ui/Button";

/**
 * Landing pública (/) — explica a plataforma. Sem chrome do app.
 * Quem já tem sessão pode ir direto pro feed pelos CTAs.
 */
export default function LandingPage() {
  return (
    <div className="min-h-[100dvh] bg-bg">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-border bg-bg/85 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <Logo />
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Entrar
              </Button>
            </Link>
            <Link href="/cadastro">
              <Button size="sm">Criar conta</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-4 py-16 text-center sm:py-24">
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-3 py-1 text-sm font-medium text-brand">
          <Fish className="h-4 w-4" aria-hidden="true" />
          A comunidade dos pescadores
        </span>
        <h1 className="mx-auto mt-6 max-w-3xl text-balance text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
          Registre suas fisgadas, complete sua coleção e descubra onde pescar.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg text-text-2">
          O Fisgou junta um feed social, uma coleção gamificada de espécies — os
          seus <strong className="text-text">Fisgados</strong> — e um mapa de
          pesqueiros perto de você. Cada peixe conta uma história.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/cadastro" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto">
              Criar conta grátis
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Button>
          </Link>
          <Link href="/feed" className="w-full sm:w-auto">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto">
              Explorar o feed
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border bg-surface-2/40">
        <div className="mx-auto grid max-w-5xl gap-4 px-4 py-16 sm:grid-cols-2 lg:grid-cols-4">
          <Feature
            icon={Users}
            titulo="Feed social"
            texto="Compartilhe fisgadas, curta, comente e siga outros pescadores."
          />
          <Feature
            icon={Trophy}
            titulo="Coleção Fisgados"
            texto="Cada espécie capturada entra na sua coleção. Complete e suba de nível."
          />
          <Feature
            icon={BadgeCheck}
            titulo="Capturas verificadas"
            texto="Mande sua captura para verificação e ganhe o selo de confiança."
          />
          <Feature
            icon={MapPin}
            titulo="Mapa de pesqueiros"
            texto="Encontre represas, rios e pesque-pagues perto de você, com notas."
          />
        </div>
      </section>

      {/* Como funciona */}
      <section className="mx-auto max-w-5xl px-4 py-16">
        <h2 className="text-center text-2xl font-bold sm:text-3xl">
          Como funciona
        </h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          <Passo
            n={1}
            icon={Camera}
            titulo="Registre a fisgada"
            texto="Foto, legenda, espécie e privacidade da localização. Em segundos."
          />
          <Passo
            n={2}
            icon={Fish}
            titulo="Complete os Fisgados"
            texto="Espécies novas entram na sua coleção com raridade e selo de status."
          />
          <Passo
            n={3}
            icon={Search}
            titulo="Descubra e conecte"
            texto="Ache pesqueiros, combine pescarias e siga a galera da comunidade."
          />
        </div>
      </section>

      {/* CTA final */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Bora fisgar o primeiro?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-text-2">
            Crie sua conta e comece a montar sua coleção hoje.
          </p>
          <Link href="/cadastro" className="mt-6 inline-block">
            <Button size="lg">
              Criar conta grátis
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-4 py-8 text-sm text-text-2 sm:flex-row">
          <Logo />
          <p>© {new Date().getFullYear()} Fisgou · feito para a comunidade da pesca.</p>
        </div>
      </footer>
    </div>
  );
}

function Feature({
  icon: Icon,
  titulo,
  texto,
}: {
  icon: typeof Fish;
  titulo: string;
  texto: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>
      <h3 className="mt-4 font-semibold">{titulo}</h3>
      <p className="mt-1 text-sm text-text-2">{texto}</p>
    </div>
  );
}

function Passo({
  n,
  icon: Icon,
  titulo,
  texto,
}: {
  n: number;
  icon: typeof Fish;
  titulo: string;
  texto: string;
}) {
  return (
    <div className="text-center">
      <span className="relative mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand text-brand-fg">
        <Icon className="h-7 w-7" aria-hidden="true" />
        <span className="absolute -right-1 -top-1 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-bg bg-surface text-xs font-bold text-brand">
          {n}
        </span>
      </span>
      <h3 className="mt-4 font-semibold">{titulo}</h3>
      <p className="mx-auto mt-1 max-w-xs text-sm text-text-2">{texto}</p>
    </div>
  );
}
