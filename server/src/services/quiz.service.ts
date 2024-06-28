import { startSession } from "mongoose";
import QuizModel, { QuizDocument, QuizInput } from "../models/quiz.model";
import TagModel from "../models/tag.model";
import log from "../utils/logger";
import { shuffleArray } from "../utils/randomize";

export async function createQuiz(
  quiz: QuizInput
): Promise<QuizDocument | string> {
  try {
    const session = await startSession();
    session.startTransaction();

    const existingQuiz = await QuizModel.findOne({
      quizName: quiz.quizName,
    }).session(session);

    if (existingQuiz) {
      await session.abortTransaction();
      session.endSession();
      return;
    }

    const tagDocuments = await TagModel.find({
      tagName: { $in: quiz.tags },
    }).session(session);

    const validTags = tagDocuments.map((tag) => tag.tagName);
    const invalidTags = quiz.tags.filter((tag) => !validTags.includes(tag));

    if (invalidTags.length) {
      await session.abortTransaction();
      session.endSession();
      return `${invalidTags.join(", ")} ${
        invalidTags.length > 1 ? "are not valid tags" : "is not a valid tag"
      }`;
    }

    const tagIds = tagDocuments.map((tag) => tag._id);

    const processedQuestions = Array.from(
      { length: quiz.numberOfQuestions },
      (_, i) => {
        const questionTemplate = quiz.questions[i];
        return {
          questionNumber: i + 1,
          questionLabel: questionTemplate.questionLabel,
          questionAnswer: questionTemplate.questionAnswer,
          answers: questionTemplate.answers.map((answerLabel, index) => ({
            answerNumber: index + 1,
            answerLabel,
          })),
        };
      }
    );

    const result = await QuizModel.create(
      [
        {
          ...quiz,
          tags: tagIds,
          questions: processedQuestions,
        },
      ],
      { session }
    );

    await Promise.all(
      tagIds.map((tagId) =>
        TagModel.updateOne(
          { _id: tagId },
          { $inc: { numberOfTags: 1 } },
          { session }
        )
      )
    );

    await session.commitTransaction();
    session.endSession();

    const populatedQuiz = await QuizModel.findById(result[0]._id)
      .populate({
        path: "tags",
        select: "tagName numberOfTags",
      })
      .exec();

    return populatedQuiz as QuizDocument;
  } catch (error: any) {
    log.error(`Error creating quiz: ${error.message}`);
    throw new Error("Error creating quiz");
  }
}

interface GetQuizzesResponse {
  totalItems: number;
  currentPage: number;
  totalPages: number;
  quizzes: QuizDocument[];
}

export async function getQuizzes({
  page,
  limit,
  book,
}: {
  page: number;
  limit: number;
  book?: string;
}): Promise<GetQuizzesResponse> {
  const offset = (page - 1) * limit;
  const query = book === "All" ? {} : { book: book };

  try {
    const result = await QuizModel.find(
      query,
      {
        __v: 0,
        createdAt: 0,
        updatedAt: 0,
        questions: 0,
      },
      {}
    )
      .skip(offset)
      .limit(limit)
      .populate({
        path: "tags",
        select: "tagName",
      })
      .exec();

    if (!result) return;

    const totalItems = await QuizModel.countDocuments(query);

    return {
      totalItems,
      currentPage: page,
      totalPages: Math.ceil(totalItems / limit),
      quizzes: result,
    };
  } catch (error: any) {
    log.error(`Error fetching quizzes: ${error.message}`);
    throw new Error("Error fetching quizzes");
  }
}

export async function deleteQuiz({
  quizId,
}: {
  quizId: string;
}): Promise<QuizDocument> {
  try {
    const existingQuiz = await QuizModel.findOne(
      { _id: quizId },
      {
        __v: 0,
        createdAt: 0,
        updatedAt: 0,
        "questions.questionAnswer": 0,
        "questions.answers._id": 0,
      }
    );
    if (!existingQuiz) {
      return;
    }

    await QuizModel.deleteOne({ _id: quizId });

    return existingQuiz;
  } catch (error: any) {
    log.error(`Error deleting quiz: ${error.message}`);
    throw new Error("Error deleting quiz");
  }
}

export async function getQuestions({
  quizId,
}: {
  quizId: string;
}): Promise<QuizDocument> {
  try {
    const result = await QuizModel.findOne(
      { _id: quizId },
      {
        _id: 0,
        __v: 0,
        createdAt: 0,
        updatedAt: 0,
        "questions.answers._id": 0,
        quizName: 0,
        tags: 0,
        maximumTime: 0,
        quizDescription: 0,
      }
    );

    if (!result) return;

    return result;
  } catch (error: any) {
    log.error(`Error fetching questions for quiz ${quizId}: ${error.message}`);
    throw new Error("Error fetching questions");
  }
}

export async function getQuestionsRandom({
  quizId,
  seed,
}: {
  quizId: string;
  seed?: number;
}): Promise<{ quizData: QuizDocument; seed: number } | null> {
  try {
    const result = await QuizModel.findOne(
      { _id: quizId },
      {
        _id: 0,
        __v: 0,
        createdAt: 0,
        updatedAt: 0,
        "questions.questionAnswer": 0,
        "questions.answers._id": 0,
      }
    );

    if (!result) return;

    const { newArray: randomQuestions, seed: randomSeed } = shuffleArray(
      result?.questions,
      seed
    );

    result.questions = randomQuestions;
    result.questions.forEach((question) => {
      const { newArray: randomAnswers } = shuffleArray(
        question.answers,
        randomSeed
      );
      question.answers = randomAnswers;
    });
    return { quizData: result, seed: randomSeed };
  } catch (error: any) {
    log.error(
      `Error fetching random questions for quiz ${quizId}: ${error.message}`
    );
    throw new Error("Error fetching random questions");
  }
}

export async function verifyAnswer({
  quizId,
  questionId,
  answer,
}: {
  quizId: string;
  questionId: string;
  answer: string;
}): Promise<{
  isCorrect: boolean;
  correctAnswer: string;
  receivedAnswer: string;
}> {
  try {
    const result = await QuizModel.findOne(
      { _id: quizId, "questions._id": questionId },
      { "questions.$": 1 }
    );

    if (!result) {
      return;
    }

    const {
      questions: [{ questionAnswer }],
    } = result;

    const isCorrect = questionAnswer === answer;
    const correctAnswer = questionAnswer;
    const receivedAnswer = answer;

    return { isCorrect, correctAnswer, receivedAnswer };
  } catch (error: any) {
    log.error(
      `Error verifying answer for quiz ${quizId}, question ${questionId}: ${error.message}`
    );
    throw new Error("Error verifying answer");
  }
}
