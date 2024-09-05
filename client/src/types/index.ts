type digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type TimeFormat = number | `${digit}${digit}:${digit}${digit}`;

export type QuizId = string;

export interface quizzesState {
  currentQuizId: QuizId;
  quizzes: Record<QuizId, Quiz>;
}

export interface Quiz {
  quizId: QuizId;
  currentQuestionNumber: number;
  currentScore: number;
  numberOfQuestionsAnswered: number;
  questions: Question[];
  currentTime: 0 | TimeFormat;
  randomSeed?: number;
  currentQuestionId?: string;
}

export interface Question {
  questionTimer: null | TimeFormat;
  answer?: string;
  isQuestionAnswered: boolean;
  isAnswerCorrect: boolean;
  correctAnswer?: string;
}

export interface quizzesActions {
  setCurrentQuiz: (quizName: string, initial?: boolean) => void;
  resetQuiz: () => void;
  setAnswer: ({
    answer,
    numberOfQuestions,
  }: {
    answer?: string;
    numberOfQuestions?: number;
  }) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  setSeed: (seed?: number) => void;
  setQuestionTimer: (time: TimeFormat) => void;
  setCurrentQuestionId: (id?: string) => void;
  increaseScore: () => void;
  setIsQuestionAnswered: () => void;
  setIsAnswerCorrect: () => void;
  setCorrectAnswer: (answer?: string) => void;
  setCurrentQuizId: (id: string) => void;
}

export interface createQuizState {
  quizName: string;
  quizDescription: string;
  tags: string[];
  book: string;
  maximumTime: number;
  questions: createQuizQuestion[];
}

export interface createQuizQuestion {
  questionLabel: string;
  questionAnswer: string;
  answers: string[];
}

export interface createQuizActions {
  setQuizName: (name: string) => void;
  setQuizDescription: (description: string) => void;
  setMaximumTime: (maximumTime: number) => void;
  setTags: (tags: string[]) => void;
  setBook: (book: string) => void;
  setQuestions: (questions: createQuizQuestion[]) => void;
  resetStore: () => void;
}
