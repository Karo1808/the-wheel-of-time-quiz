import { useSuspenseQuery } from "@tanstack/react-query";
import { getQuizzes } from "../api/getQuizzes";

const useQuizzesQuery = () => {
  const {
    data: quizzes,
    isLoading,
    error,
  } = useSuspenseQuery({
    queryKey: ["quizzes"],
    queryFn: getQuizzes,
  });

  return { quizzes, isLoading, error };
};

export default useQuizzesQuery;
