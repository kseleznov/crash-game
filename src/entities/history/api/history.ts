import { api } from "@/shared/api/client";
import type { Round } from "../model/types";

interface HistoryResponse {
  rounds: Round[];
}

export function getHistory() {
  return api<HistoryResponse>("/api/rounds/recent?limit=20");
}
