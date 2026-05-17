import { cn } from "@/shared/lib/cn";
import { STATUSES } from "../model/constants";
import { useGameStore } from "../model/gameStore";

const STATUS_DOT: Record<string, string> = {
  connected: "bg-green-500",
  connecting: "bg-yellow-500",
  disconnected: "bg-red-500",
};

export function ConnectionStatus() {
  const status = useGameStore((state) => state.status);

  return (
    <span className="flex items-center gap-1.5">
      <span className={cn("w-1.5 h-1.5 rounded-full", STATUS_DOT[status])} />
      <span>{STATUSES[status]}</span>
    </span>
  );
}
