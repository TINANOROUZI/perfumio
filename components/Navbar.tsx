"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type User = { firstName?: string; email?: string };

export default function Navbar({ onOpenCart }: { onOpenCart: () => void }) {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // initial load
    try {
      const raw = localStorage.getItem("velaUser");
      setUser(raw ? JSON.parse(raw) : null);
    } catch {
      setUser(null);
    }
    // react to future changes
    const onStorage = (e: StorageEvent) => {
      if (e.key === "velaUser") {
        try {
          setUser(e.newValue ? JSON.parse(e.newValue) : null);
        } catch {
          setUser(null);
        }
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const name =
    user?.firstName && user.firstName.trim()
      ? user.firstName.trim()
      : user?.email
      ? user.email.split("@")[0]
      : "";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur ring-1 ring-white/10">
      <div className="mx-auto max-w-7xl px-4">
        <nav className="flex items-center justify-between h-11" aria-label="Main">
          {/* Brand */}
          <Link href="/" className="text-[16px] font-semibold tracking-wide text-[#e6c981]">
            Véla
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/new" className="text-xs text-white/80 hover:text-white transition">
              New
            </Link>
            <Link href="/bestsellers" className="text-xs text-white/80 hover:text-white transition">
              Bestsellers
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Greeting OR account icon */}
            {name ? (
              <Link
                href="/account"
                className="hidden sm:inline-block text-xs text-[#e6c981] hover:text-white transition"
                title="Account"
              >
                Hey, {name}
              </Link>
            ) : (
              <Link
                href="/account"
                aria-label="Account"
                title="Account"
                className="text-lg leading-none"
              >
                👤
              </Link>
            )}

            {/* Search (kept) */}
            <form
              className="hidden sm:flex items-center rounded-md px-2 bg-white/5 ring-1 ring-white/10 h-7 w-[180px]"
              role="search"
            >
              <input
                type="search"
                placeholder="Search…"
                className="w-full bg-transparent outline-none text-xs placeholder:text-white/40 text-white"
              />
            </form>

            {/* Bag */}
            <button
              onClick={onOpenCart}
              className="rounded-md px-2.5 py-1 text-xs font-medium bg-[#e6c981] text-black hover:bg-[#d6b96e] transition"
            >
              Bag
            </button>

            {/* Mobile menu */}
            <button onClick={() => setOpen((v) => !v)} className="md:hidden px-2 py-1 text-xs text-white/80">
              {open ? "✕" : "☰"}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-black/90 backdrop-blur px-4 pb-2">
          <div className="grid gap-1">
            <Link href="/new" className="text-white/90 text-sm py-1" onClick={() => setOpen(false)}>
              New
            </Link>
            <Link href="/bestsellers" className="text-white/90 text-sm py-1" onClick={() => setOpen(false)}>
              Bestsellers
            </Link>
            <Link href="/account" className="text-white/90 text-sm py-1" onClick={() => setOpen(false)}>
              {name ? `Hey, ${name}` : "Account"}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
