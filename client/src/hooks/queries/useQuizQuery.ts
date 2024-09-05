import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getQuiz } from "../../api/getQuiz";

const useQuizQuery = () => {
  const { quizId } = useParams<{ quizId?: string }>();

  const {
    data: quiz,
    refetch,
    error,
  } = useSuspenseQuery({
    queryKey: ["quiz", quizId],
    queryFn: () => getQuiz({ quizId: quizId! }),
  });

  return { quiz, error, refetch };
};

export default useQuizQuery;
