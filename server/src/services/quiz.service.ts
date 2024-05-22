import QuizModel, { QuizDocument, QuizInput } from "../models/quiz.model";
import log from "../utils/logger";
import { shuffleArray } from "../utils/randomize";

export async function createQuiz(quiz: QuizInput): Promise<QuizDocument> {
  try {
    const result = await QuizModel.create(quiz);
    return result;
  } catch (error: any) {
    log.error(`Error creating quiz: ${error.message}`);
    throw new Error("Error creating quiz");
  }
}

export async function getQuizzes(): Promise<QuizDocument[]> {
  try {
    const result = await QuizModel.find(
      {},
      {
        __v: 0,
        createdAt: 0,
        updatedAt: 0,
        questions: 0,
      },
      {}
    );
    return result;
  } catch (error: any) {
    log.error(`Error fetching quizzes: ${error.message}`);
    throw new Error("Error fetching quizzes");
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
        "questions.questionAnswer": 0,
        "questions.answers._id": 0,
      }
    );

    if (!result) {
      throw new Error("Quiz not found");
    }

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

    if (!result) {
      throw new Error("Quiz not found");
    }

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
    const {
      questions: [{ questionAnswer }],
    } = await QuizModel.findOne(
      { _id: quizId, "questions._id": questionId },
      { "questions.$": 1 } // Correct projection to only include the matching question
    );

    if (!questionAnswer) {
      throw new Error("Question not found");
    }

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
