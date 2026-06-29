import { Card } from "@/components/ui/Card";
import type { UserStats } from "@fisgou/shared";

const labels: { key: keyof UserStats; label: string }[] = [
  { key: "peixes", label: "Peixes" },
  { key: "especies", label: "Espécies" },
  { key: "amigos", label: "Amigos" },
];

/** Linha de estatísticas do perfil (Peixes / Espécies / Amigos). */
export function StatRow({ stats }: { stats: UserStats }) {
  return (
    <Card className="grid grid-cols-3 divide-x divide-border">
      {labels.map(({ key, label }) => (
        <div key={key} className="px-2 py-3 text-center">
          <div className="text-xl font-bold leading-none">{stats[key]}</div>
          <div className="mt-1 text-xs text-text-2">{label}</div>
        </div>
      ))}
    </Card>
  );
}
