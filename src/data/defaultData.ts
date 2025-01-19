import type { Data } from "~/types";

export const defaultData: Data = {
  num_players: 4,
  initialCards: 4,
  initialVisibleCards: 2,
  gameOrder: 1, // 1: clockwise, -1: counter-clockwise
  totalCards: 52,

  // 1: spades, 2: hearts, 3: clubs, 4: diamonds
  suits: [1, 2, 3, 4],
  // 1: A, 11: J, 12: Q, 13: K
  values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
};
export const symbols = {
  1: "♠",
  2: "♥",
  3: "♣",
  4: "♦",
} as const;
