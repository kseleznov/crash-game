import type { Phase } from "@/entities/game";

export type DisplayPhase = Phase | "pending";

export const LABELS: Record<DisplayPhase, string> = {
  waiting: "Place Bet",
  pending: "Wait for next round",
  running: "Cash Out",
  crashed: "Crashed",
} as const;

export const PHASE_STYLES: Record<DisplayPhase, string> = {
  waiting: "bg-bet-waiting text-black",
  pending: "bg-bet-pending text-white",
  running: "bg-bet-running text-white",
  crashed: "bg-bet-crashed text-white opacity-50 cursor-not-allowed",
} as const;
