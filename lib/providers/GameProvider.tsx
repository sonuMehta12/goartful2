"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { GameState, Metric } from "@/lib/types/game";
import { quizData } from "@/lib/data/questions";
import { gameMetrics } from "@/lib/data/metrics";

type GameAction =
  | { type: "SELECT_CANDIDATE"; payload: string }
  | { type: "ALLOCATE_METRICS"; payload: Record<Metric["id"], number> }
  | { type: "ANSWER_QUESTION"; payload: { optionIndex: number } }
  | { type: "RESET_GAME" };

interface GameContextProps {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}

const initialMetrics = gameMetrics.reduce((acc, metric) => {
  acc[metric.id] = 0;
  return acc;
}, {} as Record<Metric["id"], number>);

const initialState: GameState = {
  selectedCandidateId: null,
  currentQuestionIndex: 0,
  metrics: initialMetrics,
  answers: [],
  isGameStarted: false,
  isGameFinished: false,
};

const GameContext = createContext<GameContextProps | undefined>(undefined);

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "SELECT_CANDIDATE":
      return {
        ...initialState,
        selectedCandidateId: action.payload,
      };

    case "ALLOCATE_METRICS":
      return {
        ...state,
        metrics: action.payload,
        isGameStarted: true,
      };

    case "ANSWER_QUESTION": {
      const { optionIndex } = action.payload;
      
      if (!state.selectedCandidateId) return state;
      
      const questions = quizData[state.selectedCandidateId];
      if (!questions || state.currentQuestionIndex >= questions.length) {
        return state;
      }

      const question = questions[state.currentQuestionIndex];
      if (!question || optionIndex < 0 || optionIndex >= question.options.length) {
        return state;
      }

      const effects = question.options[optionIndex].effects;
      const newMetrics = { ...state.metrics };

      for (const [key, value] of Object.entries(effects)) {
        const metricKey = key as Metric["id"];
        if (metricKey in newMetrics && typeof value === "number") {
          newMetrics[metricKey] = Math.max(
            0,
            Math.min(100, newMetrics[metricKey] + value)
          );
        }
      }

      const nextQuestionIndex = state.currentQuestionIndex + 1;
      const isFinished = nextQuestionIndex >= questions.length;

      return {
        ...state,
        metrics: newMetrics,
        answers: [...state.answers, optionIndex],
        currentQuestionIndex: nextQuestionIndex,
        isGameFinished: isFinished,
      };
    }

    case "RESET_GAME":
      return initialState;

    default:
      return state;
  }
}

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}
