// components/NewsletterForm.tsx
"use client";
import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setBusy(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      const toast = document.createElement("div");
      toast.textContent = data?.already ? "You’re already subscribed ✨" : "🎉 Welcome email sent!";
      toast.className =
        "fixed left-1/2 -translate-x-1/2 bottom-6 z-[60] px-4 py-2 rounded-lg bg-[#e6c981] text-black shadow-lg";
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 1600);
      setEmail("");
    } catch {
      alert("Sorry, something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        className="rounded-lg bg-ink px-3 py-2 outline-none"
      />
      <button
        type="submit"
        disabled={busy}
        className="rounded-lg px-4 py-2 font-medium bg-[#e6c981] text-black hover:bg-[#d6b96e] disabled:opacity-60"
      >
        {busy ? "Joining…" : "Join"}
      </button>
    </form>
  );
}
