"use client";

import { useGameStore } from "../model/gameStore";
import { useCurveEngine } from "../lib/useCurveEngine";
import { PHASE_COLORS } from "../model/constants";
import { formatDecimal } from "@/shared/lib/formatDecimal";

export function CurveDisplay() {
  const { phase, currentMultiplier, countdown, curvePoints } = useGameStore();
  const crashed = phase === "crashed";
  const { canvasRef } = useCurveEngine({ curvePoints, crashed });

  return (
    <div className="flex-1 flex flex-col gap-4">
      <div className="relative bg-[var(--bg-panel)] border border-[var(--border-subtle)] rounded-xl p-6 h-full min-h-[300px] md:min-h-[500px] overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(ellipse at bottom left, ${
              crashed ? "#EF4444" : "#22C55E"
            } 0%, transparent 60%)`,
          }}
        />

        <div className="absolute top-6 left-6 px-3 py-1 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)]">
          <span
            className="text-xs uppercase tracking-wider"
            style={{ color: PHASE_COLORS[phase] }}
          >
            {phase}
          </span>
        </div>

        <div className="relative h-full flex items-center justify-center">
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
          <div className="relative z-10 text-center">
            {phase === "waiting" ? (
              <>
                <div
                  className="text-6xl font-mono tracking-tighter"
                  style={{ color: PHASE_COLORS[phase] }}
                >
                  {countdown}s
                </div>
                <div className="text-[var(--text-secondary)] mt-2">
                  Next round starting...
                </div>
              </>
            ) : (
              <>
                <div
                  className={`text-8xl font-mono tracking-tighter transition-all ${
                    crashed ? "animate-pulse" : ""
                  }`}
                  style={{
                    color: PHASE_COLORS[phase],
                    textShadow: `0 0 30px ${PHASE_COLORS[phase]}`,
                  }}
                >
                  {formatDecimal(currentMultiplier)}×
                </div>
                {crashed && (
                  <div className="mt-4 text-2xl text-[var(--phase-crashed)] animate-pulse">
                    CRASHED
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
