"use client";

import { useCallback, useState } from "react";
import {
  ConnectionStatus,
  CurveDisplay,
  useGameStore,
  useSocket,
} from "@/entities/game";
import { History } from "@/entities/history";
import { SignOut } from "@/features/sign-out";
import { useBetSocket } from "@/features/place-bet";
import { BetForm } from "@/widget/bet-form";
import { LivePlayers, LivePlayersDrawer } from "@/widget/live-players";

export default function Game() {
  useSocket();
  useBetSocket();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const { roundId, activePlayers } = useGameStore();
  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col md:flex-row flex-1 min-h-0 gap-4 p-4">
        <div className="flex flex-col flex-1 min-h-0 min-w-0 gap-[15px] order-first md:order-none">
          <History />
          <CurveDisplay />
        </div>

        <div className="md:order-first shrink-0">
          <BetForm />
        </div>

        <div className="hidden md:block shrink-0">
          <LivePlayers />
        </div>
      </div>

      <div className="md:hidden flex items-center justify-between px-4 py-2 border-t border-card-border shrink-0">
        <span className="text-muted text-sm">
          {roundId ? `R#${roundId}` : ""}
        </span>
        <button
          type="button"
          onClick={openDrawer}
          className="flex items-center gap-1.5 text-muted hover:text-input-value transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          <span className="text-sm font-medium">
            {activePlayers?.length ?? 0}
          </span>
        </button>
      </div>

      <div className="hidden md:flex items-center justify-between px-4 py-2 border-t border-card-border shrink-0 text-muted text-sm">
        <div className="flex items-center gap-3">
          <ConnectionStatus />
          {roundId && (
            <>
              <span className="opacity-30">·</span>
              <span>Round #{roundId}</span>
            </>
          )}
          <span className="opacity-30">|</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12.55a11 11 0 0 1 14.08 0" />
            <path d="M1.42 9a16 16 0 0 1 21.16 0" />
            <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
            <circle cx="12" cy="20" r="1" fill="currentColor" />
          </svg>
          <span>{activePlayers?.length ?? 0} players</span>
        </div>
        <SignOut />
      </div>

      <LivePlayersDrawer isOpen={drawerOpen} onClose={closeDrawer} />
    </div>
  );
}
