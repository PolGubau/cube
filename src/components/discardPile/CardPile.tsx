import React, { useRef } from "react";
import { Card as CardType } from "../../types/cardTypes";
import { Card } from "../cards/Card";

interface CardPileProps {
  cards: CardType[];
}

const getRandomTransform = () => ({
  rotate: Math.random() * 15 - 10, // Rotación entre -5 y 5 grados
  translateX: Math.random() * 8 - 4, // Desplazamiento X entre -3 y 3 px
  translateY: Math.random() * 8 - 4, // Desplazamiento Y entre -3 y 3 px
});

export const DiscartedCardPile: React.FC<CardPileProps> = ({ cards }) => {
  const cardTransforms = useRef<Map<string, { rotate: number; translateX: number; translateY: number }>>(new Map());

  // Generar transformaciones aleatorias para nuevas cartas
  for (const card of cards) {
    if (!cardTransforms.current.has(card.id)) {
      cardTransforms.current.set(card.id, getRandomTransform());
    }
  }

  return (
    <div>
      {cards.map((card, index) => {
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        const transform = cardTransforms.current.get(card.id)!;

        return (
          <div
            key={card.id}
            className="absolute top-0 left-0 transform"
            style={{
              zIndex: index + 1,
              rotate: `${transform.rotate}deg`,
              transform: `translate(${transform.translateX}px, ${transform.translateY}px)`,
            }}
          >
            <Card card={card} />
          </div>
        );
      })}
    </div>
  );
};
