import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getQuestions } from "../../api/getQuestions";

const useQuestionsQuery = () => {
  const { quizId } = useParams<{ quizId?: string }>();

  const {
    data: quiz,
    refetch,
    error,
  } = useSuspenseQuery({
    queryKey: ["quiz", quizId],
    queryFn: () => getQuestions({ quizId: quizId! }),
  });

  return { quiz, error, refetch };
};

export default useQuestionsQuery;
