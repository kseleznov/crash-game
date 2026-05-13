type Phase = "waiting" | "running" | "crashed";

type SocketStatus = "connecting" | "connected" | "disconnected";

interface Player {
  amount: number;
  multiplier: number | null;
  status: "placed" | "watching" | "lost";
  username: string;
}

interface RecentRound {
  roundId: string;
  crashPoint: number;
}

interface RoundState {
  phase: Phase;
  roundId: string;
  startedAt: string | null;
  endsAt: string | null;
  currentMultiplier: number;
  crashPoint: number | null;
  yourBet: {
    amount: number;
    autoCashOutAt: number | null;
    status: "placed" | "cashedOut" | "lost";
  } | null;
  players: Player[];
}

interface RoundWaiting {
  roundId: string;
  endsAt: string;
  players: Player[];
}

interface RoundStart {
  roundId: string;
  startedAt: string;
  players: Player[];
}

interface RoundTick {
  roundId: string;
  multiplier: number;
  elapsedMs: number;
}

interface RoundCrash {
  roundId: string;
  crashPoint: number;
  players: Player[];
}

interface BetPlaced {
  betId: string;
  roundId: string;
  amount: number;
  autoCashOutAt: number | null;
  balance: number;
}

interface BetCashedOut {
  betId: string;
  multiplier: number;
  winAmount: number;
  profit: number;
  balance: number;
}

interface BetLost {
  betId: string;
  crashPoint: number;
  balance: number;
}

interface BetRejected {
  reason: string;
  message: string;
}

interface GameStore {
  phase: Phase;
  status: SocketStatus;
  roundId: string;
  startedAt: string | null;
  crashPoint: number | null;
  currentMultiplier: number;
  countdown: number;
  betPlaced: boolean;
  recentRounds: RecentRound[];
  curvePoints: { x: number; y: number }[];
  activePlayers: Player[] | null;

  setPhase: (phase: Phase) => void;
  setStatus: (status: SocketStatus) => void;
  setRoundId: (roundId: string) => void;
  setStartedAt: (startedAt: string | null) => void;
  setCrashPoint: (crashPoint: number | null) => void;
  setMultiplier: (multiplier: number) => void;
  setCountdown: (countdown: number) => void;
  setBetPlaced: (betPlaced: boolean) => void;
  prependRecentRound: (round: RecentRound) => void;
  addCurvePoint: (point: { x: number; y: number }) => void;
  resetCurve: () => void;
  reset: () => void;
  setActivePlayers: (players: Player[]) => void;
}

interface BetPlace {
  amount: number;
  autoCashOutAt: number | null;
}

export type {
  Phase,
  SocketStatus,
  RecentRound,
  RoundState,
  RoundWaiting,
  RoundStart,
  RoundTick,
  RoundCrash,
  BetPlaced,
  BetCashedOut,
  BetLost,
  BetRejected,
  GameStore,
  BetPlace,
  Player,
};
