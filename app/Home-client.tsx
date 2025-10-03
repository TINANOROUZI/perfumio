"use client";
import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import type { Product } from "@/types";

type CartItem = Product & { qty: number };

const PRODUCTS: Product[] = [
  { id:"p1", brand:"Dior", name:"Sauvage", price:79, category:"Men", img:"https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?q=80&w=1200&auto=format&fit=crop", notes:["Citrus","Fresh"], tag:"New" },
  { id:"p2", brand:"YSL", name:"Libre", price:95, category:"Women", img:"https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1200&auto=format&fit=crop", notes:["Floral","Vanilla"] },
  { id:"p3", brand:"Parfums de Marly", name:"Layton", price:230, category:"Unisex", img:"https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=1200&auto=format&fit=crop", notes:["Warm","Spicy"], tag:"Top" },
  { id:"p4", brand:"Tom Ford", name:"Oud Wood", price:240, category:"Unisex", img:"https://images.unsplash.com/photo-1563170351-be82bc888aa4?q=80&w=1200&auto=format&fit=crop", notes:["Woody","Oud"] },
  { id:"p5", brand:"Versace", name:"Eros", price:66, category:"Men", img:"https://images.unsplash.com/photo-1517433367423-c7e5b0f3540f?q=80&w=1200&auto=format&fit=crop", notes:["Aromatic"] },
  { id:"p6", brand:"Guerlain", name:"Mon Guerlain", price:88, category:"Women", img:"https://images.unsplash.com/photo-1547886599-89473fd6fdc3?q=80&w=1200&auto=format&fit=crop", notes:["Lavender","Vanilla"] },
  { id:"p7", brand:"Creed", name:"Aventus", price:340, category:"Men", img:"https://images.unsplash.com/photo-1585386959984-a41552231658?q=80&w=1200&auto=format&fit=crop", notes:["Fruity","Smoky"] },
  { id:"p8", brand:"Armani", name:"My Way", price:87, category:"Women", img:"https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1200&auto=format&fit=crop", notes:["Floral"] }
];

/** Gold toast helper */
function showToast(msg: string) {
  const el = document.createElement("div");
  el.textContent = msg;
  el.className =
    "fixed left-1/2 -translate-x-1/2 bottom-6 z-[60] px-4 py-2 rounded-lg bg-[#e6c981] text-black shadow-lg";
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1400);
}

export default function StoreClient() {
  const [cartOpen, setCartOpen] = useState(false);
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try { return JSON.parse(localStorage.getItem("cart") || "[]"); } catch { return []; }
  });
  useEffect(() => { if (typeof window !== "undefined") localStorage.setItem("cart", JSON.stringify(items)); }, [items]);

  const add = (p: Product) =>
    setItems((prev) => {
      const i = prev.findIndex((x) => x.id === p.id);
      let next: CartItem[];
      if (i > -1) { next = [...prev]; next[i] = { ...next[i], qty: next[i].qty + 1 }; }
      else { next = [...prev, { ...p, qty: 1 }]; }
      showToast("Added to your bag");
      return next;
    });
  const inc = (id: string) => setItems((prev) => prev.map((x) => x.id === id ? { ...x, qty: x.qty + 1 } : x));
  const dec = (id: string) => setItems((prev) => prev.map((x) => x.id === id ? { ...x, qty: Math.max(1, x.qty - 1) } : x));
  const rmv = (id: string) => setItems((prev) => prev.filter((x) => x.id !== id));

  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<"All" | "Women" | "Men" | "Unisex">("All");
  const [price, setPrice] = useState<[number, number]>([0, 400]);
  const [note, setNote] = useState("All");

  const notes = useMemo(() => Array.from(new Set(PRODUCTS.flatMap(p => p.notes))).sort(), []);
  const filtered = useMemo(() => {
    return PRODUCTS.filter(p =>
      (cat === "All" ? true : p.category === cat) &&
      (note === "All" ? true : p.notes.includes(note)) &&
      p.price >= price[0] && p.price <= price[1] &&
      (query ? (p.name + " " + p.brand).toLowerCase().includes(query.toLowerCase()) : true)
    );
  }, [cat, note, price, query]);

  return (
    <div>
      <Navbar onOpenCart={() => setCartOpen(true)} />

      {/* Hero */}
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
            <a href="#new" className="btn-primary">Shop new in</a>
            <a href="#grid" className="btn-ghost">Browse all</a>
          </div>
        </div>
        <div className="md:col-span-5">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden ring-soft">
            <img
              src="https://images.unsplash.com/photo-1556228724-4c2caaffae6e?q=80&w=1400&auto=format&fit=crop"
              alt="Editorial"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
          </div>
        </div>
      </section>

      {/* Controls */}
      <section className="container-a">
        <div className="grid lg:grid-cols-[280px,1fr] gap-6">
          {/* Filter rail */}
          <aside className="hidden lg:block p-4 rounded-2xl glass h-fit">
            <h4 className="font-semibold mb-3">Filters</h4>
            <label className="text-xs text-white/60">Category</label>
            <select value={cat} onChange={(e)=>setCat(e.target.value as any)} className="mt-1 mb-4 w-full rounded-lg bg-ink ring-soft px-3 py-2 text-sm">
              {["All","Women","Men","Unisex"].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <label className="text-xs text-white/60">Note</label>
            <select value={note} onChange={(e)=>setNote(e.target.value)} className="mt-1 mb-4 w-full rounded-lg bg-ink ring-soft px-3 py-2 text-sm">
              {["All", ...notes].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
            <label className="text-xs text-white/60">Price €{price[0]} – €{price[1]}</label>
            <div className="flex items-center gap-2 mt-1">
              <input type="range" min="0" max="400" value={price[0]} onChange={e=>setPrice([Number(e.target.value), price[1]])} className="w-full"/>
              <input type="range" min="50" max="800" value={price[1]} onChange={e=>setPrice([price[0], Number(e.target.value)])} className="w-full"/>
            </div>
          </aside>

          {/* Content */}
          <div>
            {/* inline search for mobile/desktop */}
            <div className="mb-4">
              <input
                value={query}
                onChange={e=>setQuery(e.target.value)}
                placeholder="Search products…"
                className="w-full rounded-xl ring-soft bg-ink px-3 py-2 outline-none"
              />
            </div>

            {/* Grid */}
            <div id="grid" className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map(p => (
                <ProductCard key={p.id} p={p} onAdd={add} />
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="mt-10 p-6 rounded-2xl glass text-center text-white/70">
                Nothing here — try clearing filters.
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />

      <CartDrawer
        open={cartOpen}
        onClose={()=>setCartOpen(false)}
        items={items}
        inc={inc}
        dec={dec}
        rmv={rmv}
      />
    </div>
  );
}
