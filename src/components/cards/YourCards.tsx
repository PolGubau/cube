import { Card } from "~/types";
import { YourCard } from "./YourCard";

interface YourCardsProps {
  cards: Card[];
}

export const YourCards = (props: YourCardsProps) => {
  const { cards } = props;
  return (
    <div className="perspective-distant">
      <ul className="transform-3d grid rotate-x-40 grid-cols-2 gap-5">
        {cards.map((card) => (
          <YourCard key={`${card.suit}-${card.value}`} card={card} />
        ))}
      </ul>
    </div>
  );
};
