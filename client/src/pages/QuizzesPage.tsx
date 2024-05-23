import { useNavigate } from "react-router";
import useQuizzesQuery from "../hooks/useQuizzesQuery";

const QuizzesPage = () => {
  const { quizzes } = useQuizzesQuery();
  const navigate = useNavigate();

  const handleGoToQuiz = ({ quizId }: { quizId: string }) => {
    navigate(`/quiz/${quizId}`);
  };
  return (
    <main>
      {quizzes?.map((quiz) => (
        <div
          onClick={() => handleGoToQuiz({ quizId: quiz._id })}
          key={quiz.quizName}
        >
          {quiz.quizName}
        </div>
      ))}
    </main>
  );
};

export default QuizzesPage;
