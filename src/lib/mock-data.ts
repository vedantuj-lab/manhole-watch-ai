export type HazardCategory =
  | "Open Manhole"
  | "Overflowing Drain"
  | "Missing Cover"
  | "Water Logging";

export type ReportStatus = "Open" | "Pending" | "In Progress" | "Resolved";

export type Severity = "High" | "Medium" | "Low" | "Very Low";

export interface HazardReport {
  id: string;
  category: HazardCategory;
  location: string;
  coords: string;
  reporter: string;
  status: ReportStatus;
  severity: Severity;
  verified: boolean;
  time: string;
  /** Percentage position on the stylized city map */
  x: number;
  y: number;
}

export const categoryToken: Record<HazardCategory, "crimson" | "amber" | "violet" | "teal"> = {
  "Open Manhole": "crimson",
  "Overflowing Drain": "amber",
  "Missing Cover": "violet",
  "Water Logging": "teal",
};

export const statusToken: Record<ReportStatus, "crimson" | "amber" | "violet" | "teal"> = {
  Open: "crimson",
  Pending: "amber",
  "In Progress": "violet",
  Resolved: "teal",
};

export const severityToken: Record<Severity, "crimson" | "amber" | "teal" | "violet"> = {
  High: "crimson",
  Medium: "amber",
  Low: "teal",
  "Very Low": "violet",
};

export const reports: HazardReport[] = [
  {
    id: "MG-8842",
    category: "Open Manhole",
    location: "Kurla West, LBS Marg",
    coords: "19.0726, 72.8845",
    reporter: "R. Iyer",
    status: "Open",
    severity: "High",
    verified: true,
    time: "2 min ago",
    x: 24,
    y: 34,
  },
  {
    id: "MG-8841",
    category: "Overflowing Drain",
    location: "Sion Circle Underpass",
    coords: "19.0390, 72.8619",
    reporter: "A. Fernandes",
    status: "In Progress",
    severity: "High",
    verified: true,
    time: "14 min ago",
    x: 58,
    y: 22,
  },
  {
    id: "MG-8839",
    category: "Missing Cover",
    location: "Andheri East, MIDC Rd 3",
    coords: "19.1176, 72.8697",
    reporter: "S. Kulkarni",
    status: "Pending",
    severity: "Medium",
    verified: false,
    time: "31 min ago",
    x: 71,
    y: 55,
  },
  {
    id: "MG-8836",
    category: "Water Logging",
    location: "Hindmata Junction",
    coords: "19.0009, 72.8410",
    reporter: "M. Shaikh",
    status: "Open",
    severity: "Medium",
    verified: true,
    time: "48 min ago",
    x: 39,
    y: 68,
  },
  {
    id: "MG-8830",
    category: "Open Manhole",
    location: "Dadar TT, Naigaon Cross",
    coords: "19.0176, 72.8562",
    reporter: "P. Deshmukh",
    status: "Resolved",
    severity: "Low",
    verified: true,
    time: "2 hr ago",
    x: 15,
    y: 61,
  },
  {
    id: "MG-8827",
    category: "Overflowing Drain",
    location: "Chembur Station Rd",
    coords: "19.0630, 72.8998",
    reporter: "K. Nair",
    status: "Resolved",
    severity: "Very Low",
    verified: true,
    time: "3 hr ago",
    x: 84,
    y: 38,
  },
  {
    id: "MG-8821",
    category: "Missing Cover",
    location: "Bandra Reclamation",
    coords: "19.0510, 72.8221",
    reporter: "T. Bose",
    status: "In Progress",
    severity: "Medium",
    verified: true,
    time: "5 hr ago",
    x: 49,
    y: 45,
  },
  {
    id: "MG-8814",
    category: "Water Logging",
    location: "Malad Subway",
    coords: "19.1860, 72.8480",
    reporter: "N. Ghosh",
    status: "Resolved",
    severity: "Low",
    verified: true,
    time: "8 hr ago",
    x: 66,
    y: 76,
  },
];

export const kpis = [
  { label: "Total Reports", value: 1284, delta: 12.4, goodWhenUp: true, token: "teal" as const },
  { label: "Open", value: 87, delta: 6.1, goodWhenUp: false, token: "crimson" as const },
  { label: "In Progress", value: 132, delta: -3.2, goodWhenUp: true, token: "violet" as const },
  { label: "Resolved", value: 1065, delta: 18.9, goodWhenUp: true, token: "teal" as const },
  { label: "Active Alerts", value: 14, delta: 4.5, goodWhenUp: false, token: "amber" as const },
];

export const reportsOverTime = [
  { day: "Mon", reports: 128, resolved: 96 },
  { day: "Tue", reports: 164, resolved: 121 },
  { day: "Wed", reports: 212, resolved: 158 },
  { day: "Thu", reports: 189, resolved: 172 },
  { day: "Fri", reports: 246, resolved: 190 },
  { day: "Sat", reports: 198, resolved: 181 },
  { day: "Sun", reports: 147, resolved: 147 },
];

export const topAreas = [
  { name: "Kurla", value: 214 },
  { name: "Sion", value: 176 },
  { name: "Andheri", value: 148 },
  { name: "Dadar", value: 121 },
  { name: "Malad", value: 96 },
];

export const severityDistribution = [
  { name: "High", value: 186 },
  { name: "Medium", value: 402 },
  { name: "Low", value: 511 },
  { name: "Very Low", value: 185 },
];

export const notifications = [
  { id: "MG-8842", text: "New high-severity open manhole verified in Kurla West", time: "2m" },
  { id: "MG-8841", text: "Crew dispatched to Sion Circle Underpass", time: "12m" },
  { id: "MG-8830", text: "Report resolved and closed by Ward F/North", time: "1h" },
  { id: "MG-8827", text: "12 citizens corroborated Chembur Station Rd", time: "3h" },
];
