import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { SESSION_COOKIE } from "@/lib/cookies";
import { verifySession } from "@/lib/jwt";
// Example right after you get user back from API:
localStorage.setItem(
  "user",
  JSON.stringify({ id: user.id, email: user.email, name: user.name })
);
// optional: force other tabs/navbars to update
window.dispatchEvent(new StorageEvent("storage", { key: "user", newValue: localStorage.getItem("user")! }));

export async function GET() {
  try {
    const token = cookies().get(SESSION_COOKIE)?.value;
    if (!token) return NextResponse.json({ user: null });

    const payload = await verifySession(token);
    const user = await prisma.user.findUnique({
      where: { id: payload.uid },
      select: { id: true, email: true, name: true, createdAt: true },
    });
    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ user: null });
  }
}
