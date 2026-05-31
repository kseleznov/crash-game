import { useGameStore } from "@/entities/game";
import { PlayerRow } from "./PlayerRow";

export function LivePlayers() {
  const activePlayers = useGameStore((state) => state.activePlayers);

  if (!activePlayers) return null;

  return (
    <div className="md:w-[260px] md:min-w-[260px] bg-surface border border-card-border rounded-[14px] p-4">
      <div className="flex items-center gap-2 mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-muted"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
        <span className="text-muted text-sm uppercase tracking-wide font-medium">
          Live Players ({activePlayers.length})
        </span>
      </div>
      <ul className="flex flex-col gap-2 overflow-y-auto max-h-[420px]">
        {activePlayers.map((player, index) => (
          <PlayerRow key={player.username} player={player} index={index} />
        ))}
      </ul>
    </div>
  );
}
