import { useEffect } from "react";

import { useWindowSize } from "@uidotdev/usehooks";
import { useStopwatch } from "react-timer-hook";
import { useShallow } from "zustand/react/shallow";
import { useNavigate } from "react-router";

import useQuizStore from "../hooks/useQuizStore";
import useQuizQuery from "./useQuizQuery";
import useVerifyAnswerQuery from "./useVerifyAnswerQuery";

const useQuiz = () => {
  const { seconds, minutes, pause, reset } = useStopwatch({ autoStart: true });
  const windowSize = useWindowSize();

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

  useEffect(() => {
    reset();
  }, [currentQuestion, reset]);

  const navigate = useNavigate();

  const { quiz, isLoading: isLoadingQuiz, error: quizError } = useQuizQuery();

  const {
    verificationResult,
    isLoading: isLoadingVerify,
    error: errorVerify,
  } = useVerifyAnswerQuery();

  return {
    stopwatch: {
      seconds,
      minutes,
      pause,
      reset,
    },
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
    },
    quizQuery: {
      quiz,
      isLoadingQuiz,
      quizError,
    },
    verifyQuery: {
      verificationResult,
      isLoadingVerify,
      errorVerify,
    },

    windowSize,
    navigate,
  };
};

export default useQuiz;
