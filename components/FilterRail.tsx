"use client";
export default function FilterRail({
  cat, setCat, price, setPrice, note, setNote
}: {
  cat: string; setCat: (v: string) => void;
  price: [number, number]; setPrice: (v: [number, number]) => void;
  note: string; setNote: (v: string) => void;
}) {
  return (
    <aside className="hidden lg:block sticky top-20 h-fit p-4 rounded-2xl aura-ring bg-neutral-900/60">
      <h4 className="font-semibold mb-3">Filters</h4>

      <label className="text-xs text-neutral-400">Category</label>
      <select
        value={cat}
        onChange={(e) => setCat(e.target.value)}
        className="mt-1 mb-4 w-full rounded-lg bg-neutral-950 aura-ring px-3 py-2 text-sm"
      >
        {["All","Women","Men","Unisex"].map(c => <option key={c} value={c}>{c}</option>)}
      </select>

      <label className="text-xs text-neutral-400">Note</label>
      <select
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="mt-1 mb-4 w-full rounded-lg bg-neutral-950 aura-ring px-3 py-2 text-sm"
      >
        {["All","Floral","Vanilla","Woody","Citrus","Amber","Aromatic","Spicy","Musk"].map(n => <option key={n} value={n}>{n}</option>)}
      </select>

      <label className="text-xs text-neutral-400">Price €{price[0]} – €{price[1]}</label>
      <div className="flex items-center gap-2 mt-1">
        <input type="range" min="0" max="500" value={price[0]} onChange={e=>setPrice([Number(e.target.value), price[1]])} className="w-full"/>
        <input type="range" min="50" max="800" value={price[1]} onChange={e=>setPrice([price[0], Number(e.target.value)])} className="w-full"/>
      </div>
    </aside>
  );
}
