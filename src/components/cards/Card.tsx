import React from "react";
import { Card as CardType } from "../../types/cardTypes";

interface CardProps {
  card: CardType;
  onClick?: () => void;
  isSelected?: boolean;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ card, onClick, isSelected, className = "" }) => {
  const getSuitSymbol = (suit?: string) => {
    switch (suit) {
      case "hearts":
        return "♥";
      case "diamonds":
        return "♦";
      case "clubs":
        return "♣";
      case "spades":
        return "♠";
      default:
        return "";
    }
  };

  const cardStyles = `
    relative w-24 h-36 rounded-lg shadow-md cursor-pointer
    ${card.isRevealed ? "bg-white" : "bg-blue-800"}
    ${card.color === "red" ? "text-red-600" : "text-black"}
    ${isSelected ? "ring-2 ring-yellow-400" : ""}
    ${className}
  `;

  if (!card.isRevealed) {
    return (
      <button className={cardStyles} onClick={onClick} type="button">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-2xl text-white">?</div>
        </div>
      </button>
    );
  }

  return (
    <button className={cardStyles} onClick={onClick} type="button">
      <div className="absolute top-2 left-2">
        <div className="font-bold text-xl">{card.rank}</div>
        <div className="text-2xl">{getSuitSymbol(card.suit)}</div>
      </div>
      <div className="absolute right-2 bottom-2 rotate-180 transform">
        <div className="font-bold text-xl">{card.rank}</div>
        <div className="text-2xl">{getSuitSymbol(card.suit)}</div>
      </div>
    </button>
  );
};
