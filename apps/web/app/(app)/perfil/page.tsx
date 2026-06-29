import { PageContainer } from "@/components/layout/PageContainer";
import { ProfileView } from "@/components/perfil/ProfileView";
import { currentUser } from "@/data/mock";

export default function PerfilPage() {
  // width "full" => banner ocupa toda a largura da área de conteúdo.
  return (
    <PageContainer width="full">
      <ProfileView user={currentUser} isMe />
    </PageContainer>
  );
}
