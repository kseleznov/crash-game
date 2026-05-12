import { create } from "zustand";
import type { BetState } from "./types";

const initialState = {
  betAmount: 10,
  autoCashout: false,
  autoCashoutMultiplier: null,
  cashOutWin: null,
};

export const useBetStore = create<BetState>((set, get) => ({
  ...initialState,

  reset: () => set(initialState),

  setCashOutWin: (value) => set({ cashOutWin: value }),

  setBet: (value) => {
    if (value < 1) return;
    set({ betAmount: value });
  },

  half: () => {
    const { betAmount } = get();
    set({ betAmount: Math.floor(betAmount / 2) });
  },

  double: (balance) => {
    const { betAmount } = get();
    set({ betAmount: Math.min(betAmount * 2, balance) });
  },

  max: (balance) => {
    set({ betAmount: balance });
  },

  toggleAutoCashout: () => {
    const { autoCashout } = get();
    set({ autoCashout: !autoCashout });
  },

  setAutoCashoutMultiplier: (multiplier) => {
    set({ autoCashoutMultiplier: multiplier });
  },
}));
