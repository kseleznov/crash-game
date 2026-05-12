import { cn } from "@/shared/lib/cn";
import {
  AVATAR_COLORS,
  STATUS_COLORS,
  STATUS_LABELS,
} from "../model/constants";
import type { Player } from "@/entities/game";

interface Props {
  player: Player;
  index: number;
}

export function PlayerRow({ player, index }: Props) {
  const avatarColor = AVATAR_COLORS[index % AVATAR_COLORS.length];

  return (
    <li className="bg-surface-input rounded-[12px] px-3 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0",
            avatarColor,
          )}
        >
          <span className="text-white font-bold text-lg uppercase">
            {player.username[0]}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-white font-medium">{player.username}</span>
          <span className="text-muted text-sm">{player.amount} USD</span>
        </div>
      </div>
      <span className={cn("font-medium", STATUS_COLORS[player.status])}>
        {player.status === "watching" && player.multiplier !== null
          ? `${player.multiplier.toFixed(2)}×`
          : STATUS_LABELS[player.status]}
      </span>
    </li>
  );
}
