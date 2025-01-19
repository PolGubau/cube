import { isRedCard } from "~/data/deck";
import { symbols } from "~/data/defaultData";
import { Card } from "~/types";

interface YourCardProps {
  card: Card;
}

export const YourCard = ({ card }: YourCardProps) => {
  const isRed = isRedCard(card);

  const redClassnames = "text-red-800 bg-red-200 border-red-900";
  const stoneClassnames = "text-stone-800 bg-stone-300 border-stone-900";

  const isVisible = card.isVisible;
  return (
    <li
      key={`${card.suit}-${card.value}`}
      className={`hover:-translate-y-2 hover:-rotate-x-5 flex w-[100px] rotate-x-0 cursor-pointer flex-col items-center justify-center rounded-lg border-b-6 p-2 ring transition-all hover:rotate-z-0 hover:border-b-2 hover:shadow-2xl ${isRed && isVisible ? redClassnames : stoneClassnames} ${isVisible ? "" : "rotate-y-180"}`}
      style={{
        aspectRatio: "2/3",
      }}
    >
      <div className="text-3xl">
        {isVisible ? (
          <div className="text-3xl">
            {card.value} {symbols[card.suit]}
          </div>
        ) : (
          <div className="rotate-y-180 text-3xl">?</div>
        )}
      </div>
    </li>
  );
};
