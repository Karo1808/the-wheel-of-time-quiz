import * as z from "zod";

const createQuizPayload = {
  body: z
    .object({
      quizName: z.string({ required_error: "Quiz name is required" }).min(8, {
        message: "Quiz name must be at least 8 characters",
      }),

      numberOfQuestions: z
        .number({
          invalid_type_error: "Number of questions must be a number",
        })
        .positive({ message: "Number of questions must be positive" }),

      maximumTime: z
        .number({
          required_error: "Maximum time is required",
          invalid_type_error: "Maximum time must be a number",
        })
        .positive({ message: "Maximum time must be positive" }),

      questions: z.array(
        z.object({
          questionNumber: z
            .number({
              required_error: "Question number is required",
              invalid_type_error: "Question number must be a number",
            })
            .positive({ message: "Question number must be positive" })
            .max(4, {
              message: "Question number must be less than or equal to 4",
            }),

          questionLabel: z
            .string({ required_error: "Question label is required" })
            .min(10, {
              message: "Question label must be at least 10 characters",
            }),
          questionAnswer: z.string({
            required_error: "Question answer  is required",
            invalid_type_error: "Question correct index must be a string",
          }),
          answers: z.array(
            z.object({
              answerNumber: z
                .number({
                  required_error: "Answer number is required",
                  invalid_type_error: "Answer number must be a number",
                })
                .positive({ message: "Answer number must be positive" })
                .max(4, {
                  message: "Answer number must be less than or equal to 4",
                }),
              answerLabel: z.string({
                required_error: "Answer label is required",
              }),
            })
          ),
        })
      ),
    })
    .strict(),
};

const getQuestionsParams = {
  params: z.object({
    quizId: z.string({ required_error: "Quiz id is required" }),
  }),
};

const verifyAnswerParams = {
  params: z.object({
    quizId: z.string({ required_error: "Quiz id is required" }),
    questionNumber: z
      .string({
        required_error: "Question number is required",
        invalid_type_error: "Question number must be a string",
      })
      .regex(/^(1|2|3|4)$/, {
        message: "Question number must be less than or equal to 4",
      }),
    answer: z.string({
      required_error: "Answer is required",
      invalid_type_error: "Answer number must be a string",
    }),
  }),
};

export const createQuizSchema = z.object({
  ...createQuizPayload,
});

export const getQuestionsSchema = z.object({
  ...getQuestionsParams,
});

export const verifyAnswerSchema = z.object({
  ...verifyAnswerParams,
});

export type CreateQuizSchema = z.TypeOf<typeof createQuizSchema>;

export type GetQuestionsSchema = z.TypeOf<typeof getQuestionsSchema>;

export type VerifyAnswerSchema = z.TypeOf<typeof verifyAnswerSchema>;
