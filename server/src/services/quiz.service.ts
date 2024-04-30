import { FilterQuery, QueryOptions } from "mongoose";
import QuizModel, { QuizDocument, QuizInput } from "../models/quiz.model";
import log from "../utils/logger";

export async function createQuiz(quiz: QuizInput) {
  try {
    const result = await QuizModel.create(quiz);
    return result;
  } catch (error: any) {
    console.error(error.message);
    throw error;
  }
}

export async function findQuizzes(options: QueryOptions = { lean: true }) {
  try {
    const result = await QuizModel.find(
      {},
      {
        _id: 0,
        __v: 0,
        createdAt: 0,
        updatedAt: 0,
        "questions.questionCorrectIndex": 0,
        "questions._id": 0,
        "questions.answers._id": 0,
      },
      options
    );
    return result;
  } catch (error) {
    log.error(error);
    throw error;
  }
}
