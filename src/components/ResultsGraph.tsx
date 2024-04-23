import { Cell, Label, Pie, PieChart, ResponsiveContainer } from "recharts";
import { createData } from "../utils/graph";

interface Props {
  value: number;
  maxValue: number;
  type: "score" | "time";
  color: string;
  label: string;
}
const INACTIVE_COLOR = "#B6AFAA";

const ResultsGraph = ({ value, type: type, maxValue, color, label }: Props) => {
  const data = createData({ value, maxValue, type });
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
            value={label}
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
