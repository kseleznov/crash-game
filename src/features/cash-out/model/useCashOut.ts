import { socket } from "@/shared/api/socket";

export function useCashOut() {
  function cashOut() {
    socket.emit("bet:cashout", {});
  }

  return { cashOut };
}
