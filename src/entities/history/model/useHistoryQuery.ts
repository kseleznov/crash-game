"use client";

import { useQuery } from "@tanstack/react-query";
import { getHistory } from "../api/history";

export const useHistoryQuery = () => {
  return useQuery({
    queryKey: ["history"],
    queryFn: getHistory,
  });
};
