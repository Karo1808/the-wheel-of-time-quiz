import { useShallow } from "zustand/react/shallow";
import ResultsGraph from "../components/ResultsGraph";
import useQuizStore from "../hooks/useQuizStore";
import { getTime } from "../utils";

const Summary = () => {
  const currentScore = useQuizStore(useShallow((state) => state.currentScore));

  const numberOfQuestions = useQuizStore(
    useShallow((state) => state.numberOfQuestions)
  );

  const currentTime = getTime(
    useQuizStore(useShallow((state) => state.currentTime))
  );

  const maximumTime = useQuizStore(useShallow((state) => state.maximumTime));
  return (
    <>
      <ResultsGraph
        value={currentScore}
        type="score"
        maxValue={numberOfQuestions}
      />
      <ResultsGraph value={currentTime} type="time" maxValue={maximumTime} />
    </>
  );
};

export default Summary;
