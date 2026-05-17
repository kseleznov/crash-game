"use client";

import { useEffect } from "react";
import { socket } from "@/shared/api/socket";
import { useGameStore } from "./gameStore";
import { PHASES } from "./constants";
import type {
  RoundCrash,
  RoundStart,
  RoundState,
  RoundTick,
  RoundWaiting,
} from "./types";
import { playSound } from "@/shared/lib/playSound";

export function useSocket() {
  useEffect(() => {
    const {
      setPhase,
      setStatus,
      setRoundId,
      setStartedAt,
      setCrashPoint,
      setMultiplier,
      setCountdown,
      setBetPlaced,
      prependRecentRound,
      addCurvePoint,
      resetCurve,
      setActivePlayers,
    } = useGameStore.getState();

    let countdownInterval: ReturnType<typeof setInterval> | null = null;

    function clearCountdown() {
      if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
      }
    }

    function startCountdown(endsAt: string) {
      clearCountdown();

      const tick = () =>
        setCountdown(
          Math.max(
            0,
            Math.ceil((new Date(endsAt).getTime() - Date.now()) / 1000),
          ),
        );

      tick();

      countdownInterval = setInterval(tick, 500);
    }

    const handlers = {
      connect: () => setStatus("connected"),

      disconnect: () => setStatus("disconnected"),

      connect_error: () => setStatus("disconnected"),

      "round:state": (data: RoundState) => {
        setPhase(data.phase);
        setRoundId(data.roundId);
        setMultiplier(data.currentMultiplier);
        setStartedAt(data.startedAt);
        setCrashPoint(data.crashPoint);
        setActivePlayers(data.players);
        setBetPlaced(data.yourBet !== null);

        if (data.phase === PHASES.waiting && data.endsAt) {
          startCountdown(data.endsAt);
        }

        clearCountdown();
      },

      "round:waiting": (data: RoundWaiting) => {
        playSound("waiting");

        setPhase(PHASES.waiting);
        setRoundId(data.roundId);
        setMultiplier(1.0);
        setCrashPoint(null);
        setStartedAt(null);
        setBetPlaced(false);

        resetCurve();

        startCountdown(data.endsAt);
      },

      "round:start": (data: RoundStart) => {
        clearCountdown();

        setPhase(PHASES.running);
        setRoundId(data.roundId);
        setStartedAt(data.startedAt);
        setMultiplier(1.0);

        resetCurve();
      },

      "round:tick": (data: RoundTick) => {
        if (data.roundId !== useGameStore.getState().roundId) {
          return;
        }

        setMultiplier(data.multiplier);

        addCurvePoint({ x: data.elapsedMs / 1000, y: data.multiplier });

        playSound("tick");
      },

      "round:crash": (data: RoundCrash) => {
        playSound("lose");

        setPhase(PHASES.crashed);
        setMultiplier(data.crashPoint);
        setCrashPoint(data.crashPoint);

        prependRecentRound({
          roundId: data.roundId,
          crashPoint: data.crashPoint,
        });
      },
    };

    if (!socket.connected) socket.connect();

    Object.entries(handlers).forEach(([event, handler]) =>
      socket.on(event, handler),
    );

    return () => {
      clearCountdown();

      Object.keys(handlers).forEach((event) => socket.off(event));

      socket.disconnect();
    };
  }, []);
}
