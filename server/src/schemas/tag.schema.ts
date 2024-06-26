import mongoose from "mongoose";
import * as z from "zod";

const createTagPayload = {
  body: z.object({
    tagName: z.string().optional(),
  }),
};

const deleteTagParams = {
  params: z.object({
    tagName: z.string({ required_error: "Tag name is required" }),
  }),
};

export const createTagSchema = z.object({
  ...createTagPayload,
});

export const deleteTagSchema = z.object({
  ...deleteTagParams,
});

export type CreateTagSchema = z.TypeOf<typeof createTagSchema>;

export type DeleteTagSchema = z.TypeOf<typeof deleteTagSchema>;
