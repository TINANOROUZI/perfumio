"use client";

import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import type { Product } from "@/types";

type CartItem = Product & { qty: number };

export default function Page() {
  const [all, setAll] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch("/products.json", { cache: "no-store" });
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const data = await r.json();
        setAll(Array.isArray(data) ? data : []);
      } catch (e: any) {
        setErr(e?.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const itemsBest = useMemo(() => {
    // accept "bestseller" as string or in an array, case-sensitive as per your JSON
    const isBest = (t: unknown) =>
      Array.isArray(t) ? t.map(String).includes("bestseller") : t === "bestseller";

    return all
      .filter((p: any) => isBest(p.tag))
      .sort(
        (a: any, b: any) =>
          (a.price ?? Number.POSITIVE_INFINITY) -
          (b.price ?? Number.POSITIVE_INFINITY)
      );
  }, [all]);

  // cart (same pattern you use elsewhere)
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try { return JSON.parse(localStorage.getItem("cart") || "[]"); } catch { return []; }
  });
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);
  const add = (p: Product) =>
    setCart((prev) => {
      const i = prev.findIndex((x) => x.id === p.id);
      if (i > -1) { const cp = [...prev]; cp[i] = { ...cp[i], qty: cp[i].qty + 1 }; return cp; }
      return [...prev, { ...p, qty: 1 }];
    });

  return (
    <div className="pt-14">
      <Navbar onOpenCart={() => setCartOpen(true)} />
      <main className="container-a pt-10 pb-12">
        <h1 className="text-4xl font-display text-center mb-8">
          <span className="grad">Best</span>sellers (Lowest Price First)
        </h1>

        {loading && (
          <div className="p-6 rounded-2xl glass text-center text-white/70">
            Loading bestsellers…
          </div>
        )}

        {err && (
          <div className="p-6 rounded-2xl glass text-center text-red-300">
            {err}
          </div>
        )}

        {!loading && !err && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {itemsBest.map((p) => (
                <ProductCard key={p.id} p={p} onAdd={add} />
              ))}
            </div>

            {itemsBest.length === 0 && (
              <p className="text-center mt-10 text-white/60">
                No bestsellers yet — add <code>"tag": "bestseller"</code> to products in <code>public/products.json</code>.
              </p>
            )}
          </>
        )}
      </main>
      <Footer />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} items={cart} inc={()=>{}} dec={()=>{}} rmv={()=>{}} />
    </div>
  );
}
