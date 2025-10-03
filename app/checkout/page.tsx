"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

export default function CheckoutPage() {
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("cart") || "[]";
      setItems(JSON.parse(raw));
    } catch {
      setItems([]);
    }
  }, []);

  const subtotal = useMemo(
    () => items.reduce((s, it) => s + (it.price ?? 0) * it.qty, 0),
    [items]
  );
  const shipping = subtotal > 0 ? 6.9 : 0;
  const total = subtotal + shipping;

  function toast(msg: string) {
    const t = document.createElement("div");
    t.textContent = msg;
    t.className =
      "fixed left-1/2 -translate-x-1/2 bottom-6 z-[80] px-4 py-2 rounded-lg bg-[#e6c981] text-black shadow-lg";
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 1600);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (items.length === 0) return;

    setSubmitting(true);
    // simulate processing
    await new Promise((r) => setTimeout(r, 900));

    // clear cart and “confirm”
    localStorage.setItem("cart", "[]");
    toast("🎉 Payment successful! Thank you.");
    setSubmitting(false);
    router.push("/?order=success");
  }

  return (
    <main className="min-h-screen pt-16 pb-20 text-white bg-[radial-gradient(1200px_800px_at_20%_10%,rgba(230,201,129,0.08),transparent),radial-gradient(900px_700px_at_80%_50%,rgba(230,201,129,0.06),transparent),#0b0b0b]">
      <section className="container-a max-w-6xl mx-auto px-4">
        {/* Title + back */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl md:text-4xl font-display">
            <span className="bg-gradient-to-r from-[#e6c981] via-[#f0dca7] to-[#bfa15e] bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(230,201,129,0.25)]">
              Checkout
            </span>
          </h1>
          <Link
            href="/"
            className="rounded-lg px-3 py-1.5 text-sm bg-white/10 hover:bg-white/15"
          >
            ← Back to Home
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Payment Card */}
          <div className="relative">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-b from-[#e6c98133] to-transparent blur-lg" />
            <div className="relative rounded-3xl border border-white/10 bg-[#101010]/80 backdrop-blur-xl p-6 sm:p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]">
              <div className="text-center">
                <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-gradient-to-b from-[#e6c981] to-[#bfa15e] shadow-[0_0_24px_rgba(230,201,129,0.45)] grid place-items-center text-black font-bold">
                  V
                </div>
                <h2 className="text-xl font-semibold">Secure Payment</h2>
                <p className="mt-1 text-sm text-white/70">
                  We don’t store card details. This is a demo checkout.
                </p>
              </div>

              <form onSubmit={onSubmit} className="mt-6 space-y-4">
                <div className="grid sm:grid-cols-2 gap-3">
                  <input
                    required
                    type="text"
                    placeholder="Full name"
                    className="w-full px-4 py-2.5 rounded-lg bg-black/30 border border-white/10 focus:border-[#e6c981] outline-none"
                  />
                  <input
                    required
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-2.5 rounded-lg bg-black/30 border border-white/10 focus:border-[#e6c981] outline-none"
                  />
                </div>

                <input
                  required
                  type="text"
                  placeholder="Address"
                  className="w-full px-4 py-2.5 rounded-lg bg-black/30 border border-white/10 focus:border-[#e6c981] outline-none"
                />
                <div className="grid sm:grid-cols-3 gap-3">
                  <input
                    required
                    type="text"
                    placeholder="City"
                    className="w-full px-4 py-2.5 rounded-lg bg-black/30 border border-white/10 focus:border-[#e6c981] outline-none"
                  />
                  <input
                    required
                    type="text"
                    placeholder="ZIP / Postal code"
                    className="w-full px-4 py-2.5 rounded-lg bg-black/30 border border-white/10 focus:border-[#e6c981] outline-none"
                  />
                  <input
                    required
                    type="text"
                    placeholder="Country"
                    className="w-full px-4 py-2.5 rounded-lg bg-black/30 border border-white/10 focus:border-[#e6c981] outline-none"
                  />
                </div>

                {/* Card (mock) */}
                <div className="grid sm:grid-cols-[2fr,1fr,1fr] gap-3">
                  <input
                    required
                    inputMode="numeric"
                    placeholder="Card number"
                    className="w-full px-4 py-2.5 rounded-lg bg-black/30 border border-white/10 focus:border-[#e6c981] outline-none"
                  />
                  <input
                    required
                    placeholder="MM/YY"
                    className="w-full px-4 py-2.5 rounded-lg bg-black/30 border border-white/10 focus:border-[#e6c981] outline-none"
                  />
                  <input
                    required
                    placeholder="CVC"
                    className="w-full px-4 py-2.5 rounded-lg bg-black/30 border border-white/10 focus:border-[#e6c981] outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={items.length === 0 || submitting}
                  className={`w-full rounded-xl px-4 py-2.5 font-semibold transition shadow-[0_8px_30px_-8px_rgba(230,201,129,0.55)]
                    ${
                      items.length === 0 || submitting
                        ? "bg-white/10 text-white/60 cursor-not-allowed"
                        : "bg-gradient-to-b from-[#e6c981] to-[#bfa15e] text-black hover:brightness-110"
                    }`}
                >
                  {submitting ? "Processing…" : `Pay €${total.toFixed(2)}`}
                </button>

                <p className="text-xs text-white/60 text-center">
                  By placing the order you agree to our Terms & Privacy.
                </p>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="rounded-3xl border border-white/10 p-6 bg-white/[0.035] backdrop-blur">
            <h3 className="text-lg font-semibold mb-4">Order summary</h3>

            {items.length === 0 ? (
              <p className="text-white/60">
                Your bag is empty.{" "}
                <Link href="/" className="text-[#e6c981] underline">
                  Continue shopping
                </Link>
              </p>
            ) : (
              <>
                <div className="space-y-3 max-h-[48vh] overflow-auto pr-1">
                  {items.map((it) => (
                    <div
                      key={it.id}
                      className="flex items-center gap-3 border border-white/10 rounded-lg p-3 bg-white/5"
                    >
                      <img
                        src={it.img}
                        alt={it.name}
                        className="h-14 w-14 rounded object-contain bg-black/20"
                      />
                      <div className="flex-1">
                        <div className="text-sm text-white/70">{it.brand}</div>
                        <div className="text-sm font-medium leading-tight">
                          {it.name}
                        </div>
                        <div className="text-xs text-white/60">
                          Qty: {it.qty}
                        </div>
                      </div>
                      <div className="font-medium">€{((it.price ?? 0) * it.qty).toFixed(2)}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/70">Subtotal</span>
                    <span>€{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Shipping</span>
                    <span>€{shipping.toFixed(2)}</span>
                  </div>
                  <div className="h-px bg-white/10 my-2" />
                  <div className="flex justify-between text-base font-semibold">
                    <span>Total</span>
                    <span>€{total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <Link
                    href="/"
                    className="inline-block rounded-lg px-4 py-2 bg-white/10 hover:bg-white/15"
                  >
                    ← Keep shopping
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
