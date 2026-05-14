import { useEffect } from "react";
import { socket } from "@/shared/api/socket";
import { playSound } from "@/shared/lib/playSound";
import { useBalance } from "@/entities/balance";

export function useCashOut() {
  const { setBalanceQuery } = useBalance();

  useEffect(() => {
    function handleBetCashedOut(data: { balance: number }) {
      playSound("win");
      setBalanceQuery(data);
    }

    socket.on("bet:cashedOut", handleBetCashedOut);

    return () => {
      socket.off("bet:cashedOut", handleBetCashedOut);
    };
  }, [setBalanceQuery]);

  function cashOut() {
    socket.emit("bet:cashout", {});
  }

  return { cashOut };
}
