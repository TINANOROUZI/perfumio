"use client";
import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import Image from "next/image";
import type { Product } from "@/types";

type CartItem = Product & { qty: number };

export default function StoreClient() {
  /* ===========================
     PRODUCTS (loaded from /public/products.json)
     =========================== */
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadErr, setLoadErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await fetch("/products.json", { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const safe = Array.isArray(data)
          ? data
              .filter(
                (p: any) =>
                  p &&
                  typeof p.id === "string" &&
                  typeof p.brand === "string" &&
                  typeof p.name === "string" &&
                  typeof p.price === "number" &&
                  typeof p.img === "string" &&
                  Array.isArray(p.notes) &&
                  typeof p.category === "string"
              )
              .map((p: any) => ({
                id: p.id,
                brand: p.brand,
                name: p.name,
                price: p.price as number,
                img: p.img,
                notes: p.notes as string[],
                category: p.category as Product["category"],
                tag: p.tag,
              }))
          : [];
        setProducts(safe);
      } catch (e: any) {
        setLoadErr(e?.message || "Failed to load products.json");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* ===========================
     CART (localStorage)
     =========================== */
  const [cartOpen, setCartOpen] = useState(false);
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(localStorage.getItem("cart") || "[]");
    } catch {
      return [];
    }
  });
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(items));
    }
  }, [items]);

  /* ===========================
     TOAST
     =========================== */
  const [toast, setToast] = useState<string | null>(null);
  const add = (p: Product) => {
    setItems((prev) => {
      const i = prev.findIndex((x) => x.id === p.id);
      if (i > -1) {
        const copy = [...prev];
        copy[i] = { ...copy[i], qty: copy[i].qty + 1 };
        return copy;
      }
      return [...prev, { ...p, qty: 1 }];
    });
    setToast(`${p.name} added to your bag 🛍️`);
    setTimeout(() => setToast(null), 3000);
  };
  const inc = (id: string) =>
    setItems((prev) => prev.map((x) => (x.id === id ? { ...x, qty: x.qty + 1 } : x)));
  const dec = (id: string) =>
    setItems((prev) => prev.map((x) => (x.id === id ? { ...x, qty: Math.max(1, x.qty - 1) } : x)));
  const rmv = (id: string) => setItems((prev) => prev.filter((x) => x.id !== id));

  /* ===========================
     SEARCH / FILTERS
     =========================== */
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<"All" | "Women" | "Men" | "Unisex">("All");
  const [price, setPrice] = useState<[number, number]>([0, 400]);
  const [note, setNote] = useState("All");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const notes = useMemo(
    () => Array.from(new Set(products.flatMap((p) => p.notes ?? []))).sort(),
    [products]
  );

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const byCat = cat === "All" ? true : p.category === cat;
      const byNote = note === "All" ? true : (p.notes?.includes(note) ?? false);
      const byPrice = p.price != null && p.price >= price[0] && p.price <= price[1];
      const byQuery = query
        ? (p.name + " " + p.brand).toLowerCase().includes(query.toLowerCase())
        : true;
      return byCat && byNote && byPrice && byQuery;
    });
  }, [products, cat, note, price, query]);

  /* ===========================
     REVEAL ON "SHOP NOW"
     =========================== */
  const [showShop, setShowShop] = useState(false);

  function handleShopNow(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    if (!showShop) setShowShop(true);
    // Scroll after render
    setTimeout(() => {
      const grid = document.getElementById("grid");
      if (grid) grid.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 40);
  }

  return (
    <div className="pt-14">
      <Navbar onOpenCart={() => setCartOpen(true)} />

      {/* HERO */}
      <section className="container-a pt-10 pb-8 grid md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-7">
          <h1 className="text-5xl md:text-6xl font-display leading-[1.05]">
            A <span className="grad">signature</span> scent for every story.
          </h1>
          <p className="mt-4 text-white/70 max-w-xl">
            Editorial curation of designer & niche fragrances plus modern cosmetics.
            Limited drops, timeless icons, and trusted essentials.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="#grid" onClick={handleShopNow} className="btn btn-primary">
              Shop now
            </a>
            <a
              href="#filters"
              onClick={(e) => {
                e.preventDefault();
                if (!showShop) setShowShop(true);
                setTimeout(() => {
                  document.getElementById("filters")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }, 40);
              }}
              className="btn btn-ghost"
            >
              Filter
            </a>
          </div>
        </div>

        {/* Right: small circular logo with glow */}
        <div className="md:col-span-5 flex items-center justify-center">
          <Image
            src="/vela-circle.png"
            alt="Véla Parfums de Luxe"
            width={220}
            height={220}
            className="rounded-full object-contain drop-shadow-[0_0_18px_rgba(230,201,129,0.75)]"
            priority
          />
        </div>
      </section>

      {/* ===== CONTENT (hidden until Shop now) ===== */}
      <section
        className={[
          "container-a shop-reveal transition-all duration-700 mt-16 md:mt-24",
          showShop ? "show" : "",
        ].join(" ")}
      >
        {/* Mobile gold filter toggle */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setMobileFiltersOpen((v) => !v)}
            className="w-full rounded-lg px-4 py-2 bg-[#e6c981] text-black font-semibold hover:bg-[#d6b96e] transition"
            aria-expanded={mobileFiltersOpen}
            aria-controls="mobile-filters"
          >
            {mobileFiltersOpen ? "Hide filters" : "Show filters"}
          </button>

          {mobileFiltersOpen && (
            <div
              id="mobile-filters"
              className="mt-3 rounded-xl p-4 shadow-lg bg-gradient-to-b from-[#e6c981]/95 to-[#d6b96e]/85 text-black"
            >
              <label className="text-xs font-medium text-black/80">Search</label>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products…"
                className="mt-1 mb-4 w-full rounded-md border border-black/20 bg-white/85 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/30"
              />

              <label className="text-xs font-medium text-black/80">Category</label>
              <select
                value={cat}
                onChange={(e) => setCat(e.target.value as any)}
                className="mt-1 mb-4 w-full rounded-md border border-black/20 bg-white/85 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/30"
              >
                {["All", "Women", "Men", "Unisex"].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>

              <label className="text-xs font-medium text-black/80">Note</label>
              <select
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="mt-1 mb-4 w-full rounded-md border border-black/20 bg-white/85 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/30"
              >
                {["All", ...notes].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>

              <label className="text-xs font-medium text-black/80">
                Price €{price[0]} – €{price[1]}
              </label>
              <div className="mt-1 flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max="400"
                  value={price[0]}
                  onChange={(e) => setPrice([Number(e.target.value), price[1]])}
                  className="w-full accent-black"
                />
                <input
                  type="range"
                  min="50"
                  max="800"
                  value={price[1]}
                  onChange={(e) => setPrice([price[0], Number(e.target.value)])}
                  className="w-full accent-black"
                />
              </div>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-[280px,1fr] gap-6">
          {/* Desktop filter rail */}
          <aside
            id="filters"
            className="hidden lg:block p-5 rounded-xl bg-gradient-to-b from-[#e6c981]/90 to-[#d6b96e]/80 text-black shadow-lg h-fit"
          >
            <h4 className="font-semibold mb-3 text-lg">Filters</h4>

            <label className="text-xs font-medium text-black/80">Category</label>
            <select
              value={cat}
              onChange={(e) => setCat(e.target.value as any)}
              className="mt-1 mb-4 w-full rounded-md border border-black/20 px-3 py-2 text-sm bg-white/70 focus:ring-2 focus:ring-black/40"
            >
              {["All", "Women", "Men", "Unisex"].map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            <label className="text-xs font-medium text-black/80">Note</label>
            <select
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="mt-1 mb-4 w-full rounded-md border border-black/20 px-3 py-2 text-sm bg-white/70 focus:ring-2 focus:ring-black/40"
            >
              {["All", ...notes].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>

            <label className="text-xs font-medium text-black/80">
              Price €{price[0]} – €{price[1]}
            </label>
            <div className="flex items-center gap-2 mt-1">
              <input
                type="range"
                min="0"
                max="400"
                value={price[0]}
                onChange={(e) => setPrice([Number(e.target.value), price[1]])}
                className="w-full accent-black"
              />
              <input
                type="range"
                min="50"
                max="800"
                value={price[1]}
                onChange={(e) => setPrice([price[0], Number(e.target.value)])}
                className="w-full accent-black"
              />
            </div>
          </aside>

          {/* Products */}
          <div>
            {/* Desktop helper search */}
            <div className="mb-4 hidden lg:block">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products…"
                className="w-full rounded-xl ring-soft bg-ink px-3 py-2 outline-none"
              />
            </div>

            {/* Loading / Error */}
            {loading && (
              <div className="p-6 rounded-2xl glass text-center text-white/70">
                Loading products…
              </div>
            )}
            {loadErr && (
              <div className="p-6 rounded-2xl glass text-center text-red-300">
                Failed to load products.json — {loadErr}
              </div>
            )}

            {/* Grid */}
            {!loading && !loadErr && (
              <>
                <div id="grid" className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filtered.map((p, i) => (
                    <div
                      key={p.id}
                      className={`card-anim ${showShop ? "play" : ""}`}
                      style={{ animationDelay: showShop ? `${i * 80}ms` : "0ms" }}
                    >
                      <ProductCard p={p} onAdd={add} />
                    </div>
                  ))}
                </div>

                {filtered.length === 0 && (
                  <div className="mt-10 p-6 rounded-2xl glass text-center text-white/70">
                    Nothing here — try clearing filters.
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#e6c981] text-black px-6 py-3 rounded-xl shadow-lg z-50">
          {toast}
        </div>
      )}

      <Footer />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={items}
        inc={inc}
        dec={dec}
        rmv={rmv}
      />
    </div>
  );
}
