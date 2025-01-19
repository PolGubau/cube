import { symbols } from "~/data/defaultData";
import { useGame } from "~/hooks/useGame";

export function App() {
  const { currentCard, cardsFromPlayer, currentPlayer, isYourTurn } = useGame();

  if (!currentCard) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-8">
      <div className="fixed top-2 right-2 flex flex-col gap-1 rounded-lg bg-stone-700/20 p-2">
        {/* visual representation (minimap) of who's turn */}
        <ul className="flex gap-1">
          {Array.from({ length: 4 }).map((_, playerId) => (
            <li
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              key={playerId}
              className={`h-4 w-4 rounded-full ${playerId === currentPlayer ? "bg-green-500" : "bg-stone-500"}`}
            />
          ))}
        </ul>

        <small>{isYourTurn ? "It's your turn" : "It's not your turn"}</small>
      </div>

      {currentCard && (
        <div
          className="flex flex-col items-center rounded-lg bg-stone-700 p-2"
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
      <pre>{JSON.stringify(cardsFromPlayer(), null, 2)}</pre>
      <ul className="grid grid-cols-2 gap-3">
        {cardsFromPlayer().all.map((card) => (
          <li
            key={`${card.suit}-${card.value}`}
            className="flex flex-col items-center rounded-lg bg-stone-700 p-2"
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
