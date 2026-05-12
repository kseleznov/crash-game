import * as React from "react";
import { cn } from "@/shared/lib/cn";

type ToggleProps = {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  label?: string;
};

export function Toggle({
  checked,
  onChange,
  disabled,
  label = "toggle",
}: ToggleProps) {
  return (
    <label
      aria-label={label}
      className={cn(
        "relative inline-flex items-center cursor-pointer shrink-0",
        disabled && "opacity-50 cursor-not-allowed",
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="sr-only"
      />
      <span
        className={cn(
          "w-11 h-6 flex items-center px-0.5 rounded-full transition-colors duration-200",
          checked ? "bg-green-500" : "bg-surface-input",
        )}
      >
        <span
          className={cn(
            "w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200",
            checked && "translate-x-5",
          )}
        />
      </span>
    </label>
  );
}
