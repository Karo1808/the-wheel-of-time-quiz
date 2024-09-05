import { z } from "zod";

import instance from "./index";

const getQuizSchema = z.object({
  quizName: z.string({ required_error: "Quiz name is required" }).min(8, {
    message: "Quiz name must be at least 8 characters",
  }),
  quizDescription: z.string().optional(),
  books: z.string().array().optional(),
  tags: z
    .array(
      z.object({
        tagName: z.string({
          required_error: "Tag name is missing in response",
        }),
        _id: z.string({
          required_error: "Tag id is missing in response",
        }),
      })
    )
    .optional(),
  maximumTime: z
    .number({
      required_error: "Maximum time is required",
      invalid_type_error: "Maximum time must be a number",
    })
    .positive({ message: "Maximum time must be positive" }),

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

export type GetQuizResponse = z.infer<typeof getQuizSchema>;

export const getQuiz = async ({
  quizId,
}: {
  quizId: string;
}): Promise<GetQuizResponse> => {
  const result = await instance.get(`/quiz/${quizId}`, {
    method: "GET",
  });
  return getQuizSchema.parse(result.data);
};
