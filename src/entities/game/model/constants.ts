export const STATUSES = {
  connecting: "Connecting...",
  connected: "Connected",
  disconnected: "Disconnected",
} as const;

export const PHASES = {
  waiting: "waiting",
  running: "running",
  crashed: "crashed",
} as const;

export const PHASE_COLORS = {
  waiting: "var(--phase-waiting)",
  running: "var(--phase-running)",
  crashed: "var(--phase-crashed)",
} as const;

export const CURVE_COLORS = {
  running: {
    stroke: "#22C55E",
    fill: "rgba(34,197,94,0.15)",
    glow: "rgba(34,197,94,0.6)",
  },
  crashed: {
    stroke: "#EF4444",
    fill: "rgba(239,68,68,0.15)",
    glow: "rgba(239,68,68,0.6)",
  },
} as const;
