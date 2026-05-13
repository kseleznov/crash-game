import { useEffect } from "react";
import { toast } from "sonner";
import { socket } from "@/shared/api/socket";
import { useBalance } from "@/entities/balance";
import { useBetStore } from "@/entities/bet";
import {
  type BetCashedOut,
  type BetLost,
  type BetPlaced,
  type BetRejected,
  useGameStore,
} from "@/entities/game";

export function useBetSocket() {
  const { setBalanceQuery } = useBalance();
  const setBetPlaced = useGameStore((state) => state.setBetPlaced);
  const setCashOutWin = useBetStore((state) => state.setCashOutWin);

  useEffect(() => {
    function handleBetPlaced(data: BetPlaced) {
      setBalanceQuery(data);
      setBetPlaced(true);
    }

    function handleBetCashedOut(data: BetCashedOut) {
      setBalanceQuery(data);
      setBetPlaced(false);
      setCashOutWin(data.profit);
      toast.success(`Cashed out @ ${data.multiplier}× +${data.profit}`);
    }

    function handleBetLost(data: BetLost) {
      setBalanceQuery(data);
      setBetPlaced(false);
      toast.error(`Crashed @ ${data.crashPoint}×`);
    }

    function handleBetRejected(data: BetRejected) {
      toast.error(data.message);
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
  }, [setBalanceQuery, setBetPlaced, setCashOutWin]);
}
