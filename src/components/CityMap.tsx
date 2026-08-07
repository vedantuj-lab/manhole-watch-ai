import { useState } from "react";
import cityMap from "@/assets/city-map.jpg";
import { RainLayer } from "./RainLayer";
import { categoryToken, statusToken, type HazardReport } from "@/lib/mock-data";
import { accentVar, pillClass } from "@/lib/tokens";

interface CityMapProps {
  reports: HazardReport[];
  className?: string;
  showLegend?: boolean;
  showControls?: boolean;
}

const legend = [
  { label: "Open Manhole", token: "crimson" as const },
  { label: "Overflowing Drain", token: "amber" as const },
  { label: "Missing Cover", token: "violet" as const },
  { label: "Water Logging", token: "teal" as const },
];

export function CityMap({
  reports,
  className = "",
  showLegend = true,
  showControls = true,
}: CityMapProps) {
  const [zoom, setZoom] = useState(1);
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-border ${className}`}>
      <div
        className="absolute inset-0 transition-transform duration-500 ease-out"
        style={{ transform: `scale(${zoom})` }}
      >
        <img
          src={cityMap}
          alt="Stylized isometric night city map of monitored wards"
          width={1536}
          height={1024}
          loading="lazy"
          className="h-full w-full object-cover opacity-90"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, color-mix(in oklab, var(--bg-void) 90%, transparent), transparent 55%)",
          }}
        />

        {reports.map((r, i) => {
          const token = categoryToken[r.category];
          const live = r.status !== "Resolved";
          return (
            <button
              key={r.id}
              type="button"
              onMouseEnter={() => setActive(r.id)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(r.id)}
              onBlur={() => setActive(null)}
              aria-label={`${r.category} at ${r.location}, ${r.status}`}
              className="animate-drop-in absolute -translate-x-1/2 -translate-y-full rounded-full"
              style={{ left: `${r.x}%`, top: `${r.y}%`, animationDelay: `${i * 70}ms` }}
            >
              <span className={`relative block ${live ? "animate-bob" : ""}`}>
                {live && (
                  <span
                    className="animate-pin-pulse absolute -inset-3 rounded-full"
                    style={{ background: accentVar(token), opacity: 0.35 }}
                  />
                )}
                <span
                  className="relative block h-4 w-4 rotate-45 rounded-full rounded-br-none"
                  style={{
                    background: accentVar(token),
                    opacity: live ? 1 : 0.45,
                    boxShadow: live ? `0 0 18px 2px ${accentVar(token)}` : "none",
                  }}
                />
              </span>

              {active === r.id && (
                <span className="glass-panel absolute bottom-7 left-1/2 z-20 w-56 -translate-x-1/2 p-3 text-left">
                  <span className="text-data block text-[10px] text-muted-foreground">{r.id}</span>
                  <span className="mt-1 block text-xs font-medium text-foreground">
                    {r.location}
                  </span>
                  <span
                    className={`mt-2 inline-block rounded-md border px-2 py-0.5 text-[10px] ${pillClass[statusToken[r.status]]}`}
                  >
                    {r.status}
                  </span>
                </span>
              )}
            </button>
          );
        })}
      </div>

      <RainLayer />

      <div className="glass-panel absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5">
        <span className="relative flex h-2 w-2">
          <span
            className="absolute inline-flex h-full w-full animate-ping rounded-full"
            style={{ background: accentVar("teal") }}
          />
          <span
            className="relative inline-flex h-2 w-2 rounded-full"
            style={{ background: accentVar("teal") }}
          />
        </span>
        <span className="text-data text-[10px] tracking-widest text-teal uppercase">Real-time</span>
      </div>

      {showControls && (
        <div className="absolute top-4 right-4 flex flex-col overflow-hidden rounded-xl border border-border">
          <button
            type="button"
            onClick={() => setZoom((z) => Math.min(1.6, z + 0.15))}
            className="glass-panel h-8 w-8 rounded-none text-sm text-foreground hover:bg-surface-raised"
            aria-label="Zoom in"
          >
            +
          </button>
          <button
            type="button"
            onClick={() => setZoom((z) => Math.max(1, z - 0.15))}
            className="glass-panel h-8 w-8 rounded-none text-sm text-foreground hover:bg-surface-raised"
            aria-label="Zoom out"
          >
            −
          </button>
        </div>
      )}

      {showLegend && (
        <div className="glass-panel absolute bottom-4 left-4 flex flex-wrap gap-x-4 gap-y-1.5 px-3 py-2">
          {legend.map((l) => (
            <span key={l.label} className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: accentVar(l.token), boxShadow: `0 0 8px ${accentVar(l.token)}` }}
              />
              {l.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
