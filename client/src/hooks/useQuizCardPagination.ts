import { useQueryClient } from "@tanstack/react-query";
import { startTransition, useEffect, useState } from "react";
import useQuizzesQuery from "./queries/useQuizzesQuery";
import useUpdateSearchParams from "./useUpdateSearchParams";
import { getQuizzes } from "../api/getQuizzes";

const useQuizCardPagination = <T extends HTMLElement, T2>({
  ref,
  action,
}: {
  ref?: React.RefObject<T>;
  action?: (param?: T2) => void;
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { searchParams, updateSearchParams } = useUpdateSearchParams();
  const { totalPages, hasMore } = useQuizzesQuery();
  const queryClient = useQueryClient();

  useEffect(() => {
    setCurrentPage(parseInt(searchParams.get("page") || "1"));
  }, [searchParams, hasMore, currentPage, queryClient]);

  const handlePageChange = (page: number) => {
    startTransition(() => {
      setCurrentPage(page);
      setCurrentPage(page);
      if (ref) {
        ref.current?.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }

      if (action) {
        action();
      }
      updateSearchParams({ page: page.toString() });
      if (hasMore) {
        queryClient.prefetchQuery({
          queryKey: [
            "quizzes",
            currentPage.toString() + 1,
            searchParams.get("book"),
          ],
          queryFn: () =>
            getQuizzes({
              page: currentPage + 1,
              book: searchParams.get("book") || "All",
            }),
        });
      }
    });
  };

  return {
    currentPage,
    totalPages,
    handlePageChange,
  };
};

export default useQuizCardPagination;
