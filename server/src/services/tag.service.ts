import TagModel, { TagDocument, TagInput } from "../models/tag.model";
import log from "../utils/logger";

export async function getTags(): Promise<TagDocument[]> {
  try {
    const tags = await TagModel.find(
      {},
      { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 }
    );
    return tags;
  } catch (error: any) {
    log.error(`Error fetching tags: ${error.message}`);
    throw new Error("Error fetching tags");
  }
}

export async function createTag(tag: TagInput): Promise<TagDocument> {
  try {
    const existingTag = await TagModel.findOne({ tagName: tag.tagName });

    if (existingTag) {
      return;
    }

    const newTag = await TagModel.create(tag);
    return newTag;
  } catch (error: any) {
    log.error(`Error creating tag: ${error.message}`);
    throw new Error("Error creating tag");
  }
}

export async function deleteTag(tagName: string): Promise<TagDocument> {
  try {
    const tag = await TagModel.findOne(
      { tagName },
      {
        _id: 0,
        __v: 0,
        createdAt: 0,
        updatedAt: 0,
      }
    );

    if (!tag) {
      return;
    }

    await TagModel.deleteOne({ tagName });

    return tag;
  } catch (error: any) {
    log.error(`Error deleting tag: ${error.message}`);
    throw new Error("Error deleting tag");
  }
}
