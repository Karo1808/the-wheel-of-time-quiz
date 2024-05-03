import { useShallow } from "zustand/react/shallow";
import { useNavigate } from "react-router";

import useQuizStore from "../hooks/useQuizStore";
import useQuizQuery from "./useQuizQuery";
import useVerifyAnswerQuery from "./useVerifyAnswerQuery";

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

  // useEffect(() => {
  //   reset();
  // }, [reset]);

  const navigate = useNavigate();

  const { quiz, isLoading: isLoadingQuiz, error: quizError } = useQuizQuery();

  const setSeed = useQuizStore(useShallow((state) => state.setSeed));

  setSeed(quiz?.seed);

  const {
    verificationResult,
    isLoading: isLoadingVerify,
    error: errorVerify,
  } = useVerifyAnswerQuery();

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
    },
    quizQuery: {
      quiz: quiz?.quizData,
      isLoadingQuiz,
      quizError,
    },
    verifyQuery: {
      verificationResult,
      isLoadingVerify,
      errorVerify,
    },

    navigate,
  };
};

export default useQuiz;
