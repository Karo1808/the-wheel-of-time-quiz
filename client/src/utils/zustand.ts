import { quizzesInitialState } from "../config";
import { QuizId, quizzesState, TimeFormat } from "../types";
import { formatTime } from "./shared";

type Params = {
  state: quizzesState;
};

type setCurrentQuizParams = Params & {
  quizId: QuizId;
  initial?: boolean;
};

export const setCurrentQuiz = ({
  quizId,
  initial = false,
  state,
}: setCurrentQuizParams) => {
  state.currentQuizId = quizId;
  if (initial) {
    state.quizzes[quizId] = quizzesInitialState.quizzes[""];
  }
  return state;
};

type setCurrentQuizIdParams = Params & {
  quizId: QuizId;
};

export const setCurrentQuizId = ({ quizId, state }: setCurrentQuizIdParams) => {
  state.currentQuizId = quizId;
  return state;
};

type resetQuizParams = Params;

export const resetQuiz = ({ state }: resetQuizParams) => {
  state.quizzes[state.currentQuizId] = quizzesInitialState.quizzes[""];
  return state;
};

type setQuestionTimerParams = Params & {
  time: TimeFormat;
};

export const setQuestionTimer = ({ time, state }: setQuestionTimerParams) => {
  const currentQuizId = state.quizzes[state.currentQuizId];
  currentQuizId.questions[
    currentQuizId.currentQuestionNumber - 1
  ].questionTimer = time;
  return state;
};

type setCurrentQuestionIdParams = Params & {
  id?: string;
};

export const setCurrentQuestionId = ({
  id,
  state,
}: setCurrentQuestionIdParams) => {
  const currentQuizId = state.quizzes[state.currentQuizId];
  currentQuizId.currentQuestionId = id;
  return state;
};

type setSeedParams = Params & {
  seed?: number;
};

export const setSeed = ({ seed, state }: setSeedParams) => {
  const currentQuizId = state.quizzes[state.currentQuizId];
  currentQuizId.randomSeed = seed;
  return state;
};

type setAnswerParams = Params & {
  answer?: string;
  numberOfQuestions?: number;
};

export const setAnswer = ({
  answer,
  numberOfQuestions,
  state,
}: setAnswerParams) => {
  const currentQuizId = state.quizzes[state.currentQuizId];
  const currentQuestion =
    currentQuizId.questions[currentQuizId.currentQuestionNumber - 1];

  currentQuestion.answer = answer;
  currentQuizId.numberOfQuestionsAnswered++;

  if (numberOfQuestions !== currentQuizId.numberOfQuestionsAnswered) {
    currentQuizId.questions.push(quizzesInitialState.quizzes[""].questions[0]);
  }

  currentQuizId.currentTime = formatTime(
    currentQuestion.questionTimer || "00:00"
  ) as number;
  return state;
};

type nextQuestionParams = Params;

export const nextQuestion = ({ state }: nextQuestionParams) => {
  const currentQuizId = state.quizzes[state.currentQuizId];
  currentQuizId.currentQuestionNumber++;
  return state;
};

type previousQuestionParams = Params;

export const previousQuestion = ({ state }: previousQuestionParams) => {
  const currentQuizId = state.quizzes[state.currentQuizId];
  currentQuizId.currentQuestionNumber--;
  return state;
};

type increaseScoreParams = Params;

export const increaseScore = ({ state }: increaseScoreParams) => {
  const currentQuizId = state.quizzes[state.currentQuizId];
  currentQuizId.currentScore++;
  return state;
};

type setIsQuestionAnsweredParams = Params;

export const setIsQuestionAnswered = ({
  state,
}: setIsQuestionAnsweredParams) => {
  const currentQuizId = state.quizzes[state.currentQuizId];
  currentQuizId.questions[
    currentQuizId.currentQuestionNumber - 1
  ].isQuestionAnswered = true;
  return state;
};

type setIsAnswerCorrectParams = Params;

export const setIsAnswerCorrect = ({ state }: setIsAnswerCorrectParams) => {
  const currentQuizId = state.quizzes[state.currentQuizId];
  currentQuizId.questions[
    currentQuizId.currentQuestionNumber - 1
  ].isAnswerCorrect = true;
  return state;
};

type setCorrectAnswerParams = Params & {
  answer?: string;
};

export const setCorrectAnswer = ({ answer, state }: setCorrectAnswerParams) => {
  const currentQuizId = state.quizzes[state.currentQuizId];
  currentQuizId.questions[
    currentQuizId.currentQuestionNumber - 1
  ].correctAnswer = answer || "";
  return state;
};
