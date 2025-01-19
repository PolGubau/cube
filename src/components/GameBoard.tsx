import React, { useEffect } from "react";
import { useGame } from "../hooks/useGame";
import { DrawPile } from "./DrawPile";
import { PlayerHand } from "./PlayerHand";
import { SpecialEffectModal } from "./SpecialEffectModal";
import { DiscardPile } from "./discardPile/DiscardPile";

export const GameBoard: React.FC = () => {
  const {
    gameState,
    initializeGame,
    drawCard,
    discardDrawnCard,
    swapCard,
    revealCard,
    swapCards,
    finishGame,
    calculateScore,
  } = useGame();

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const handleCardClick = (index: number) => {
    if (gameState.drawnCard) {
      swapCard(index);
    }
  };

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const handleSpecialEffectAction = (params: any) => {
    switch (gameState.specialEffectType) {
      case "LOOK_ONE":
        if (params.cardIndex !== undefined) {
          revealCard(params.cardIndex);
        }
        break;
      case "SWAP_TWO":
        if (params.cardIndex1 !== undefined && params.cardIndex2 !== undefined) {
          swapCards(params.cardIndex1, params.cardIndex2);
        }
        break;
      case "LOOK_TWO":
        if (params.cardIndexes?.length === 2) {
          for (const index of params.cardIndexes) {
            revealCard(index);
          }
        }
        break;
      default:
        break;
    }
  };

  if (gameState.gameStatus === "finished") {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-gray-100">
        <h2 className="mb-4 font-bold text-2xl">¡Juego Terminado!</h2>
        <p className="mb-4 text-xl">Puntuación final: {gameState.score}</p>
        <button className="rounded-lg bg-blue-500 px-6 py-3 text-white hover:bg-blue-600" onClick={initializeGame}>
          Jugar de nuevo
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto flex h-screen max-w-6xl flex-col gap-8">
      <header className="flex h-min justify-between border-b">
        <div className="">
          <h2 className="font-bold text-xl">Turno: {gameState.currentTurn}</h2>
          <p>Puntuación actual: {calculateScore()}</p>
        </div>
        <button
          type="button"
          className="cursor-pointer rounded-full px-4 py-2 text-red-900 transition-colors hover:bg-red-500/10 dark:text-red-300"
          onClick={finishGame}
        >
          Terminar Juego
        </button>
      </header>

      <div className="flex h-max grow items-start justify-between ">
        <header className="flex w-full items-center justify-between gap-4">
          <DrawPile remainingCards={gameState.deck.length} drawnCard={gameState.drawnCard} onDraw={drawCard} />
          <DiscardPile cards={gameState.discardPile} />
        </header>

        {gameState.drawnCard && (
          <div className="mt-4 flex justify-center">
            <button
              type="button"
              className="mr-4 rounded bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
              onClick={discardDrawnCard}
            >
              Descartar carta robada
            </button>
          </div>
        )}
      </div>
      <div className="h-min rounded-t-4xl bg-neutral-500/20 p-6">
        <PlayerHand
          cards={gameState.playerHand}
          onCardClick={handleCardClick}
          selectedCardIndex={gameState.selectedCardIndex}
        />
      </div>

      {gameState.showSpecialEffect && gameState.specialEffectType && (
        <SpecialEffectModal
          effectType={gameState.specialEffectType}
          onClose={() => null}
          onAction={handleSpecialEffectAction}
        />
      )}
    </div>
  );
};
