import instance from "./index";
import { z } from "zod";

const getRandomQuestionsSchema = z.object({
  quizData: z.object({
    quizName: z.string({
      required_error: "Quiz name is missing in response",
    }),
    numberOfQuestions: z.number({
      required_error: "Number of questions is missing in response",
    }),
    maximumTime: z.number({
      required_error: "Maximum time is missing in response",
    }),
    questions: z.array(
      z.object({
        questionNumber: z.number({
          required_error: "Question number is missing in response",
        }),
        questionLabel: z.string({
          required_error: "Question label is missing in response",
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
  }),
  seed: z.number(),
});

export type GetRandomQuestionsResponse = z.infer<
  typeof getRandomQuestionsSchema
>;

export const getRandomQuestions = async ({
  quizId,
  seed,
}: {
  quizId: string;
  seed?: string;
}): Promise<GetRandomQuestionsResponse> => {
  const result = await instance.get(`/quiz/${quizId}/random/${seed}`);
  return getRandomQuestionsSchema.parse(result.data);
};
