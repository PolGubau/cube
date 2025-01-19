import type { Card, Player } from "~/types";
import { defaultData } from "./defaultData";

export const getDeck = () => {
  const data = defaultData;
  const deck: Card[] = data.suits.flatMap((suit) => data.values.map((value) => ({ suit, value, isVisible: false })));
  deck.sort(() => Math.random() - 0.5);
  return deck;
};
export const getPlayers = (deck: Card[]): Player[] => {
  const data = defaultData;
  const players = Array.from({ length: data.num_players }, (_, i) => {
    const hand = deck.splice(0, data.initialCards);
    return { id: i, hand };
  });
  return players;
};
export const getNextPlayer = (currentPlayer: number, gameOrder: number) => {
  const data = defaultData;
  return (currentPlayer + gameOrder + data.num_players) % data.num_players;
};
export const getInitialPlayer = () => 0;
export const getCard = (deck: Card[]) => deck.shift() ?? null;
export const getInitialCard = getCard;

export const isRedCard = (card: Card) => card.suit === 1 || card.suit === 2;
