import { useEffect, forwardRef } from "react";
import styles from "../../styles/quizzesPage.module.css";
import { useNavigate } from "react-router";
import useQuizzesQuery from "../../hooks/queries/useQuizzesQuery";
import useQuizStore from "../../hooks/useQuizStore";
import QuizCard from "../QuizCard";
import QuizzesCardCta from "./QuizzesCardCta";

const QuizzesCardList = forwardRef<HTMLDivElement>((_props, ref) => {
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

  return (
    <div className={styles.wrapper} ref={ref}>
      <div className={styles.quizzes}>
        {quizzes?.map((quiz) => (
          <QuizCard
            key={quiz._id}
            tags={quiz.tags}
            title={quiz.quizName}
            description={quiz.quizDescription}
            ctaElements={
              <QuizzesCardCta
                quizId={quiz._id}
                numberOfQuestions={quiz.numberOfQuestions}
                handleGoToQuiz={handleGoToQuiz}
              />
            }
          />
        ))}
      </div>
    </div>
  );
});

export default QuizzesCardList;
