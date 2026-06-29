import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { ProfileView } from "@/components/perfil/ProfileView";
import { TopBar } from "@/components/layout/TopBar";
import { currentUser, users, userByHandle } from "@/data/mock";

// Rotas estáticas dos perfis conhecidos (export do fisgou_layout).
export function generateStaticParams() {
  return users.map((u) => ({ handle: u.handle }));
}

export default function PerfilPublicoPage({
  params,
}: {
  params: { handle: string };
}) {
  const user = userByHandle(params.handle) ?? currentUser;
  const isMe = user.id === currentUser.id;

  return (
    <PageContainer width="full">
      {/* Topbar fina só com voltar + nome (perfis de outros usuários). */}
      <TopBar
        className="border-b-0 bg-transparent backdrop-blur-none"
        actions={null}
      >
        <Link
          href="/feed"
          aria-label="Voltar"
          className="-ml-1 inline-flex items-center gap-2 rounded-full px-2 py-1 text-sm font-medium text-text transition-colors hover:bg-surface-2"
        >
          <ArrowLeft className="h-5 w-5" aria-hidden="true" />
          <span className="truncate">{user.nome}</span>
        </Link>
      </TopBar>

      <ProfileView user={user} isMe={isMe} />
    </PageContainer>
  );
}
