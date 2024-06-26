import { useWindowSize } from "@uidotdev/usehooks";
import QuizzesBookList from "../components/quizzes/QuizzesBookList";
import QuizzesHeader from "../components/quizzes/QuizzesHeader";
import styles from "../styles/quizzesPage.module.css";
import PaginationWrapper from "../components/PaginationWrapper";
import { Suspense, useState } from "react";
import QuizzesCardList from "../components/quizzes/QuizzesCardList";
import QuizCardListSkeleton from "./loading/QuizCardListSkeleton";

const QuizzesPage = () => {
  const { width } = useWindowSize();
  const [currentPage, setCurrentPage] = useState<number>(1);

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
          numberOfPages={10}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </footer>
    </>
  );
};

export default QuizzesPage;
