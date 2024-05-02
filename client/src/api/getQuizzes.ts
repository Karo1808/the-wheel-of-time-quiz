import instance from "./index";
import { z } from "zod";

const getQuizzesSchema = z.array(
  z
    .object({
      quizName: z.string({
        required_error: "Quiz name is missing in response",
      }),
      numberOfQuestions: z.number({
        required_error: "Number of questions is missing in response",
      }),
      maximumTime: z.number({
        required_error: "Maximum time is missing in response",
      }),
      _id: z.string({
        required_error: "ID is missing in response",
      }),
    })
    .strict()
);

export type GetQuizzesResponse = z.infer<typeof getQuizzesSchema>;

export const getQuizzes = async (): Promise<GetQuizzesResponse> => {
  const result = await instance.get("/quizzes");
  console.log(result);
  return getQuizzesSchema.parse(result.data);
};
