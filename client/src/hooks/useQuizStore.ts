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
          setCurrentQuiz: (quizName: string, initial = false) => {
            set((state) => {
              state.currentQuiz = quizName;
              if (initial) {
                state.quizzes[quizName] = initialState.quizzes[""];
              }
            });
          },
          setQuestionTimer: (time: TimeFormat) => {
            set((state) => {
              const currentQuiz = state.quizzes[state.currentQuiz];
              currentQuiz.questions[
                currentQuiz.currentQuestionNumber - 1
              ].questionTimer = time;
            });
          },
          setCurrentQuestionId: (id?: string) => {
            set((state) => {
              const currentQuiz = state.quizzes[state.currentQuiz];
              currentQuiz.currentQuestionId = id;
            });
          },
          setSeed: (seed?: number) => {
            set((state) => {
              const currentQuiz = state.quizzes[state.currentQuiz];
              currentQuiz.randomSeed = seed;
            });
          },
          setAnswer({ answer }: { answer?: string }) {
            set((state) => {
              const currentQuiz = state.quizzes[state.currentQuiz];
              const currentQuestion =
                currentQuiz.questions[currentQuiz.currentQuestionNumber - 1];

              currentQuestion.answer = answer;
              currentQuiz.numberOfQuestionsAnswered++;

              currentQuiz.questions.push(initialState.quizzes[""].questions[0]);

              currentQuiz.currentTime = formatTime(
                currentQuestion.questionTimer || "00:00"
              ) as number;
            });
          },
          nextQuestion: () => {
            set((state) => {
              const currentQuiz = state.quizzes[state.currentQuiz];
              currentQuiz.currentQuestionNumber++;
            });
          },
          previousQuestion: () => {
            set((state) => {
              const currentQuiz = state.quizzes[state.currentQuiz];
              currentQuiz.currentQuestionNumber--;
            });
          },
          increaseScore: () => {
            set((state) => {
              const currentQuiz = state.quizzes[state.currentQuiz];
              currentQuiz.currentScore++;
            });
          },
          setIsQuestionAnswered: () => {
            set((state) => {
              const currentQuiz = state.quizzes[state.currentQuiz];
              currentQuiz.questions[
                currentQuiz.currentQuestionNumber - 1
              ].isQuestionAnswered = true;
            });
          },
          setIsAnswerCorrect: () => {
            set((state) => {
              const currentQuiz = state.quizzes[state.currentQuiz];
              currentQuiz.questions[
                currentQuiz.currentQuestionNumber - 1
              ].isAnswerCorrect = true;
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
