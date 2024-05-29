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
          setCurrentQuiz: (quizId: string, initial = false) => {
            set((state) => {
              state.currentQuizId = quizId;
              if (initial) {
                state.quizzes[quizId] = initialState.quizzes[""];
                state.quizzes[quizId].currentQuestionId = quizId;
              }
            });
          },
          resetQuiz: () => {
            set((state) => {
              state.quizzes[state.currentQuizId] = initialState.quizzes[""];
            });
          },
          setQuestionTimer: (time: TimeFormat) => {
            set((state) => {
              const currentQuizId = state.quizzes[state.currentQuizId];
              currentQuizId.questions[
                currentQuizId.currentQuestionNumber - 1
              ].questionTimer = time;
            });
          },
          setCurrentQuestionId: (id?: string) => {
            set((state) => {
              const currentQuizId = state.quizzes[state.currentQuizId];
              currentQuizId.currentQuestionId = id;
            });
          },
          setSeed: (seed?: number) => {
            set((state) => {
              const currentQuizId = state.quizzes[state.currentQuizId];
              currentQuizId.randomSeed = seed;
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
              const currentQuizId = state.quizzes[state.currentQuizId];
              const currentQuestion =
                currentQuizId.questions[
                  currentQuizId.currentQuestionNumber - 1
                ];

              currentQuestion.answer = answer;
              currentQuizId.numberOfQuestionsAnswered++;

              if (
                numberOfQuestions !== currentQuizId.numberOfQuestionsAnswered
              ) {
                currentQuizId.questions.push(
                  initialState.quizzes[""].questions[0]
                );
              }

              currentQuizId.currentTime = formatTime(
                currentQuestion.questionTimer || "00:00"
              ) as number;
            });
          },
          nextQuestion: () => {
            set((state) => {
              const currentQuizId = state.quizzes[state.currentQuizId];
              currentQuizId.currentQuestionNumber++;
            });
          },
          previousQuestion: () => {
            set((state) => {
              const currentQuizId = state.quizzes[state.currentQuizId];
              currentQuizId.currentQuestionNumber--;
            });
          },
          increaseScore: () => {
            set((state) => {
              const currentQuizId = state.quizzes[state.currentQuizId];
              currentQuizId.currentScore++;
            });
          },
          setIsQuestionAnswered: () => {
            set((state) => {
              const currentQuizId = state.quizzes[state.currentQuizId];
              currentQuizId.questions[
                currentQuizId.currentQuestionNumber - 1
              ].isQuestionAnswered = true;
            });
          },
          setIsAnswerCorrect: () => {
            set((state) => {
              const currentQuizId = state.quizzes[state.currentQuizId];
              currentQuizId.questions[
                currentQuizId.currentQuestionNumber - 1
              ].isAnswerCorrect = true;
            });
          },
          setCorrectAnswer: (answer?: string) => {
            set((state) => {
              const currentQuizId = state.quizzes[state.currentQuizId];
              currentQuizId.questions[
                currentQuizId.currentQuestionNumber - 1
              ].correctAnswer = answer || "";
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
