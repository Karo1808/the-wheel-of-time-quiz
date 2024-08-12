import * as z from "zod";

const createBookPayload = {
  body: z.object({
    bookName: z.string().optional(),
  }),
};

const deleteBookParams = {
  params: z.object({
    bookName: z.string({ required_error: "Book name is required" }),
  }),
};

export const createBookSchema = z.object({
  ...createBookPayload,
});

export const deleteBookSchema = z.object({
  ...deleteBookParams,
});

export type CreateBookSchema = z.TypeOf<typeof createBookSchema>;

export type DeleteBookSchema = z.TypeOf<typeof deleteBookSchema>;
