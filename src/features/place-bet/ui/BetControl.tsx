import { useMemo } from "react";
import { useBetStore } from "@/entities/bet";
import { useBet } from "../model/useBet";
import { Input } from "@/shared/ui/input";
import { Toggle } from "@/shared/ui/toggle";

export function BetControl() {
  const { betAmount, autoCashout, autoCashoutMultiplier, toggleAutoCashout } =
    useBetStore();

  const {
    balance,
    isDisabled,
    setBetHandler,
    setAutoCashoutMultiplierHandler,
    setDoubleHandler,
    setMaxHandler,
    setHalfHandler,
  } = useBet();

  const quickButtons = useMemo(
    () => [
      { label: "½", onClick: setHalfHandler },
      { label: "×2", onClick: setDoubleHandler },
      { label: "Max", onClick: setMaxHandler },
    ],
    [setHalfHandler, setDoubleHandler, setMaxHandler],
  );

  return (
    <div className="flex flex-col gap-3">
      <p className="text-muted text-xs font-medium uppercase tracking-wider">
        Bet Amount
      </p>

      <Input
        id="amount"
        type="number"
        value={betAmount}
        min={1}
        max={balance > 0 ? balance : undefined}
        onChange={setBetHandler}
        disabled={isDisabled}
        currency
      />

      <div className="flex gap-2">
        {quickButtons.map(({ label, onClick }) => (
          <button
            key={label}
            type="button"
            onClick={onClick}
            disabled={isDisabled}
            className="flex-1 bg-surface-input text-muted rounded-lg py-2 text-sm hover:text-input-value transition-colors disabled:opacity-50"
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <span className="text-muted text-xs font-medium uppercase tracking-wider">
          Auto Cash Out
        </span>
        <Toggle
          checked={autoCashout}
          onChange={toggleAutoCashout}
          disabled={isDisabled}
        />
      </div>

      {autoCashout && (
        <Input
          id="multiplier"
          type="number"
          value={autoCashoutMultiplier ?? undefined}
          onChange={setAutoCashoutMultiplierHandler}
          disabled={isDisabled}
        />
      )}
    </div>
  );
}
