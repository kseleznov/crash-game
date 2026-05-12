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
