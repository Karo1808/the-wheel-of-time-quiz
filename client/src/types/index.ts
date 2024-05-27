type digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type TimeFormat = number | `${digit}${digit}:${digit}${digit}`;

type QuizName = string;

export interface State {
  currentQuiz: QuizName;
  quizzes: { [quizName: QuizName]: Quiz };
}

export interface Quiz {
  quizName: string;
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
}

export interface Actions {
  setCurrentQuiz: (quizName: string, initial?: boolean) => void;
  setAnswer: ({ answer }: { answer?: string }) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  setSeed: (seed?: number) => void;
  setQuestionTimer: (time: TimeFormat) => void;
  setCurrentQuestionId: (id?: string) => void;
  increaseScore: () => void;
  setIsQuestionAnswered: () => void;
  setIsAnswerCorrect: () => void;
}
