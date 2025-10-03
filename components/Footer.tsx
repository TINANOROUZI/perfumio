"use client";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState<null | { type: "ok" | "err"; text: string }>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    if (!email.trim()) {
      setMsg({ type: "err", text: "Please enter your email." });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data?.error || `HTTP ${res.status}`);
      }
      setMsg({ type: "ok", text: "🎉 Congratulations! You’re subscribed." });
      setEmail("");
    } catch (err: any) {
      setMsg({ type: "err", text: err?.message || "Something went wrong." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <footer className="mt-16 border-t border-white/10 py-10 text-sm">
      <div className="container-a grid md:grid-cols-2 gap-6 items-start">
        <div>
          <div className="text-[#e6c981] font-semibold text-lg">Véla</div>
          <p className="text-white/60 mt-2">Designer & niche fragrances, curated.</p>
        </div>

        {/* Newsletter */}
        <form onSubmit={onSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            className="flex-1 rounded-lg bg-ink ring-soft px-3 py-2 outline-none"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg px-3 py-2 font-medium bg-[#e6c981] text-black hover:bg-[#d6b96e] disabled:opacity-60"
          >
            {loading ? "Subscribing…" : "Subscribe"}
          </button>
        </form>

        {msg && (
          <div
            className={`md:col-span-2 mt-2 rounded-md px-3 py-2 ${
              msg.type === "ok" ? "bg-emerald-500/15 text-emerald-300" : "bg-red-500/15 text-red-300"
            }`}
          >
            {msg.text}
          </div>
        )}
      </div>
      <div className="container-a mt-6 text-white/40">© {new Date().getFullYear()} Véla</div>
    </footer>
  );
}
