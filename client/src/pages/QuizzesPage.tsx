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
    numberOfQuestions,
  }: {
    quizId: string;
    quizName: string;
    numberOfQuestions: number;
  }) => {
    setCurrentQuiz(quizName, stateQuizzes[quizName] === undefined);

    if (
      stateQuizzes[quizName].numberOfQuestionsAnswered === numberOfQuestions
    ) {
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
              quizName: quiz.quizName,
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
