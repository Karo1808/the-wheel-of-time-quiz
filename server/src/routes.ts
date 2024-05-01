import {
  createQuizHandler,
  getQuestionsHandler,
  getQuizzesHandler,
  verifyAnswerHandler,
} from "./controllers/quiz.controller";
import { Express, NextFunction, Request, Response } from "express";
import {
  createQuizSchema,
  getQuestionsSchema,
  verifyAnswerSchema,
} from "./schemas/quiz.schema";
import validateRequest from "./middlewares/validateRequest";

function routes(app: Express) {
  app.get(
    "/healthcheck",
    (req: Request, response: Response, next: NextFunction) =>
      response.sendStatus(200)
  );

  app.get("/api/quizzes", getQuizzesHandler);

  app.post("/api/quiz", validateRequest(createQuizSchema), createQuizHandler);

  app.get(
    "/api/quiz/:quizId",
    validateRequest(getQuestionsSchema),
    getQuestionsHandler
  );

  app.get(
    "/api/quiz/:quizId/:questionNumber/:answerNumber/verify",
    validateRequest(verifyAnswerSchema),
    verifyAnswerHandler
  );
}

export default routes;
