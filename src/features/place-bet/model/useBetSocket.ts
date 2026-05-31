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
import { playSound } from "@/shared/lib/playSound";

export function useBetSocket() {
  const { setBalanceQuery } = useBalance();
  const setBetPlaced = useGameStore((state) => state.setBetPlaced);
  const setCashOutWin = useBetStore((state) => state.setCashOutWin);

  useEffect(() => {
    const handlers = {
      "bet:placed": (data: BetPlaced) => {
        setBalanceQuery(data);
        setBetPlaced(true);
      },

      "bet:cashedOut": (data: BetCashedOut) => {
        playSound("win");
        setBalanceQuery(data);
        setBetPlaced(false);
        setCashOutWin(data.profit);
        toast.success(`Cashed out @ ${data.multiplier}× +${data.profit}`);
      },

      "bet:lost": (data: BetLost) => {
        setBalanceQuery(data);
        setBetPlaced(false);
        toast.error(`Crashed @ ${data.crashPoint}×`);
      },

      "bet:rejected": (data: BetRejected) => {
        toast.error(data.message);
      },

      "round:waiting": () => {
        setCashOutWin(null);
      },
    };

    Object.entries(handlers).forEach(([event, handler]) =>
      socket.on(event, handler),
    );

    return () => {
      Object.entries(handlers).forEach(([event, handler]) =>
        socket.off(event, handler),
      );
    };
  }, [setBalanceQuery, setBetPlaced, setCashOutWin]);
}
