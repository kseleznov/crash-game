import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { socket } from "@/shared/api/socket";
import { playSound } from "@/shared/lib/playSound";

export function useCashOut() {
  const queryClient = useQueryClient();
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
    socket.emit("bet:cashout", {});
  }

  return { cashOut };
}
