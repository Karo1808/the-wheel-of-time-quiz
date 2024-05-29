import { useNavigate } from "react-router";
import useQuizzesQuery from "../hooks/useQuizzesQuery";
import useQuizStore from "../hooks/useQuizStore";
import { useEffect } from "react";

const QuizzesPage = () => {
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
