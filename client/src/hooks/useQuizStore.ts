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
              state.currentTime +=
                (formatTime(
                  state.questions[state.currentQuestionNumber - 1]
                    .questionTimer || "00:00"
                ) as number) || 0;
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
