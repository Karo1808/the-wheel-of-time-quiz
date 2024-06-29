import instance from "./index";
import { z } from "zod";

const verifyQuestionSchema = z.object({
  isCorrect: z.boolean({
    required_error: "isCorrect is missing in response",
  }),
  correctAnswer: z.string({
    required_error: "correctAnswer is missing in response",
  }),
  receivedAnswer: z.string({
    required_error: "receivedAnswer is missing in response",
  }),
});

interface Params {
  quizId: string;
  questionId?: string;
  answer?: string;
}

export type VerifyAnswerResponse = z.infer<typeof verifyQuestionSchema>;

export const verifyAnswer = async ({
  quizId,
  questionId,
  answer,
}: Params): Promise<VerifyAnswerResponse> => {
  const result = await instance.get(
    `/quiz/${quizId}/${questionId}/${answer}/verify`,
    { method: "GET" }
  );
  return verifyQuestionSchema.parse(result.data);
};
