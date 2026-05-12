import { useCallback, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useBalanceQuery } from "@/entities/balance";
import { socket } from "@/shared/api/socket";
import { useBetStore } from "./betStore";

import {
  type BetCashedOut,
  type BetLost,
  type BetPlaced,
  type BetRejected,
  type Phase,
  useGameStore,
} from "@/entities/game";
import { playSound } from "@/shared/lib/playSound";

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
    setCashOutWin,
  } = useBetStore();

  const { data } = useBalanceQuery();
  const balance = data?.balance ?? 0;
  const queryClient = useQueryClient();

  const phase = useGameStore((state) => state.phase);
  const myBet = useGameStore((state) => state.myBet);
  const actionInFlight = useGameStore((state) => state.actionInFlight);
  const setMyBet = useGameStore((state) => state.setMyBet);
  const setActionInFlight = useGameStore((state) => state.setActionInFlight);

  const betPlaced = myBet !== null;
  const isPending =
    (phase === "waiting" && betPlaced) || (phase === "running" && !betPlaced);
  const isDisabled = phase === "crashed" || isPending || actionInFlight;
  const displayPhase: Phase | "pending" =
    actionInFlight || isPending ? "pending" : phase;

  useEffect(() => {
    function handleBetPlaced(data: BetPlaced) {
      queryClient.setQueryData(["balance"], { balance: data.balance });
      setMyBet({
        betId: data.betId,
        amount: data.amount,
        autoCashOutAt: data.autoCashOutAt,
        status: "placed",
      });
      setActionInFlight(false);
    }

    function handleBetCashedOut(data: BetCashedOut) {
      queryClient.setQueryData(["balance"], { balance: data.balance });
      setMyBet(null);
      setActionInFlight(false);
      setCashOutWin(data.profit);
      toast.success(`Cashed out @ ${data.multiplier}× +${data.profit}`);
    }

    function handleBetLost(data: BetLost) {
      queryClient.setQueryData(["balance"], { balance: data.balance });
      setMyBet(null);
      setActionInFlight(false);
      toast.error(`Crashed @ ${data.crashPoint}×`);
    }

    function handleBetRejected(data: BetRejected) {
      toast.error(data.message);
      setActionInFlight(false);
    }

    function handleRoundWaiting() {
      setCashOutWin(null);
    }

    socket.on("bet:placed", handleBetPlaced);
    socket.on("bet:cashedOut", handleBetCashedOut);
    socket.on("bet:lost", handleBetLost);
    socket.on("bet:rejected", handleBetRejected);
    socket.on("round:waiting", handleRoundWaiting);

    return () => {
      socket.off("bet:placed", handleBetPlaced);
      socket.off("bet:cashedOut", handleBetCashedOut);
      socket.off("bet:lost", handleBetLost);
      socket.off("bet:rejected", handleBetRejected);
      socket.off("round:waiting", handleRoundWaiting);
    };
  }, [queryClient, setMyBet, setActionInFlight, setCashOutWin]);

  const setBetHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      let value;
      if (balance > 0) {
        value = Math.min(Number(event.target.value), balance);
      } else {
        value = Number(event.target.value);
      }
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
    setActionInFlight(true);
    playSound("start");
    socket.emit("bet:place", {
      amount: betAmount,
      autoCashOutAt: autoCashout ? autoCashoutMultiplier : null,
    });
  }, [betAmount, autoCashoutMultiplier, autoCashout, setActionInFlight]);

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
