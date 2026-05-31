export interface Round {
  crashPoint: number;
  crashedAt: string;
  roundId: string;
  tier: "low" | "mid" | "high";
}
