import { useCallback, useState } from "react";
import { db } from "../db/database";
import { Card, GameState, SpecialEffectType } from "../types/cardTypes";
import { createDeck, shuffle } from "../utils/deckUtils";

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
    const randomIndexes = shuffle([0, 1, 2, 3]).slice(0, 2);
    playerHand.forEach((card, index) => {
      card.isRevealed = randomIndexes.includes(index);
    });
    const newGameState: GameState = {
      ...initialGameState,
      playerHand,
      deck,
    };

    setGameState(newGameState);
    await saveGame(newGameState);

    // Ocultar las cartas después de 2 segundos
    setTimeout(() => {
      const hiddenState = {
        ...newGameState,
        playerHand: playerHand.map((card) => ({ ...card, isRevealed: false })),
      };
      setGameState(hiddenState);
      saveGame(hiddenState);
    }, 2000);
  }, [saveGame]);

  const drawCard = useCallback(async () => {
    if (gameState.deck.length === 0 || gameState.drawnCard) {
      return;
    }

    const drawnCard = { ...gameState.deck[gameState.deck.length - 1], isRevealed: true };
    const newDeck = [...gameState.deck.slice(0, -1)];

    setGameState((prev) => ({
      ...prev,
      deck: newDeck,
      drawnCard,
    }));
  }, [gameState.deck, gameState.drawnCard]);

  const handleSpecialEffect = useCallback((card: Card) => {
    if (card.rank === "10") {
      setGameState((prev) => ({
        ...prev,
        showSpecialEffect: true,
        specialEffectType: "LOOK_ONE",
      }));
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
    const discardedCard = { ...gameState.drawnCard, isRevealed: true }; // Carta descartada siempre visible

    newGameState.discardPile.push(discardedCard);
    newGameState.drawnCard = null;

    const specialEffect = handleSpecialEffect(discardedCard);
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
      const oldCard = { ...newGameState.playerHand[handIndex], isRevealed: true }; // Carta descartada siempre visible
      newGameState.playerHand[handIndex] = { ...gameState.drawnCard, isRevealed: false };
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

      // Ocultar la carta después de 2 segundos
      setTimeout(() => {
        const hiddenState = {
          ...newGameState,
          playerHand: newGameState.playerHand.map((card, i) => (i === index ? { ...card, isRevealed: false } : card)),
          showSpecialEffect: false,
          specialEffectType: null,
        };
        setGameState(hiddenState);
        saveGame(hiddenState);
      }, 2000);
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
