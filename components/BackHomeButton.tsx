"use client";
import Link from "next/link";

export default function BackHomeButton() {
  return (
    <div className="mt-10 text-center">
      <Link
        href="/"
        className="inline-block rounded-lg px-4 py-2 text-sm font-medium
                   bg-[#e6c981] text-black hover:bg-[#d6b96e] transition"
      >
        ← Back to Home
      </Link>
    </div>
  );
}
