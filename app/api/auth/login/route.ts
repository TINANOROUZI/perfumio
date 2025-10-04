// app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { signSession } from "@/lib/jwt";
import { setSessionCookie } from "@/lib/cookies";

const Body = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(req: Request) {
  try {
    const { email, password } = Body.parse(await req.json());

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ ok: false, error: "Invalid credentials" }, { status: 401 });
    }

    const ok = await bcrypt.compare(password, user.hashedPassword);
    if (!ok) {
      return NextResponse.json({ ok: false, error: "Invalid credentials" }, { status: 401 });
    }

    // issue session
    const token = await signSession({ uid: user.id, email: user.email });

    // if your helper sets cookie via next/headers, this is fine:
    setSessionCookie(token);

    // respond with user payload (client can store to localStorage)
    return NextResponse.json({
      ok: true,
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message ?? "Invalid request" },
      { status: 400 }
    );
  }
}
