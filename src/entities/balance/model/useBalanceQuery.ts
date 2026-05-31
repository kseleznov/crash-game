"use client";

import { useQuery } from "@tanstack/react-query";
import { getBalance } from "../api/balance";

export const useBalanceQuery = () => {
  return useQuery({
    queryKey: ["balance"],
    queryFn: getBalance,
    staleTime: 30_000,
  });
};
