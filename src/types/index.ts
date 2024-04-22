export interface State {
  currentQuestionNumber: number;
  currentScore: number;
  numberOfQuestions: number;
  numberOfQuestionsAnswered: number;
  questions: Question[];
  currentTime: number;
  maximumTime: string;
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
