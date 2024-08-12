import { useEffect } from "react";

import { useNavigate } from "react-router";
import { useShallow } from "zustand/react/shallow";
import { useStopwatch } from "react-timer-hook";

import useQuizStore from "../hooks/useQuizStore";
import useVerifyAnswerQuery from "./queries/useVerifyAnswerQuery";
import useRandomQuestionsQuery from "./queries/useRandomQuestionsQuery";

import { formatTime } from "../utils/shared";
import { TimeFormat } from "../types";

const useQuiz = () => {
  // Zustand state
  const currentQuizId = useQuizStore(
    useShallow((state) => state.currentQuizId)
  );
  const currentQuiz = useQuizStore(
    useShallow((state) => state.quizzes[currentQuizId])
  );
  const quizState = useQuizStore(
    useShallow(
      () => currentQuiz.questions[currentQuiz.currentQuestionNumber - 1]
    )
  );
  const currentQuestion = useQuizStore(
    useShallow(() => currentQuiz.currentQuestionNumber)
  );
  const currentScore = useQuizStore(useShallow(() => currentQuiz.currentScore));
  const seed = useQuizStore(useShallow(() => currentQuiz.randomSeed));
  const numberOfQuestionsAnswered = useQuizStore(
    useShallow(() => currentQuiz.numberOfQuestionsAnswered)
  );
  const isQuestionAnswered = useQuizStore(
    useShallow(
      () =>
        currentQuiz.questions[currentQuiz.currentQuestionNumber - 1]
          .isQuestionAnswered
    )
  );

  // Zustand actions
  const setQuestionTimer = useQuizStore(
    useShallow((state) => state.setQuestionTimer)
  );
  const setAnswer = useQuizStore(useShallow((state) => state.setAnswer));
  const nextQuestion = useQuizStore(useShallow((state) => state.nextQuestion));
  const previousQuestion = useQuizStore(
    useShallow((state) => state.previousQuestion)
  );
  const setCorrectAnswer = useQuizStore(
    useShallow((state) => state.setCorrectAnswer)
  );
  const setSeed = useQuizStore(useShallow((state) => state.setSeed));
  const setCurrentQuestionId = useQuizStore(
    useShallow((state) => state.setCurrentQuestionId)
  );
  const setIsAnswerCorrect = useQuizStore(
    useShallow((state) => state.setIsAnswerCorrect)
  );
  const increaseScore = useQuizStore(
    useShallow((state) => state.increaseScore)
  );
  const setIsQuestionAnswered = useQuizStore(
    useShallow((state) => state.setIsQuestionAnswered)
  );

  const navigate = useNavigate();

  // Queries
  const {
    quiz,
    error: quizError,
    refetch: quizRefetch,
  } = useRandomQuestionsQuery();
  const {
    verificationResult,
    isLoading: isLoadingVerify,
    error: errorVerify,
  } = useVerifyAnswerQuery();

  // Set initial seed
  useEffect(() => {
    if (!seed && currentQuizId) {
      setSeed(quiz?.seed);
    }
  }, [quiz?.seed, setSeed, seed, currentQuizId]);

  //  Synchronize state with verification result from backend
  useEffect(() => {
    if (verificationResult?.isCorrect && !isQuestionAnswered) {
      increaseScore();
      setIsAnswerCorrect();
    }
    if (verificationResult?.isCorrect !== undefined) {
      setIsQuestionAnswered();
      setCorrectAnswer(verificationResult?.correctAnswer);
    }
  }, [
    verificationResult?.isCorrect,
    increaseScore,
    setIsQuestionAnswered,
    isQuestionAnswered,
    setIsAnswerCorrect,
    setCorrectAnswer,
    verificationResult?.correctAnswer,
  ]);

  // Set current question id
  useEffect(() => {
    setCurrentQuestionId(quiz?.quizData?.questions[currentQuestion - 1]?._id);
  }, [currentQuestion, setCurrentQuestionId, quiz?.quizData?.questions]);

  // Stopwatch
  const stopwatchOffset = new Date();
  stopwatchOffset.setSeconds(
    stopwatchOffset.getSeconds() +
      (formatTime(quizState.questionTimer || "00:00") as number)
  );
  const { minutes, seconds, pause, reset, start } = useStopwatch({
    autoStart: true,
    offsetTimestamp: stopwatchOffset,
  });
  useEffect(() => {
    const handleBeforeUnload = () => {
      setQuestionTimer(formatTime(minutes * 60 + seconds) as TimeFormat);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [setQuestionTimer, minutes, seconds]);

  return {
    quizState: {
      ...quizState,
      currentScore,
      numberOfQuestionsAnswered,
      currentQuestion,
    },
    quizActions: {
      setQuestionTimer,
      setAnswer,
      nextQuestion,
      previousQuestion,
      setIsAnswerCorrect,
    },
    quizQuery: {
      quiz: quiz?.quizData,
      quizError,
      quizRefetch,
    },
    verifyQuery: {
      verificationResult,
      isLoadingVerify,
      errorVerify,
    },
    stopwatch: {
      minutes,
      seconds,
      pause,
      reset,
      start,
    },
    navigate,
  };
};

export default useQuiz;
