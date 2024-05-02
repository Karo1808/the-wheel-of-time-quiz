import { Request, Response } from "express";
import {
  CreateQuizSchema,
  GetQuestionsSchema,
  VerifyAnswerSchema,
} from "schemas/quiz.schema";
import {
  createQuiz,
  getQuestions,
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

export async function verifyAnswerHandler(
  req: Request<VerifyAnswerSchema["params"]>,
  res: Response
) {
  const result = await verifyAnswer({
    quizId: req.params.quizId,
    questionNumber: +req.params.questionNumber,
    answer: req.params.answer,
  });

  if (!result) {
    return res.status(404).send("Resource not found");
  }

  return res.status(200).send(result);
}
