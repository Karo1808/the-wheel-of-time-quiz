import { useWindowSize } from "@uidotdev/usehooks";
import QuizzesBookList from "../components/quizzes/QuizzesBookList";
import QuizzesHeader from "../components/quizzes/QuizzesHeader";
import styles from "../styles/quizzesPage.module.css";
import QuizzesCard from "../components/quizzes/QuizzesCard";
import Pagination from "../components/Pagination";
import { useState } from "react";

const QuizzesPage = () => {
  const { width } = useWindowSize();
  const [currentPage, setCurrentPage] = useState<number>(1);
  if (!width) return null;
  return (
    <>
      <QuizzesHeader />
      <main className={styles.container}>
        {width > 1200 ? <QuizzesBookList /> : null}
        <div className={styles.quizzes}>
          <QuizzesCard />
          <QuizzesCard />
          <QuizzesCard />
        </div>
      </main>
      <footer>
        <Pagination
          numberOfPages={10}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </footer>
    </>
  );
};

export default QuizzesPage;
