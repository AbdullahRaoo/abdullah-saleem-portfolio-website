"use client";

import { useState } from "react";

import { mailto, site } from "@/lib/site";

/**
 * The contact form. Low friction: three fields, no account, no scheduling
 * funnel. It posts to /api/contact, which relays through Resend.
 *
 * If the endpoint is not configured yet it says so plainly and points at the
 * mailto link, so a visitor is never left wondering whether the message sent.
 * `company` is a honeypot: hidden from people, catnip for bots.
 */

type State = "idle" | "sending" | "sent" | "error";

const field =
  "w-full rounded-lg border border-line bg-ink/50 px-3.5 py-3 text-[16px] text-text sm:py-2.5 sm:text-[15px] placeholder:text-muted/70 focus:border-primary focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-strong";

export function ContactForm() {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState<string>("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending") return;

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    setState("sending");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };

      if (!res.ok) {
        setError(json.error ?? "Something went wrong. Please use the email link.");
        setState("error");
        return;
      }
      form.reset();
      setState("sent");
    } catch {
      setError("Network error. Please use the email link instead.");
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div className="rounded-xl border border-line bg-ink/40 p-6">
        <p className="font-display text-lg font-bold text-text">Message sent.</p>
        <p className="mt-2 text-[15px] text-muted">
          Thanks, I have it. {site.responseTime}
        </p>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="mt-4 text-[13px] font-semibold text-signal-strong underline underline-offset-4"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3.5" noValidate>
      <div className="grid gap-3.5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="mb-1.5 block text-[13px] font-semibold text-text">
            Name
          </label>
          <input id="cf-name" name="name" type="text" required autoComplete="name" className={field} />
        </div>
        <div>
          <label htmlFor="cf-email" className="mb-1.5 block text-[13px] font-semibold text-text">
            Email
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={field}
          />
        </div>
      </div>

      <div>
        <label htmlFor="cf-message" className="mb-1.5 block text-[13px] font-semibold text-text">
          What are you building?
        </label>
        <textarea id="cf-message" name="message" rows={4} required className={field} />
      </div>

      {/* Honeypot: visually hidden, not display:none, so bots still fill it. */}
      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="cf-company">Company</label>
        <input id="cf-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-1 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={state === "sending"}
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-signal px-6 py-3.5 sm:min-h-11 sm:w-auto text-[13px] font-semibold uppercase leading-none tracking-[0.08em] text-signal-ink transition-colors duration-150 hover:bg-signal-hover active:bg-signal-active disabled:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-signal"
        >
          {state === "sending" ? "Sending…" : "Send message"}
        </button>
        <a
          href={mailto()}
          className="-my-3 py-3 text-[13px] font-medium text-muted transition-colors hover:text-text"
        >
          or email {site.email}
        </a>
      </div>

      <p aria-live="polite" className="min-h-[1.25rem] text-[13px] text-muted">
        {state === "error" ? <span className="text-signal-strong">{error}</span> : null}
      </p>
    </form>
  );
}
