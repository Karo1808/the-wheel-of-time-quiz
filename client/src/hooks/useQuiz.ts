import { useEffect } from "react";

import { useWindowSize } from "@uidotdev/usehooks";
import { useStopwatch } from "react-timer-hook";
import { useShallow } from "zustand/react/shallow";
import { useNavigate } from "react-router";

import useQuizStore from "../hooks/useQuizStore";

const useQuiz = () => {
  const { seconds, minutes, pause, reset } = useStopwatch({ autoStart: true });
  const windowSize = useWindowSize();

  const quizState = useQuizStore(
    useShallow((state) => state.questions[state.currentQuestionNumber - 1])
  );

  const setQuestionTimer = useQuizStore(
    useShallow((state) => state.setQuestionTimer)
  );

  const answer = useQuizStore(useShallow((state) => state.answer));

  const nextQuestion = useQuizStore(useShallow((state) => state.nextQuestion));
  const previousQuestion = useQuizStore(
    useShallow((state) => state.previousQuestion)
  );

  const currentQuestion = useQuizStore(
    useShallow((state) => state.currentQuestionNumber)
  );
  const currentScore = useQuizStore(useShallow((state) => state.currentScore));

  const numberOfQuestions = useQuizStore(
    useShallow((state) => state.numberOfQuestions)
  );

  const numberOfQuestionsAnswered = useQuizStore(
    useShallow((state) => state.numberOfQuestionsAnswered)
  );

  useEffect(() => {
    reset();
  }, [currentQuestion, reset]);

  const navigate = useNavigate();

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
      numberOfQuestions,
      numberOfQuestionsAnswered,
      currentQuestion,
    },
    quizActions: {
      setQuestionTimer,
      answer,
      nextQuestion,
      previousQuestion,
    },

    windowSize,
    navigate,
  };
};

export default useQuiz;
