import {
  createQuizHandler,
  getQuestionsHandler,
  getQuestionsRandomHandler,
  getQuizzesHandler,
  verifyAnswerHandler,
} from "./controllers/quiz.controller";
import { Express, NextFunction, Request, Response } from "express";
import {
  createQuizSchema,
  getQuestionsRandomSchema,
  getQuestionsSchema,
  verifyAnswerSchema,
} from "./schemas/quiz.schema";
import validateRequest from "./middlewares/validateRequest";
import {
  createTagHandler,
  deleteTagHandler,
  getTagsHandler,
} from "./controllers/tag.controller";
import { createTagSchema, deleteTagSchema } from "./schemas/tag.schema";

function routes(app: Express) {
  // ! Quizzes
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
    "/api/quiz/:quizId/random/:seed?",
    validateRequest(getQuestionsRandomSchema),
    getQuestionsRandomHandler
  );

  app.get(
    "/api/quiz/:quizId/:questionId/:answer/verify",
    validateRequest(verifyAnswerSchema),
    verifyAnswerHandler
  );

  // ! Tags
  app.get("/api/tags", getTagsHandler);

  app.post("/api/tag", validateRequest(createTagSchema), createTagHandler);

  app.delete(
    "/api/tag/:tagName",
    validateRequest(deleteTagSchema),
    deleteTagHandler
  );
}

export default routes;
