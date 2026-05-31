import { api } from "@/shared/api/client";

type BalanceResponse = {
  balance: number;
};

export function getBalance() {
  return api<BalanceResponse>("/api/balance");
}
