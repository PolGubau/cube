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
    relative w-24 h-36 rounded-lg shadow-md rotate-x-0 border-b-6 p-2 ring transition-all select-none
    ${card.isRevealed ? "bg-white" : "bg-stone-600 !text-black transform rotate-y-180 duration-500"}
    ${card.color === "red" ? "text-red-500" : "text-black"}
    ${isSelected ? "ring-2 ring-yellow-400" : ""}
    ${onClick ? "hover:-rotate-x-5 cursor-pointer hover:rotate-z-0 hover:border-b-2 hover:shadow-2xl hover:-translate-y-2 focus:-rotate-x-5 cursor-pointer focus:rotate-z-0 focus:border-b-2 focus:shadow-2xl focus:-translate-y-2" : ""}
    ${className}
  `;

  const isDisabled = !onClick;

  const VisibleContent = () => (
    <>
      <div className="absolute top-2 left-2">
        <div className="font-bold text-xl">{card.rank}</div>
        <div className="text-2xl">{getSuitSymbol(card.suit)}</div>
      </div>
      <div className="absolute right-2 bottom-2 rotate-180 transform">
        <div className="font-bold text-xl">{card.rank}</div>
        <div className="text-2xl">{getSuitSymbol(card.suit)}</div>
      </div>
    </>
  );
  const HiddenContent = () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="rotate-y-180 transform text-2xl text-white">?</div>
    </div>
  );

  return (
    <button disabled={isDisabled} className={cardStyles} onClick={onClick} type="button">
      {card.isRevealed ? <VisibleContent /> : <HiddenContent />}
    </button>
  );
};
