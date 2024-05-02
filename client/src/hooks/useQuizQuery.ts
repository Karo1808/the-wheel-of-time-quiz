import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getQuiz } from "../api/getQuiz";

const useQuizQuery = () => {
  const { quizId } = useParams<{ quizId?: string }>();

  const {
    data: quiz,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["quiz", quizId],
    queryFn: () => getQuiz({ quizId: quizId! }),
    enabled: !!quizId,
  });

  return { quiz, isLoading, error };
};

export default useQuizQuery;
