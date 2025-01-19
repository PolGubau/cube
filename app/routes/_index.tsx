import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import { getCard } from "~/data/deck";
import { defaultData, symbols } from "~/data/defaultData";
import type { Card, Player } from "~/types";

export const meta: MetaFunction = () => {
	return [
		{ title: "Dashboard" },
		{ name: "description", content: "Welcome to the cube" },
	];
};

export default function Index() {
	const data = defaultData;
	// Create a deck of cards
	 

	// you always start

	const [currentPlayer, setCurrentPlayer] = useState(0);
	const [currentCard, setCurrentCard] = useState(getCard());

	return (
		<div className="flex h-screen items-center justify-center flex-col gap-8">
			{currentCard && (
				<div
					className="flex flex-col items-center bg-stone-700 p-2 rounded-lg"
					style={{
						width: 200,
						height: 300,
					}}
				>
					<div className="text-3xl">
						{currentCard.value} {symbols[currentCard.suit]}
					</div>
				</div>
			)}

			{/* your cards */}
			<ul className="grid grid-cols-2 gap-3">
				{players[currentPlayer].hand.map((card) => (
					<li
						key={`${card.suit}-${card.value}`}
						className="flex flex-col items-center bg-stone-700 p-2 rounded-lg"
						style={{
							width: 100,
							height: 100 * 1.5,
						}}
					>
						<div className="text-3xl">
							{card.value} {symbols[card.suit]}
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}
