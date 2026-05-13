import { useCallback } from "react";
import { useBalanceQuery } from "@/entities/balance";
import { socket } from "@/shared/api/socket";
import { useBetStore } from "@/entities/bet";
import { playSound } from "@/shared/lib/playSound";
import { type Phase, useGameStore } from "@/entities/game";

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
  } = useBetStore();
  const { phase, betPlaced } = useGameStore();
  const { data: balanceData } = useBalanceQuery();
  const balance = balanceData?.balance ?? 0;
  const isPending =
    (phase === "waiting" && betPlaced) || (phase === "running" && !betPlaced);
  const isDisabled = phase === "crashed" || isPending;
  const displayPhase: Phase | "pending" = isPending ? "pending" : phase;

  const setBetHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value =
        balance > 0
          ? Math.min(Number(event.target.value), balance)
          : Number(event.target.value);

      setBet(value);
    },
    [setBet, balance],
  );

  const setAutoCashoutMultiplierHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setAutoCashoutMultiplier(Number(event.target.value));
    },
    [setAutoCashoutMultiplier],
  );

  const setDoubleHandler = useCallback(
    () => double(balance),
    [double, balance],
  );

  const setMaxHandler = useCallback(() => max(balance), [max, balance]);

  const setHalfHandler = useCallback(() => half(), [half]);

  const placeBet = useCallback(() => {
    playSound("start");
    socket.emit("bet:place", {
      amount: betAmount,
      autoCashOutAt: autoCashout ? autoCashoutMultiplier : null,
    });
  }, [betAmount, autoCashoutMultiplier, autoCashout]);

  return {
    balance,
    placeBet,
    setBetHandler,
    setMaxHandler,
    setHalfHandler,
    setDoubleHandler,
    setAutoCashoutMultiplierHandler,
    isDisabled,
    betPlaced,
    displayPhase,
  };
}
