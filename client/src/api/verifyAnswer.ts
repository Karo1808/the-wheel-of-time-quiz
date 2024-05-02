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
  questionNumber?: string;
  answer?: string;
}

export type VerifyAnswerResponse = z.infer<typeof verifyQuestionSchema>;

export const verifyAnswer = async ({
  quizId,
  questionNumber,
  answer,
}: Params): Promise<VerifyAnswerResponse> => {
  const result = await instance.get(
    `/quiz/${quizId}/${questionNumber}/${answer}/verify`
  );
  return verifyQuestionSchema.parse(result.data);
};
