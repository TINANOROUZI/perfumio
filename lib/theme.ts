// lib/theme.ts
export type Theme = "light" | "dark" | "auto";

export function applyTheme(theme: Theme) {
  if (typeof document === "undefined") return;

  const root = document.documentElement;

  if (theme === "auto") {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    root.classList.toggle("dark", prefersDark);
  } else {
    root.classList.toggle("dark", theme === "dark");
  }

  // also save in cookie for SSR (optional)
  document.cookie = `theme=${theme};path=/;max-age=31536000;SameSite=Lax`;
}
