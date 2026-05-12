import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { socket } from "@/shared/api/socket";
import { useGameStore } from "@/entities/game";
import { playSound } from "@/shared/lib/playSound";

export function useCashOut() {
  const queryClient = useQueryClient();
  const setActionInFlight = useGameStore((state) => state.setActionInFlight);

  useEffect(() => {
    function handleBetCashedOut(data: { balance: number }) {
      playSound("win");
      queryClient.setQueryData(["balance"], { balance: data.balance });
    }

    socket.on("bet:cashedOut", handleBetCashedOut);

    return () => {
      socket.off("bet:cashedOut", handleBetCashedOut);
    };
  }, [queryClient]);

  function cashOut() {
    setActionInFlight(true);
    socket.emit("bet:cashout", {});
  }

  return { cashOut };
}
