"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

function toast(msg: string) {
  const el = document.createElement("div");
  el.textContent = msg;
  el.className =
    "fixed left-1/2 -translate-x-1/2 bottom-6 z-[60] px-4 py-2 rounded-lg bg-[#e6c981] text-black shadow-lg";
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1400);
}

export default function PaymentPage() {
  // read subtotal from cart (localStorage) for display
  const [total, setTotal] = useState(0);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("cart") || "[]";
      const cart = JSON.parse(raw) as Array<{ price: number | null; qty: number }>;
      const sum = cart.reduce((s, i) => s + (i.price ?? 0) * (i.qty ?? 0), 0);
      setTotal(sum);
    } catch {
      setTotal(0);
    }
  }, []);

  const [loading, setLoading] = useState(false);

  return (
    <main className="min-h-screen pt-16 bg-[radial-gradient(1200px_800px_at_20%_10%,rgba(230,201,129,0.08),transparent),radial-gradient(900px_700px_at_80%_50%,rgba(230,201,129,0.06),transparent),#0b0b0b] text-white">
      <section className="container-a max-w-6xl mx-auto px-4 pb-16">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl md:text-4xl font-display">
            Secure <span className="bg-gradient-to-r from-[#e6c981] via-[#f0dca7] to-[#bfa15e] bg-clip-text text-transparent">Payment</span>
          </h1>
          <div className="flex gap-3">
            <Link href="/checkout" className="text-[#e6c981] hover:underline">← Back to bag</Link>
            <Link href="/" className="text-[#e6c981] hover:underline">Home</Link>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr,380px] gap-8">
          {/* Payment form */}
          <div className="relative">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-b from-[#e6c98133] to-transparent blur-lg" />
            <form
              className="relative rounded-3xl border border-white/10 bg-[#0f0f0f]/80 backdrop-blur-xl p-6 sm:p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                if (loading) return;
                setLoading(true);
                toast("Processing payment…");
                setTimeout(() => {
                  toast("🎉 Payment complete (demo)");
                  // clear cart
                  localStorage.setItem("cart", "[]");
                  // go to home
                  window.location.href = "/";
                }, 1200);
              }}
            >
              <div className="text-center">
                <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-gradient-to-b from-[#e6c981] to-[#bfa15e] shadow-[0_0_24px_rgba(230,201,129,0.45)] grid place-items-center text-black font-bold">
                  €
                </div>
                <p className="text-white/70 text-sm">
                  This is a demo checkout. No real charges.
                </p>
              </div>

              {/* Contact */}
              <div>
                <div className="text-sm uppercase tracking-wide text-[#e6c981] mb-2">Contact</div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <input
                    required
                    placeholder="First name"
                    className="w-full px-4 py-2.5 rounded-lg bg-black/30 border border-white/10 focus:border-[#e6c981] outline-none"
                  />
                  <input
                    required
                    placeholder="Last name"
                    className="w-full px-4 py-2.5 rounded-lg bg-black/30 border border-white/10 focus:border-[#e6c981] outline-none"
                  />
                </div>
                <input
                  type="email"
                  required
                  placeholder="Email address"
                  className="mt-3 w-full px-4 py-2.5 rounded-lg bg-black/30 border border-white/10 focus:border-[#e6c981] outline-none"
                />
              </div>

              {/* Shipping */}
              <div>
                <div className="text-sm uppercase tracking-wide text-[#e6c981] mb-2">Shipping</div>
                <input
                  required
                  placeholder="Street address"
                  className="w-full px-4 py-2.5 rounded-lg bg-black/30 border border-white/10 focus:border-[#e6c981] outline-none"
                />
                <div className="grid sm:grid-cols-3 gap-3 mt-3">
                  <input
                    required
                    placeholder="City"
                    className="w-full px-4 py-2.5 rounded-lg bg-black/30 border border-white/10 focus:border-[#e6c981] outline-none"
                  />
                  <input
                    required
                    placeholder="State / Province"
                    className="w-full px-4 py-2.5 rounded-lg bg-black/30 border border-white/10 focus:border-[#e6c981] outline-none"
                  />
                  <input
                    required
                    placeholder="Postal code"
                    className="w-full px-4 py-2.5 rounded-lg bg-black/30 border border-white/10 focus:border-[#e6c981] outline-none"
                  />
                </div>
              </div>

              {/* Card details (mock inputs) */}
              <div>
                <div className="text-sm uppercase tracking-wide text-[#e6c981] mb-2">Card</div>
                <input
                  required
                  inputMode="numeric"
                  placeholder="Card number"
                  className="w-full px-4 py-2.5 rounded-lg bg-black/30 border border-white/10 focus:border-[#e6c981] outline-none"
                />
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <input
                    required
                    placeholder="MM / YY"
                    className="w-full px-4 py-2.5 rounded-lg bg-black/30 border border-white/10 focus:border-[#e6c981] outline-none"
                  />
                  <input
                    required
                    placeholder="CVC"
                    className="w-full px-4 py-2.5 rounded-lg bg-black/30 border border-white/10 focus:border-[#e6c981] outline-none"
                  />
                </div>
                <div className="mt-3 flex items-center gap-2 text-xs text-white/70">
                  <input type="checkbox" className="accent-[#e6c981]" />
                  <span>Save card for faster checkout next time</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl px-4 py-3 font-semibold bg-gradient-to-b from-[#e6c981] to-[#bfa15e] text-black hover:brightness-110 transition shadow-[0_8px_30px_-8px_rgba(230,201,129,0.55)] disabled:opacity-60"
              >
                {loading ? "Processing…" : "Pay now"}
              </button>

              <div className="text-center">
                <Link href="/checkout" className="text-[#e6c981] hover:underline">
                  ← Back to bag
                </Link>
              </div>
            </form>
          </div>

          {/* Summary */}
          <aside className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 h-fit backdrop-blur">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2 text-sm text-white/75">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>€{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>Shipping</span>
                <span>Calculated at next step</span>
              </div>
              <div className="h-px bg-white/10 my-3" />
              <div className="flex justify-between text-base">
                <span>Total</span>
                <span className="font-semibold">€{total.toFixed(2)}</span>
              </div>
            </div>

            <p className="mt-4 text-xs text-white/50">
              By confirming, you agree to our Terms & Privacy. This is a demo flow.
            </p>
          </aside>
        </div>
      </section>
    </main>
  );
}
