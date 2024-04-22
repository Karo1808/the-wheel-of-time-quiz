import { useShallow } from "zustand/react/shallow";
import ResultsGraph from "../components/ResultsGraph";
import useQuizStore from "../hooks/useQuizStore";
import { calculateScore } from "../utils/graph";
import { formatTime } from "../utils/shared";

const Summary = () => {
  const currentScore = useQuizStore(useShallow((state) => state.currentScore));

  const numberOfQuestions = useQuizStore(
    useShallow((state) => state.numberOfQuestions)
  );

  const currentTime = useQuizStore(useShallow((state) => state.currentTime));

  const maximumTime = useQuizStore(useShallow((state) => state.maximumTime));
  return (
    <>
      <ResultsGraph
        value={currentScore}
        type="score"
        maxValue={numberOfQuestions}
        color="#3F704D"
        label={calculateScore(currentScore, numberOfQuestions).toString() + "%"}
      />
      <ResultsGraph
        value={currentTime}
        type="time"
        maxValue={maximumTime}
        color="#4B0082"
        label={formatTime(currentTime) as string}
      />
    </>
  );
};

export default Summary;
