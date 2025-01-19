import React from "react";
import { Card as CardType } from "../types/cardTypes";
import { Card as CardComponent } from "./cards/Card";

interface PlayerHandProps {
  cards: CardType[];
  onCardClick: (index: number) => void;
  selectedCardIndex: number | null;
}

export const PlayerHand: React.FC<PlayerHandProps> = ({ cards, onCardClick, selectedCardIndex }) => {
  return (
    <div className="flex justify-center gap-4 p-4">
      {cards.map((card, index) => (
        <CardComponent
          key={card.id}
          card={card}
          onClick={() => onCardClick(index)}
          isSelected={selectedCardIndex === index}
        />
      ))}
    </div>
  );
};
