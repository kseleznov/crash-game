import type { Player } from "@/entities/game";

export const AVATAR_COLORS = [
  "bg-[#7c3aed]",
  "bg-[#db2777]",
  "bg-[#2563eb]",
  "bg-[#16a34a]",
  "bg-[#ea580c]",
  "bg-[#0891b2]",
  "bg-[#dc2626]",
  "bg-[#ca8a04]",
];

export const STATUS_LABELS: Record<Player["status"], string> = {
  placed: "Placed",
  watching: "Watching",
  lost: "Lost",
};

export const STATUS_COLORS: Record<Player["status"], string> = {
  placed: "text-bet-waiting",
  watching: "text-bet-running",
  lost: "text-bet-crashed",
};
