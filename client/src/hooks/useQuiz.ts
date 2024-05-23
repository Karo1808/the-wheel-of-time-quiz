import { useShallow } from "zustand/react/shallow";
import { useNavigate } from "react-router";

import useQuizStore from "../hooks/useQuizStore";
import useQuizQuery from "./useQuizQuery";
import useVerifyAnswerQuery from "./useVerifyAnswerQuery";
import { useStopwatch } from "react-timer-hook";
import { useEffect } from "react";

const useQuiz = () => {
  const quizState = useQuizStore(
    useShallow((state) => state.questions[state.currentQuestionNumber - 1])
  );

  const setQuestionTimer = useQuizStore(
    useShallow((state) => state.setQuestionTimer)
  );

  const setAnswer = useQuizStore(useShallow((state) => state.setAnswer));

  const nextQuestion = useQuizStore(useShallow((state) => state.nextQuestion));
  const previousQuestion = useQuizStore(
    useShallow((state) => state.previousQuestion)
  );

  const currentQuestion = useQuizStore(
    useShallow((state) => state.currentQuestionNumber)
  );
  const currentScore = useQuizStore(useShallow((state) => state.currentScore));

  const numberOfQuestionsAnswered = useQuizStore(
    useShallow((state) => state.numberOfQuestionsAnswered)
  );

  const navigate = useNavigate();

  const { quiz, error: quizError, refetch: quizRefetch } = useQuizQuery();

  const setSeed = useQuizStore(useShallow((state) => state.setSeed));

  const setCurrentQuestionId = useQuizStore(
    useShallow((state) => state.setCurrentQuestionId)
  );

  const setIsAnswerCorrect = useQuizStore(
    useShallow((state) => state.setIsAnswerCorrect)
  );

  const seed = useQuizStore(useShallow((state) => state.randomSeed));

  useEffect(() => {
    if (!seed) {
      setSeed(quiz?.seed);
    }
  }, [quiz?.seed, setSeed, seed]);

  const increaseScore = useQuizStore(
    useShallow((state) => state.increaseScore)
  );

  const setIsQuestionAnswered = useQuizStore(
    useShallow((state) => state.setIsQuestionAnswered)
  );

  const isQuestionAnswered = useQuizStore(
    useShallow(
      (state) =>
        state.questions[state.currentQuestionNumber - 1].isQuestionAnswered
    )
  );

  const {
    verificationResult,
    isLoading: isLoadingVerify,
    error: errorVerify,
  } = useVerifyAnswerQuery();

  useEffect(() => {
    if (verificationResult?.isCorrect && !isQuestionAnswered) {
      increaseScore();
      setIsQuestionAnswered();
      setIsAnswerCorrect();
    }
  }, [
    verificationResult?.isCorrect,
    increaseScore,
    setIsQuestionAnswered,
    isQuestionAnswered,
    setIsAnswerCorrect,
  ]);

  useEffect(() => {
    setCurrentQuestionId(quiz?.quizData?.questions[currentQuestion - 1]?._id);
  }, [currentQuestion, setCurrentQuestionId, quiz?.quizData?.questions]);

  const { minutes, seconds, pause, reset, start } = useStopwatch({
    autoStart: true,
  });
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
