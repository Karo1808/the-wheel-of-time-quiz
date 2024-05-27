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
    numberOfQuestions,
  }: {
    quizId: string;
    numberOfQuestions: number;
  }) => {
    setCurrentQuiz(quizId, stateQuizzes[quizId] === undefined);

    if (stateQuizzes[quizId].numberOfQuestionsAnswered === numberOfQuestions) {
      navigate(`/quiz/${quizId}/summary`);
      return;
    }

    navigate(`/quiz/${quizId}`);
  };
  return (
    <main>
      {quizzes?.map((quiz) => (
        <div
          onClick={() =>
            handleGoToQuiz({
              quizId: quiz._id,
              numberOfQuestions: quiz.numberOfQuestions,
            })
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
