import React from "react";
import { Card as CardType } from "../../types/cardTypes";
import { DiscartedCardPile } from "./CardPile";

interface DiscardPileProps {
  cards: CardType[];
}

export const DiscardPile: React.FC<DiscardPileProps> = ({ cards }) => {
  return (
    <div className="relative flex flex-col items-center gap-2">
      <h3 className="font-bold text-lg">Descarte</h3>
      <div className="relative grid h-36 w-24 place-items-center rounded-lg bg-neutral-300/10">
        {cards.length > 0 && <DiscartedCardPile cards={cards} />}
        <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center rounded-lg border-2 border-gray-300 border-dashed">
          <span className="text-gray-400">Vacío</span>
        </div>
      </div>
    </div>
  );
};
