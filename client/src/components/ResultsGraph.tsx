import { Cell, Label, Pie, PieChart, ResponsiveContainer } from "recharts";
import { createData, statisticStyle } from "../utils/graph";

import styles from "../styles/graph.module.css";
import { formatTime } from "../utils/shared";

interface Props {
  value: number;
  maxValue: number;
  type: "score" | "time";
  color: string;
  label: string;
}

const WRONG_COLOR = "#9d2933";
const INACTIVE_COLOR = "#B6AFAA";

const ResultsGraph = ({ value, type: type, maxValue, color, label }: Props) => {
  const data = createData({ value, maxValue, type });
  let colors = [color, INACTIVE_COLOR];
  if (value > maxValue) {
    color = WRONG_COLOR;
    colors = [INACTIVE_COLOR, WRONG_COLOR];
  }

  return (
    <figure className={styles.container}>
      <ResponsiveContainer minWidth={300} minHeight={250}>
        <PieChart>
          <Pie
            dataKey="value"
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={73}
            paddingAngle={5}
            stroke="none"
          >
            {data.map((_entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
            <Label
              value={label}
              position="center"
              fontSize={36}
              fill={color}
              fontWeight={700}
            />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      {type === "score" ? (
        <ul className={styles.stats}>
          <li className={styles.stat}>
            <span className={styles.stat_label}>Avg Score</span>
            {/* TODO: Add  average score from database*/}
            <span
              className={`${
                styles[statisticStyle(Number.parseInt(label), 54)]
              } ${styles.stat_value}`}
            >
              54%
            </span>
          </li>
          <li className={styles.stat}>
            <span className={styles.stat_label}>Personal Best</span>
            {/* TODO: Add personal best from database*/}
            <span
              className={`${
                styles[statisticStyle(Number.parseInt(label), 85)]
              } ${styles.stat_value}`}
            >
              85%
            </span>
          </li>
        </ul>
      ) : (
        <ul className={styles.stats}>
          <li className={styles.stat}>
            <span className={styles.stat_label}>Avg Time</span>
            {/* TODO: Add  average time from database*/}
            <span
              className={`${
                styles[statisticStyle(maxValue - value, maxValue - 163)]
              } ${styles.stat_value}`}
            >
              2:43
            </span>
          </li>
          <li className={styles.stat}>
            <span className={styles.stat_label}>Time Left</span>
            {/* TODO: Add personal best from database*/}
            <span
              className={`${styles[statisticStyle(maxValue - value, 0)]} ${
                styles.stat_value
              }`}
            >
              {formatTime(maxValue - value < 0 ? 0 : maxValue - value)}
            </span>
          </li>
        </ul>
      )}
    </figure>
  );
};

export default ResultsGraph;
