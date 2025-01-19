import { useEffect, useState } from "react";
import { getCard, getNextPlayer, getPlayers } from "~/data/deck";
import { defaultData } from "~/data/defaultData";
import type { Card, Player } from "~/types";

const initDeck: Card[] = [
  {
    suit: 3,
    value: 6,
  },
  {
    suit: 3,
    value: 3,
  },
  {
    suit: 3,
    value: 10,
  },
  {
    suit: 2,
    value: 10,
  },
  {
    suit: 1,
    value: 4,
  },
  {
    suit: 2,
    value: 5,
  },
  {
    suit: 3,
    value: 9,
  },
  {
    suit: 3,
    value: 4,
  },
  {
    suit: 3,
    value: 11,
  },
  {
    suit: 2,
    value: 1,
  },
  {
    suit: 1,
    value: 6,
  },
  {
    suit: 2,
    value: 12,
  },
  {
    suit: 1,
    value: 7,
  },
  {
    suit: 4,
    value: 9,
  },
  {
    suit: 1,
    value: 5,
  },
  {
    suit: 4,
    value: 10,
  },
  {
    suit: 1,
    value: 3,
  },
  {
    suit: 2,
    value: 7,
  },
  {
    suit: 3,
    value: 12,
  },
  {
    suit: 3,
    value: 1,
  },
  {
    suit: 4,
    value: 8,
  },
  {
    suit: 3,
    value: 5,
  },
  {
    suit: 4,
    value: 3,
  },
  {
    suit: 2,
    value: 9,
  },
  {
    suit: 1,
    value: 13,
  },
  {
    suit: 3,
    value: 13,
  },
  {
    suit: 4,
    value: 4,
  },
  {
    suit: 3,
    value: 8,
  },
  {
    suit: 4,
    value: 7,
  },
  {
    suit: 1,
    value: 11,
  },
  {
    suit: 4,
    value: 2,
  },
  {
    suit: 2,
    value: 4,
  },
  {
    suit: 2,
    value: 2,
  },
  {
    suit: 1,
    value: 10,
  },
  {
    suit: 4,
    value: 12,
  },
];

export const useGame = () => {
  const [deck, setDeck] = useState<Card[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);

  const nextPlayer = getNextPlayer(currentPlayer, defaultData.gameOrder);

  useEffect(() => {
    const initializedDeck = initDeck;
    const initialPlayers = getPlayers(initializedDeck);
    const initialCard = getCard(initializedDeck);

    setDeck(initializedDeck);
    setPlayers(initialPlayers);
    setCurrentCard(initialCard);
  }, []);

  const cardsFromPlayer = (playerId = 0) => {
    return { all: players[playerId].hand, visible: players[playerId].visible };
  };
  const playersAmount = players.length;

  const isYourTurn = currentPlayer === 0;

  return {
    playersAmount,
    currentPlayer,
    setCurrentPlayer,
    currentCard,
    setCurrentCard,
    players,
    nextPlayer,
    cardsFromPlayer,
    isYourTurn,
  };
};
