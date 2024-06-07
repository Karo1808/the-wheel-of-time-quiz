import { useWindowSize } from "@uidotdev/usehooks";
import QuizzesBookList from "../components/quizzes/QuizzesBookList";
import QuizzesHeader from "../components/quizzes/QuizzesHeader";
import styles from "../styles/quizzesPage.module.css";
import QuizzesCard from "../components/quizzes/QuizzesCard";

const QuizzesPage = () => {
  const { width } = useWindowSize();
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
    </>
  );
};

export default QuizzesPage;
