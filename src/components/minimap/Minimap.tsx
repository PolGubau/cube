import { useGame } from "~/context/GameContext";

export const Minimap = () => {
  const { currentTurn } = useGame();

  return (
    <div className="fixed top-2 right-2 flex flex-col gap-1 rounded-lg bg-stone-700/20 p-2">
      {/* visual representation (minimap) of who's turn */}
      <ul className="flex gap-1">
        {Array.from({ length: 4 }).map((_, playerId) => (
          <li
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={playerId}
            className={`h-4 w-4 rounded-full ${playerId === currentTurn ? "bg-green-500" : "bg-stone-500"}`}
          />
        ))}
      </ul>
    </div>
  );
};
