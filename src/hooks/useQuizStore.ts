import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface Answer {
  answerNumber: 1 | 2 | 3 | 4;
  answerLabel: string;
}

interface QuizState {
  questionNumber: number;
  questionLabel: string;
  questionAnsweredIndex: null | 1 | 2 | 3 | 4;
  questionCorrectIndex: 1 | 2 | 3 | 4;
  questionTimer: null | string;
  answers: Answer[];
  answer: (number: 1 | 2 | 3 | 4) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  setState: (state: QuizState) => void;
  setQuestionTimer: (time: string) => void;
}

const useQuizStore = create<QuizState>()(
  persist(
    (set) => ({
      questionNumber: 1,
      questionLabel: "Who is the Dragon Reborn?",
      questionAnsweredIndex: null,
      questionCorrectIndex: 2,
      questionTimer: null,
      answers: [
        {
          answerNumber: 1,
          answerLabel: "Matrim Cauthon",
        },
        {
          answerNumber: 2,
          answerLabel: "Rand al'Thor",
        },
        {
          answerNumber: 3,
          answerLabel: "Egwene al'Vere",
        },
        {
          answerNumber: 4,
          answerLabel: "Perrin Ayabara",
        },
      ],
      setState: (state: QuizState) => {
        set(state);
      },
      setQuestionTimer: (time: string) => {
        set((state: QuizState) => {
          return {
            ...state,
            questionTimer: time,
          };
        });
      },
      answer: (number: 1 | 2 | 3 | 4) => {
        set((state: QuizState) => {
          if (state.questionAnsweredIndex !== null) return state;
          return {
            questionAnsweredIndex: number,
          };
        });
      },
      nextQuestion: () => {
        set((state: QuizState) => ({
          questionNumber: state.questionNumber + 1,
        }));
      },
      previousQuestion: () => {
        set((state: QuizState) => ({
          questionNumber: state.questionNumber - 1,
        }));
      },
    }),
    {
      name: "quiz",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export { useQuizStore };
