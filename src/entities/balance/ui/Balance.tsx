"use client";

import { formatDecimal } from "@/shared/lib/formatDecimal";
import { useBalanceQuery } from "../model/useBalanceQuery";

export function Balance() {
  const { data, isLoading } = useBalanceQuery();

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-1.5">
        <span className="text-base leading-none">🪙</span>
        <span className="text-muted text-sm">Balance</span>
      </div>
      <span className="text-bet-waiting font-semibold text-sm">
        {isLoading || !data ? (
          <span className="text-muted">Loading</span>
        ) : (
          formatDecimal(data.balance)
        )}
      </span>
    </div>
  );
}
