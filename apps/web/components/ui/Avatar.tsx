import { cn } from "@/lib/cn";

interface AvatarProps {
  iniciais: string;
  cor: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  /** Anel de contorno (útil em avatares sobrepostos). */
  ring?: boolean;
}

const sizes: Record<NonNullable<AvatarProps["size"]>, string> = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-14 w-14 text-base",
  xl: "h-24 w-24 text-2xl",
};

/** Avatar placeholder com iniciais sobre cor sólida (até existir foto). */
export function Avatar({
  iniciais,
  cor,
  size = "md",
  className,
  ring,
}: AvatarProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-white",
        sizes[size],
        ring && "ring-2 ring-surface",
        className,
      )}
      style={{ backgroundColor: cor }}
      aria-hidden="true"
    >
      {iniciais}
    </span>
  );
}
