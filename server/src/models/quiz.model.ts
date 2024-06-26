import mongoose, { Schema } from "mongoose";
import { TagDocument } from "./tag.model";

export interface QuizInput {
  quizName: string;
  quizDescription?: string;
  tags: TagDocument["tagName"][];
  numberOfQuestions: number;
  maximumTime: number;
  questions: {
    questionNumber: 1 | 2 | 3 | 4;
    questionLabel: string;
    questionAnswer: string;
    answers: {
      answerNumber: 1 | 2 | 3 | 4;
      answerLabel: string;
    }[];
  }[];
}

export interface QuizDocument extends QuizInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const quizSchema = new mongoose.Schema(
  {
    quizName: {
      type: String,
      required: true,
      unique: true,
    },
    quizDescription: {
      type: String,
      required: false,
    },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag", required: false }],
    numberOfQuestions: {
      type: Number,
      required: false,
      default: function () {
        return this.questions.length;
      },
    },
    maximumTime: {
      type: Number,
      required: true,
    },
    questions: [
      {
        questionNumber: {
          type: Number,
          required: true,
        },
        questionLabel: {
          type: String,
          required: true,
        },
        questionAnswer: {
          type: String,
          required: true,
        },
        answers: [
          {
            answerNumber: {
              type: Number,
              required: true,
            },
            answerLabel: {
              type: String,
              required: true,
            },
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const QuizModel = mongoose.model<QuizDocument>("Quiz", quizSchema);

export default QuizModel;
