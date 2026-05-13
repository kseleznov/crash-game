import type { Round } from "../model/types";

export const TIER_COLORS: Record<Round["tier"], Record<string, string>> = {
  low: {
    color: "#FF6467",
    border: "#82181A",
    backgroundColor: "#46080966",
  },
  mid: {
    color: "#FFB900",
    border: "#7B3306",
    backgroundColor: "#46190166",
  },
  high: {
    color: "#05DF72",
    border: "#0D542B",
    backgroundColor: "#032E1566",
  },
};
