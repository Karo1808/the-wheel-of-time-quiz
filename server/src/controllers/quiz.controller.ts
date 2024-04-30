import { Request, Response } from "express";
import { CreateQuizSchema } from "schemas/quiz.schema";
import { createQuiz, findQuizzes } from "../services/quiz.service";
import log from "../utils/logger";

export async function createQuizHandler(
  req: Request<{}, {}, CreateQuizSchema>,
  res: Response
) {
  const body = req.body;

  // @ts-ignore
  const quiz = await createQuiz(body);
  return res.send(quiz);
}

export async function getQuizzesHandler(req: Request, res: Response) {
  const result = await findQuizzes();
  return res.send(result);
}
