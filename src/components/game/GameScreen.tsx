import { useGame } from "~/context/GameContext";
import { Card } from "../cards/Card";
import { YourCards } from "../cards/YourCards";
import { Minimap } from "../minimap/Minimap";

export const GameScreen = () => {
  const { players, currentTurn, history } = useGame();

  return (
    <main className="flex h-screen w-screen flex-col items-center">
      <Minimap />

      <div
        id="history"
        className="relative h-[200px] w-[150px] overflow-y-auto border border-dashed bg-red-100 p-4 text-2xl "
      >
        {history.map((play, i) => {
          const rotationByIdx = i * Math.floor(360 / history.length);
          return (
            <li
              key={play.id}
              className={`absolute ${
                history.length > 1 ? "rotate-[-90deg]" : ""
              }rotate-[${rotationByIdx}deg] -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 transform transition-all duration-1000 z-[${
                history.length - i
              }`}
            >
              <Card card={play.card} />
            </li>
          );
        })}
      </div>

      <div className="text-2xl">Turno de: {currentTurn === 0 ? "Tú" : `Bot ${currentTurn}`}</div>
      <YourCards cards={players[0].hand} />
    </main>
  );
};
