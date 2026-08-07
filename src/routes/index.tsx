import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Camera,
  MapPin,
  ShieldCheck,
  Phone,
  ArrowRight,
  Siren,
  Wrench,
  BellRing,
  CheckCircle2,
} from "lucide-react";
import { SonarManhole, SonarMark } from "@/components/SonarManhole";
import { RainLayer } from "@/components/RainLayer";
import { CountUp } from "@/components/CountUp";
import { Reveal } from "@/components/Reveal";
import { CityMap } from "@/components/CityMap";
import { reports, statusToken, categoryToken } from "@/lib/mock-data";
import { accentVar, pillClass } from "@/lib/tokens";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ManholeGuard — Report Monsoon Manhole Hazards in 15 Seconds" },
      {
        name: "description",
        content:
          "Crowdsourced, AI-verified early warning for displaced, missing and overflowing manhole covers. Report a hazard, track resolution, stay safe this monsoon.",
      },
      { property: "og:title", content: "ManholeGuard — AI-verified monsoon hazard reporting" },
      {
        property: "og:description",
        content:
          "Citizens report displaced or overflowing manhole covers in seconds. Municipal crews resolve them in real time.",
      },
    ],
  }),
  component: Landing,
});

const steps = [
  { n: "01", title: "Snap a photo", body: "Open the camera, capture the hazard. No sign-up needed.", icon: Camera },
  { n: "02", title: "Confirm location", body: "GPS drops the pin automatically — nudge it if needed.", icon: MapPin },
  { n: "03", title: "AI verifies & alerts", body: "Vision model confirms the hazard and warns nearby users.", icon: ShieldCheck },
];

const how = [
  { title: "Report", body: "Citizens flag hazards with photo + location.", icon: Siren },
  { title: "Verify", body: "AI checks the image and de-duplicates reports.", icon: ShieldCheck },
  { title: "Act", body: "Ward crews are dispatched by severity.", icon: Wrench },
  { title: "Update", body: "Reporters and neighbours get status alerts.", icon: BellRing },
];

