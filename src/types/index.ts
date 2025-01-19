import type { symbols } from "~/data/defaultData";

export type Data = {
  num_players: number;
  initialCards: number;
  initialVisibleCards: number;
  gameOrder: number;
  totalCards: number;
  suits: (keyof typeof symbols)[];
  values: number[];
};

export type Card = {
  suit: keyof typeof symbols;
  value: number;
  isVisible: boolean;
  isSpecial?: boolean;
};
export type Player = {
  id: number;
  hand: Card[];
};

export type History = {
  player: Player;
  card: Card;
  id: number;
};
