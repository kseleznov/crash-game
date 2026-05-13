"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { socket } from "@/shared/api/socket";
import { removeApiKey } from "@/shared/lib/apiKey";
import { useGameStore } from "@/entities/game";
import { useBetStore } from "@/entities/bet";

export function useSignOut() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useCallback(() => {
    socket.disconnect();
    removeApiKey();
    useGameStore.getState().reset();
    useBetStore.getState().reset();
    queryClient.clear();
    router.push("/sign-in");
  }, [queryClient, router]);
}
