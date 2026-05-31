import { create } from "zustand";
import type { GameStore } from "./types";

const initialState = {
  phase: "waiting" as const,
  status: "connecting" as const,
  roundId: "",
  startedAt: null,
  crashPoint: null,
  currentMultiplier: 1.0,
  countdown: 0,
  betPlaced: false,
  recentRounds: [],
  curvePoints: [],
  activePlayers: null,
};

export const useGameStore = create<GameStore>((set) => ({
  ...initialState,

  reset: () => set(initialState),

  setPhase: (phase) => set({ phase }),

  setStatus: (status) => set({ status }),

  setRoundId: (roundId) => set({ roundId }),

  setStartedAt: (startedAt) => set({ startedAt }),

  setCrashPoint: (crashPoint) => set({ crashPoint }),

  setMultiplier: (currentMultiplier) => set({ currentMultiplier }),

  setCountdown: (countdown) => set({ countdown }),

  setBetPlaced: (betPlaced) => set({ betPlaced }),

  prependRecentRound: (round) =>
    set((state) => ({
      recentRounds: [round, ...state.recentRounds].slice(0, 20),
    })),

  addCurvePoint: (point) =>
    set((state) => ({ curvePoints: [...state.curvePoints, point] })),

  resetCurve: () => set({ curvePoints: [], currentMultiplier: 1.0 }),

  setActivePlayers: (players) => set({ activePlayers: players }),
}));
