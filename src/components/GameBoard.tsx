import React, { useEffect } from "react";
import { useGame } from "../hooks/useGame";
import { DiscardPile } from "./DiscardPile";
import { DrawPile } from "./DrawPile";
import { PlayerHand } from "./PlayerHand";
import { SpecialEffectModal } from "./SpecialEffectModal";

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
    <div className="min-h-screen w-screen bg-neutral-200 p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex justify-between">
          <div className="text-white">
            <h2 className="font-bold text-xl">Turno: {gameState.currentTurn}</h2>
            <p>Puntuación actual: {calculateScore()}</p>
          </div>
          <button className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600" onClick={finishGame}>
            Terminar Juego
          </button>
        </div>

        <div className="mb-8 flex items-center justify-between">
          <DrawPile remainingCards={gameState.deck.length} drawnCard={gameState.drawnCard} onDraw={drawCard} />
          <DiscardPile cards={gameState.discardPile} />
        </div>

        <div className="rounded-lg bg-green-700 p-6">
          <PlayerHand
            cards={gameState.playerHand}
            onCardClick={handleCardClick}
            selectedCardIndex={gameState.selectedCardIndex}
          />
        </div>

        {gameState.drawnCard && (
          <div className="mt-4 flex justify-center">
            <button
              className="mr-4 rounded bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
              onClick={discardDrawnCard}
            >
              Descartar carta robada
            </button>
          </div>
        )}

        {gameState.showSpecialEffect && gameState.specialEffectType && (
          <SpecialEffectModal
            effectType={gameState.specialEffectType}
            onClose={() => {}}
            onAction={handleSpecialEffectAction}
          />
        )}
      </div>
    </div>
  );
};
