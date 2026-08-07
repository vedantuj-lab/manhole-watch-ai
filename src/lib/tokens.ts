export type AccentToken = "teal" | "amber" | "crimson" | "violet";

/** Resolve a design-system accent token to its CSS custom property. */
export const accentVar = (token: AccentToken) => `var(--accent-${token})`;

export const pillClass: Record<AccentToken, string> = {
  teal: "bg-teal/12 text-teal border-teal/30",
  amber: "bg-amber/12 text-amber border-amber/30",
  crimson: "bg-crimson/12 text-crimson border-crimson/30",
  violet: "bg-violet/12 text-violet border-violet/30",
};
