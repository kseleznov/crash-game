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

  const setBetHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setBet(Number(event.target.value));

  const setAutoCashoutMultiplierHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => setAutoCashoutMultiplier(Number(event.target.value));

  const placeBet = () => {
    playSound("start");

    socket.emit("bet:place", {
      amount: betAmount,
      autoCashOutAt: autoCashout ? autoCashoutMultiplier : null,
    });
  };

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
