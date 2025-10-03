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
  name: z.string().min(1).optional(),
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = Body.parse(body);

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, name: name || null, hashedPassword },
      select: { id: true, email: true, name: true },
    });

    const token = await signSession({ uid: user.id, email: user.email });
    setSessionCookie(token);

    return NextResponse.json({ user });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Invalid request" }, { status: 400 });
  }
}
