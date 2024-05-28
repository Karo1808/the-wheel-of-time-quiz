type digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type TimeFormat = number | `${digit}${digit}:${digit}${digit}`;

type QuizId = string;

export interface State {
  currentQuizId: QuizId;
  quizzes: { [quizName: QuizId]: Quiz };
}

export interface Quiz {
  quizId: string;
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
  answer?: string;
  isQuestionAnswered: boolean;
  isAnswerCorrect: boolean;
  correctAnswer?: string;
}

export interface Actions {
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
}
