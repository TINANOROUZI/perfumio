import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { signSession } from "@/lib/jwt";
import { setSessionCookie } from "@/lib/cookies";
// Example right after you get user back from API:
localStorage.setItem(
  "user",
  JSON.stringify({ id: user.id, email: user.email, name: user.name })
);
// optional: force other tabs/navbars to update
window.dispatchEvent(new StorageEvent("storage", { key: "user", newValue: localStorage.getItem("user")! }));

const Body = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(req: Request) {
  try {
    const { email, password } = Body.parse(await req.json());
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

    const ok = await bcrypt.compare(password, user.hashedPassword);
    if (!ok) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

    const token = await signSession({ uid: user.id, email: user.email });
    setSessionCookie(token);

    return NextResponse.json({ user: { id: user.id, email: user.email, name: user.name } });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Invalid request" }, { status: 400 });
  }
}
