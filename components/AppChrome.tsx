"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";

// If you already have a Cart/Drawer component, import it here:
// import CartDrawer from "@/components/CartDrawer";

function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[1000] bg-black/50">
      <div className="absolute right-0 top-0 h-full w-[360px] bg-[#111] text-white p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Your bag</h2>
          <button onClick={onClose} className="text-white/70 hover:text-white">✕</button>
        </div>
        {/* your cart content here */}
      </div>
    </div>
  );
}

export default function AppChrome() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <Navbar onOpenCart={() => setCartOpen(true)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
