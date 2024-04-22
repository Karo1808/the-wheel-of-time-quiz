import { Cell, Label, Pie, PieChart, ResponsiveContainer } from "recharts";
import { getScore, getTimeValue } from "../utils";

interface Props {
  maxValue: number | string;
  value: number | string;
  type: "score" | "time";
}

const calculateValue = (value: number | string, maxValue: number | string) => {
  if (typeof value === "number" && typeof maxValue === "number") {
    return getScore(value, maxValue);
  }
  return Math.round(
    (getTimeValue(value.toString()) / getTimeValue(maxValue.toString())) * 100
  );
};

const createData = ({
  value,
  type,
  maxValue,
}: {
  value: number | string;
  type: "score" | "time";
  maxValue: number | string;
}) => {
  const calculatedValue = calculateValue(value, maxValue);
  return [
    { type, value: calculatedValue },
    { type, value: 100 - calculatedValue },
  ];
};

const getColor = (type: "score" | "time") => {
  return type === "score" ? "#3F704D" : "#4B0082";
};

const INACTIVE_COLOR = "#B6AFAA";

const ResultsGraph = ({ value, type: type, maxValue }: Props) => {
  const data = createData({ value, type, maxValue });
  const color = getColor(type);
  const COLORS = [color, INACTIVE_COLOR];

  return (
    <ResponsiveContainer minWidth={400} minHeight={400}>
      <PieChart>
        <Pie
          dataKey="value"
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={120}
          stroke="none"
        >
          {data.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
          <Label
            value={type === "score" ? `${data[0].value}%` : value}
            position="center"
            fontSize={48}
            fill={color}
            fontWeight={700}
          />
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ResultsGraph;
