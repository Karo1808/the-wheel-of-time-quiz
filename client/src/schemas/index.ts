import * as z from "zod";

export const createQuizSchema = z
  .object({
    quizName: z.string({ required_error: "Quiz name is required" }).min(8, {
      message: "Quiz name must be at least 8 characters",
    }),
    quizDescription: z.string().optional(),
    // tags: z.string().array().optional(),
    // book: z.string().array().optional(),
    maximumTime: z.string({
      required_error: "Maximum time is required",
      invalid_type_error: "Maximum time must be a number",
    }),
    // questions: z.array(
    //   z.object({
    //     questionLabel: z
    //       .string({ required_error: "Question label is required" })
    //       .min(8, {
    //         message: "Question label must be at least  characters",
    //       }),
    //     questionAnswer: z.string({
    //       required_error: "Question answer  is required",
    //       invalid_type_error: "Question correct index must be a string",
    //     }),
    //     answers: z.array(
    //       z.string({
    //         required_error: "Answer label is required",
    //       })
    //     ),
    //   })
    // ),
  })
  .strict();

export type CreateQuizSchema = z.infer<typeof createQuizSchema>;
