import mongoose, { FilterQuery, QueryOptions } from "mongoose";
import QuizModel, { QuizDocument, QuizInput } from "../models/quiz.model";
import log from "../utils/logger";
import { shuffleArray } from "../utils/shuffleArray";

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
        _id: 0,
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
        "questions.questionCorrectIndex": 0,
        "questions.answers._id": 0,
      }
    );

    result.questions = shuffleArray(result.questions);

    result.questions.forEach((question) => {
      question.answers = shuffleArray(question.answers);
    });

    return result;
  } catch (error) {
    log.error(error);
    throw error;
  }
}

export async function verifyAnswer({
  quizId,
  questionNumber,
  answerNumber,
}: {
  quizId: string;
  questionNumber: number;
  answerNumber: number;
}): Promise<{
  isCorrect: boolean;
  correctAnswer: string;
  receivedAnswer: string;
}> {
  try {
    const {
      questions: [{ questionCorrectIndex, answers }],
    } = await QuizModel.findOne(
      { _id: quizId },
      { questions: { $elemMatch: { questionNumber: +questionNumber } } }
    );

    const isCorrect = questionCorrectIndex === answerNumber;
    const correctAnswer = answers[questionCorrectIndex - 1].answerLabel;
    const receivedAnswer = answers[answerNumber - 1].answerLabel;

    return { isCorrect, correctAnswer, receivedAnswer };
  } catch (error) {
    log.error(error);
    throw error;
  }
}
