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
      answer: undefined,
      isQuestionAnswered: false,
      questionTimer: null,
    },
    {
      isQuestionAnswered: false,
      answer: undefined,
      questionTimer: null,
    },
    {
      answer: undefined,
      isQuestionAnswered: false,
      questionTimer: null,
    },
  ],
};
