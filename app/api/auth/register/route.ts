// app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { signSession } from "@/lib/jwt";
import { setSessionCookie } from "@/lib/cookies";

const Body = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(req: Request) {
  try {
    const { name, email, password } = Body.parse(await req.json());

    // 1) no duplicates
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
      return NextResponse.json({ ok: false, error: "Email already registered" }, { status: 409 });
    }

    // 2) create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, name: name ?? null, hashedPassword },
      select: { id: true, email: true, name: true },
    });

    // 3) issue session cookie
    const token = await signSession({ uid: user.id, email: user.email });
    setSessionCookie(token);

    // 4) return user (client will store to localStorage if needed)
    return NextResponse.json({ ok: true, user }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message ?? "Invalid request" },
      { status: 400 }
    );
  }
}
