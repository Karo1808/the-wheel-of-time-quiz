import { useWindowSize } from "@uidotdev/usehooks";
import QuizzesBookList from "../components/quizzes/QuizzesBookList";
import QuizzesHeader from "../components/quizzes/QuizzesHeader";
import styles from "../styles/quizzesPage.module.css";
import QuizzesCard from "../components/quizzes/QuizzesCard";
import Pagination from "../components/Pagination";
import { useEffect, useState } from "react";
import useQuizzesQuery from "../hooks/useQuizzesQuery";
import { useNavigate } from "react-router";
import useQuizStore from "../hooks/useQuizStore";

const QuizzesPage = () => {
  const { width } = useWindowSize();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { quizzes } = useQuizzesQuery();
  const navigate = useNavigate();
  const setCurrentQuiz = useQuizStore((state) => state.setCurrentQuiz);
  const setCurrentQuizId = useQuizStore((state) => state.setCurrentQuizId);
  const stateQuizzes = useQuizStore((state) => state.quizzes);

  const handleGoToQuiz = ({
    quizId,
    numberOfQuestions,
  }: {
    quizId: string;
    numberOfQuestions: number;
  }) => {
    setCurrentQuizId(quizId);
    if (stateQuizzes[quizId].numberOfQuestionsAnswered === numberOfQuestions) {
      navigate(`/quiz/${quizId}/summary`);
      return;
    }

    navigate(`/quiz/${quizId}`);
  };

  useEffect(() => {
    if (quizzes) {
      quizzes.forEach((quiz) => {
        setCurrentQuiz(quiz._id, stateQuizzes[quiz._id] === undefined);
      });
    }
  }, [setCurrentQuiz, quizzes, stateQuizzes]);

  if (!width) return null;
  return (
    <>
      <QuizzesHeader />
      <main className={styles.container}>
        {width > 1200 ? <QuizzesBookList /> : null}
        <div className={styles.quizzes}>
          {quizzes?.map((quiz) => (
            <QuizzesCard
              quizId={quiz._id}
              numberOfQuestions={quiz.numberOfQuestions}
              key={quiz._id}
              handleGoToQuiz={handleGoToQuiz}
            />
          ))}
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
