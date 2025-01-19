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
};
export type Player = {
	id: number;
	hand: Card[];
	visible: Card[];
};
