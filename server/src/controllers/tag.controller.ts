import { Request, Response } from "express";
import { createTag, deleteTag, getTags } from "../services/tag.service";

export async function getTagsHandler(req: Request, res: Response) {
  const result = await getTags();
  if (!result.length) {
    return res.status(404).send("Tags not found");
  }
  return res.status(200).send(result);
}

export async function createTagHandler(req: Request, res: Response) {
  const result = await createTag(req.body);
  if (!result) {
    return res.status(409).send("Tag already exists");
  }
  return res.status(201).send(result);
}

export async function deleteTagHandler(req: Request, res: Response) {
  const result = await deleteTag(req.params.tagName);
  if (!result) {
    return res.status(404).send("Tag not found");
  }
  return res.status(200).send(result);
}
