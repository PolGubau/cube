import Dexie, { Table } from "dexie";
import { Card, GameState } from "~/types/cardTypes";

export interface GameHistoryEntry {
  id?: number;
  date: Date;
  score: number;
  playerHand: Card[];
}

export class GameDatabase extends Dexie {
  gameStates!: Table<GameState>;
  gameHistory!: Table<GameHistoryEntry>;

  constructor() {
    super("ElCuadradoDB");
    this.version(1).stores({
      gameStates: "++id",
      gameHistory: "++id, date, score",
    });
  }
}

export const db = new GameDatabase();
