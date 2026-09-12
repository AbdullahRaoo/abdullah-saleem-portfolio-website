import { NextResponse } from "next/server";

import { site } from "@/lib/site";

/**
 * Contact form endpoint.
 *
 * Sends through Resend's REST API (no SDK dependency). It is deliberately
 * inert until `RESEND_API_KEY` is set: rather than pretending to send, it
 * returns a clear error so a misconfigured deploy fails loudly instead of
 * silently dropping enquiries. The form falls back to the mailto link in that
 * case, so a visitor is never stranded.
 *
 * Env:
 *   RESEND_API_KEY  required to actually send
 *   CONTACT_FROM    optional verified sender; defaults to Resend's test sender
 */

type Payload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  company?: unknown; // honeypot, must stay empty
};

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  // Honeypot: bots fill every field. Accept silently so they do not retry.
  if (str(body.company)) return NextResponse.json({ ok: true });

  const name = str(body.name);
  const email = str(body.email);
  const message = str(body.message);

  if (name.length < 2) {
    return NextResponse.json({ error: "Please add your name." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "That email address looks off." }, { status: 400 });
  }
  if (message.length < 10) {
    return NextResponse.json(
      { error: "Please add a little more detail (10 characters minimum)." },
      { status: 400 }
    );
  }
  if (message.length > 5000) {
    return NextResponse.json({ error: "That message is too long." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "The form is not configured yet. Please use the email link instead." },
      { status: 503 }
    );
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>",
      to: [site.email],
      reply_to: email,
      subject: `Portfolio enquiry from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    }),
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Could not send that. Please use the email link instead." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
