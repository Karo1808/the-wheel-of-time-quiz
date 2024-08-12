import { useSearchParams } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";

import { getQuizzes } from "../../api/getQuizzes";

import { DEFAULT_BOOK, STARTING_PAGE } from "../../config";

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
      getQuizzes({
        page: parseInt(page as string) || STARTING_PAGE,
        book: book || DEFAULT_BOOK,
      }),
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
