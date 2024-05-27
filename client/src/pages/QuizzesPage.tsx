import { useNavigate } from "react-router";
import useQuizzesQuery from "../hooks/useQuizzesQuery";
import useQuizStore from "../hooks/useQuizStore";

const QuizzesPage = () => {
  const { quizzes } = useQuizzesQuery();
  const navigate = useNavigate();
  const setCurrentQuiz = useQuizStore((state) => state.setCurrentQuiz);
  const stateQuizzes = useQuizStore((state) => state.quizzes);

  const handleGoToQuiz = ({
    quizId,
    quizName,
  }: {
    quizId: string;
    quizName: string;
  }) => {
    if (stateQuizzes[quizName] === undefined) {
      setCurrentQuiz(quizName, true);
    } else {
      setCurrentQuiz(quizName);
    }
    navigate(`/quiz/${quizId}`);
  };
  return (
    <main>
      {quizzes?.map((quiz) => (
        <div
          onClick={() =>
            handleGoToQuiz({ quizId: quiz._id, quizName: quiz.quizName })
          }
          key={quiz.quizName}
        >
          {quiz.quizName}
        </div>
      ))}
    </main>
  );
};

export default QuizzesPage;
