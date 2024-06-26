import { Request, Response } from "express";

import {
  CreateQuizSchema,
  DeleteQuizSchema,
  GetQuestionsRandomSchema,
  GetQuestionsSchema,
  GetQuizzesSchema,
  VerifyAnswerSchema,
} from "schemas/quiz.schema";
import {
  createQuiz,
  deleteQuiz,
  getQuestions,
  getQuestionsRandom,
  getQuizzes,
  verifyAnswer,
} from "../services/quiz.service";

export async function createQuizHandler(
  req: Request<{}, {}, CreateQuizSchema["body"]>,
  res: Response
) {
  const body = req.body;

  // @ts-ignore
  const quiz = await createQuiz(body);

  if (typeof quiz === "string") {
    return res.status(500).send(quiz);
  }

  if (!quiz) {
    return res.status(409).send("Quiz with that name already exists");
  }

  return res.status(201).send(quiz);
}

export async function getQuizzesHandler(
  req: Request<GetQuizzesSchema["params"]>,
  res: Response
) {
  const page = req.params.page || 1;
  const limit = req.params.limit || 10;

  const result = await getQuizzes({ page, limit });

  if (!result) {
    return res.status(404).send("Quizzes not found");
  }
  return res.status(200).send(result);
}

export async function deleteQuizHandler(
  req: Request<DeleteQuizSchema["params"]>,
  res: Response
) {
  const result = await deleteQuiz({
    quizId: req.params.quizId,
  });

  if (!result) {
    return res.status(404).send("Quiz not found");
  }

  return res.status(200).send(result);
}

export async function getQuestionsHandler(
  req: Request<GetQuestionsSchema["params"]>,
  res: Response
) {
  const result = await getQuestions({
    quizId: req.params.quizId,
  });

  if (!result) {
    return res.status(404).send("Quiz not found");
  }

  return res.status(200).send(result);
}

export async function getQuestionsRandomHandler(
  req: Request<GetQuestionsRandomSchema["params"]>,
  res: Response
) {
  const result = await getQuestionsRandom({
    quizId: req.params.quizId,
    seed: +req.params.seed,
  });

  if (!result) {
    return res.status(404).send("Quiz not found");
  }

  return res.status(200).send(result);
}

export async function verifyAnswerHandler(
  req: Request<VerifyAnswerSchema["params"]>,
  res: Response
) {
  const result = await verifyAnswer({
    quizId: req.params.quizId,
    questionId: req.params.questionId,
    answer: req.params.answer,
  });

  if (!result) {
    return res.status(404).send("Quiz not found");
  }

  return res.status(200).send(result);
}
