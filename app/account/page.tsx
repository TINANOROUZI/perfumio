"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [isSignup, setIsSignup] = useState(false);

  function mockToast(msg: string) {
    const t = document.createElement("div");
    t.textContent = msg;
    t.className =
      "fixed left-1/2 -translate-x-1/2 bottom-6 z-[60] px-4 py-2 rounded-lg bg-[#e6c981] text-black shadow-lg";
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 1500);
  }

  function handleSocial(provider: "google" | "apple") {
    const user =
      provider === "google"
        ? { firstName: "GoogleUser", email: "user@gmail.com" }
        : { firstName: "AppleUser", email: "user@icloud.com" };

    try {
      localStorage.setItem("velaUser", JSON.stringify(user));
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "velaUser",
          newValue: JSON.stringify(user),
        })
      );
    } catch {}

    mockToast(
      `🎉 Signed in with ${provider === "google" ? "Google" : "Apple"}`
    );
  }

  return (
    <main className="min-h-screen pt-14 bg-[radial-gradient(1200px_800px_at_20%_10%,rgba(230,201,129,0.08),transparent),radial-gradient(900px_700px_at_80%_50%,rgba(230,201,129,0.06),transparent),#0b0b0b] text-white">
      {/* Top banner */}
      <section className="container-a max-w-6xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 items-center pt-14">
          {/* Left — Brand pitch */}
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#e6c981]/30 px-3 py-1 text-xs text-[#e6c981]/90 mb-4">
              ✨ Exclusive access • Member-only drops
            </div>
            <h1 className="text-4xl md:text-5xl font-display leading-tight">
              Join{" "}
              <span className="bg-gradient-to-r from-[#e6c981] via-[#f0dca7] to-[#bfa15e] bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(230,201,129,0.25)]">
                Véla Society
              </span>
            </h1>
            <p className="mt-4 text-white/75 max-w-xl">
              Unlock early access to new launches, curated recommendations, and
              private sales. Your signature scent is waiting.
            </p>

            {/* Perks */}
            <ul className="mt-6 grid grid-cols-2 gap-3 max-w-md">
              {[
                ["🏷️", "Member pricing"],
                ["⏰", "Early drops"],
                ["🎁", "Surprise minis"],
                ["🧪", "Sampling kits"],
              ].map(([icon, label]) => (
                <li
                  key={label}
                  className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2"
                >
                  <span className="text-lg">{icon}</span>
                  <span className="text-sm text-white/85">{label}</span>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-sm text-white/60">
              Already a member?{" "}
              <button
                onClick={() => setIsSignup(false)}
                className="text-[#e6c981] hover:underline"
              >
                Log in here
              </button>
            </p>
          </div>

          {/* Right — Auth Card */}
          <div className="order-1 lg:order-2">
            <div className="relative">
              {/* Soft gold ring glow */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-b from-[#e6c98133] to-transparent blur-lg" />
              <div className="relative rounded-3xl border border-white/10 bg-[#0f0f0f]/80 backdrop-blur-xl p-6 sm:p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]">
                <div className="text-center">
                  <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-gradient-to-b from-[#e6c981] to-[#bfa15e] shadow-[0_0_24px_rgba(230,201,129,0.45)] grid place-items-center text-black font-bold">
                    V
                  </div>
                  <h2 className="text-2xl font-semibold">
                    {isSignup ? "Create your account" : "Welcome back"}
                  </h2>
                  <p className="mt-1 text-sm text-white/70">
                    {isSignup
                      ? "Start your Véla journey. It takes less than a minute."
                      : "Log in to continue discovering your signature scent."}
                  </p>
                </div>

                <form
                  className="mt-6 space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const user = { firstName: "Tina", email: "tina@test.com" };
                    localStorage.setItem("velaUser", JSON.stringify(user));
                    window.dispatchEvent(
                      new StorageEvent("storage", {
                        key: "velaUser",
                        newValue: JSON.stringify(user),
                      })
                    );
                    mockToast(isSignup ? "🎉 Account created!" : "🎉 Logged in!");
                  }}
                >
                  {isSignup && (
                    <div className="grid sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="First name"
                        className="w-full px-4 py-2.5 rounded-lg bg-black/30 border border-white/10 focus:border-[#e6c981] outline-none"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Last name"
                        className="w-full px-4 py-2.5 rounded-lg bg-black/30 border border-white/10 focus:border-[#e6c981] outline-none"
                        required
                      />
                    </div>
                  )}
                  <input
                    type="email"
                    placeholder="Email address"
                    className="w-full px-4 py-2.5 rounded-lg bg-black/30 border border-white/10 focus:border-[#e6c981] outline-none"
                    required
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-2.5 rounded-lg bg-black/30 border border-white/10 focus:border-[#e6c981] outline-none"
                    required
                  />
                  {isSignup && (
                    <div className="flex items-center gap-2 text-xs text-white/70">
                      <input
                        type="checkbox"
                        required
                        className="accent-[#e6c981]"
                      />
                      <span>
                        I agree to the{" "}
                        <a
                          className="text-[#e6c981] hover:underline"
                          href="#"
                        >
                          Terms
                        </a>{" "}
                        &{" "}
                        <a
                          className="text-[#e6c981] hover:underline"
                          href="#"
                        >
                          Privacy
                        </a>
                        .
                      </span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full rounded-xl px-4 py-2.5 font-semibold bg-gradient-to-b from-[#e6c981] to-[#bfa15e] text-black hover:brightness-110 transition shadow-[0_8px_30px_-8px_rgba(230,201,129,0.55)]"
                  >
                    {isSignup ? "Create account" : "Login"}
                  </button>

                  {/* Divider */}
                  <div className="flex items-center gap-3 my-1">
                    <div className="h-px flex-1 bg-white/10" />
                    <span className="text-xs text-white/50">or</span>
                    <div className="h-px flex-1 bg-white/10" />
                  </div>

                  {/* Social sign-in */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      className="rounded-xl px-3 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 transition text-sm"
                      onClick={() => handleSocial("google")}
                    >
                      Continue with Google
                    </button>
                    <button
                      type="button"
                      className="rounded-xl px-3 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 transition text-sm"
                      onClick={() => handleSocial("apple")}
                    >
                      Continue with Apple
                    </button>
                  </div>
                </form>

                {/* Switch */}
                <p className="mt-5 text-center text-sm text-white/70">
                  {isSignup ? "Already have an account?" : "New to Véla?"}{" "}
                  <button
                    onClick={() => setIsSignup((v) => !v)}
                    className="text-[#e6c981] hover:underline"
                  >
                    {isSignup ? "Log in" : "Create one"}
                  </button>
                </p>

                {/* Back home */}
                <p className="mt-3 text-center">
                  <Link href="/" className="text-[#e6c981] hover:underline">
                    ← Back to home
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials / Quote */}
        <div className="mt-14 mb-24">
          <div className="mx-auto max-w-4xl rounded-2xl border border-white/10 bg-white/[0.035] p-6 md:p-7 backdrop-blur">
            <blockquote className="text-center">
              <p className="text-lg md:text-xl text-white/85">
                “I never knew a perfume could feel like a signature until Véla.
                The membership perks are unreal — samples, early access, and the
                packaging? Chef’s kiss.”
              </p>
              <footer className="mt-3 text-sm text-white/60">
                — Tina L.
              </footer>
            </blockquote>
          </div>
        </div>
      </section>
    </main>
  );
}
