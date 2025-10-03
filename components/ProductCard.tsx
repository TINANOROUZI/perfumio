"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import type { Product } from "@/types";

// Small toast utility
function showToast(msg: string) {
  const el = document.createElement("div");
  el.textContent = msg;
  el.className =
    "fixed left-1/2 -translate-x-1/2 bottom-6 z-[60] px-4 py-2 rounded-lg bg-[#e6c981] text-black shadow-lg";
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1500);
}

// Validate image URLs
function isValidSrc(src: unknown): src is string {
  if (typeof src !== "string" || !src.trim()) return false;
  if (src.startsWith("/")) return true; // allow local /public files
  try {
    const u = new URL(src);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

export default function ProductCard({
  p,
  onAdd,
}: {
  p: Product & { comingSoon?: boolean | null; tag?: string | string[] };
  onAdd: (p: Product) => void;
}) {
  const isComing =
    Boolean(p.comingSoon) || p.price === null || p.price === undefined;

  const initialSrc = useMemo(() => {
    return isValidSrc(p.img) ? p.img : "/vela-circle.png";
  }, [p.img]);

  const [src, setSrc] = useState(initialSrc);

  const isNew = Array.isArray(p.tag) ? p.tag.includes("New") : p.tag === "New";

  // Add to cart handler with toast
  const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // stop navigation
    e.stopPropagation();
    if (isComing) return;
    onAdd(p);
    showToast("🛍️ Added to your bag");
  };

  return (
    <div className="rounded-2xl bg-[#111] ring-soft p-3 hover:-translate-y-0.5 transition">
      {/* Image with link (singular: /product/[id]) */}
      <Link href={`/product/${p.id}`} className="block">
        <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-black/30">
          {isNew && (
            <span className="absolute left-2 top-2 rounded-md px-2 py-1 text-[10px] font-semibold bg-[#e6c981] text-black">
              NEW
            </span>
          )}
          <img
            src={src}
            alt={p.name}
            loading="lazy"
            className="w-full h-full object-contain"
            onError={() => setSrc("/vela-circle.png")}
          />
        </div>
      </Link>

      {/* Text with link (singular: /product/[id]) */}
      <div className="mt-3">
        <div className="text-xs text-white/60">{p.brand}</div>
        <Link href={`/product/${p.id}`} className="block hover:underline">
          <div className="font-medium leading-snug">{p.name}</div>
        </Link>
        <div className="mt-1 font-semibold">
          {isComing ? (
            <span className="text-[#e6c981]">Coming soon…</span>
          ) : (
            <>€{p.price}</>
          )}
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={handleAdd}
        disabled={isComing}
        className={`mt-3 w-full rounded-xl px-3 py-2 font-medium transition ${
          isComing
            ? "bg-white/10 text-white/60 cursor-not-allowed"
            : "bg-[#e6c981] text-black hover:bg-[#d6b96e]"
        }`}
      >
        {isComing ? "Coming soon" : "Add to cart"}
      </button>
    </div>
  );
}
