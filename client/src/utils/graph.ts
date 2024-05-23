// Create a data object for graph
export const createData = ({
  value,
  type,
  maxValue,
}: {
  value: number;
  type: "score" | "time";
  maxValue: number;
}) => {
  const calculatedValue = calculateValue(value, maxValue, type);
  return [
    { type, value: calculatedValue },
    { type, value: 100 - calculatedValue },
  ];
};

// Calculate time value for the graph
export const calculateTimeValue = (time: number, maxValue: number) => {
  return Math.round((time / maxValue) * 100);
};

// Calculate the value for the graph
export const calculateScore = (value: number, maxValue: number) => {
  return Math.round((value / maxValue) * 100);
};
// Calculate the value for the graph
const calculateValue = (
  value: number,
  maxValue: number,
  type: "score" | "time"
) => {
  if (type === "score") {
    return calculateScore(value, maxValue);
  }
  return Math.round((value / maxValue) * 100);
};
