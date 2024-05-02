import mongoose, { FilterQuery, QueryOptions } from "mongoose";
import QuizModel, { QuizDocument, QuizInput } from "../models/quiz.model";
import log from "../utils/logger";

export async function createQuiz(quiz: QuizInput): Promise<QuizDocument> {
  try {
    const result = await QuizModel.create(quiz);
    return result;
  } catch (error: any) {
    console.error(error.message);
    throw error;
  }
}

export async function getQuizzes(): Promise<QuizDocument[]> {
  try {
    const result = await QuizModel.find(
      {},
      {
        __v: 0,
        createdAt: 0,
        updatedAt: 0,
        questions: 0,
      },
      {}
    );
    return result;
  } catch (error) {
    log.error(error);
    throw error;
  }
}

export async function getQuestions({
  quizId,
}: {
  quizId: string;
}): Promise<QuizDocument> {
  try {
    const result = await QuizModel.findOne(
      { _id: quizId },
      {
        _id: 0,
        __v: 0,
        createdAt: 0,
        updatedAt: 0,
        "questions.questionAnswer": 0,
        "questions.answers._id": 0,
      }
    );

    return result;
  } catch (error) {
    log.error(error);
    throw error;
  }
}

export async function verifyAnswer({
  quizId,
  questionNumber,
  answer,
}: {
  quizId: string;
  questionNumber: number;
  answer: string;
}): Promise<{
  isCorrect: boolean;
  correctAnswer: string;
  receivedAnswer: string;
}> {
  try {
    const {
      questions: [{ questionAnswer }],
    } = await QuizModel.findOne(
      { _id: quizId },
      { questions: { $elemMatch: { questionNumber: +questionNumber } } }
    );

    const isCorrect = questionAnswer === answer;
    const correctAnswer = questionAnswer;
    const receivedAnswer = answer;

    return { isCorrect, correctAnswer, receivedAnswer };
  } catch (error) {
    log.error(error);
    throw error;
  }
}
