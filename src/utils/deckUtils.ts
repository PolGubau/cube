import { Card, Color, Rank, Suit } from "../types/cardTypes";

export const createDeck = (): Card[] => {
  const deck: Card[] = [];
  const suits: Suit[] = ["hearts", "diamonds", "clubs", "spades"];
  const ranks: Rank[] = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

  for (const suit of suits) {
    for (const rank of ranks) {
      const color: Color = suit === "hearts" || suit === "diamonds" ? "red" : "black";
      deck.push(createCard(suit, rank, color));
    }
  }

  deck.push(createCard(undefined, "JOKER", "red"));
  deck.push(createCard(undefined, "JOKER", "black"));

  return shuffle(deck);
};

export const createCard = (suit: Suit | undefined, rank: Rank, color: Color): Card => ({
  id: `${suit}-${rank}`,
  suit,
  rank,
  value: calculateCardValue(rank, color),
  color,
  isRevealed: false,
});

export const calculateCardValue = (rank: Rank, color: Color): number => {
  if (rank === "JOKER") {
    return -1;
  }
  if (rank === "K") {
    return color === "red" ? -5 : 13;
  }
  if (rank === "A") {
    return 1;
  }
  if (rank === "J" || rank === "Q") {
    return 10;
  }
  return Number.parseInt(rank) || 10;
};

export const shuffle = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};
