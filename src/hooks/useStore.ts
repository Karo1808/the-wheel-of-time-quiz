import { create } from "zustand";

interface Answer {
  number: number;
  label: string;
  isAnswered: boolean;
  isCorrect: boolean;
}

interface State {
  questionNumber: number;
  questionLabel: string;
  answers: Answer[];
  answer: (number: number) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
}

const usePersonStore = create((set) => ({
  questionNumber: 1,
  questionLabel: "Who is the Dragon Reborn?",
  answers: [
    {
      number: 1,
      label: "Matrim Cauthon",
      isAnswered: false,
      isCorrect: false,
    },
    {
      number: 2,
      label: "Rand al'Thor",
      isAnswered: false,
      isCorrect: true,
    },
    {
      number: 3,
      label: "Egwene al'Vere",
      isAnswered: false,
      isCorrect: false,
    },
    {
      number: 4,
      label: "Perrin Ayabara",
      isCorrect: false,
    },
  ],
  answer: (number: number) => {
    set((state: State) => ({
      answers: state.answers.map((answer: Answer) => {
        if (answer.number === number) {
          return {
            ...answer,
            isAnswered: true,
          };
        }
        return answer;
      }),
    }));
  },
  nextQuestion: () => {
    set((state: State) => ({
      questionNumber: state.questionNumber + 1,
    }));
  },
  previousQuestion: () => {
    set((state: State) => ({
      questionNumber: state.questionNumber - 1,
    }));
  },
}));

export default usePersonStore;
