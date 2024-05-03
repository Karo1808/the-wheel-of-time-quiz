import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getQuizzes } from "../api/getQuizzes";

const useQuizzesQuery = () => {
  const {
    data: quizzes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["quizzes"],
    queryFn: getQuizzes,
    placeholderData: keepPreviousData,
  });
  console.log("Quizzes Query was called");

  return { quizzes, isLoading, error };
};

export default useQuizzesQuery;
