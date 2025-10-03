"use client";

import Link from "next/link";
import { X } from "lucide-react";

type Product = {
  id: string;
  brand: string;
  name: string;
  price: number | null;
  img: string;
  notes: string[];
  category: "Women" | "Men" | "Unisex";
};

type CartItem = Product & { qty: number };

export default function CartDrawer({
  open,
  onClose,
  items,
  inc,
  dec,
  rmv,
}: {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  inc: (id: string) => void;
  dec: (id: string) => void;
  rmv: (id: string) => void;
}) {
  const subtotal = items.reduce((sum, it) => sum + (it.price ?? 0) * it.qty, 0);

  return (
    <div
      className={`fixed inset-0 z-[70] ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/60 transition-opacity ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Panel */}
      <aside
        className={`absolute right-0 top-0 h-full w-[92%] sm:w-[420px]
          bg-[#0f0f0f] ring-1 ring-white/10 shadow-2xl
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "translate-x-full"}`}
        role="dialog"
        aria-label="Shopping bag"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <h2 className="text-lg font-semibold">Your bag</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-white/10"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Items */}
        <div className="p-4 space-y-3 max-h-[60vh] overflow-auto">
          {items.length === 0 && (
            <p className="text-white/60">Your bag is empty.</p>
          )}

          {items.map((it) => (
            <div
              key={it.id}
              className="flex gap-3 rounded-lg border border-white/10 p-3 bg-white/5"
            >
              <img
                src={it.img}
                alt={it.name}
                className="h-16 w-16 rounded object-contain bg-black/20"
              />
              <div className="flex-1">
                <div className="text-sm text-white/70">{it.brand}</div>
                <div className="font-medium leading-tight">{it.name}</div>
                <div className="mt-1 text-sm">€{it.price ?? 0}</div>
                <div className="mt-2 flex items-center gap-2">
                  <button
                    onClick={() => dec(it.id)}
                    className="h-7 w-7 rounded bg-white/10 hover:bg-white/15"
                    aria-label="Decrease"
                  >
                    –
                  </button>
                  <div className="px-2">{it.qty}</div>
                  <button
                    onClick={() => inc(it.id)}
                    className="h-7 w-7 rounded bg-white/10 hover:bg-white/15"
                    aria-label="Increase"
                  >
                    +
                  </button>
                  <button
                    onClick={() => rmv(it.id)}
                    className="ml-auto text-sm text-red-300 hover:text-red-200"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer / totals */}
        <div className="mt-auto p-4 border-t border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-white/70">Subtotal</span>
            <span className="font-semibold">€{subtotal.toFixed(2)}</span>
          </div>

          {/* Checkout */}
          <Link
            href="/checkout"
            className={`block w-full text-center rounded-xl px-4 py-2.5 font-semibold transition
              ${
                items.length === 0
                  ? "bg-white/10 text-white/60 cursor-not-allowed pointer-events-none"
                  : "bg-gradient-to-b from-[#e6c981] to-[#bfa15e] text-black hover:brightness-110 shadow-[0_8px_30px_-8px_rgba(230,201,129,0.55)]"
              }`}
            onClick={onClose}
          >
            Checkout
          </Link>

          <button
            onClick={onClose}
            className="w-full rounded-xl px-4 py-2 bg-white/10 hover:bg-white/15"
          >
            Continue shopping
          </button>
        </div>
      </aside>
    </div>
  );
}
