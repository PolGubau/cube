import { useCallback, useState } from "react";
import { db } from "../db/database";
import { Card, GameState, SpecialEffectType } from "../types/cardTypes";
import { createDeck } from "../utils/deckUtils";

const initialGameState: GameState = {
  playerHand: [],
  deck: [],
  discardPile: [],
  currentTurn: 0,
  gameStatus: "playing",
  score: 0,
  selectedCardIndex: null,
  drawnCard: null,
  showSpecialEffect: false,
  specialEffectType: null,
};

export const useGame = () => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  const saveGame = useCallback(async (state: GameState) => {
    await db.gameStates.put(state);
  }, []);

  const initializeGame = useCallback(async () => {
    const deck = createDeck();
    const playerHand = deck.splice(0, 4);
    const randomIndexes = [0, 1];
    for (const index of randomIndexes) {
      playerHand[index].isRevealed = true;
    }

    const newGameState: GameState = {
      ...initialGameState,
      playerHand,
      deck,
    };

    setGameState(newGameState);
    await saveGame(newGameState);
  }, [saveGame]);

  const drawCard = useCallback(async () => {
    if (gameState.deck.length === 0 || gameState.drawnCard) {
      return;
    }

    const newGameState = { ...gameState };
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    const drawnCard = newGameState.deck.pop()!;
    drawnCard.isRevealed = true;
    newGameState.drawnCard = drawnCard;

    setGameState(newGameState);
    await saveGame(newGameState);
  }, [gameState, saveGame]);

  const handleSpecialEffect = useCallback((card: Card) => {
    if (card.rank === "10") {
      return "LOOK_ONE";
    }
    if (card.rank === "J") {
      return "SWAP_TWO";
    }
    if (card.rank === "Q") {
      return "LOOK_TWO";
    }
    return null;
  }, []);

  const discardDrawnCard = useCallback(async () => {
    if (!gameState.drawnCard) {
      return;
    }

    const newGameState = { ...gameState };
    const specialEffect = handleSpecialEffect(gameState.drawnCard);

    newGameState.discardPile.push(gameState.drawnCard);
    newGameState.drawnCard = null;

    if (specialEffect) {
      newGameState.showSpecialEffect = true;
      newGameState.specialEffectType = specialEffect;
    }

    setGameState(newGameState);
    await saveGame(newGameState);
  }, [gameState, handleSpecialEffect, saveGame]);

  const swapCard = useCallback(
    async (handIndex: number) => {
      if (!gameState.drawnCard) {
        return;
      }

      const newGameState = { ...gameState };
      const oldCard = newGameState.playerHand[handIndex];
      newGameState.playerHand[handIndex] = gameState.drawnCard;
      newGameState.discardPile.push(oldCard);
      newGameState.drawnCard = null;

      setGameState(newGameState);
      await saveGame(newGameState);
    },
    [gameState, saveGame],
  );

  const revealCard = useCallback(
    async (index: number) => {
      const newGameState = { ...gameState };
      newGameState.playerHand[index].isRevealed = true;

      setGameState(newGameState);
      await saveGame(newGameState);
    },
    [gameState, saveGame],
  );

  const swapCards = useCallback(
    async (index1: number, index2: number) => {
      const newGameState = { ...gameState };
      [newGameState.playerHand[index1], newGameState.playerHand[index2]] = [
        newGameState.playerHand[index2],
        newGameState.playerHand[index1],
      ];

      setGameState(newGameState);
      await saveGame(newGameState);
    },
    [gameState, saveGame],
  );

  const calculateScore = useCallback(() => {
    return gameState.playerHand.reduce((sum, card) => sum + card.value, 0);
  }, [gameState.playerHand]);

  const finishGame = useCallback(async () => {
    const finalScore = calculateScore();
    const newGameState = {
      ...gameState,
      gameStatus: "finished" as const,
      score: finalScore,
    };

    await db.gameHistory.add({
      date: new Date(),
      score: finalScore,
      playerHand: gameState.playerHand,
    });

    setGameState(newGameState);
    await saveGame(newGameState);
  }, [gameState, calculateScore, saveGame]);

  return {
    gameState,
    initializeGame,
    drawCard,
    discardDrawnCard,
    swapCard,
    revealCard,
    swapCards,
    finishGame,
    calculateScore,
  };
};
