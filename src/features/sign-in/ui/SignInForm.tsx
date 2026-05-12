"use client";

import { cn } from "@/shared/lib/cn";
import { useSignIn } from "../model/useSignIn";

export function SignInForm() {
  const {
    key,
    handleSubmit,
    rememberMe,
    trimmedKey,
    usernameInputHandler,
    rememberMeHandler,
  } = useSignIn();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 px-4">
      <div className="flex flex-col items-center gap-5 text-center">
        <div className="w-[72px] h-[72px] rounded-full bg-surface border-2 border-card-border flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fbbf24"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-8 h-8"
          >
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
            <polyline points="17 6 23 6 23 12" />
          </svg>
        </div>

        <div>
          <h1 className="text-5xl">
            <span className="font-thin tracking-wider text-bet-waiting">
              Crash
            </span>{" "}
            <span className="font-semibold text-white">Game</span>
          </h1>
          <p className="text-muted mt-3 text-sm">
            High-stakes real-time betting. Cash out before the crash.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[480px] bg-surface border border-card-border rounded-2xl p-6 flex flex-col gap-5"
      >
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold tracking-widest text-muted uppercase">
            Username
          </label>
          <input
            value={key}
            onChange={usernameInputHandler}
            placeholder="Enter your username"
            className="bg-surface-input text-input-value rounded-xl px-4 py-3.5 outline-none placeholder:text-muted/40 w-full text-sm"
          />
          <p className="text-muted/70 text-xs">Minimum 3 characters required</p>
        </div>

        <label className="flex items-center gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={rememberMeHandler}
            className="sr-only"
          />
          <div
            className={cn(
              "w-4 h-4 rounded border flex items-center justify-center transition-colors shrink-0",
              rememberMe
                ? "bg-bet-waiting border-bet-waiting"
                : "bg-surface-input border-card-border",
            )}
          >
            {rememberMe && (
              <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                <path
                  d="M2 6l3 3 5-5"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
          <span className="text-muted text-sm">Remember me</span>
        </label>

        <button
          type="submit"
          disabled={!trimmedKey}
          className="bg-bet-waiting text-black font-bold py-4 rounded-2xl w-full disabled:opacity-40 disabled:cursor-not-allowed transition-opacity text-base mt-1"
        >
          Enter Game
        </button>
      </form>

      <p className="text-muted text-sm">Demo mode • Play responsibly</p>
    </div>
  );
}
