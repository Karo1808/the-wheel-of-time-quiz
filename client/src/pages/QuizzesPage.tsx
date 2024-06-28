import { useWindowSize } from "@uidotdev/usehooks";
import QuizzesBookList from "../components/quizzes/QuizzesBookList";
import QuizzesHeader from "../components/quizzes/QuizzesHeader";
import styles from "../styles/quizzesPage.module.css";
import PaginationWrapper from "../components/PaginationWrapper";
import { Suspense, useRef } from "react";
import QuizzesCardList from "../components/quizzes/QuizzesCardList";
import QuizCardListSkeleton from "./loading/QuizCardListSkeleton";
import useQuizCardPagination from "../hooks/useQuizCardPagination";

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
