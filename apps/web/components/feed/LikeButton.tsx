"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/cn";

/** Botão de curtir com "pop" e contador otimista (mock por enquanto). */
export function LikeButton({ curtidas }: { curtidas: number }) {
  const [liked, setLiked] = useState(false);
  const [animar, setAnimar] = useState(false);

  function toggle() {
    setLiked((v) => !v);
    setAnimar(true);
  }

  const total = curtidas + (liked ? 1 : 0);

  return (
    <button
      type="button"
      aria-pressed={liked}
      aria-label="Curtir"
      onClick={toggle}
      className={cn(
        "inline-flex items-center gap-1.5 text-sm transition-colors",
        liked ? "text-red-500" : "hover:text-text",
      )}
    >
      <Heart
        className={cn("h-5 w-5", liked && "fill-current", animar && "animate-pop")}
        aria-hidden="true"
        onAnimationEnd={() => setAnimar(false)}
      />
      <span>{total}</span>
    </button>
  );
}
