import instance from "./index";
import { z } from "zod";

const deleteQuizSchema = z.object({
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

export type DeleteQuizResponse = z.infer<typeof deleteQuizSchema>;

export const deleteQuiz = async ({
  quizId,
}: {
  quizId: string;
}): Promise<DeleteQuizResponse> => {
  const result = await instance.delete(`/quiz/${quizId}`, { method: "DELETE" });
  return deleteQuizSchema.parse(result.data);
};
