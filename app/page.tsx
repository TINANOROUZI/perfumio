"use client";

import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { Product } from "@/types";

type CartItem = Product & { qty: number };

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadErr, setLoadErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch("/products.json", { cache: "no-store" });
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const data = await r.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (e: any) {
        setLoadErr(e?.message || "Failed to load products.json");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const [cartOpen, setCartOpen] = useState(false);
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try { return JSON.parse(localStorage.getItem("cart") || "[]"); } catch { return []; }
  });
  useEffect(() => { if (typeof window !== "undefined") localStorage.setItem("cart", JSON.stringify(items)); }, [items]);

  const add = (p: Product) =>
    setItems(prev => {
      const i = prev.findIndex(x => x.id === p.id);
      if (i > -1) { const copy = [...prev]; copy[i] = { ...copy[i], qty: copy[i].qty + 1 }; return copy; }
      return [...prev, { ...p, qty: 1 }];
    });
  const inc = (id: string) => setItems(prev => prev.map(x => x.id === id ? { ...x, qty: x.qty + 1 } : x));
  const dec = (id: string) => setItems(prev => prev.map(x => x.id === id ? { ...x, qty: Math.max(1, x.qty - 1) } : x));
  const rmv = (id: string) => setItems(prev => prev.filter(x => x.id !== id));

  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<"All" | "Women" | "Men" | "Unisex">("All");
  const filtered = useMemo(() => products.filter(p => {
    const byCat = cat === "All" ? true : p.category === cat;
    const byQuery = query ? (p.name + " " + p.brand).toLowerCase().includes(query.toLowerCase()) : true;
    return byCat && byQuery;
  }), [products, cat, query]);

  return (
    <div className="pt-14">
      <Navbar onOpenCart={() => setCartOpen(true)} />

      <section className="container-a pt-10 pb-12 grid md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-7">
          <h1 className="text-5xl md:text-6xl font-display leading-[1.05]">
            Discover <span className="grad">Luxury</span> Perfumes
          </h1>
        <p className="mt-4 text-white/70 max-w-xl">
            Shop icons from Dior, Chanel, YSL, Prada, Tom Ford, Gucci & more.
          </p>
          <div className="mt-6">
            <a href="#grid" className="btn btn-primary">Shop now</a>
          </div>
        </div>
        <div className="md:col-span-5 flex justify-center">
          <Image
            src="/vela-logo.png"
            alt="Véla Parfums"
            width={280}
            height={280}
            className="rounded-full border-4 border-[#e6c981] shadow-lg"
            priority
          />
        </div>
      </section>

      <section id="grid" className="container-a pt-8 pb-16">
        <div className="flex flex-wrap gap-3 items-center justify-between mb-6">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products…"
            className="w-full md:w-1/2 rounded-lg bg-ink px-3 py-2 text-sm outline-none"
          />
          <select
            value={cat}
            onChange={(e) => setCat(e.target.value as any)}
            className="rounded-lg bg-ink px-3 py-2 text-sm"
          >
            {["All","Women","Men","Unisex"].map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {loading && <p className="text-center text-white/60">Loading products…</p>}
        {loadErr && <p className="text-center text-red-400">Failed to load products.json — {loadErr}</p>}

        {!loading && !loadErr && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map(p => <ProductCard key={p.id} p={p} onAdd={add} />)}
            </div>
            {filtered.length === 0 && (
              <p className="mt-10 text-center text-white/60">Nothing found — try clearing filters.</p>
            )}
          </>
        )}
      </section>

      <Footer />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} items={items} inc={inc} dec={dec} rmv={rmv} />
    </div>
  );
}
