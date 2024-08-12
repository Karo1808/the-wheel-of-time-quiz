import { z } from "zod";

import instance from "./index";

import { DEFAULT_BOOK, DEFAULT_PAGE_LIMIT, STARTING_PAGE } from "../config";

const getQuizzesSchema = z.object({
  totalItems: z.number({
    required_error: "Total items is missing in response",
  }),
  currentPage: z.number({
    required_error: "Current page is missing in response",
  }),
  totalPages: z.number({
    required_error: "Total pages is missing in response",
  }),
  quizzes: z.array(
    z.object({
      quizName: z.string({
        required_error: "Quiz name is missing in response",
      }),
      numberOfQuestions: z.number({
        required_error: "Number of questions is missing in response",
      }),
      maximumTime: z.number({
        required_error: "Maximum time is missing in response",
      }),
      quizDescription: z.string().optional(),
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
      _id: z.string({
        required_error: "Quiz id is missing in response",
      }),
    })
  ),
});

export type GetQuizzesResponse = z.infer<typeof getQuizzesSchema>;

export const getQuizzes = async ({
  page = STARTING_PAGE,
  limit = DEFAULT_PAGE_LIMIT,
  book = DEFAULT_BOOK,
}: {
  page?: number;
  limit?: number;
  book?: string;
}): Promise<GetQuizzesResponse> => {
  const result = await instance.get(
    `/quizzes?page=${page}&limit=${limit}&book=${book}`,
    {
      method: "GET",
    }
  );
  return getQuizzesSchema.parse(result.data);
};
