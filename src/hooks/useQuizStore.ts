import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { getTimeValue } from "../utils";

interface State {
  currentQuestionNumber: number;
  currentScore: number;
  numberOfQuestions: number;
  numberOfQuestionsAnswered: number;
  questions: Question[];
  currentTime: number;
  maximumTime: string;
}

interface Question {
  questionNumber: number;
  questionLabel: string;
  questionAnsweredIndex: null | 1 | 2 | 3 | 4;
  questionCorrectIndex: 1 | 2 | 3 | 4;
  questionTimer: null | string;
  answers: Answer[];
}

interface Answer {
  answerNumber: 1 | 2 | 3 | 4;
  answerLabel: string;
}

interface Actions {
  answer: (number: 1 | 2 | 3 | 4) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  setQuestionTimer: (time: string) => void;
}

const initialState: State = {
  currentQuestionNumber: 1,
  currentScore: 0,
  numberOfQuestions: 3,
  numberOfQuestionsAnswered: 0,
  maximumTime: "01:00",
  currentTime: 0,
  questions: [
    {
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
    },
    {
      questionNumber: 2,
      questionLabel: "Who is the Amyrlin Seat at the beginning of the series?",
      questionAnsweredIndex: null,
      questionCorrectIndex: 2,
      questionTimer: null,
      answers: [
        {
          answerNumber: 1,
          answerLabel: "Moiraine Damodred",
        },
        {
          answerNumber: 2,
          answerLabel: "Siuan Sanche",
        },
        {
          answerNumber: 3,
          answerLabel: "Cadsuane Melaidhrin",
        },
        {
          answerNumber: 4,
          answerLabel: "Egwene al'Vere",
        },
      ],
    },
    {
      questionNumber: 3,
      questionLabel:
        "Which organization is responsible for hunting down male channelers?",
      questionAnsweredIndex: null,
      questionCorrectIndex: 4,
      questionTimer: null,
      answers: [
        {
          answerNumber: 1,
          answerLabel: "Whitecloaks",
        },
        {
          answerNumber: 2,
          answerLabel: "Aes Sedai",
        },
        {
          answerNumber: 3,
          answerLabel: "Warders",
        },
        {
          answerNumber: 4,
          answerLabel: "Red Ajah",
        },
      ],
    },
  ],
};

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
              state.currentTime +=
                getTimeValue(
                  state.questions[state.currentQuestionNumber - 1].questionTimer
                ) || 0;
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
