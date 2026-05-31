import * as React from "react";
import { cn } from "@/shared/lib/cn";

export function Input({
  id,
  type = "number",
  value,
  min,
  max,
  onChange,
  disabled,
  currency = false,
}: React.ComponentProps<"input"> & { currency?: boolean }) {
  return (
    <div
      className={cn(
        "flex items-center justify-between bg-surface-input rounded-xl px-4 py-3 w-full",
        disabled && "opacity-50",
      )}
    >
      <input
        id={id}
        type={type}
        value={value ?? ""}
        min={min}
        max={max}
        onChange={onChange}
        disabled={disabled}
        className="flex-1 min-w-0 bg-transparent text-input-value text-lg outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
      {currency && (
        <span className="text-muted text-sm ml-2 shrink-0">UCD</span>
      )}
    </div>
  );
}
