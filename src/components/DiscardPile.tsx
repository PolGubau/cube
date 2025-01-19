import React from "react";
import { Card as CardType } from "../types/cardTypes";
import { Card } from "./cards/Card";

interface DiscardPileProps {
  cards: CardType[];
}

export const DiscardPile: React.FC<DiscardPileProps> = ({ cards }) => {
  const topCard = cards[cards.length - 1];

  return (
    <div className="flex flex-col items-center gap-2">
      <h3 className="font-bold text-lg">Descarte</h3>
      {topCard ? (
        <Card card={topCard} />
      ) : (
        <div className="flex h-36 w-24 items-center justify-center rounded-lg border-2 border-gray-300 border-dashed">
          <span className="text-gray-400">Vacío</span>
        </div>
      )}
    </div>
  );
};
