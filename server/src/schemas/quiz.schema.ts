import { BOOKS_LIST } from "../config/index";
import mongoose from "mongoose";
import * as z from "zod";

const createQuizPayload = {
  body: z
    .object({
      quizName: z.string({ required_error: "Quiz name is required" }).min(8, {
        message: "Quiz name must be at least 8 characters",
      }),
      quizDescription: z.string().optional(),
      tags: z.string().optional().array(),
      book: z.string().optional(),
      maximumTime: z
        .number({
          required_error: "Maximum time is required",
          invalid_type_error: "Maximum time must be a number",
        })
        .positive({ message: "Maximum time must be positive" }),

      questions: z.array(
        z.object({
          questionLabel: z
            .string({ required_error: "Question label is required" })
            .min(8, {
              message: "Question label must be at least 8 characters",
            }),
          questionAnswer: z.string({
            required_error: "Question answer  is required",
            invalid_type_error: "Question correct index must be a string",
          }),
          answers: z.array(
            z.string({
              required_error: "Answer label is required",
            })
          ),
        })
      ),
    })
    .strict(),
};

const updateQuizPayload = {
  body: z
    .object({
      quizName: z.string().optional(),
      quizDescription: z.string().optional(),
      tags: z
        .array(
          z.object({
            tagName: z.string({
              required_error: "Tag name is required",
            }),
            _id: z.string({
              required_error: "Tag id is required",
            }),
          })
        )
        .optional(),
      book: z.string().optional(),
      maximumTime: z
        .number({
          required_error: "Maximum time is required",
          invalid_type_error: "Maximum time must be a number",
        })
        .positive({ message: "Maximum time must be positive" })
        .optional(),

      questions: z
        .array(
          z.object({
            questionNumber: z.number({
              required_error: "Question number is required",
            }),
            questionLabel: z.string({
              required_error: "Question label is required",
            }),
            questionAnswer: z.string({
              required_error: "Question answer  is required",
              invalid_type_error: "Question correct index must be a string",
            }),
            answers: z.array(
              z.string({
                required_error: "Answer label is required",
              })
            ),
          })
        )
        .optional(),
    })
    .refine((data) => Object.keys(data).length === 0, {
      message: "At least one field is required",
    }),
};

const getQuizzesQueryParams = {
  query: z.object({
    page: z.coerce
      .number({ invalid_type_error: "Page number must be a number" })
      .positive({ message: "Page number must be a positive number" })
      .int({ message: "Page number must be an integer" })
      .optional(),
    limit: z.coerce
      .number({ invalid_type_error: "Limit must be a number" })
      .positive({ message: "Limit must be a positive number" })
      .int({ message: "Limit must be an integer" })
      .lte(50, { message: "Limit must be less than or equal to 50" })
      .optional(),
  }),
  book: z
    .enum(BOOKS_LIST, {
      message: `Book must be one of the following  ${BOOKS_LIST.join(", ")}`,
    })
    .optional(),
};

const getQuizParams = {
  params: z.object({
    quizId: z.string({ required_error: "Quiz id is required" }).refine(
      (val) => {
        return mongoose.Types.ObjectId.isValid(val);
      },
      { message: "Quiz id is not a valid id" }
    ),
  }),
};

const updateQuizParams = {
  params: z.object({
    quizId: z.string({ required_error: "Quiz id is required" }).refine(
      (val) => {
        return mongoose.Types.ObjectId.isValid(val);
      },
      { message: "Quiz id is not a valid id" }
    ),
  }),
};

const getQuestionsParams = {
  params: z.object({
    quizId: z.string({ required_error: "Quiz id is required" }).refine(
      (val) => {
        return mongoose.Types.ObjectId.isValid(val);
      },
      { message: "Quiz id is not a valid id" }
    ),
  }),
};

const deleteQuizParams = {
  params: z.object({
    quizId: z.string({ required_error: "Quiz id is required" }).refine(
      (val) => {
        return mongoose.Types.ObjectId.isValid(val);
      },
      { message: "Quiz id is not a valid id" }
    ),
  }),
};

const getQuestionsRandomParams = {
  params: z.object({
    quizId: z.string({ required_error: "Quiz id is required" }).refine(
      (val) => {
        return mongoose.Types.ObjectId.isValid(val);
      },
      { message: "Quiz id is not a valid id" }
    ),
    seed: z.string().optional(),
  }),
};

const verifyAnswerParams = {
  params: z.object({
    quizId: z.string({ required_error: "Quiz id is required" }).refine(
      (val) => {
        return mongoose.Types.ObjectId.isValid(val);
      },
      { message: "Quiz id is not a valid id" }
    ),
    questionId: z.string({ required_error: "Question id is required" }).refine(
      (val) => {
        return mongoose.Types.ObjectId.isValid(val);
      },
      { message: "Question id is not a valid id" }
    ),
    answer: z.string({
      required_error: "Answer is required",
    }),
  }),
};

export const createQuizSchema = z.object({
  ...createQuizPayload,
});

export const getQuizzesSchema = z.object({
  ...getQuizzesQueryParams,
});

export const getQuizSchema = z.object({
  ...getQuizParams,
});

export const updateQuizSchema = z.object({
  ...updateQuizParams,
});

export const getQuestionsSchema = z.object({
  ...getQuestionsParams,
});

export const deleteQuizSchema = z.object({
  ...deleteQuizParams,
});

export const getQuestionsRandomSchema = z.object({
  ...getQuestionsRandomParams,
});

export const verifyAnswerSchema = z.object({
  ...verifyAnswerParams,
});

export type CreateQuizSchema = z.TypeOf<typeof createQuizSchema>;

export type GetQuizSchema = z.TypeOf<typeof getQuizSchema>;

export type GetQuestionsSchema = z.TypeOf<typeof getQuestionsSchema>;

export type VerifyAnswerSchema = z.TypeOf<typeof verifyAnswerSchema>;

export type GetQuestionsRandomSchema = z.TypeOf<
  typeof getQuestionsRandomSchema
>;

export type DeleteQuizSchema = z.TypeOf<typeof deleteQuizSchema>;

export type GetQuizzesSchema = z.TypeOf<typeof getQuizzesSchema>;

export type UpdateQuizSchema = z.TypeOf<typeof updateQuizSchema>;
