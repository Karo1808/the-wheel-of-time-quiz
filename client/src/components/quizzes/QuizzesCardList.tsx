import { useEffect, forwardRef } from "react";

import { useNavigate } from "react-router";

import useQuizzesQuery from "../../hooks/queries/useQuizzesQuery";
import useQuizStore from "../../hooks/useQuizStore";

import QuizCard from "../QuizCard";
import QuizzesCardCta from "./QuizzesCardCta";

import styles from "../../styles/quizzesPage.module.css";

type Props = React.HTMLAttributes<HTMLDivElement>;
type Ref = HTMLDivElement;

const QuizzesCardList = forwardRef<Ref, Props>((props, ref) => {
  const navigate = useNavigate();

  const { quizzes } = useQuizzesQuery();

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

    const numberOfQuestionsAnswered =
      stateQuizzes[quizId]?.numberOfQuestionsAnswered;

    if (numberOfQuestionsAnswered === numberOfQuestions) {
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
    <div className={styles.wrapper} ref={ref} {...props}>
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
