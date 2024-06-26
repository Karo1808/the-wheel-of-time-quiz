import mongoose from "mongoose";

export interface TagInput {
  tagName: string;
  numberOfTags: number;
}

export interface TagDocument extends TagInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const tagSchema = new mongoose.Schema(
  {
    tagName: {
      type: String,
      required: true,
      unique: true,
    },
    numberOfTags: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const TagModel = mongoose.model<TagDocument>("Tag", tagSchema);

export default TagModel;
