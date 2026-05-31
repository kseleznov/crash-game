"use client";

import { useGameStore } from "@/entities/game";
import { type BetAction, useBetStore } from "@/entities/bet";
import { useBet } from "@/features/place-bet";
import { useCashOut } from "@/features/cash-out";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/cn";
import { LABELS, PHASE_STYLES } from "../model/constants";
import { formatDecimal } from "@/shared/lib/formatDecimal";
import { useShallow } from "zustand/react/shallow";

export function BetButton() {
  const { phase, currentMultiplier } = useGameStore(
    useShallow((state) => ({
      phase: state.phase,
      currentMultiplier: state.currentMultiplier,
    })),
  );
  const { placeBet, isDisabled, displayPhase } = useBet();
  const { cashOut } = useCashOut();
  const { betAmount, cashOutWin } = useBetStore(
    useShallow((state) => ({
      betAmount: state.betAmount,
      cashOutWin: state.cashOutWin,
    })),
  );

  const actions: Partial<Record<typeof phase, BetAction>> = {
    waiting: placeBet,
    running: cashOut,
  };

  return (
    <>
      <Button
        type="button"
        onClick={actions[phase]}
        disabled={isDisabled}
        className={cn(
          "w-full h-14 rounded-2xl font-bold text-base transition-opacity",
          PHASE_STYLES[displayPhase],
        )}
      >
        {LABELS[displayPhase]}
        {displayPhase === "running" && (
          <span className="ml-2">
            {formatDecimal(betAmount * currentMultiplier)}
          </span>
        )}
      </Button>
      {cashOutWin !== null && (
        <p className="text-center text-green-500 text-sm font-semibold mt-2">
          +{formatDecimal(cashOutWin)}
        </p>
      )}
    </>
  );
}
