import { Suspense, useRef } from "react";

import { useWindowSize } from "@uidotdev/usehooks";

import useQuizCardPagination from "../hooks/useQuizCardPagination";

import PaginationWrapper from "../components/PaginationWrapper";
import QuizzesBookList from "../components/quizzes/QuizzesBookList";
import QuizzesCardList from "../components/quizzes/QuizzesCardList";
import QuizzesHeader from "../components/quizzes/QuizzesHeader";
import QuizCardListSkeleton from "./loading/QuizCardListSkeleton";

import styles from "../styles/quizzesPage.module.css";

const QuizzesPage = () => {
  const { width } = useWindowSize();
  const ref = useRef<HTMLDivElement>(null);
  const { currentPage, totalPages, handlePageChange } = useQuizCardPagination({
    ref,
  });

  if (!width) return null;

  return (
    <>
      <QuizzesHeader />
      <main className={styles.container} ref={ref}>
        {width > 1200 ? <QuizzesBookList /> : null}
        <Suspense fallback={<QuizCardListSkeleton />}>
          <QuizzesCardList ref={ref} />
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
