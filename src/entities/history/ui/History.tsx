import { TIER_COLORS } from "../model/constants";
import { useHistoryQuery } from "../model/useHistoryQuery";

export function History() {
  const { data } = useHistoryQuery();

  if (!data) return null;

  return (
    <ul className="flex overflow-x-auto gap-[8px]">
      {data.rounds.map((round) => (
        <li
          key={round.roundId}
          className="px-[13px] py-[5px] border rounded-[16px]"
          style={{
            color: TIER_COLORS[round.tier].color,
            borderColor: TIER_COLORS[round.tier].border,
            backgroundColor: TIER_COLORS[round.tier].backgroundColor,
          }}
        >
          {round.crashPoint}x
        </li>
      ))}
    </ul>
  );
}
