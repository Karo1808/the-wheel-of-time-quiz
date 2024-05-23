import { useShallow } from "zustand/react/shallow";
import Timeline from "../components/Timeline";
import useQuizStore from "../hooks/useQuizStore";

const SummaryPage = () => {
  const questions = useQuizStore(useShallow((state) => state.questions));
  return (
    <>
      <Timeline questions={questions} />
    </>
  );
};

export default SummaryPage;
