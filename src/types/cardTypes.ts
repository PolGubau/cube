export type Suit = "hearts" | "diamonds" | "clubs" | "spades";
export type Rank = "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K" | "A" | "JOKER";
export type Color = "red" | "black";
export type GameStatus = "playing" | "finished";
export interface Card {
  id: string;
  suit?: Suit;
  rank: Rank;
  value: number;
  color: Color;
  isRevealed: boolean;
}

export interface GameState {
  playerHand: Card[];
  deck: Card[];
  discardPile: Card[];
  currentTurn: number;
  gameStatus: GameStatus;
  score: number;
  selectedCardIndex: number | null;
  drawnCard: Card | null;
  showSpecialEffect: boolean;
  specialEffectType: SpecialEffectType | null;
}

export type SpecialEffectType = "LOOK_ONE" | "SWAP_TWO" | "LOOK_TWO" | null;
