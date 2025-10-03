"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Product = {
  id: string;
  brand: string;
  name: string;
  price: number | null;
  img: string;
  notes: string[];
  category: "Women" | "Men" | "Unisex";
  tag?: string | string[];
  description?: string;
};

type Meta = {
  scentFamily?: string;
  description?: string;
  keyNotes?: string[];
};

// GOLD metadata for product detail pages.
// Keys MUST match the "id" in public/products.json.
const META: Record<string, Meta> = {
  /* =======================
     DIOR
     ======================= */
  sauvage: {
    scentFamily: "Fresh, Citrus, and Woody",
    description:
      "An instantly recognizable and powerfully fresh scent, inspired by wild, open spaces. Bright citrus opens into peppery spice and a deep ambery woodiness—bold, confident, and versatile.",
    keyNotes: ["Calabrian Bergamot", "Sichuan Pepper", "Ambroxan"],
  },
  "dior-homme": {
    scentFamily: "Woody Floral Musk",
    description:
      "Sophisticated and elegant with a powdery, buttery Iris over creamy woods and musks—refined and ideal for evening wear.",
    keyNotes: ["Tuscan Iris", "Ambrette Seed", "Virginia Cedarwood", "Lavender", "Vanilla"],
  },
  fahrenheit: {
    scentFamily: "Aromatic Fougere (Woody/Leather signature)",
    description:
      "A distinctive contrast of warm and cold: petrol-like Violet Leaf over fresh citrus, melting into sensual Leather and Cedar.",
    keyNotes: ["Violet Leaf", "Mandarin", "Leather", "Nutmeg Flower", "Cedar"],
  },
  "miss-dior": {
    scentFamily: "Warm Floral",
    description:
      "A luxurious bouquet led by a honeyed Centifolia Rose wrapped in creamy florals—chic, feminine, and celebratory.",
    keyNotes: ["Rose", "Lily-of-the-Valley", "Iris", "Peony", "Vanilla", "Musk"],
  },
  jadore: {
    scentFamily: "Warm Floral",
    description:
      "An intensely sensual, enveloping take on J’adore where Grasse Tuberose amplifies the classic bouquet for a captivating, infinite trail.",
    keyNotes: ["Centifolia Rose", "Sambac Jasmine", "Ylang-Ylang", "Tuberose", "Sandalwood"],
  },
  "dior-addict-eau-fraiche-2024": {
    scentFamily: "Fresh Floral",
    description:
      "Flirty and optimistic—sparkling citrus over fresh florals, soothed by soft woods and musk.",
    keyNotes: ["Bergamot", "Grapefruit", "Orange", "Freesia", "Lily of the Valley", "Lotus", "Sandalwood", "White Musk"],
  },

  /* =======================
     CHANEL
     ======================= */
  "bleu-chanel": {
    scentFamily: "Woody Aromatic",
    description:
      "The ultimate versatile ‘blue’ fragrance—bright grapefruit freshness over elegant, smoky woods.",
    keyNotes: ["Grapefruit", "Lemon", "Mint", "Ginger", "Incense", "Cedar"],
  },
  "chanel-no5": {
    scentFamily: "Floral Aldehyde",
    description:
      "Timeless and sophisticated—sparkling aldehydes crown a classic bouquet of rose and jasmine over a warm, powdery base.",
    keyNotes: ["Aldehydes", "Ylang-Ylang", "Neroli", "Rose", "Jasmine", "Sandalwood", "Vanilla"],
  },
  coco: {
    // Coco Mademoiselle
    scentFamily: "Oriental Floral",
    description:
      "Irresistibly sexy and spirited—a modern composition with a fresh yet strong character.",
    keyNotes: ["Orange", "Mandarin", "Jasmine", "Rose", "Patchouli", "Vetiver", "Vanilla"],
  },
  allure: {
    // Allure Homme Sport (Cologne)
    scentFamily: "Citrus Aromatic",
    description:
      "A fresh, invigorating boost for the active man—generous citrus brightness with subtle resinous spice over clean woods and musk.",
    keyNotes: ["Lemon", "Bergamot", "Orange", "Grapefruit", "Fir Resin", "Elemi", "Cedar", "White Musk"],
  },
  chance: {
    // Chance Eau Tendre
    scentFamily: "Floral-Fruity",
    description:
      "Delicate, tender, and radiant—soft fruit and airy florals create a whirlwind of happiness.",
    keyNotes: ["Grapefruit-Quince", "Jasmine", "White Musk"],
  },
  gabrielle: {
    // Gabrielle Essence
    scentFamily: "Luminous White Floral",
    description:
      "A voluptuous, intensely feminine interpretation—an imaginary flower crafted from four luminous white florals.",
    keyNotes: ["Jasmine", "Ylang-Ylang", "Orange Blossom", "Grasse Tuberose"],
  },

  /* =======================
     YSL
     ======================= */
  libre: {
    scentFamily: "Floral (The fragrance of freedom)",
    description:
      "Bold and liberated—French lavender fused with sensual Moroccan orange blossom for a long-lasting, modern floral.",
    keyNotes: ["French Lavender", "Moroccan Orange Blossom", "Musk Accord"],
  },
  "black-opium": {
    scentFamily: "Warm & Spicy Gourmand",
    description:
      "Seductively intoxicating—the thrill of black coffee wrapped in creamy vanilla and white florals.",
    keyNotes: ["Black Coffee", "Vanilla", "Jasmine", "Orange Blossom", "Patchouli", "Cedarwood"],
  },
  "ysl-y": {
    scentFamily: "Fresh & Woody",
    description:
      "A bold, modern masculinity—sparkling bergamot and ginger sharpened by apple, over aromatic herbs and rugged woods.",
    keyNotes: ["Bergamot", "Ginger", "Apple", "Sage", "Geranium", "Vetiver", "Woods"],
  },
  lanuit: {
    // La Nuit de L’Homme
    scentFamily: "Woody Spicy",
    description:
      "Subtle, sophisticated, and romantic—fresh spices over creamy woods and earthy depth; perfect for nights out.",
    keyNotes: ["Cardamom", "Bergamot", "Lavender", "Cedarwood", "Vetiver", "Coumarin"],
  },
  monparis: {
    scentFamily: "Floral & Fruity",
    description:
      "Light, enchanting, and unmistakably French—red berries, luminous florals, and airy white musk.",
    keyNotes: ["Red Berries", "White Datura", "White Musk"],
  },
  "black-opium-small": {
    scentFamily: "Warm & Spicy Gourmand",
    description:
      "The iconic Black Opium in a petite format—same addictive coffee-vanilla signature.",
    keyNotes: ["Black Coffee", "Vanilla", "White Flowers"],
  },
  "ysl-black-opium-over-red": {
    scentFamily: "Gourmand Fruity (2024 flanker)",
    description:
      "A daring cherry twist on the iconic signature—juicy red facets over tea, florals, and the famous coffee-vanilla base.",
    keyNotes: ["Green Mandarin", "Cherry", "Black Tea", "Orange Blossom", "Jasmine", "Coffee", "Patchouli", "Madagascar Vanilla"],
  },

  /* =======================
     PRADA
     ======================= */
  "prada-paradoxe": {
    scentFamily: "Floral Ambery Woody",
    description:
      "The paradox of delicate power—jasmine superinfusion meets warm Ambrofix™ and an addictive moss accord.",
    keyNotes: ["Jasmine Superinfusion", "Ambrofix™", "Moss Accord"],
  },
  "prada-luna": {
    scentFamily: "Aromatic Mineral",
    description:
      "Engineered freshness—metallic lavender with green citrus over radiant patchouli and dry ambroxan.",
    keyNotes: ["Lavender (metallic)", "Vert de Bergamote", "Patchouli", "Ambroxan"],
  },

  /* =======================
     GUCCI / TOM FORD / CREED / HYBRID
     ======================= */
  "gucci-flora-gorgeous-magnolia": {
    scentFamily: "Chypre Floral",
    description:
      "Lush and luminous—dewy fruits and radiant magnolia over musk and blonde woods.",
    keyNotes: ["Dewberry", "Coconut", "Magnolia", "Jasmine Sambac", "Clary Sage", "Musk", "Patchouli", "Blonde Woods"],
  },
  "tom-ford-soleil-brulant": {
    scentFamily: "Floral Oriental (Sun-kissed)",
    description:
      "Like sun on skin at a private beach—floral and fresh yet deeply warm with honeyed and resinous woods.",
    keyNotes: ["Bergamot", "Mandarin", "Pink Pepper", "Orange Flower Absolute", "Black Honey", "Woods", "Amber", "Leather", "Vetiver", "Resin"],
  },
  "creed-carmina": {
    scentFamily: "Floral Amber (Modern)",
    description:
      "Velvety rose and black cherry with a saffron glow—sumptuous and magnetic.",
    keyNotes: ["Rose", "Black Cherry", "Saffron"],
  },
  position: {
    scentFamily: "Sweet Floral Amber",
    description:
      "A juicy, romantic composition—plum and mixed berries over a heart of carnation, jasmine, and honeyed incense, finishing warm and creamy.",
    keyNotes: ["Plum", "Mixed Berries", "Carnation", "Jasmine", "Honey Incense", "Cinnamon", "Amber", "Heliotrope", "Cedar", "Vanilla"],
  },
};

