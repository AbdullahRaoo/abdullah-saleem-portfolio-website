import { capabilities } from "@/lib/capabilities";
import { site } from "@/lib/site";
import { stats } from "@/lib/stats";

/**
 * The full-stack half of the console: Abdullah's details as a real admin
 * dashboard, not an info card. It has window chrome and a left sidebar so it
 * reads as an actual ERP/ops app. Purely presentational; data comes from
 * lib/site + lib/capabilities.
 *
 * Type is the sans body (Hanken), not mono, and small labels are medium/
 * semibold so they stay legible in dark mode. The reserved orange signal stays
 * off this panel; teal (primary) carries the meters and the active nav item.
 */

const MODULE_LEVEL: Record<string, number> = {
  "full-stack-systems": 0.92,
  "vision-edge": 0.86,
  "automation-deploy": 0.78,
};

// Illustrative throughput bars for the activity strip (not a benchmark claim).
const ACTIVITY = [40, 62, 48, 74, 58, 88, 70, 95, 66, 82, 90, 76];

type NavItem = { label: string; icon: React.ReactNode; active?: boolean };

function Icon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="size-4" aria-hidden="true">
      <path d={d} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const NAV: NavItem[] = [
  { label: "Overview", icon: <Icon d="M4 13h7V4H4zM13 20h7v-9h-7zM4 20h7v-4H4zM13 8h7V4h-7z" />, active: true },
  { label: "Full-Stack", icon: <Icon d="M3 5h18v6H3zM3 13h18v6H3zM7 8h.01M7 16h.01" /> },
  { label: "Vision", icon: <Icon d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z M12 15a3 3 0 100-6 3 3 0 000 6z" /> },
  { label: "Deploy", icon: <Icon d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7z" /> },
];

export function ErpDashboard() {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-line bg-surface">
      {/* Window chrome */}
      <div className="flex items-center gap-3 border-b border-line px-4 py-3">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full border border-line" />
          <span className="size-2.5 rounded-full border border-line" />
          <span className="size-2.5 rounded-full border border-line" />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <span className="rounded-md border border-line bg-ink/50 px-3 py-1 text-xs font-medium text-muted">
            operator-console
          </span>
        </div>
        <span className="text-xs font-semibold text-muted">EMP-001</span>
      </div>

      <div className="flex min-h-0 flex-1">
        {/* Left sidebar */}
        <nav className="hidden w-[128px] shrink-0 flex-col gap-1 border-r border-line p-3 sm:flex">
          {NAV.map((item) => (
            <span
              key={item.label}
              className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-medium ${
                item.active
                  ? "bg-primary/10 text-text [box-shadow:inset_2px_0_0_var(--color-primary)]"
                  : "text-muted"
              }`}
            >
              {item.icon}
              {item.label}
            </span>
          ))}
          <span className="mt-auto flex items-center gap-2 rounded-lg px-2.5 py-2 text-[13px] font-medium text-text">
            <span className="size-2 animate-pulse rounded-full bg-[#3ecf8e]" aria-hidden="true" />
            Online
          </span>
        </nav>

        {/* Main content */}
        <div className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-hidden p-4">
          {/* Record header */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="font-display text-xl font-bold leading-tight text-text">{site.name}</h2>
              <p className="mt-1 text-sm text-muted">{site.role}</p>
            </div>
            <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-[11px] font-semibold text-text">
              <span className="size-1.5 rounded-full bg-[#3ecf8e]" aria-hidden="true" />
              Available
            </span>
          </div>

          {/* Stat tiles */}
          <div className="grid grid-cols-2 gap-2">
            {stats.map((s) => (
              <div key={s.label} className="rounded-lg border border-line bg-ink/40 px-3 py-2">
                <div className="font-display text-base font-bold leading-none tabular-nums text-text">
                  {s.value}
                </div>
                <div className="mt-1 text-[11px] font-medium uppercase tracking-[0.08em] text-muted">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Module meters */}
          <div className="rounded-lg border border-line bg-ink/40 p-3">
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-muted">
              Modules
            </div>
            <ul className="flex flex-col gap-2.5">
              {capabilities.map((lane) => {
                const level = Math.round((MODULE_LEVEL[lane.id] ?? 0.8) * 100);
                return (
                  <li key={lane.id}>
                    <div className="mb-1 flex items-center justify-between text-[13px]">
                      <span className="font-medium text-text">{lane.title}</span>
                      <span className="font-semibold tabular-nums text-muted">{level}%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-line">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${level}%` }} />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Activity strip (fills remaining height) */}
          <div className="flex min-h-[56px] flex-1 flex-col rounded-lg border border-line bg-ink/40 p-3">
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted">
                Throughput
              </span>
              <span className="text-[11px] font-semibold text-text">live</span>
            </div>
            <div className="flex flex-1 items-end gap-1.5" aria-hidden="true">
              {ACTIVITY.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm bg-primary/70"
                  style={{ height: `${h}%`, minHeight: "6px" }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
