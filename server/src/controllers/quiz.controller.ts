import { Request, Response } from "express";

import {
  CreateQuizSchema,
  GetQuestionsRandomSchema,
  GetQuestionsSchema,
  VerifyAnswerSchema,
} from "schemas/quiz.schema";
import {
  createQuiz,
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
  return res.status(201).send(quiz);
}

export async function getQuizzesHandler(req: Request, res: Response) {
  const result = await getQuizzes();
  if (!result.length) {
    return res.status(404).send("Resource not found");
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
    return res.status(404).send("Resource not found");
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
    return res.status(404).send("Resource not found");
  }

  return res.status(200).send(result);
}

export async function verifyAnswerHandler(
  req: Request<VerifyAnswerSchema["params"]>,
  res: Response
) {
  if (
    req.params.answer === "undefined" ||
    req.params.questionId === "undefined" ||
    req.params.quizId === "undefined"
  ) {
    return res.status(404).send("Resource not found");
  }

  const result = await verifyAnswer({
    quizId: req.params.quizId,
    questionId: req.params.questionId,
    answer: req.params.answer,
  });

  if (!result) {
    return res.status(404).send("Resource not found");
  }

  return res.status(200).send(result);
}
