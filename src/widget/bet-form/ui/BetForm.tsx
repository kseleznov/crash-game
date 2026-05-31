"use client";

import { Balance } from "@/entities/balance";
import { BetControl } from "@/features/place-bet";
import { BetButton } from "./BetButton";

export function BetForm() {
  return (
    <div className="w-full md:w-[260px] md:min-w-[260px] max-h-max bg-surface border border-card-border rounded-[14px] flex flex-col justify-between p-4">
      <div className="flex flex-col gap-3">
        <BetControl />
        <BetButton />
      </div>
      <div className="flex flex-col gap-3">
        <hr className="border-card-border" />
        <Balance />
      </div>
    </div>
  );
}
