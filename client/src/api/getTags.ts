import instance from "./index";
import { z } from "zod";

const getTagsSchema = z.array(
  z.object({
    tagName: z.string({ required_error: "Tag name is required" }),
    numberOfTags: z.number({ required_error: "Number of tags is required" }),
  })
);

export type GetTagsResponse = z.infer<typeof getTagsSchema>;

export const getTags = async () => {
  const result = await instance.get("tags", { method: "GET" });
  return getTagsSchema.parse(result.data);
};
