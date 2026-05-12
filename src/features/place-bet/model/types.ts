type BetAction = () => void;

interface BetState {
  betAmount: number;
  autoCashout: boolean;
  autoCashoutMultiplier: number | null;
  cashOutWin: number | null;
  setBet: (value: number) => void;
  half: BetAction;
  double: (balance: number) => void;
  max: (balance: number) => void;
  toggleAutoCashout: BetAction;
  setAutoCashoutMultiplier: (multiplier: number) => void;
  setCashOutWin: (value: number | null) => void;
  reset: () => void;
}

export type { BetState };