export default function ProductPage({ params }: { params: { id: string } }) {
  const { id } = params;

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
        setErr(e?.message || "Failed to load");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const p = useMemo(() => all.find((x) => x.id === id), [all, id]);
  const meta = META[id] || {};

  function addToCart(product: Product) {
    try {
      const raw = localStorage.getItem("cart") || "[]";
      const cart: Array<Product & { qty: number }> = JSON.parse(raw);
      const i = cart.findIndex((x) => x.id === product.id);
      if (i > -1) cart[i].qty += 1;
      else cart.push({ ...product, qty: 1 });
      localStorage.setItem("cart", JSON.stringify(cart));
      const toast = document.createElement("div");
      toast.textContent = "Added to your bag";
      toast.className =
        "fixed left-1/2 -translate-x-1/2 bottom-6 z-[60] px-4 py-2 rounded-lg bg-[#e6c981] text-black shadow-lg";
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 1400);
      window.dispatchEvent(new StorageEvent("storage", { key: "cart" }));
    } catch {}
  }

  if (loading)
    return <div className="container-a pt-24 pb-16 text-white/70">Loading…</div>;

  if (err)
    return (
      <div className="container-a pt-24 pb-16 text-red-300">Error: {err}</div>
    );

  if (!p)
    return (
      <div className="container-a pt-24 pb-16">
        <h1 className="text-2xl mb-3">Not found</h1>
        <Link href="/" className="text-[#e6c981] underline">
          ← Back to home
        </Link>
      </div>
    );

  return (
    <div className="container-a pt-20 pb-16 grid md:grid-cols-12 gap-8">
      {/* IMAGE */}
      <div className="md:col-span-6">
        <div className="rounded-2xl overflow-hidden ring-1 ring-white/10 bg-ink">
          <Image
            src={p.img}
            alt={`${p.brand} ${p.name}`}
            width={1200}
            height={1200}
            className="w-full h-auto object-contain"
            priority
          />
        </div>
      </div>

      {/* INFO */}
      <div className="md:col-span-6">
        <Link href="/" className="text-sm text-white/60 hover:text-white">
          ← Back to Home
        </Link>

        <h1 className="mt-2 text-3xl md:text-4xl font-display">{p.name}</h1>
        <p className="mt-1 text-white/70">
          {p.brand} • {p.category}
        </p>

        <div className="mt-4">
          {p.price === null ? (
            <span className="inline-block rounded-md bg-white/10 px-3 py-1">
              Coming soon…
            </span>
          ) : (
            <span className="text-2xl font-semibold">€{p.price}</span>
          )}
        </div>

        {/* GOLD SECTIONS */}
        {(meta.scentFamily || meta.description || meta.keyNotes?.length) && (
          <div className="mt-8 space-y-5">
            {meta.scentFamily && (
              <div>
                <div className="text-sm uppercase tracking-wide text-[#e6c981]">
                  Scent Family
                </div>
                <div className="mt-1 text-white/85">{meta.scentFamily}</div>
              </div>
            )}

            {meta.description && (
              <div>
                <div className="text-sm uppercase tracking-wide text-[#e6c981]">
                  Description
                </div>
                <p className="mt-1 text-white/80 leading-relaxed">
                  {meta.description}
                </p>
              </div>
            )}

            {meta.keyNotes && meta.keyNotes.length > 0 && (
              <div>
                <div className="text-sm uppercase tracking-wide text-[#e6c981]">
                  Key Notes
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {meta.keyNotes.map((n) => (
                    <span
                      key={n}
                      className="text-xs px-2 py-1 rounded-md border border-[#e6c981]/60 text-[#e6c981]"
                    >
                      {n}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-8 flex gap-3">
          <button
            onClick={() => addToCart(p)}
            className="rounded-xl px-4 py-2 font-medium bg-[#e6c981] text-black hover:bg-[#d6b96e] transition"
          >
            Add to bag
          </button>
          <Link
            href="/"
            className="rounded-xl px-4 py-2 font-medium bg-white/10 hover:bg-white/15 transition"
          >
            Keep shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
import BackHomeButton from "@/components/BackHomeButton";

