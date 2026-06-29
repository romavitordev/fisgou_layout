import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { TopBar } from "@/components/layout/TopBar";
import { PostCard } from "@/components/feed/PostCard";
import { CommentsSection } from "@/components/feed/CommentsSection";
import { posts, postById, commentsByPost } from "@/data/mock";

// Rotas estáticas dos posts conhecidos (export do fisgou_layout).
export function generateStaticParams() {
  return posts.map((p) => ({ id: p.id }));
}

export default function PostPage({ params }: { params: { id: string } }) {
  const post = postById(params.id);
  if (!post) notFound();

  const comentarios = commentsByPost(post.id);

  return (
    <PageContainer>
      <TopBar
        actions={null}
      >
        <Link
          href="/feed"
          aria-label="Voltar"
          className="-ml-1 inline-flex items-center gap-2 rounded-full px-2 py-1 text-base font-semibold text-text transition-colors hover:bg-surface-2"
        >
          <ArrowLeft className="h-5 w-5" aria-hidden="true" />
          Publicação
        </Link>
      </TopBar>

      <div className="p-3">
        <PostCard post={post} />
      </div>

      <CommentsSection iniciais={comentarios} />
    </PageContainer>
  );
}
