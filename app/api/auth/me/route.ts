// app/api/auth/me/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { SESSION_COOKIE } from "@/lib/cookies";
import { verifySession } from "@/lib/jwt";

export async function GET() {
  try {
    const token = cookies().get(SESSION_COOKIE)?.value;
    if (!token) {
      return NextResponse.json({ ok: false, user: null }, { status: 401 });
    }

    const payload = await verifySession(token);
    if (!payload?.uid) {
      return NextResponse.json({ ok: false, user: null }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.uid },
      select: { id: true, email: true, name: true, createdAt: true },
    });

    if (!user) {
      return NextResponse.json({ ok: false, user: null }, { status: 404 });
    }

    return NextResponse.json({ ok: true, user }, { status: 200 });
  } catch {
    return NextResponse.json({ ok: false, user: null }, { status: 401 });
  }
}
