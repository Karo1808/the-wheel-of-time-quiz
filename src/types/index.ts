type digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type TimeFormat = number | `${digit}${digit}:${digit}${digit}`;

export interface State {
  currentQuestionNumber: number;
  currentScore: number;
  numberOfQuestions: number;
  numberOfQuestionsAnswered: number;
  questions: Question[];
  currentTime: number;
  maximumTime: number;
}

export interface Question {
  questionNumber: number;
  questionLabel: string;
  questionAnsweredIndex: null | 1 | 2 | 3 | 4;
  questionCorrectIndex: 1 | 2 | 3 | 4;
  questionTimer: null | string;
  answers: Answer[];
}

export interface Answer {
  answerNumber: 1 | 2 | 3 | 4;
  answerLabel: string;
}

export interface Actions {
  answer: (number: 1 | 2 | 3 | 4) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  setQuestionTimer: (time: string) => void;
}
