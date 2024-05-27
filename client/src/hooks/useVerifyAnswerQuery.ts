import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { verifyAnswer } from "../api/verifyAnswer";
import { useShallow } from "zustand/react/shallow";
import useQuizStore from "./useQuizStore";

const useVerifyAnswerQuery = () => {
  const { quizId } = useParams<{ quizId?: string }>();

  const currentQuizName = useQuizStore(
    useShallow((state) => state.currentQuiz)
  );

  const currentQuiz = useQuizStore(
    useShallow((state) => state.quizzes[currentQuizName])
  );

  const currentQuestionId = useQuizStore(
    useShallow(() => currentQuiz.currentQuestionId)
  );

  const questionNumber = useQuizStore(
    useShallow(() => currentQuiz.currentQuestionNumber)
  );

  const answer = useQuizStore(
    useShallow(() => currentQuiz.questions[questionNumber - 1].answer)
  );

  const isQuestionAnswered = answer ? true : false;

  const {
    data: verificationResult,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["quiz", quizId, currentQuestionId, answer],
    queryFn: () =>
      verifyAnswer({
        quizId: quizId!,
        questionId: currentQuestionId,
        answer,
      }),
    enabled: isQuestionAnswered,
  });

  return { verificationResult, isLoading, error };
};

export default useVerifyAnswerQuery;
