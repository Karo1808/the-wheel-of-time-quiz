import styles from "../../styles/quizzesPage.module.css";
import { useNavigate } from "react-router";
import useQuizzesQuery from "../../hooks/useQuizzesQuery";
import useQuizStore from "../../hooks/useQuizStore";
import { useEffect } from "react";
import QuizzesCard from "./QuizzesCard";

function fetchDataWithDelay() {
  let status = "pending";
  let result;
  const suspender = new Promise((resolve) => {
    setTimeout(() => {
      result = {
        data: [
          { id: 1, name: "Item 1" },
          { id: 2, name: "Item 2" },
          { id: 3, name: "Item 3" },
        ],
      };
      status = "success";
      resolve(result);
    }, 5000); // Simulate a 5-second delay
  }).catch((error) => {
    status = "error";
    result = error;
  });

  return {
    read() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      }
      return result;
    },
  };
}
const resource = fetchDataWithDelay();

const QuizzesCardList = () => {
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

  const data = resource.read();
  return (
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
  );
};

export default QuizzesCardList;
