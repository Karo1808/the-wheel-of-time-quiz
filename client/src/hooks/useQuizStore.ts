import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { quizzesActions, quizzesState, TimeFormat } from "../types";
import { quizzesInitialState } from "../config";

import {
  increaseScore,
  nextQuestion,
  previousQuestion,
  resetQuiz,
  setAnswer,
  setCorrectAnswer,
  setCurrentQuestionId,
  setCurrentQuiz,
  setCurrentQuizId,
  setIsAnswerCorrect,
  setIsQuestionAnswered,
  setQuestionTimer,
  setSeed,
} from "../utils/zustand";

const useQuizStore = create<quizzesState & quizzesActions>()(
  devtools(
    immer(
      persist(
        (set) => ({
          ...quizzesInitialState,
          setCurrentQuiz: (quizId: string, initial = false) => {
            set((state) => {
              setCurrentQuiz({ quizId, initial, state });
            });
          },
          setCurrentQuizId: (quizId: string) => {
            set((state) => {
              setCurrentQuizId({ quizId, state });
            });
          },
          resetQuiz: () => {
            set((state) => {
              resetQuiz({ state });
            });
          },
          setQuestionTimer: (time: TimeFormat) => {
            set((state) => {
              setQuestionTimer({ time, state });
            });
          },
          setCurrentQuestionId: (id?: string) => {
            set((state) => {
              setCurrentQuestionId({ id, state });
            });
          },
          setSeed: (seed?: number) => {
            set((state) => {
              setSeed({ seed, state });
            });
          },
          setAnswer({
            answer,
            numberOfQuestions,
          }: {
            answer?: string;
            numberOfQuestions?: number;
          }) {
            set((state) => {
              setAnswer({ answer, numberOfQuestions, state });
            });
          },
          nextQuestion: () => {
            set((state) => {
              nextQuestion({ state });
            });
          },
          previousQuestion: () => {
            set((state) => {
              previousQuestion({ state });
            });
          },
          increaseScore: () => {
            set((state) => {
              increaseScore({ state });
            });
          },
          setIsQuestionAnswered: () => {
            set((state) => {
              setIsQuestionAnswered({ state });
            });
          },
          setIsAnswerCorrect: () => {
            set((state) => {
              setIsAnswerCorrect({ state });
            });
          },
          setCorrectAnswer: (answer?: string) => {
            set((state) => {
              setCorrectAnswer({ answer, state });
            });
          },
        }),
        {
          name: "quiz",
          storage: createJSONStorage(() => localStorage),
        }
      )
    )
  )
);

export default useQuizStore;
