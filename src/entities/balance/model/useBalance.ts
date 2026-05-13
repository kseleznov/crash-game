import { useQueryClient } from "@tanstack/react-query";

export function useBalance() {
  const queryClient = useQueryClient();

  function setBalanceQuery(data: { balance: number }) {
    queryClient.setQueryData(["balance"], { balance: data.balance });
  }

  return { setBalanceQuery };
}
