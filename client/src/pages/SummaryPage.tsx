import { useShallow } from "zustand/react/shallow";
import Timeline from "../components/Timeline";
import useQuizStore from "../hooks/useQuizStore";

const SummaryPage = () => {
  const currentQuizName = useQuizStore(
    useShallow((state) => state.currentQuiz)
  );
  const currentQuiz = useQuizStore(
    useShallow((state) => state.quizzes[currentQuizName])
  );
  const questions = useQuizStore(useShallow(() => currentQuiz.questions));
  return (
    <>
      <Timeline questions={questions} />
    </>
  );
};

export default SummaryPage;
