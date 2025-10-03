import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { prisma } from "@/lib/db";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = process.env.EMAIL_FROM || "Véla <onboarding@resend.dev>";

const Body = z.object({ email: z.string().email() });

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const { email } = Body.parse(json);

    // create or ignore if already exists
    await prisma.subscriber.upsert({
      where: { email },
      update: {},
      create: { email },
    });

    // send to the **subscriber**
    await resend.emails.send({
      from: FROM,
      to: email, // 👈 important
      subject: "Welcome to Véla — you're in ✨",
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:auto;padding:16px">
          <h2>Welcome to <span style="color:#e6c981">Véla</span>!</h2>
          <p>Thanks for subscribing. You’ll be first to know about new drops and private offers.</p>
          <p style="margin-top:24px">— Team Véla</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || "unknown" },
      { status: 400 }
    );
  }
}
