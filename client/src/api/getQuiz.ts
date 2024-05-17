import instance from "./index";
import { z } from "zod";

const getQuizSchema = z.object({
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

export type GetQuizResponse = z.infer<typeof getQuizSchema>;

export const getQuiz = async ({
  quizId,
  seed,
}: {
  quizId: string;
  seed?: string;
}): Promise<GetQuizResponse> => {
  const result = await instance.get(`/quiz/${quizId}/random/${seed}`);
  return getQuizSchema.parse(result.data);
};
