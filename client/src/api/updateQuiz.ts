import { CreateQuizSchema } from "../schemas";
import instance from "./index";
import { z } from "zod";

const updateQuizSchema = z.object({
  quizId: z.string({
    required_error: "quizId is missing in response",
  }),
  quizName: z.string({
    required_error: "quizName is missing in response",
  }),
  ok: z.boolean({
    required_error: "ok is missing in response",
  }),
});

export type UpdateQuizResponse = z.infer<typeof updateQuizSchema>;

export const updateQuiz = async ({
  quizId,
  body,
}: {
  quizId: string;
  body: Partial<CreateQuizSchema>;
}): Promise<UpdateQuizResponse> => {
  const result = await instance.patch(`/quiz/${quizId}`, body, {
    method: "PATCH",
  });
  return updateQuizSchema.parse(result.data);
};
