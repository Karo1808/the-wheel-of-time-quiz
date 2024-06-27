import { useWindowSize } from "@uidotdev/usehooks";
import QuizzesBookList from "../components/quizzes/QuizzesBookList";
import QuizzesHeader from "../components/quizzes/QuizzesHeader";
import styles from "../styles/quizzesPage.module.css";
import PaginationWrapper from "../components/PaginationWrapper";
import { Suspense, startTransition, useEffect, useState } from "react";
import QuizzesCardList from "../components/quizzes/QuizzesCardList";
import QuizCardListSkeleton from "./loading/QuizCardListSkeleton";
import useUpdateSearchParams from "../hooks/useUpdateSearchParams";
import useQuizzesQuery from "../hooks/useQuizzesQuery";
import { useQueryClient } from "@tanstack/react-query";
import { getQuizzes } from "../api/getQuizzes";

const QuizzesPage = () => {
  const { width } = useWindowSize();
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

  if (!width) return null;
  return (
    <>
      <QuizzesHeader />
      <main className={styles.container}>
        {width > 1200 ? <QuizzesBookList /> : null}
        <Suspense fallback={<QuizCardListSkeleton />}>
          <QuizzesCardList />
        </Suspense>
      </main>
      <footer className={styles.footer}>
        <PaginationWrapper
          numberOfPages={totalPages}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      </footer>
    </>
  );
};

export default QuizzesPage;
