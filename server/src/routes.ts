import {
  createQuizHandler,
  getQuizzesHandler,
} from "./controllers/quiz.controller";
import { Express, NextFunction, Request, Response } from "express";
import { createQuizSchema } from "./schemas/quiz.schema";
import validateRequest from "./middlewares/validateRequest";

function routes(app: Express) {
  app.get(
    "/healthcheck",
    (req: Request, response: Response, next: NextFunction) =>
      response.sendStatus(200)
  );

  app.post("/api/quiz", validateRequest(createQuizSchema), createQuizHandler);
  app.get("/api/quiz", getQuizzesHandler);
}

export default routes;