function Landing() {
  const ticker = reports.slice(0, 5);

  return (
    <div className="min-h-screen bg-void">
      <header className="sticky top-0 z-50 border-b border-border bg-void/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
          <div className="flex min-w-0 items-center gap-2">
            <SonarMark size={26} />
            <span className="truncate font-display text-base font-bold">ManholeGuard</span>
          </div>
          <nav className="ml-auto hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a href="#map" className="hover:text-foreground">Live Map</a>
            <a href="#report" className="hover:text-foreground">Report</a>
            <a href="#how" className="hover:text-foreground">How it works</a>
          </nav>
          <Link
            to="/dashboard"
            className="ml-auto shrink-0 rounded-[10px] border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-surface-raised md:ml-0"
          >
            Ops Dashboard
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="void-wash relative overflow-hidden">
        <RainLayer />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <div>
            <span className="text-data inline-flex items-center gap-2 rounded-full border border-teal/30 bg-teal/10 px-3 py-1 text-[10px] tracking-widest text-teal uppercase">
              Monsoon watch active
            </span>
            <h1 className="mt-5 font-display text-4xl leading-[1.05] font-bold sm:text-5xl lg:text-6xl">
              See a hazard.
              <br />
              Report it in 15 seconds.
            </h1>
            <p className="mt-4 max-w-lg text-base text-muted-foreground">
              AI-verified, real-time monsoon safety — every displaced cover, missing lid and
              overflowing drain routed straight to the ward that can fix it.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              {[
                { label: "Reports Today", value: 246, token: "amber" as const },
                { label: "Resolved", value: 1065, token: "teal" as const },
                { label: "Active Alerts", value: 14, token: "crimson" as const },
              ].map((s) => (
                <div key={s.label} className="glass-panel px-4 py-2.5">
                  <div
                    className="text-data font-display text-xl font-bold"
                    style={{ color: accentVar(s.token) }}
                  >
                    <CountUp to={s.value} />
                  </div>
                  <div className="text-[11px] text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#report"
                className="glow-amber inline-flex items-center gap-2 rounded-full bg-amber px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
              >
                Report a Hazard <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#map"
                className="rounded-[10px] border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface-raised"
              >
                View Live Map
              </a>
            </div>
          </div>

          <div className="relative">
            <SonarManhole size={440} />
          </div>
        </div>
      </section>

      {/* LIVE MAP */}
      <section id="map" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <Reveal>
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 sm:flex sm:justify-between">
            <div className="min-w-0">
              <h2 className="font-display text-2xl font-bold sm:text-3xl">Live city overview</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Every pin is a citizen report. Pulsing pins are still unresolved.
              </p>
            </div>
            <Link
              to="/dashboard"
              className="shrink-0 text-xs text-teal hover:underline"
            >
              Open full map →
            </Link>
          </div>
        </Reveal>

        <Reveal delay={80} className="mt-6">
          <div className="relative">
            <CityMap reports={reports} className="h-[380px] sm:h-[520px]" />
            <div className="glass-panel absolute top-16 right-4 hidden w-48 p-4 sm:block">
              <div className="text-[11px] text-muted-foreground">Reports this week</div>
              <div className="text-data font-display text-2xl font-bold">
                <CountUp to={1284} />
              </div>
              <div className="mt-3 text-[11px] text-muted-foreground">Resolved today</div>
              <div className="text-data font-display text-2xl font-bold text-teal">
                <CountUp to={147} />
              </div>
              <div className="mt-3 text-[11px] text-muted-foreground">Network uptime</div>
              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-surface-raised">
                <div className="h-full w-[99%] rounded-full" style={{ background: accentVar("teal") }} />
              </div>
              <div className="text-data mt-1 text-[10px] text-teal">99.4%</div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* REPORT FLOW */}
      <section id="report" className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <Reveal>
          <h2 className="font-display text-2xl font-bold sm:text-3xl">Report a hazard</h2>
          <p className="mt-1 text-sm text-muted-foreground">Three steps, about fifteen seconds.</p>
        </Reveal>
        <div className="relative mt-8 grid gap-4 md:grid-cols-3">
          <div
            className="pointer-events-none absolute top-14 right-8 left-8 hidden border-t border-dashed md:block"
            style={{ borderColor: "color-mix(in oklab, var(--accent-teal) 35%, transparent)" }}
          />
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 70}>
              <div className="surface-card relative h-full p-6">
                <div className="flex items-center gap-3">
                  <span
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-xl"
                    style={{ background: "color-mix(in oklab, var(--accent-teal) 14%, transparent)" }}
                  >
                    <s.icon className="h-4 w-4 text-teal" />
                  </span>
                  <span className="text-data text-xs text-muted-foreground">{s.n}</span>
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">{s.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Recent reports ticker */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-surface py-3">
          <div className="animate-marquee flex w-max gap-3">
            {[...ticker, ...ticker].map((r, i) => (
              <div
                key={`${r.id}-${i}`}
                className="flex items-center gap-3 rounded-xl border border-border bg-surface-raised px-3 py-2"
              >
                <span
                  className="h-8 w-8 shrink-0 rounded-lg"
                  style={{
                    background: `color-mix(in oklab, ${accentVar(categoryToken[r.category])} 25%, var(--bg-void))`,
                  }}
                />
                <div className="min-w-0">
                  <div className="text-data text-[10px] text-muted-foreground">
                    {r.id} · {r.time}
                  </div>
                  <div className="truncate text-xs">{r.location}</div>
                </div>
                <span
                  className={`shrink-0 rounded-md border px-2 py-0.5 text-[10px] ${pillClass[statusToken[r.status]]}`}
                >
                  {r.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="void-wash relative mt-8 overflow-hidden border-y border-border py-16">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <h2 className="font-display text-2xl font-bold sm:text-3xl">How it works</h2>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {how.map((h, i) => (
              <Reveal key={h.title} delay={i * 70}>
                <div className="surface-card h-full p-5">
                  <h.icon className="h-5 w-5 text-teal" />
                  <h3 className="mt-3 font-display text-base font-semibold">{h.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{h.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST BAND */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <Reveal>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { k: "18,400+", v: "Citizen reporters" },
              { k: "94%", v: "AI verification accuracy" },
              { k: "6.2 hrs", v: "Median time to resolve" },
            ].map((s) => (
              <div key={s.v} className="surface-card p-6">
                <div className="text-data font-display text-2xl font-bold text-teal">{s.k}</div>
                <div className="mt-1 text-sm text-muted-foreground">{s.v}</div>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={80}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-60">
            {["Municipal Corp.", "Ward F/North", "Disaster Cell", "City Water Board"].map((p) => (
              <span key={p} className="text-data text-xs tracking-widest uppercase">
                {p}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* EMERGENCY BANNER + FOOTER */}
      <div className="sticky bottom-0 z-40 border-t border-crimson/40 bg-crimson/15 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2.5 sm:px-6">
          <Phone className="h-4 w-4 shrink-0 text-crimson" />
          <span className="min-w-0 truncate text-xs sm:text-sm">
            Emergency? Call{" "}
            <a href="tel:18001234567" className="text-data font-semibold text-crimson underline">
              1800-123-4567
            </a>
          </span>
          <span className="ml-auto hidden items-center gap-1 text-[11px] text-muted-foreground sm:flex">
            <CheckCircle2 className="h-3.5 w-3.5 text-teal" /> 24×7 monsoon control room
          </span>
        </div>
      </div>

      <footer className="border-t border-border py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-2">
            <SonarMark size={20} />
            ManholeGuard — civic safety infrastructure
          </div>
          <div className="text-data">© 2026 · Built with municipal partners</div>
        </div>
      </footer>
    </div>
  );
}
