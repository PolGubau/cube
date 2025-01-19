import React from "react";
import { Card as CardType } from "../types/cardTypes";
import { Card } from "./cards/Card";

interface DrawPileProps {
  remainingCards: number;
  drawnCard: CardType | null;
  onDraw: () => void;
}

export const DrawPile: React.FC<DrawPileProps> = ({ remainingCards, drawnCard, onDraw }) => {
  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        className="flex h-36 w-24 cursor-pointer items-center justify-center rounded-lg bg-stone-600 text-white shadow-md"
        onClick={onDraw}
      >
        <span className="font-bold text-lg">{remainingCards}</span>
      </button>
      {drawnCard && <Card card={drawnCard} />}
    </div>
  );
};
