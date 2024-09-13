import {
  createQuizHandler,
  deleteQuizHandler,
  getQuestionsHandler,
  getQuestionsRandomHandler,
  getQuizHandler,
  getQuizzesHandler,
  updateQuizHandler,
  verifyAnswerHandler,
} from "./controllers/quiz.controller";
import { Express, NextFunction, Request, Response } from "express";
import {
  createQuizSchema,
  deleteQuizSchema,
  getQuestionsRandomSchema,
  getQuestionsSchema,
  getQuizSchema,
  getQuizzesSchema,
  updateQuizSchema,
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
  // ! Health Check
  app.get(
    "/healthcheck",
    (req: Request, response: Response, next: NextFunction) =>
      response.sendStatus(200)
  );

  // ! Quizzes
  app.get("/api/quizzes", validateRequest(getQuizzesSchema), getQuizzesHandler);

  app.get("/api/quiz/:quizId", validateRequest(getQuizSchema), getQuizHandler);

  app.post("/api/quiz", validateRequest(createQuizSchema), createQuizHandler);

  app.patch(
    "/api/quiz/:quizId",
    validateRequest(updateQuizSchema),
    updateQuizHandler
  );

  app.delete(
    "/api/quiz/:quizId",
    validateRequest(deleteQuizSchema),
    deleteQuizHandler
  );

  // ! Questions

  app.get(
    "/api/questions/:quizId",
    validateRequest(getQuestionsSchema),
    getQuestionsHandler
  );

  app.get(
    "/api/questions/:quizId/random/:seed?",
    validateRequest(getQuestionsRandomSchema),
    getQuestionsRandomHandler
  );

  app.get(
    "/api/questions/:quizId/:questionId/:answer/verify",
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
