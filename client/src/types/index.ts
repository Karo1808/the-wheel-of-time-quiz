type digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type TimeFormat = number | `${digit}${digit}:${digit}${digit}`;

export interface State {
  currentQuestionNumber: number;
  currentScore: number;
  numberOfQuestionsAnswered: number;
  questions: Question[];
  currentTime: number;
  randomSeed?: number;
  currentQuestionId?: string;
}

export interface Question {
  questionTimer: null | TimeFormat;
  correctAnswer?: string;
  answer?: string;
  isCorrect?: boolean;
}

export interface Actions {
  setAnswer: ({
    correctAnswer,
    isCorrect,
    answer,
  }: {
    correctAnswer?: string;
    isCorrect?: boolean;
    answer?: string;
  }) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  setSeed: (seed?: number) => void;
  setQuestionTimer: (time: TimeFormat) => void;
  setCurrentQuestionId: (id?: string) => void;
}
