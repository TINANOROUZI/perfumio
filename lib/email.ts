import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY || "";

export const resend =
  apiKey ? new Resend(apiKey) : null;

export function renderWelcomeHTML(email: string) {
  // simple gold look, dark background
  return `<!doctype html>
<html>
<head>
  <meta charSet="utf-8" />
  <title>Welcome to Véla</title>
</head>
<body style="margin:0;background:#0b0b0b;color:#fff;font-family:Inter,Arial,sans-serif;padding:32px">
  <table role="presentation" width="100%" style="max-width:640px;margin:0 auto;background:#111;border-radius:16px;border:1px solid rgba(255,255,255,.08)">
    <tr>
      <td style="padding:28px 28px 10px 28px;text-align:center">
        <div style="
          display:inline-grid;place-items:center;
          width:56px;height:56px;border-radius:999px;
          background:linear-gradient(180deg,#e6c981,#bfa15e);
          color:#000;font-weight:700;font-size:18px;
          box-shadow:0 0 22px rgba(230,201,129,.45)
        ">V</div>
        <h1 style="margin:16px 0 4px 0;font-size:24px;line-height:1.2">Welcome to <span style="background:linear-gradient(90deg,#e6c981,#f0dca7,#bfa15e);-webkit-background-clip:text;background-clip:text;color:transparent">Véla</span></h1>
        <p style="margin:0;color:rgba(255,255,255,.75)">Thanks for subscribing, ${email}.</p>
      </td>
    </tr>
    <tr>
      <td style="padding:20px 28px 6px 28px">
        <p style="margin:0 0 12px 0;color:rgba(255,255,255,.85)">
          You’ll be first to know about new drops, private sales, and sample kits. We’ll keep emails rare and special.
        </p>
        <ul style="margin:0 0 14px 20px;color:rgba(255,255,255,.8)">
          <li>Early access to launches</li>
          <li>Members-only pricing</li>
          <li>Occasional surprise minis</li>
        </ul>
        <p style="margin:0 0 18px 0;color:#e6c981">Stay golden ✨</p>
        <a href="https://your-domain.example" style="
          display:inline-block;text-decoration:none;
          background:linear-gradient(180deg,#e6c981,#bfa15e);
          color:#000;padding:10px 16px;border-radius:12px;font-weight:600
        ">Explore fragrances</a>
      </td>
    </tr>
    <tr>
      <td style="padding:18px 28px 28px 28px;color:rgba(255,255,255,.45);font-size:12px">
        If this wasn’t you, you can ignore this email or reply to let us know.
      </td>
    </tr>
  </table>
</body>
</html>`;
}
