import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { Actions, State } from "../types";
import { initialState } from "../config";

const useQuizStore = create<State & Actions>()(
  devtools(
    immer(
      persist(
        (set) => ({
          ...initialState,
          setQuestionTimer: (time: string) => {
            set((state) => {
              state.questions[state.currentQuestionNumber - 1].questionTimer =
                time;
            });
          },
          answer: (number: 1 | 2 | 3 | 4) => {
            set((state) => {
              const answeredIndex =
                state.questions[state.currentQuestionNumber - 1]
                  .questionAnsweredIndex;
              state.questions[
                state.currentQuestionNumber - 1
              ].questionAnsweredIndex =
                answeredIndex === null ? number : answeredIndex;
              state.currentScore +=
                state.questions[state.currentQuestionNumber - 1]
                  .questionCorrectIndex === number
                  ? 1
                  : 0;
              state.numberOfQuestionsAnswered++;
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
