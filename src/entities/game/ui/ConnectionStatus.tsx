import { STATUSES } from "../model/constants";
import { useGameStore } from "../model/gameStore";

export function ConnectionStatus() {
  const { status } = useGameStore();

  return <span className="text-white">{STATUSES[status]}</span>;
}
