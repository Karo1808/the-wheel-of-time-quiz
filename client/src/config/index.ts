import { State } from "../types";

export const initialState: State = {
  currentQuestionNumber: 1,
  currentScore: 0,
  numberOfQuestionsAnswered: 0,
  currentQuestionId: undefined,
  currentTime: 0,
  randomSeed: undefined,
  questions: [
    {
      correctAnswer: undefined,
      answer: undefined,
      isCorrect: undefined,
      questionTimer: null,
    },
    {
      correctAnswer: undefined,
      answer: undefined,
      isCorrect: undefined,
      questionTimer: null,
    },
    {
      correctAnswer: undefined,
      answer: undefined,
      isCorrect: undefined,
      questionTimer: null,
    },
  ],
};
