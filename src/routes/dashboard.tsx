import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  LayoutDashboard,
  Map,
  Siren,
  FileText,
  BellRing,
  BarChart3,
  Users,
  Settings,
  LifeBuoy,
  Info,
  LogOut,
  Search,
  Bell,
  MessageSquare,
  Download,
  Calendar,
  Phone,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck,
  Clock,
  PanelLeftClose,
  PanelLeftOpen,
  MessageCircleQuestion,
  BookOpen,
  Flag,
} from "lucide-react";
import {
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { CityMap } from "@/components/CityMap";
import { CountUp } from "@/components/CountUp";
import { SonarMark } from "@/components/SonarManhole";
import {
  kpis,
  reports,
  reportsOverTime,
  severityDistribution,
  topAreas,
  notifications,
  statusToken,
  severityToken,
  categoryToken,
  type HazardCategory,
} from "@/lib/mock-data";
import { accentVar, pillClass } from "@/lib/tokens";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Operations Dashboard — ManholeGuard" },
      {
        name: "description",
        content:
          "Live municipal operations console for manhole and drain hazards: real-time map, KPI strip, alerts feed, analytics and report queue.",
      },
      { property: "og:title", content: "ManholeGuard Operations Dashboard" },
      {
        property: "og:description",
        content: "Track, triage and resolve citizen-reported monsoon hazards in real time.",
      },
    ],
  }),
  component: Dashboard;
});

const nav = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Live Map", icon: Map },
  { label: "Report Hazard", icon: Siren },
  { label: "My Reports", icon: FileText },
  { label: "Alerts", icon: BellRing },
  { label: "Analytics", icon: BarChart3 },
  { label: "Community", icon: Users },
  { label: "Notifications", icon: Bell },
  { label: "Settings", icon: Settings },
  { label: "Help Center", icon: LifeBuoy },
  { label: "About Us", icon: Info },
  { label: "Logout", icon: LogOut },
];

const filters: ("All" | HazardCategory | "In Progress")[] = [
  "All",
  "Open Manhole",
  "Overflowing Drain",
  "Missing Cover",
  "Water Logging",
  "In Progress",
];

const support = [
  { label: "FAQs", icon: MessageCircleQuestion },
  { label: "Report an Issue", icon: Flag },
  { label: "Contact Support", icon: MessageSquare },
  { label: "User Guide", icon: BookOpen },
];

