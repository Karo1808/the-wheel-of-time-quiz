import { useSuspenseQuery } from "@tanstack/react-query";
import { getQuizzes } from "../api/getQuizzes";
import { useSearchParams } from "react-router-dom";

const useQuizzesQuery = () => {
  const [searchParams] = useSearchParams();
  const book = searchParams.get("book");
  const page = searchParams.get("page");

  const {
    data: quizzes,
    isLoading,
    error,
  } = useSuspenseQuery({
    queryKey: ["quizzes", page, book],
    queryFn: () =>
      getQuizzes({ page: parseInt(page as string) || 1, book: book || "All" }),
  });

  return {
    quizzes: quizzes.quizzes,
    totalPages: quizzes.totalPages,
    totalItems: quizzes.totalItems,
    currentPage: quizzes.currentPage,
    isLoading,
    hasMore: quizzes.totalPages > quizzes.currentPage + 1,
    error,
  };
};

export default useQuizzesQuery;
