import { State } from "../types";

export const initialState: State = {
  currentQuiz: "",
  quizzes: {
    "": {
      quizName: "",
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
      ],
    },
  },
};