function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [filter, setFilter] = useState<string>("All");
  const [query, setQuery] = useState("");

  const mapReports =
    filter === "All"
      ? reports
      : filter === "In Progress"
        ? reports.filter((r) => r.status === "In Progress")
        : reports.filter((r) => r.category === filter);

  const tableReports = reports.filter(
    (r) =>
      r.id.toLowerCase().includes(query.toLowerCase()) ||
      r.location.toLowerCase().includes(query.toLowerCase()) ||
      r.category.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="flex min-h-screen bg-void">
      {/* SIDEBAR */}
      <aside
        className={`sticky top-0 hidden h-screen shrink-0 flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300 lg:flex ${
          collapsed ? "w-[72px]" : "w-64"
        }`}
      >
        <div className="flex items-center gap-2 px-4 py-4">
          <SonarMark size={26} />
          {!collapsed && (
            <Link to="/" className="truncate font-display text-sm font-bold">
              ManholeGuard
            </Link>
          )}
          <button
            type="button"
            onClick={() => setCollapsed((c) => !c)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="ml-auto rounded-md p-1.5 text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
          >
            {collapsed ? (
              <PanelLeftOpen className="h-4 w-4" />
            ) : (
              <PanelLeftClose className="h-4 w-4" />
            )}
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-2 py-2">
          {nav.map((item) => (
            <button
              key={item.label}
              type="button"
              className={`flex w-full items-center gap-3 rounded-[10px] px-3 py-2 text-sm transition-colors ${
                item.active
                  ? "bg-teal/12 text-teal"
                  : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
              }`}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="m-2 rounded-xl border border-crimson/40 bg-crimson/12 p-3">
          <div className="flex items-center gap-2 text-crimson">
            <Phone className="h-4 w-4 shrink-0" />
            {!collapsed && <span className="text-xs font-semibold">Emergency Call</span>}
          </div>
          {!collapsed && (
            <a href="tel:18001234567" className="text-data mt-1 block text-xs text-foreground">
              1800-123-4567
            </a>
          )}
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col pb-16 lg:pb-0">
        {/* TOP BAR */}
        <header className="sticky top-0 z-40 border-b border-border bg-void/85 backdrop-blur-md">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-6">
            <div className="relative min-w-0">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search reports, locations, IDs..."
                className="w-full rounded-[10px] border border-border bg-surface py-2 pr-16 pl-9 text-sm text-foreground placeholder:text-muted-foreground focus:border-teal/50 focus:outline-none"
              />
              <span className="text-data absolute top-1/2 right-3 hidden -translate-y-1/2 rounded border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground sm:block">
                Ctrl+K
              </span>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                className="hidden items-center gap-2 rounded-[10px] border border-border px-3 py-2 text-xs text-muted-foreground hover:text-foreground md:flex"
              >
                <Calendar className="h-3.5 w-3.5" /> Last 7 days
              </button>
              <button
                type="button"
                className="hidden items-center gap-2 rounded-[10px] border border-border px-3 py-2 text-xs text-muted-foreground hover:text-foreground md:flex"
              >
                <Download className="h-3.5 w-3.5" /> Export CSV
              </button>
              <button
                type="button"
                aria-label="Notifications"
                className="relative rounded-[10px] border border-border p-2 text-muted-foreground hover:text-foreground"
              >
                <Bell className="h-4 w-4" />
                <span
                  className="text-data absolute -top-1.5 -right-1.5 grid h-4 min-w-4 place-items-center rounded-full px-1 text-[9px] text-primary-foreground"
                  style={{ background: accentVar("crimson") }}
                >
                  7
                </span>
              </button>
              <button
                type="button"
                aria-label="Messages"
                className="rounded-[10px] border border-border p-2 text-muted-foreground hover:text-foreground"
              >
                <MessageSquare className="h-4 w-4" />
              </button>
              <div className="flex items-center gap-2 rounded-[10px] border border-border px-2 py-1.5">
                <span
                  className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-[11px] font-semibold text-primary-foreground"
                  style={{ background: accentVar("teal") }}
                >
                  AS
                </span>
                <div className="hidden leading-tight sm:block">
                  <div className="text-xs font-medium">A. Sharma</div>
                  <div className="text-[10px] text-muted-foreground">Ward Admin</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="space-y-6 px-4 py-6 sm:px-6">
          {/* KPI STRIP */}
          <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {kpis.map((k, i) => {
              const up = k.delta > 0;
              const good = up === k.goodWhenUp;
              return (
                <div
                  key={k.label}
                  className="surface-card animate-slide-up p-4"
                  style={{ animationDelay: `${i * 70}ms` }}
                >
                  <div className="text-xs text-muted-foreground">{k.label}</div>
                  <div className="mt-1 flex items-end justify-between gap-2">
                    <span
                      className="text-data font-display text-2xl font-bold"
                      style={{ color: accentVar(k.token) }}
                    >
                      <CountUp to={k.value} />
                    </span>
                    <span
                      className="text-data flex items-center gap-0.5 text-[11px]"
                      style={{ color: good ? accentVar("teal") : accentVar("crimson") }}
                    >
                      {up ? (
                        <ArrowUpRight className="h-3 w-3" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3" />
                      )}
                      {Math.abs(k.delta)}%
                    </span>
                  </div>
                  <div className="mt-1 text-[10px] text-muted-foreground">vs last week</div>
                </div>
              );
            })}
          </section>

          {/* MAP + RIGHT RAIL */}
          <section className="grid gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            <div className="surface-card p-4">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:flex sm:justify-between">
                <h2 className="min-w-0 truncate font-display text-lg font-semibold">
                  Live City Overview
                </h2>
                <span className="text-data shrink-0 text-[10px] text-muted-foreground">
                  {mapReports.length} pins
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {filters.map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFilter(f)}
                    className={`rounded-full border px-3 py-1 text-[11px] transition-colors ${
                      filter === f
                        ? "border-teal/50 bg-teal/15 text-teal"
                        : "border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <CityMap reports={mapReports} className="mt-4 h-[300px] sm:h-[420px]" />
            </div>

            <div className="space-y-4">
              <div className="surface-card p-4">
                <h3 className="font-display text-sm font-semibold">Recent Alerts</h3>
                <div className="mt-3 space-y-2">
                  {reports.slice(0, 5).map((r, i) => (
                    <div
                      key={r.id}
                      className="animate-slide-up flex items-center gap-3 rounded-xl border border-border bg-surface-raised p-2.5"
                      style={{ animationDelay: `${i * 60}ms` }}
                    >
                      <span
                        className="h-9 w-9 shrink-0 rounded-lg"
                        style={{
                          background: `color-mix(in oklab, ${accentVar(categoryToken[r.category])} 28%, var(--bg-void))`,
                        }}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-xs font-medium">{r.location}</div>
                        <div className="text-data flex items-center gap-1 text-[10px] text-muted-foreground">
                          <Clock className="h-3 w-3" /> {r.time}
                        </div>
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

              <div className="surface-card p-4">
                <h3 className="font-display text-sm font-semibold">Quick Actions</h3>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {[
                    { label: "Report Hazard", icon: Siren },
                    { label: "Live Map", icon: Map },
                    { label: "My Reports", icon: FileText },
                    { label: "Alerts", icon: BellRing },
                  ].map((a) => (
                    <button
                      key={a.label}
                      type="button"
                      className="flex flex-col items-start gap-2 rounded-xl border border-border bg-surface-raised p-3 text-xs transition-colors hover:border-teal/40"
                    >
                      <a.icon className="h-4 w-4 text-teal" />
                      {a.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ANALYTICS */}
          <section className="grid gap-4 lg:grid-cols-3">
            <div className="surface-card p-4 lg:col-span-1">
              <h3 className="font-display text-sm font-semibold">Reports Over Time</h3>
              <div className="mt-4 h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={reportsOverTime}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                    <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={10} />
                    <YAxis stroke="var(--muted-foreground)" fontSize={10} />
                    <Tooltip
                      contentStyle={{
                        background: "var(--bg-surface-raised)",
                        border: "1px solid var(--border)",
                        borderRadius: 12,
                        fontSize: 12,
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="reports"
                      stroke={accentVar("amber")}
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="resolved"
                      stroke={accentVar("teal")}
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="surface-card p-4">
              <h3 className="font-display text-sm font-semibold">Top Affected Areas</h3>
              <div className="mt-4 h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={topAreas} dataKey="value" nameKey="name" innerRadius={45} outerRadius={70}>
                      {topAreas.map((_, i) => (
                        <Cell key={i} fill={`var(--chart-${i + 1})`} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: "var(--bg-surface-raised)",
                        border: "1px solid var(--border)",
                        borderRadius: 12,
                        fontSize: 12,
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="surface-card relative p-4">
              <h3 className="font-display text-sm font-semibold">Severity Distribution</h3>
              <div className="relative mt-4 h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={severityDistribution}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={52}
                      outerRadius={72}
                    >
                      {severityDistribution.map((s) => (
                        <Cell
                          key={s.name}
                          fill={accentVar(severityToken[s.name as keyof typeof severityToken])}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: "var(--bg-surface-raised)",
                        border: "1px solid var(--border)",
                        borderRadius: 12,
                        fontSize: 12,
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="pointer-events-none absolute inset-0 grid place-items-center">
                  <div className="text-center">
                    <div className="text-data font-display text-xl font-bold">1,284</div>
                    <div className="text-[10px] text-muted-foreground">total</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* TABLES */}
          <section className="grid gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            <div className="surface-card overflow-hidden">
              <div className="border-b border-border p-4">
                <h3 className="font-display text-sm font-semibold">All Reports</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] text-left text-xs">
                  <thead className="text-muted-foreground">
                    <tr className="border-b border-border">
                      {["ID", "Type", "Location", "Reporter", "Status", "Verified", "Time"].map((h) => (
                        <th key={h} className="px-4 py-3 font-medium">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tableReports.map((r) => (
                      <tr key={r.id} className="border-b border-border last:border-0 hover:bg-surface-raised">
                        <td className="text-data px-4 py-3 text-teal">{r.id}</td>
                        <td className="px-4 py-3">{r.category}</td>
                        <td className="px-4 py-3">
                          <div>{r.location}</div>
                          <div className="text-data text-[10px] text-muted-foreground">{r.coords}</div>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">{r.reporter}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`rounded-md border px-2 py-0.5 text-[10px] transition-colors duration-500 ${pillClass[statusToken[r.status]]}`}
                          >
                            {r.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {r.verified ? (
                            <span className="flex items-center gap-1 text-teal">
                              <ShieldCheck className="h-3.5 w-3.5" /> Verified
                            </span>
                          ) : (
                            <span className="text-muted-foreground">Pending review</span>
                          )}
                        </td>
                        <td className="text-data px-4 py-3 text-muted-foreground">{r.time}</td>
                      </tr>
                    ))}
                    {tableReports.length === 0 && (
                      <tr>
                        <td colSpan={7} className="px-4 py-12">
                          <div className="flex flex-col items-center gap-3 text-muted-foreground">
                            <SonarMark size={34} />
                            <span className="text-xs">No reports match “{query}”</span>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-4">
              <div className="surface-card p-4">
                <h3 className="font-display text-sm font-semibold">Notifications</h3>
                <div className="mt-3 space-y-3">
                  {notifications.map((n) => (
                    <div key={n.id} className="flex gap-3">
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: accentVar("teal") }}
                      />
                      <div className="min-w-0">
                        <div className="text-xs">{n.text}</div>
                        <div className="text-data text-[10px] text-muted-foreground">
                          {n.id} · {n.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="surface-card p-4">
                <h3 className="font-display text-sm font-semibold">Support Center</h3>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {support.map((s) => (
                    <button
                      key={s.label}
                      type="button"
                      className="flex items-center gap-2 rounded-[10px] border border-border px-2.5 py-2 text-[11px] text-muted-foreground hover:text-foreground"
                    >
                      <s.icon className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">{s.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* MOBILE BOTTOM NAV */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-border bg-void/95 px-2 py-2 backdrop-blur-md lg:hidden">
        {[
          { label: "Home", icon: LayoutDashboard },
          { label: "Map", icon: Map },
          { label: "Report", icon: Siren },
          { label: "Alerts", icon: BellRing },
          { label: "Call", icon: Phone },
        ].map((m) => (
          <button
            key={m.label}
            type="button"
            className={`flex flex-col items-center gap-1 px-2 text-[10px] ${
              m.label === "Call" ? "text-crimson" : "text-muted-foreground"
            }`}
          >
            <m.icon className="h-4 w-4" />
            {m.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
