import { useBalanceQuery } from "@/entities/balance";
import { socket } from "@/shared/api/socket";
import { useBetStore } from "@/entities/bet";
import { playSound } from "@/shared/lib/playSound";
import { type Phase, useGameStore } from "@/entities/game";
import type { HandlerEvent } from "@/shared/types";
import { useShallow } from "zustand/react/shallow";

export function useBet() {
  const {
    betAmount,
    autoCashoutMultiplier,
    autoCashout,
    max,
    half,
    setBet,
    double,
    setAutoCashoutMultiplier,
  } = useBetStore(
    useShallow((state) => ({
      betAmount: state.betAmount,
      autoCashoutMultiplier: state.autoCashoutMultiplier,
      autoCashout: state.autoCashout,
      max: state.max,
      half: state.half,
      setBet: state.setBet,
      double: state.double,
      setAutoCashoutMultiplier: state.setAutoCashoutMultiplier,
    })),
  );
  const { phase, betPlaced } = useGameStore(
    useShallow((state) => ({
      phase: state.phase,
      betPlaced: state.betPlaced,
    })),
  );
  const { data: balanceData } = useBalanceQuery();
  const balance = balanceData?.balance ?? 0;
  const isPending =
    (phase === "waiting" && betPlaced) || (phase === "running" && !betPlaced);
  const isDisabled = phase === "crashed" || isPending;
  const displayPhase: Phase | "pending" = isPending ? "pending" : phase;

  function setBetHandler(event: HandlerEvent) {
    setBet(Number(event.target.value));
  }

  function setAutoCashoutMultiplierHandler(event: HandlerEvent) {
    setAutoCashoutMultiplier(Number(event.target.value));
  }

  function placeBet() {
    if (phase !== "waiting") return;
    if (betPlaced) return;
    if (betAmount <= 0 || betAmount > balance) return;

    playSound("start");

    socket.emit("bet:place", {
      amount: betAmount,
      autoCashOutAt: autoCashout ? autoCashoutMultiplier : null,
    });
  }

  return {
    balance,
    placeBet,
    setBetHandler,
    setAutoCashoutMultiplierHandler,
    half,
    double,
    max,
    isDisabled,
    betPlaced,
    displayPhase,
  };
}
