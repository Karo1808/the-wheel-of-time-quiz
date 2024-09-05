import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import {
  createQuizActions,
  createQuizQuestion,
  createQuizState,
} from "../types";
import { createQuzInitialState } from "../config";

const useCreateQuizStore = create<createQuizState & createQuizActions>()(
  devtools(
    immer(
      persist(
        (set) => ({
          ...createQuzInitialState,
          setQuizName: (name: string) => {
            set((state) => {
              state.quizName = name;
            });
          },
          setQuizDescription: (description: string) => {
            set((state) => {
              state.quizDescription = description;
            });
          },
          setMaximumTime: (maximumTime: number) => {
            set((state) => {
              state.maximumTime = maximumTime;
            });
          },
          setTags: (tags: string[]) => {
            set((state) => {
              state.tags = tags;
            });
          },
          setBook: (book: string) => {
            set((state) => {
              state.book = book;
            });
          },
          setQuestions: (questions: createQuizQuestion[]) => {
            set((state) => {
              state.questions = questions;
            });
          },
          resetStore: () => {
            set(createQuzInitialState);
          },
        }),
        {
          name: "createQuiz",
          storage: createJSONStorage(() => localStorage),
        }
      )
    )
  )
);

export default useCreateQuizStore;
