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
  myBet: null,
  recentRounds: [],
  actionInFlight: false,
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
  setMyBet: (myBet) => set({ myBet }),
  prependRecentRound: (round) =>
    set((state) => ({
      recentRounds: [round, ...state.recentRounds].slice(0, 20),
    })),
  setActionInFlight: (actionInFlight) => set({ actionInFlight }),
  addCurvePoint: (point) =>
    set((state) => ({ curvePoints: [...state.curvePoints, point] })),
  resetCurve: () => set({ curvePoints: [], currentMultiplier: 1.0 }),
  setActivePlayers: (players) => set({ activePlayers: players }),
}));
