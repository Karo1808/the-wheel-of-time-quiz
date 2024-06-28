import instance from "./index";
import { z } from "zod";

const getQuestionsSchema = z.object({
  numberOfQuestions: z.number({
    required_error: "Number of questions is missing in response",
  }),
  questions: z.array(
    z.object({
      questionNumber: z.number({
        required_error: "Question number is missing in response",
      }),
      questionLabel: z.string({
        required_error: "Question label is missing in response",
      }),
      questionAnswer: z.string({
        required_error: "Question answer is missing in response",
      }),
      answers: z.array(
        z.object({
          answerNumber: z.number({
            required_error: "Answer number is missing in response",
          }),
          answerLabel: z.string({
            required_error: "Answer label is missing in response",
          }),
        })
      ),
      _id: z.string({
        required_error: "Question id is missing in response",
      }),
    })
  ),
});

export type GetQuestionsResponse = z.infer<typeof getQuestionsSchema>;

export const getQuestions = async ({
  quizId,
}: {
  quizId: string;
}): Promise<GetQuestionsResponse> => {
  const result = await instance.get(`/quiz/${quizId}`);
  return getQuestionsSchema.parse(result.data);
};
