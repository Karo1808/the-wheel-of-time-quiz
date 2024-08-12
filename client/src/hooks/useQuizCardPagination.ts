import { startTransition } from "react";

import { useQueryClient } from "@tanstack/react-query";
import useUpdateSearchParams from "./useUpdateSearchParams";

import useQuizzesQuery from "./queries/useQuizzesQuery";

import { getQuizzes } from "../api/getQuizzes";

import { DEFAULT_BOOK, STARTING_PAGE } from "../config";

const useQuizCardPagination = <T extends HTMLElement, T2>({
  ref,
  action,
}: {
  ref?: React.RefObject<T>;
  action?: (param?: T2) => void;
}) => {
  const { searchParams, updateSearchParams } = useUpdateSearchParams();
  const { totalPages, hasMore } = useQuizzesQuery();
  const queryClient = useQueryClient();
  const currentPage = searchParams.get("page") || STARTING_PAGE.toString();
  const currentBook = searchParams.get("book") || DEFAULT_BOOK;

  const handlePageChange = (page: number) => {
    startTransition(() => {
      ref?.current?.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      action?.();

      updateSearchParams({ page: page.toString() });

      if (hasMore) {
        const currentPage = Number.parseInt(searchParams.get("page") || "1");

        queryClient.prefetchQuery({
          queryKey: ["quizzes", currentPage, currentBook],
          queryFn: () =>
            getQuizzes({
              page: currentPage,
              book: currentBook,
            }),
        });
      }
    });
  };

  return {
    currentPage: Number.parseInt(currentPage),
    totalPages,
    handlePageChange,
  };
};

export default useQuizCardPagination;
