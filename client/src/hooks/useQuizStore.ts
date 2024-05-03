import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { Actions, State, TimeFormat } from "../types";
import { initialState } from "../config";
import { formatTime } from "../utils/shared";

const useQuizStore = create<State & Actions>()(
  devtools(
    immer(
      persist(
        (set) => ({
          ...initialState,
          setQuestionTimer: (time: TimeFormat) => {
            set((state) => {
              state.questions[state.currentQuestionNumber - 1].questionTimer =
                time;
            });
          },
          setCurrentQuestionId: (id?: string) => {
            set((state) => {
              state.currentQuestionId = id;
            });
          },
          setSeed: (seed?: number) => {
            set((state) => {
              state.randomSeed = seed;
            });
          },
          setAnswer({
            correctAnswer,
            answer,
            isCorrect,
          }: {
            answer?: string;
            correctAnswer?: string;
            isCorrect?: boolean;
          }) {
            set((state) => {
              const currentQuestion =
                state.questions[state.currentQuestionNumber - 1];

              currentQuestion.correctAnswer = correctAnswer;

              currentQuestion.isCorrect = isCorrect;

              currentQuestion.answer = answer;

              state.numberOfQuestionsAnswered++;

              state.currentScore += isCorrect ? 1 : 0;

              state.currentTime = formatTime(
                currentQuestion.questionTimer || "00:00"
              ) as number;
            });
          },
          nextQuestion: () => {
            set((state) => {
              state.currentQuestionNumber++;
            });
          },
          previousQuestion: () => {
            set((state) => {
              state.currentQuestionNumber--;
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
