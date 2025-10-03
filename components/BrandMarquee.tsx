"use client";
const BRANDS = ["Aesop","Armani","Byredo","Chanel","Creed","Dior","Diptyque","Guerlain","Hermès","Jo Malone","Kayali","Lancôme","Lattafa","Maison Margiela","Mancera","Montale","Mugler","Narciso","Parfums de Marly","Prada","Tom Ford","Valentino","Versace","YSL"];

export default function BrandMarquee() {
  const row = [...BRANDS, ...BRANDS];
  return (
    <div id="brands" className="relative overflow-hidden border-y border-white/10">
      <div className="brand-track whitespace-nowrap flex gap-8 py-4 will-change-transform">
        {row.map((b, i) => (
          <span key={i} className="glass px-4 py-1 text-sm text-neutral-200">{b}</span>
        ))}
      </div>
    </div>
  );
}
