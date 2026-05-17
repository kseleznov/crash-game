"use client";

import { useGameStore } from "@/entities/game";
import { PlayerRow } from "./PlayerRow";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function LivePlayersDrawer({ isOpen, onClose }: Props) {
  const activePlayers = useGameStore((state) => state.activePlayers);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-[85vw] max-w-[360px] bg-surface border-l border-card-border flex flex-col">
        <div className="flex items-center justify-between px-4 py-4 border-b border-card-border">
          <div className="flex items-center gap-2">
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
              Live Players ({activePlayers?.length ?? 0})
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-muted hover:text-input-value transition-colors cursor-pointer"
          >
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
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
        <ul className="flex flex-col gap-2 p-4 overflow-y-auto">
          {activePlayers?.map((player, index) => (
            <PlayerRow key={player.username} player={player} index={index} />
          ))}
        </ul>
      </div>
    </div>
  );
}
