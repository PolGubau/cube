import { GameBoard } from "./components/GameBoard";

export function App() {
  return (
    <div className="min-h-screen w-screen bg-neutral-200 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-200">
      <GameBoard />
    </div>
  );
}
