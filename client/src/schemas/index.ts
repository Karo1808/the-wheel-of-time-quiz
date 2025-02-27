import * as z from "zod";

export const createQuizSchema = z
  .object({
    quizName: z
      .string({
        required_error: "Quiz name is required",
      })
      .min(8, {
        message: "Quiz name must be at least 8 characters",
      }),
    quizDescription: z.string().optional(),
    maximumTime: z
      .string({
        required_error: "Maximum time is required",
      })
      .pipe(
        z.coerce
          .number({
            required_error: "Maximum time is required",
            invalid_type_error: "Maximum time must be a number",
          })
          .min(10, {
            message: "Maximum time must be at least 10 seconds",
          })
      ),
    tags: z.string().array().optional(),
    book: z.union([z.string(), z.array(z.string())]),
    questions: z
      .array(
        z.object({
          questionLabel: z
            .string({ required_error: "Question label is required" })
            .min(8, {
              message: "Question label must be at least 8 characters",
            }),
          questionAnswer: z.string().optional(),
          answers: z
            .array(
              z.string({
                required_error: "Answer label is required",
              })
            )
            .refine(
              (array) => {
                const uniqueSet = new Set(array);
                return array.length === uniqueSet.size;
              },
              {
                message: "No duplicate answers allowed",
              }
            ),
        })
      )
      .min(3, { message: "At least three questions are required" }),
  })
  .strict();

export type CreateQuizSchema = z.infer<typeof createQuizSchema>;

export type QuestionsSchema = Pick<CreateQuizSchema, "questions">;
