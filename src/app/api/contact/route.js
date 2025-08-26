// src/app/api/contact/route.js
import { NextResponse } from "next/server";

export const runtime = "nodejs"; // needed for nodemailer (ignored by Resend)

function sanitize(s) {
  return String(s || "").trim().slice(0, 5000);
}

export async function POST(req) {
  try {
    const body = await req.json().catch(() => ({}));
    const name = sanitize(body.name);
    const email = sanitize(body.email);
    const phone = sanitize(body.phone);
    const message = sanitize(body.message);
    const estimate = body.estimate || null;
    const honey = sanitize(body.website); // optional honeypot

    if (honey) return NextResponse.json({ success: true }); // bot, silently succeed
    if (!name || !email || !message) {
      return NextResponse.json({ success: false, error: "Missing required fields." }, { status: 400 });
    }

    const provider = (process.env.MAIL_PROVIDER || "resend").toLowerCase();
    const sent = provider === "gmail"
      ? await sendWithGmail({ name, email, phone, message, estimate })
      : await sendWithResend({ name, email, phone, message, estimate });

    if (!sent.ok) {
      return NextResponse.json({ success: false, error: sent.error || "Send failed" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("contact api error:", err);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

// ---------- Provider: Resend ----------
async function sendWithResend({ name, email, phone, message, estimate }) {
  try {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    const to = process.env.MAIL_TO || process.env.GMAIL_USER; // your inbox (Gmail)
    const from = process.env.MAIL_FROM || "notifications@yourdomain.com"; // verify domain in Resend and set this

    const subject = `New website inquiry from ${name}`;
    const html = renderHtml({ name, email, phone, message, estimate });

    const resp = await resend.emails.send({
      from,
      to,
      subject,
      html,
      reply_to: email, // so replying goes to the sender
    });

    if (resp.error) return { ok: false, error: String(resp.error?.message || resp.error) };
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e?.message || String(e) };
  }
}

// ---------- Provider: Gmail SMTP via Nodemailer ----------
async function sendWithGmail({ name, email, phone, message, estimate }) {
  try {
    const mod = await import("nodemailer");
    const nodemailer = mod.default ?? mod;    // works in both ESM/CJS bundles
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER,     // your full Gmail address
        pass: process.env.GMAIL_APP_PASS, // app password (not your login)
      },
    });

    const to = process.env.MAIL_TO || process.env.GMAIL_USER;
    const subject = `New website inquiry from ${name}`;
    const html = renderHtml({ name, email, phone, message, estimate });

    await transporter.sendMail({
      from: `"Website Contact" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      html,
      replyTo: email,
    });

    return { ok: true };
  } catch (e) {
    return { ok: false, error: e?.message || String(e) };
  }
}

// ---------- shared email HTML ----------
function renderHtml({ name, email, phone, message, estimate }) {
  const est = estimate
    ? `<hr style="opacity:.3;margin:16px 0" />
       <div><strong>Estimate snapshot</strong></div>
       <pre style="white-space:pre-wrap;font-family:ui-monospace, SFMono-Regular, Menlo, monospace;background:#0e1821;color:#e0d8d1;border:1px solid rgba(255,255,255,.16);padding:10px;border-radius:8px;">
${escapeHtml(JSON.stringify(estimate, null, 2))}
</pre>`
    : "";

  return `
  <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#e0d8d1;background:#1c2230;padding:20px;border:1px solid rgba(255,255,255,.16);border-radius:12px;">
    <h2 style="margin:0 0 10px 0;color:#A77B3A;">New website inquiry</h2>
    <div><strong>Name:</strong> ${escapeHtml(name)}</div>
    <div><strong>Email:</strong> ${escapeHtml(email)}</div>
    ${phone ? `<div><strong>Phone:</strong> ${escapeHtml(phone)}</div>` : ""}
    <div style="margin-top:12px;"><strong>Message</strong></div>
    <div style="white-space:pre-wrap;background:#162029;border:1px solid rgba(255,255,255,.16);padding:10px;border-radius:8px;">${escapeHtml(message)}</div>
    ${est}
  </div>`;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
