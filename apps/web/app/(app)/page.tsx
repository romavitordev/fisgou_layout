import { Search, MessageCircle } from "lucide-react";
import { TopBar } from "@/components/layout/TopBar";
import { Logo } from "@/components/layout/Logo";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Composer } from "@/components/feed/Composer";
import { PostCard } from "@/components/feed/PostCard";
import { posts } from "@/data/mock";

export default function FeedPage() {
  return (
    <>
      <TopBar
        actions={
          <>
            <IconButton label="Buscar">
              <Search className="h-5 w-5" aria-hidden="true" />
            </IconButton>
            <IconButton label="Mensagens">
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
            </IconButton>
            {/* No desktop o toggle vive na Sidebar; evita duplicar. */}
            <ThemeToggle className="md:hidden" />
          </>
        }
      >
        {/* No mobile mostra a logo; no desktop a logo está na Sidebar,
            então o topo do feed vira só o título da página. */}
        <Logo className="md:hidden" />
        <h1 className="hidden text-lg font-semibold md:block">Início</h1>
      </TopBar>

      <div className="space-y-3 p-3">
        <Composer />
        {/* Feed — vira fetch para a API depois (GET /posts). */}
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </>
  );
}

function IconButton({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-text-2 transition-colors hover:bg-surface-2 hover:text-text"
    >
      {children}
    </button>
  );
}
