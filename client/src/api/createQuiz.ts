import instance from "./index";
import { createQuizSchema } from "../schemas";
import { CreateQuizSchema } from "../schemas";

export const createQuiz = async (
  data: CreateQuizSchema
): Promise<CreateQuizSchema> => {
  const result = await instance.post("/quizzes", data, {
    method: "POST",
  });
  return createQuizSchema.parse(result.data);
};
