import ResultsGraph from "../components/ResultsGraph";
import { calculateScore } from "../utils/graph";
import { formatTime } from "../utils/shared";

const SummaryPage = () => {
  return (
    <>
      <ResultsGraph
        value={45}
        maxValue={50}
        type="score"
        color="#3F704D"
        label={`${calculateScore(45, 50)}%`}
      />
      <ResultsGraph
        value={formatTime("02:54") as number}
        maxValue={formatTime("03:00") as number}
        type="time"
        color="#4B0082"
        label={"02:54"}
      />
    </>
  );
};

export default SummaryPage;
