"use client";
import { ProductCard } from "@/components/ProductCard";
import { CartDrawer } from "@/components/CartDrawer";

import React from "react";

export function BrandBadge({
  name, active, onClick,
}: { name: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full border text-sm ${
        active ? "bg-black text-white border-black" : "border-black/10"
      }`}
    >
      {name}
    </button>
  );
}
