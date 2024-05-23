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
      isAnswerCorrect: false,
    },
    {
      isQuestionAnswered: false,
      answer: undefined,
      questionTimer: null,
      isAnswerCorrect: false,
    },
    {
      answer: undefined,
      isQuestionAnswered: false,
      questionTimer: null,
      isAnswerCorrect: false,
    },
    {
      answer: undefined,
      isQuestionAnswered: false,
      questionTimer: null,
      isAnswerCorrect: false,
    },
    {
      isQuestionAnswered: false,
      answer: undefined,
      questionTimer: null,
      isAnswerCorrect: false,
    },
    {
      answer: undefined,
      isQuestionAnswered: false,
      questionTimer: null,
      isAnswerCorrect: false,
    },
    {
      answer: undefined,
      isQuestionAnswered: false,
      questionTimer: null,
      isAnswerCorrect: false,
    },
    {
      isQuestionAnswered: false,
      answer: undefined,
      questionTimer: null,
      isAnswerCorrect: false,
    },
    {
      answer: undefined,
      isQuestionAnswered: false,
      questionTimer: null,
      isAnswerCorrect: false,
    },
  ],
};
